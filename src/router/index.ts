import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: `/brewery/:id`,
      name: 'brewery',
      component: () => import('@/views/BreweryView.vue')
    }
  ]
})

export default router
