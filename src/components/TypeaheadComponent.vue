<script lang="ts" setup>
//@ts-nocheck
import SimpleTypeahead from 'vue3-simple-typeahead'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css' //Optional default CSS
import { useBreweriesStore } from '@/stores/breweries'
import { fetchSearchBreweries } from '@/fetch/getBreweries'
import { debounce } from '@/utils/debounce'

const store = useBreweriesStore()

const selectItemEventHandler = (item) => {
  store.setBreweries([item])
}

const onInputEventHandler = (event) => {
  store.setLoading(true)
  debounce(
    fetchSearchBreweries(event.input)
      .then((response) => {
        store.setBreweries(response)
      })
      .catch((error) => {
        store.setError(error)
      })
      .finally(() => {
        store.setLoading(false)
      }),
    100
  )
}
const itemProjection = (item) => {
  return item.name
}
</script>
<template>
  <SimpleTypeahead
    id="brewery-search"
    placeholder="Search for a brewery by name"
    :items="store.breweries"
    @selectItem="selectItemEventHandler"
    @onInput="onInputEventHandler"
    :itemProjection="itemProjection"
  />
</template>
<style lang="scss">
#brewery-search_wrapper {
  max-width: 400px;
  width: 100%;
  input {
    color: $black;
    border: 1px solid $darker-highlight;
    background-color: $cream;
    border-radius: 0.25rem;
    height: 2.5rem;
    max-width: 400px;
    width: 100%;
    padding: 10px;

    &:focus {
      border-color: $light-highlight;
    }
  }

  .simple-typeahead-list {
    border-radius: 0.25rem;
    margin-top: 0.25rem;
  }
}
</style>
