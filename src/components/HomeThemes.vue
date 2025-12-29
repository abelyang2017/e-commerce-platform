<template>
  <!-- 主題推薦 -->
  <div class="w-full mx-auto px-4 md:px-6 py-4 md:py-8">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900">主題推薦</h2>
      <div class="flex gap-2">
        <span class="text-sm text-gray-600">{{ pageIndex }}/{{ totalPages }}</span>
      </div>
    </div>

    <!-- 不依賴 Swiper：用 scroll-snap 做手機手指左右滑動（桌機每頁 2 張） -->
    <div class="relative">
      <div
        ref="scrollerEl"
        class="home-themes-scroller flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
        @scroll.passive="onScroll"
      >
        <div v-for="(page, pageIdx) in themePages" :key="`page-${pageIdx}`" class="min-w-full snap-start">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div v-for="theme in page" :key="theme.id" class="theme-slide">
              <!-- 主題大卡 -->
              <div class="theme-hero" @click="handleThemeClick(theme)">
                <img :src="getThemeHeroSrc(theme)" :alt="theme.theme" class="theme-hero-img" />
                <div class="theme-hero-overlay"></div>
                <div class="theme-hero-text">
                  <div class="theme-hero-title">{{ theme.theme }}</div>
                  <div class="theme-hero-sub">{{ theme.storeCount || 0 }}個店家</div>
                </div>
              </div>

              <!-- 主題底下店家小卡（取前三個） -->
              <div class="theme-store-grid">
                <div
                  v-for="store in (theme.stores || []).slice(0, 3)"
                  :key="store.id"
                  class="theme-store-card"
                  @click="handleStoreClick(store)"
                >
                  <div class="theme-store-thumb">
                    <img :src="store.image" :alt="store.name" class="theme-store-img" />
                  </div>
                  <div class="theme-store-name">{{ store.name }}</div>
                  <div class="theme-store-meta">{{ store.category }}</div>
                  <div class="theme-store-stats">
                    <span class="theme-store-stat">
                      <span class="theme-store-star">★</span>
                      {{ store.rating }}
                    </span>
                    <span class="theme-store-stat">
                      <span class="theme-store-pin inline-flex items-center leading-none" aria-hidden="true">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="h-[1em] w-[1em]"
                        >
                          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </span>
                      {{ store.distance }}km
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Prev -->
      <button
        class="nav-btn nav-prev hidden md:grid"
        :class="{ disabled: isBeginning }"
        :disabled="isBeginning"
        aria-label="Prev"
        @click="goPrev"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Next -->
      <button
        class="nav-btn nav-next hidden md:grid"
        :class="{ disabled: isEnd }"
        :disabled="isEnd"
        aria-label="Next"
        @click="goNext"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- 分頁點點（點一下可切頁） -->
    <div class="flex justify-center gap-2 mt-4" v-if="themePages.length > 1">
      <button
        v-for="(_, idx) in themePages"
        :key="`dot-${idx}`"
        type="button"
        class="h-2 rounded-full transition-all"
        :class="idx === pageIndex - 1 ? 'w-8 bg-[#f27400]' : 'w-2 bg-[#e0e0e0]'"
        @click="scrollToPage(idx)"
        aria-label="切換主題分頁"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStoresStore } from '@/stores/StoresStores'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

defineOptions({
  name: 'HomeThemes',
})

const router = useRouter()
const storesStore = useStoresStore()
const { themes } = storeToRefs(storesStore)
const scrollerEl = ref(null)
const pageIndex = ref(1) // 1-based（顯示用）
const isBeginning = ref(true)
const isEnd = ref(false)
const isDesktop = ref(false)

const themePages = computed(() => {
  const list = Array.isArray(themes.value) ? themes.value : []
  const perPage = isDesktop.value ? 2 : 1
  const pages = []
  for (let i = 0; i < list.length; i += perPage) pages.push(list.slice(i, i + perPage))
  return pages
})

const totalPages = computed(() => Math.max(1, themePages.value.length))

function getThemeHeroSrc(theme) {
  const heroSrc = theme?.image || theme?.stores?.[0]?.image || ''
  return heroSrc
}

const handleStoreClick = (store) => {
  router.push({ name: 'Store', params: { id: store.id } })
}

const handleThemeClick = (theme) => {
  // 目前先不做主題頁，保留擴充點（不導向避免破壞既有路由）
  console.log('theme click:', theme?.theme)
}

let rafId = 0
const updateViewport = () => {
  isDesktop.value = typeof window !== 'undefined' && window.innerWidth >= 768
}

const updateNavStateByIndex = (idx) => {
  const lastIdx = Math.max(0, themePages.value.length - 1)
  isBeginning.value = idx <= 0
  isEnd.value = idx >= lastIdx
}

const onScroll = () => {
  if (!scrollerEl.value) return
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    const el = scrollerEl.value
    const pageWidth = el.clientWidth || 1
    const idx = Math.round(el.scrollLeft / pageWidth)
    const maxIdx = Math.max(0, themePages.value.length - 1)
    const safeIdx = Math.max(0, Math.min(idx, maxIdx))
    pageIndex.value = safeIdx + 1
    updateNavStateByIndex(safeIdx)
  })
}

