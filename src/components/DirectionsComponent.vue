<script setup lang="ts">
import { ref, defineProps, computed } from 'vue'
import type { Brewery } from '@/types/breweries'
import { fetchDirections } from '@/fetch/getDirections'
import { useBreweriesStore } from '@/stores/breweries'
import LoadingSpinner from './LoadingSpinner.vue'

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
const error = ref('')
const store = useBreweriesStore()

function getDirections() {
  loading.value = true
  error.value = ''
  fetchDirections({
    breweryLat: props.brewery.latitude,
    breweryLong: props.brewery.longitude,
    userLat: store.location?.latitude ?? 0,
    userLong: store.location?.longitude ?? 0
  })
    .then((data) => {
      directions.value = data.routes[0].guidance.instructions
      length.value = data.routes[0].summary.lengthInMeters
    })
    .catch((err) => {
      error.value = err.message
    })
    .finally(() => {
      loading.value = false
    })
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

const showDirectionsBlock = computed(() => {
  return props.brewery.latitude && props.brewery.longitude
})

if (showDirectionsBlock.value) {
  getDirections()
}
</script>
<template>
  <div v-if="showDirectionsBlock" class="directions">
    <button v-if="!store.location" @click="getLocation" class="primary">Get Directions</button>

    <div class="instructions" v-if="directions.length > 0">
      <h2>Directions</h2>
      <p>From your location to {{ props.brewery.name }} it is {{ length }} meters</p>
      <ul>
        <li v-for="step in directions" :key="step.message">{{ step.message }}</li>
      </ul>
    </div>
    <LoadingSpinner class="spinner" v-if="loading" />
    <p v-if="error">{{ error }}</p>
  </div>
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
