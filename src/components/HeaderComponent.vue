<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const skipLink = ref()

watch(
  () => route.path,
  () => {
    skipLink.value.focus()
  }
)
</script>
<template>
  <header>
    <div class="inner">
      <div class="logo">
        <img src="@/assets/beer-mug.svg" alt="brewhaus logo" />
      </div>
      <nav>
        <a href="#main" ref="skipLink" class="skip-link">Skip to main content</a>
        <RouterLink class="primary" to="/">Home</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  width: 100%;
  border-bottom: 1px solid $darker-highlight;

  .inner {
    display: flex;
    justify-content: space-between;
    max-width: $xl-breakpoint;
    margin: 0 auto;
    padding: 15px;
    align-items: center;
  }
}

.skip-link {
  white-space: nowrap;
  margin: 1em auto;
  top: 0;
  position: fixed;
  left: 50%;
  margin-left: -72px;
  opacity: 0;
}

.logo img {
  width: 50px;
  height: auto;
}
</style>
