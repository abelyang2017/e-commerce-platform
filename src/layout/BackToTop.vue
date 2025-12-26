<template>
  <button
    v-if="showBackToTop"
    type="button"
    class="back-to-top-btn fixed bottom-15 right-15 z-50 flex h-18 w-18 items-center justify-center rounded-full bg-[#ffa940] text-white shadow-lg transition-colors transition-shadow hover:bg-[#ff8c00] hover:shadow-xl active:scale-95"
    @click="scrollTop"
    aria-label="回到頂部"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="back-to-top-arrow h-6 w-6 text-white"
    >
      <path d="M18 15l-6-6-6 6" class="text-white" />
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'BackToTop',
})

/** 回到頂部按鈕顯示狀態 */
const showBackToTop = ref(false)

/** 追蹤之前的滾動百分比，用於判斷滾動方向 */
const previousScrollPercentage = ref(0)

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/** 檢查是否顯示回到頂部按鈕 */
function checkScrollPosition() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight

  // 計算滾動百分比
  const maxScroll = documentHeight - windowHeight
  if (maxScroll <= 0) {
    showBackToTop.value = false
    previousScrollPercentage.value = 0
    return
  }

  const scrollPercentage = (scrollTop / maxScroll) * 100

  // 判斷滾動方向：往下滾動（增加）或往回滾動（減少）
  const isScrollingDown = scrollPercentage > previousScrollPercentage.value

  // 往下滾動：當滾動超過 33% 時顯示
  if (isScrollingDown && scrollPercentage > 33) {
    showBackToTop.value = true
  }
  // 往回滾動：當滾動小於 20% 時隱藏
  else if (!isScrollingDown && scrollPercentage < 20) {
    showBackToTop.value = false
  }

  // 更新之前的滾動百分比
  previousScrollPercentage.value = scrollPercentage
}

/** 滾動監聽器 */
let scrollListener = null

onMounted(() => {
  checkScrollPosition()
  scrollListener = () => checkScrollPosition()
  window.addEventListener('scroll', scrollListener, { passive: true })
  window.addEventListener('resize', scrollListener, { passive: true })
})

onUnmounted(() => {
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener)
    window.removeEventListener('resize', scrollListener)
  }
})
</script>

<style scoped>
/* 回到頂部按鈕箭頭動畫 */
@keyframes arrowBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.back-to-top-btn:hover .back-to-top-arrow {
  animation: arrowBounce 0.9s ease-in-out infinite !important;
  will-change: transform;
  transform-origin: center;
}
</style>

