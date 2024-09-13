<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchBrewery } from '@/fetch/getBreweries'
import { fetchLocation, fetchPoi } from '@/fetch/getLocations'
import type { Brewery } from '@/types/breweries'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import DirectionsComponent from '@/components/DirectionsComponent.vue'

const route = useRoute()
const brewery = ref<Brewery | null>()
const loading = ref(false)
const error = ref(null)
const encodedAddress = ref('')

// watch the params of the route to fetch the data again
watch(
  () => route.params.id,
  () => {
    getBrewery(route.params.id as string)
  },
  { immediate: true }
)

function encodeAddress(brewery: Brewery) {
  encodedAddress.value = encodeURIComponent(
    `${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}`
  )
}

function getBrewery(id: string) {
  error.value = null
  loading.value = true

  fetchBrewery(id)
    .then((data) => {
      if (typeof data !== 'string') {
        brewery.value = data
        encodeAddress(data)
      }
    })
    .catch((err) => {
      error.value = err
    })
    .finally(() => {
      loading.value = false
    })
}

const formattedPhone = computed(() => {
  if (brewery.value && brewery.value.phone) {
    return brewery.value.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
  } else {
    return ''
  }
})
</script>
<template>
  <div class="post">
    <LoadingSpinner v-if="loading" />

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="brewery" class="content">
      <h1>{{ brewery.name }}</h1>
      <address>
        <p>{{ brewery.street }}</p>
        <p class="address-line-2">
          {{ brewery.city }}, {{ brewery.state }} {{ brewery.postal_code }}
        </p>
        <a v-if="brewery.phone" :href="brewery.phone">{{ formattedPhone }}</a>
        <a
          v-if="brewery.website_url"
          :href="brewery.website_url"
          rel="noopener noreferrer"
          target="_blank"
          >Website</a
        >
      </address>
      <DirectionsComponent :brewery="brewery" />
    </div>
  </div>
</template>

<style scoped lang="scss">
address {
  p {
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .address-line-2 {
    margin: 0;
  }
  a {
    display: block;
    max-width: 200px;
  }
}
</style>
