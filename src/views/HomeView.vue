<script setup lang="ts">
import { onMounted } from 'vue'
import { useBreweriesStore } from '@/stores/breweries'

import LoadingSpinner from '@/components/LoadingSpinner.vue'
import BreweryList from '@/components/BreweryList.vue'
import TypeaheadComponent from '@/components/TypeaheadComponent.vue'

const store = useBreweriesStore()

onMounted(() => {
  store.getBreweries()
})

function getLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    store.setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    store.clearBreweries()
    store.getBreweries()
  })
}
function getAllBreweries() {
  store.clearBreweries()
  store.getBreweries()
}
</script>

<template>
  <h1>Welcome to BrewHaus</h1>
  <p>Where you can find the best beer in town!</p>
  <div class="btn-container">
    <button class="primary" @click="getLocation">Find Breweries Near Me</button>
    <button class="primary" @click="getAllBreweries">Get All Breweries</button>
  </div>
  <TypeaheadComponent />
  <BreweryList />
  <p v-if="store.state.error" class="danger">Sorry, there was an error fetching the breweries.</p>

  <LoadingSpinner v-if="store.state.loading" />
  <p v-if="store.breweries.length === 0">No breweries found.</p>
</template>
<style scoped lang="scss">
.btn-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>
