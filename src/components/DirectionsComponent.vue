<script setup lang="ts">
import { ref, defineProps, computed } from 'vue'
import type { Brewery } from '@/types/breweries'
import { fetchDirections } from '@/fetch/getLocations'
import { useBreweriesStore } from '@/stores/breweries'
import LoadingSpinner from './LoadingSpinner.vue'
import { metersToMiles } from '@/utils/metersToMiles'

const props = defineProps({
  brewery: {
    type: Object as () => Brewery,
    required: true
  }
})
interface Directions {
  message: string
}
const directions = ref<Directions[]>([])
const length = ref(0)
const loading = ref(false)
const error = ref<unknown>('')
const store = useBreweriesStore()

async function getDirections() {
  loading.value = true
  error.value = ''
  try {
    const data = await fetchDirections({
      breweryLat: props.brewery.latitude,
      breweryLong: props.brewery.longitude,
      userLat: store.location?.latitude ?? 0,
      userLong: store.location?.longitude ?? 0
    })

    directions.value = data.routes[0].guidance.instructions
    length.value = data.routes[0].summary.lengthInMeters
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

function getLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    store.setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    getDirections()
  })
}

const miles = computed(() => {
  const miles = metersToMiles(length.value)
  const rounded = Math.round((miles + Number.EPSILON) * 100) / 100
  const withCommas = rounded.toLocaleString()
  return withCommas
})

const showDirectionsBlock = computed(() => {
  return props.brewery.latitude && props.brewery.longitude
})

if (showDirectionsBlock.value && store.location) {
  getDirections()
}
</script>
<template>
  <section v-if="showDirectionsBlock" class="directions">
    <button v-if="!store.location" @click="getLocation" class="primary">Get Directions</button>

    <div class="instructions" v-if="directions.length > 0">
      <h2>Directions</h2>
      <p>From your location to {{ props.brewery.name }} it is {{ miles }} miles</p>
      <ul>
        <li v-for="step in directions" :key="step.message">{{ step.message }}</li>
      </ul>
    </div>
    <LoadingSpinner class="spinner" v-if="loading" />
    <p v-if="error">{{ error }}</p>
  </section>
</template>

<style lang="scss" scoped>
.directions {
  p {
    font-size: 1.2rem;
  }
  li {
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
}
</style>
