<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useBreweriesStore } from '@/stores/breweries'

import LoadingSpinner from '@/components/LoadingSpinner.vue'
import BreweryList from '@/components/BreweryList.vue'
import TypeaheadComponent from '@/components/TypeaheadComponent.vue'
import VueSelect from 'vue3-select-component'

const store = useBreweriesStore()
const type = ref('')

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
  store.setLocation(undefined)
  store.clearBreweries()
  store.getBreweries()
}

watch(type, (newValue) => {
  store.clearBreweries()
  store.setByType(newValue)
  store.getBreweries()
})
</script>

<template>
  <h1>Welcome to BrewHaus</h1>
  <p>Where you can find the best beer in town!</p>
  <div class="options-container">
    <div class="btn-container">
      <button class="primary" @click="getLocation">Find Breweries Near Me</button>
      <button class="primary" @click="getAllBreweries">Get All Breweries</button>
      <VueSelect v-model="type" :options="store.types" placeholder="Search by Type" />
    </div>
    <TypeaheadComponent />
  </div>
  <BreweryList />
  <p v-if="store.state.error" class="danger">Sorry, there was an error fetching the breweries.</p>

  <LoadingSpinner v-if="store.state.loading" />
  <p v-if="store.breweries.length === 0">No breweries found.</p>
</template>
<style scoped lang="scss">
.options-container {
  max-width: 520px;
  width: 100%;
}
.btn-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>
