import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Brewery } from '@/types/breweries'
import type { Location } from '@/types/location'

import { fetchBreweries } from '@/fetch/getBreweries'

export const useBreweriesStore = defineStore('breweries', () => {
  const breweries = ref<Brewery[]>([])
  const counts = ref({ total: 0, received: 0 })
  const options = ref({ page: 1, per_page: 50, by_type: '', by_state: '' })
  const state = ref<{ loading: boolean; error: unknown }>({ loading: false, error: '' })
  const location = ref<Location | undefined>(undefined)
  const types = ref([
    { label: 'Micro', value: 'micro' },
    { label: 'Nano', value: 'nano' },
    { label: 'Regional', value: 'regional' },
    { label: 'Brewpub', value: 'brewpub' },
    { label: 'Large', value: 'large' },
    { label: 'Planning', value: 'planning' },
    { label: 'Bar', value: 'bar' },
    { label: 'Contract', value: 'contract' },
    { label: 'Proprietor', value: 'proprietor' },
    { label: 'Closed', value: 'closed' }
  ])

  async function getBreweries() {
    state.value.loading = true
    state.value.error = ''
    try {
      const data = await fetchBreweries({
        location: location.value,
        page: options.value.page,
        per_page: options.value.per_page,
        by_type: options.value.by_type,
        by_state: options.value.by_state
      })

      breweries.value.push(...data.breweries)
      counts.value.total = Number(data.meta.total)
      counts.value.received = breweries.value.length
    } catch (error) {
      state.value.error = error
    } finally {
      state.value.loading = false
    }
  }
  function setPage(newPage: number) {
    options.value.page = newPage
  }
  function setPerPage(newPerPage: number) {
    options.value.per_page = newPerPage
  }
  function setByType(newType: string) {
    options.value.by_type = newType
  }
  function setLocation(newLocation: Location | undefined) {
    location.value = newLocation
  }
  function clearBreweries() {
    breweries.value = []
    counts.value.total = 0
    counts.value.received = 0
    options.value.by_type = ''
  }
  function setBreweries(newBreweries: Brewery[]) {
    breweries.value = newBreweries
  }
  function setLoading(newLoading: boolean) {
    state.value.loading = newLoading
  }
  function setError(newError: string) {
    state.value.error = newError
  }
  return {
    breweries,
    counts,
    options,
    state,
    location,
    types,
    getBreweries,
    setPage,
    setPerPage,
    setByType,
    setLocation,
    clearBreweries,
    setBreweries,
    setError,
    setLoading
  }
})
