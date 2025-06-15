import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Wallet from '@/views/Wallet.vue'
import Tasks from '@/views/Tasks.vue'
import Store from '@/views/Store.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/wallet', component: Wallet },
  { path: '/tasks', component: Tasks },
  { path: '/store', component: Store }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
