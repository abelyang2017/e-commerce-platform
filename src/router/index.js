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
      name: 'Category',
      component: () => import('@/views/CategoryView.vue'),
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: () => import('@/views/ProductDetail.vue'),
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
      path: '/e-ticket/:storeId/:ticketId',
      name: 'ETicket',
      component: () => import('@/views/E-Ticket.vue'),
    },
    {
      path: '/cupon-ticket/:id',
      name: 'CuponTicket',
      component: () => import('@/views/ScoreCupon.vue'),
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/views/ShopCart.vue'),
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('@/views/SearchView.vue'),
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
