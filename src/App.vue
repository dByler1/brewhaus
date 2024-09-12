<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
</script>

<template>
  <div class="application-container">
    <HeaderComponent />
    <main id="main">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss">
.application-container {
  display: flex;
  flex-direction: column;
  background-color: $background;
  min-height: 100vh;

  main {
    padding: 0 15px;
    max-width: $xl-breakpoint;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
