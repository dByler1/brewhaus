<script lang="ts" setup>
//@ts-nocheck
import { ref } from 'vue'
import SimpleTypeahead from 'vue3-simple-typeahead'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css' //Optional default CSS
import { useBreweriesStore } from '@/stores/breweries'
import { fetchSearchBreweries, fetchBrewery } from '@/fetch/getBreweries'
import { debounce } from '@/utils/debounce'

const store = useBreweriesStore()
const options = ref({
  items: [],
  loading: false,
  error: null
})

const selectItemEventHandler = (item) => {
  fetchBrewery(item.id)
    .then((response) => {
      store.setBreweries([response])
    })
    .catch((error) => {
      store.setError(error)
    })
}

const onInputEventHandler = (event) => {
  debounce(
    fetchSearchBreweries(event.input)
      .then((response) => {
        options.value.items = [...response]
      })
      .catch((error) => {
        store.setError(error)
      }),
    300
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
    :items="options.items"
    @selectItem="selectItemEventHandler"
    @onInput="onInputEventHandler"
    :itemProjection="itemProjection"
  />
</template>
<style lang="scss">
#brewery-search_wrapper {
  input {
    color: $black;
    border: 1px solid $darker-highlight;
    background-color: $cream;
    border-radius: 0.25rem;
    height: 2.5rem;
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
