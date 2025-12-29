<template>
<div class="wrapper w-full ">
  <!-- 手機：用同一個 sticky 容器包住 Header + 搜尋列，避免計算 top 偏移 -->
  <div v-if="isMobile" class="sticky top-0 z-50 bg-white">
    <AppHead />
    <SearchAndTag />
  </div>

  <!-- 桌機/平板：維持原本結構 -->
  <template v-else>

    <div class="sticky top-0 z-50 bg-white">
      <AppHead />
    </div>
    <SearchAndTag />
  </template>
<div class="max-w-7xl mx-auto">
  <router-view />
</div>
  <!-- <AppFoot /> -->

  <BackToTop v-if="showBackToTop" />
</div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHead from './AppHead.vue'
// import AppFoot from './AppFoot.vue'
import SearchAndTag from './SearchAndTag.vue'
import BackToTop from '@/layout/BackToTop.vue'

const route = useRoute()
const isMobile = ref(false)

const updateIsMobile = () => {
  if (typeof window === 'undefined') return
  // Tailwind md 斷點：768px
  isMobile.value = window.innerWidth < 768
}

// 手機版：特定頁面不顯示回到頂部按鈕，避免與底部操作列/版面互相干擾
// - ScoreSystem：有底部固定兌換列
// - HomeTicketCupon：手機版不顯示 BackToTop（依需求）
// - CodeCupon：手機版不顯示 BackToTop（依需求）
const hideBackToTopOnMobileRouteNames = new Set(['ScoreSystem', 'HomeTicketCupon', 'CodeCupon',])
const showBackToTop = computed(() => !(isMobile.value && hideBackToTopOnMobileRouteNames.has(route.name)))

onMounted(() => {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile)
})
</script>
