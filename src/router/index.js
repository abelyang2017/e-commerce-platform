import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // 瀏覽器上一頁/下一頁：尊重瀏覽器記憶的位置
    if (savedPosition) return savedPosition

    // 若未來有用到 hash 錨點（例如 /#section），就滾到對應元素
    if (to.hash) return { el: to.hash }

    // 預設：每次路由切換都回到頁面頂部
    return { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/category/:category?',
      redirect: { name: 'Home' },
    },
    {
      path: '/product/:id',
      redirect: { name: 'Home' },
    },
    {
      path: '/store/:id',
      name: 'Store',
      component: () => import('@/views/StoreDetail.vue'),
    },
    {
      path: '/code-coupon/:storeId/:couponId',
      name: 'CodeCupon',
      component: () => import('@/views/CodeCupon.vue'),
    },
    {
      path: '/score-system/:storeId/:ticketId',
      name: 'ScoreSystem',
      component: () => import('@/views/ScoreSystem.vue'),
    },
    {
      path: '/home-ticket-cupon/:id',
      name: 'HomeTicketCupon',
      component: () => import('@/views/HomeTicketCupon.vue'),
    },
    {
      path: '/store-search',
      name: 'StoreSearch',
      component: () => import('@/views/StoreSearch.vue'),
    },
    {
      path: '/brands',
      name: 'AllBrands',
      component: () => import('@/views/AllBrands.vue'),
    },
  ],
})

export default router