const scrollToPage = async (idx) => {
  await nextTick()
  const el = scrollerEl.value
  if (!el) return
  const pageWidth = el.clientWidth || 0
  const maxIdx = Math.max(0, themePages.value.length - 1)
  const safeIdx = Math.max(0, Math.min(idx, maxIdx))
  el.scrollTo({ left: safeIdx * pageWidth, behavior: 'smooth' })
}

const goPrev = () => {
  if (isBeginning.value) return
  scrollToPage((pageIndex.value || 1) - 2)
}

const goNext = () => {
  if (isEnd.value) return
  scrollToPage((pageIndex.value || 1))
}

const syncAfterLayoutChange = async () => {
  await nextTick()
  const idx = Math.max(0, Math.min((pageIndex.value || 1) - 1, themePages.value.length - 1))
  pageIndex.value = idx + 1
  updateNavStateByIndex(idx)
  // 重新對齊到整頁（避免 resize 後卡在半頁）
  await scrollToPage(idx)
}

onMounted(() => {
  updateViewport()
  onScroll()
  window.addEventListener('resize', updateViewport, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewport)
  window.removeEventListener('resize', onScroll)
  cancelAnimationFrame(rafId)
})

watch(
  () => themePages.value.length,
  () => {
    syncAfterLayoutChange()
  },
  { immediate: true }
)

watch(isDesktop, () => {
  syncAfterLayoutChange()
})
</script>

<style scoped>
/* scroll-snap 容器（取代 Swiper） */
.home-themes-scroller {
  position: relative;
  padding: 0 1%;
}

/* 自訂左右按鈕（Feather 風格箭頭） */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: clamp(32px, 4vw, 44px);
  height: clamp(32px, 4vw, 44px);
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  display: grid;
  place-items: center;
  z-index: 10;
  color: #111827;
  transition: background 150ms ease, color 150ms ease, opacity 150ms ease;
}

.nav-btn:hover {
  color: #ff8a00;
}

.nav-btn svg {
  width: clamp(16px, 2.2vw, 20px);
  height: clamp(16px, 2.2vw, 20px);
}

.nav-prev {
  left: 6px;
}

.nav-next {
  right: 6px;
}

.nav-btn.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.theme-slide {
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: box-shadow 50ms ease;
  overflow: hidden;
  border-radius: 20px;
  justify-content: center;
  margin: 0 auto;
}
.theme-slide:hover {
  box-shadow: 0  0 10px rgba(0, 0, 0, 0.1);
}
.theme-hero {
  position: relative;
  overflow: hidden;
  border-radius: 16px 16px 0 0;
  width: 100%;
  /* 用寬高比控制高度，避免固定 vh 導致不同裝置過高/過矮 */
  aspect-ratio: 16 / 9;
  height: auto;
  min-height: 180px;
  max-height: 420px;
  cursor: pointer;
}

@media (min-width: 768px) {
  .theme-hero {
    aspect-ratio: 16 / 8;
    min-height: 220px;
    max-height: 460px;
  }
}

.theme-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
}

.theme-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0));
}

.theme-hero-text {
  position: absolute;
  left: 16px;
  bottom: 14px;
  color: #fff;
}

.theme-hero-title {
  font-size: 32px;
  font-weight: 700;
}

.theme-hero-sub {
  margin-top: 4px;
  font-size: 18px;
  opacity: 0.9;
}

.theme-store-grid {
  width: 100%;
  padding: 0 10px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.theme-store-card {
  cursor: pointer;
  /* border-radius: 12px; */
  overflow: hidden;
  /* background: #fff; */

}

/* .theme-store-card:hover {

} */

.theme-store-thumb {
  width: 90%;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  background: #f3f4f6;
  border-radius: 16px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
}

.theme-store-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 200ms ease;
  transform: scale(1);
}

.theme-store-card:hover .theme-store-img {
  transform: scale(1.06);
}

.theme-store-name {
  padding: clamp(8px, 1.2vw, 10px) clamp(8px, 1.2vw, 10px) clamp(3px, 0.6vw, 4px);
  font-size: clamp(14px, 1.4vw, 20px);
  line-height: 1.2;
  font-weight: 800;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.theme-store-meta {
  padding: 0 clamp(8px, 1.2vw, 10px) clamp(5px, 0.8vw, 6px);
  font-size: clamp(12px, 1.2vw, 18px);
  line-height: 1.2;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.theme-store-stats {
  padding: 0 clamp(8px, 1.2vw, 10px) clamp(8px, 1.2vw, 10px);
  display: flex;
  justify-content: space-between;
  padding-bottom: 25px;
  gap: 10px;
  font-size: clamp(12px, 1.2vw, 18px);
  line-height: 1.2;
  color: #4b5563;
}

.theme-store-stat {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.theme-store-star {
  color: #f57c0b;
}

/* 隱藏橫向捲軸（與 HomeTickets 同步） */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
</style>

