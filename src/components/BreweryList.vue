<script setup lang="ts">
import { useTemplateRef, onUnmounted, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import { debounce } from '@/utils/debounce'
import { useBreweriesStore } from '@/stores/breweries'

const store = useBreweriesStore()
const listRef = useTemplateRef('list')

function scrollCb() {
  //only get more if we haven't reached the end of the list and we're not already loading
  const loadMoreStatus = store.counts.received < store.counts.total && !store.state.loading

  if (loadMoreStatus && listRef.value!.getBoundingClientRect().bottom < window.innerHeight) {
    store.setPage(store.options.page + 1)
    store.getBreweries()
  }
}

onMounted(() => {
  window.addEventListener('scroll', debounce(scrollCb, 100))
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollCb)
})
</script>

<template>
  <ul ref="list" class="b-list">
    <li v-for="brewery in store.breweries" :key="brewery.id">
      <span class="title">{{ brewery.name }}</span>
      <span class="location">{{ brewery.city }}, {{ brewery.city }} {{ brewery.country }}</span>
      <RouterLink class="action" :to="{ name: 'brewery', params: { id: brewery.id } }">
        More Details
      </RouterLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.b-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  max-width: 1240px;
  gap: 10px;

  li {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: $light-highlight;
    border-radius: 5px;
    margin-bottom: 10px;
    max-width: 300px;
    width: 100%;
  }

  .title {
    font-size: 1.1rem;
    font-weight: bold;
  }

  .title,
  .location {
    padding: 5px 10px;
  }

  .action {
    &:hover {
      background-color: $dark-highlight;
    }

    &:active,
    &:focus {
      background-color: $darker-highlight;
    }
  }
}
</style>
