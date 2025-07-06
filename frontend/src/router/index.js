import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Wallet from '@/views/Wallet.vue'
import Tasks from '@/views/Tasks.vue'
import Store from '@/views/Store.vue'
// 新增任務發布頁面
import TaskPublish from '@/views/TaskPublish.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/wallet', component: Wallet },
  { path: '/tasks', component: Tasks },
  { path: '/store', component: Store },
  {
    path: '/task-publish',
    component: TaskPublish,
    meta: { requireRole: [2, 3] } // 2: 商家, 3: 管理員
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守衛：僅商家/管理員可進入任務發布頁面
import { useWalletStore } from '@/store/walletStore'
router.beforeEach((to, from, next) => {
  if (to.meta.requireRole) {
    const walletStore = useWalletStore()
    // 這裡假設 walletStore 有 currentRole 屬性（1:學生, 2:商家, 3:管理員）
    if (!walletStore.currentRole || !to.meta.requireRole.includes(walletStore.currentRole)) {
      // 若無權限，導回首頁或顯示提示
      return next('/')
    }
  }
  next()
})

export default router
