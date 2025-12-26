<template>
  <!-- 主題推薦 -->
  <div class="w-10/12 mx-auto px-4 py-8">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900">主題推薦</h2>
      <div class="flex gap-2">
        <span class="text-sm text-gray-600">{{ pageIndex }}/{{ totalPages }}</span>
      </div>
    </div>

    <Swiper
      class="home-themes-swiper"
      :modules="modules"
      :slides-per-view="1"
      :slides-per-group="1"
      :space-between="16"
      :navigation="false"
      :pagination="{ clickable: true }"
      :breakpoints="{
        768: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 24 },
      }"
      @slideChange="onSlideChange"
      @swiper="onSwiper"
    >
      <SwiperSlide v-for="theme in themes" :key="theme.id">
        <div class="theme-slide">
          <!-- 主題大卡 -->
          <div class="theme-hero" @click="handleThemeClick(theme)">
            <img
              :src="getThemeHeroSrc(theme)"
              :alt="theme.theme"
              class="theme-hero-img"
            />
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
      </SwiperSlide>

      <!-- 放在 container-end，確保不被裁 -->
      <template #container-end>
        <!-- Prev -->
        <button
          ref="prevEl"
          class="nav-btn nav-prev"
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
          ref="nextEl"
          class="nav-btn nav-next"
          :class="{ disabled: isEnd }"
          :disabled="isEnd"
          aria-label="Next"
          @click="goNext"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </template>
    </Swiper>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStoresStore } from '@/stores/StoresStores'
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

defineOptions({
  name: 'HomeThemes',
})

const router = useRouter()
const storesStore = useStoresStore()
const { themes } = storeToRefs(storesStore)
const pageIndex = ref(1)
const totalPages = ref(1)
const modules = [Navigation, Pagination]
const swiperRef = ref(null)
const prevEl = ref(null)
const nextEl = ref(null)

// 判斷是否在第一頁或最後一頁
const isBeginning = ref(true)
const isEnd = ref(false)

function updateNavState(swiper) {
  if (!swiper) return

  isBeginning.value = !!swiper.isBeginning
  isEnd.value = !!swiper.isEnd
}

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

const onSlideChange = (swiper) => {
  // 用 snapIndex / snapGrid 以「頁」為單位計算（桌機 2 張一頁時會是 1/3）
  const snapIndex = (swiper && typeof swiper.snapIndex === 'number' && swiper.snapIndex) || 0
  pageIndex.value = snapIndex + 1
  totalPages.value = swiper?.snapGrid?.length || 1
  updateNavState(swiper)
}

const onSwiper = (swiper) => {
  swiperRef.value = swiper
  pageIndex.value = (swiper?.snapIndex ?? 0) + 1
  totalPages.value = swiper?.snapGrid?.length || 1
  updateNavState(swiper)

  // 等自訂按鈕 refs 掛上後再初始化 navigation
  nextTick(() => {
    if (!swiperRef.value || !prevEl.value || !nextEl.value) return

    // 確保傳遞的是 DOM 元素，而不是 ref 對象
    const prevElement = prevEl.value instanceof HTMLElement ? prevEl.value : null
    const nextElement = nextEl.value instanceof HTMLElement ? nextEl.value : null

    if (!prevElement || !nextElement) return

    swiperRef.value.params.navigation.prevEl = prevElement
    swiperRef.value.params.navigation.nextEl = nextElement
    swiperRef.value.navigation.init()
    swiperRef.value.navigation.update()
    updateNavState(swiperRef.value)
  })
}

const goPrev = () => {
  if (swiperRef.value && !isBeginning.value) {
    swiperRef.value.slidePrev()
  }
}

const goNext = () => {
  if (swiperRef.value && !isEnd.value) {
    swiperRef.value.slideNext()
  }
}
</script>

<style scoped>
/* Swiper 外觀調整（指示器/箭頭） */
.home-themes-swiper {
  position: relative;
  padding: 0 1%;
}

.home-themes-swiper :deep(.swiper-pagination) {
  position: static;
  margin-top: 12px;
  display: flex;
  justify-content: center;
  gap: 6px;
}

.home-themes-swiper :deep(.swiper-pagination-bullet) {
  width: 6px;
  height: 6px;
  background: #d1d5db;
  opacity: 1;
  border-radius: 9999px;
  transition: all 150ms ease;
}

.home-themes-swiper :deep(.swiper-pagination-bullet-active) {
  width: 20px;
  background: #ff8a00;
}

/* 自訂左右按鈕（Feather 風格箭頭） */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
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
  width: 18px;
  height: 18px;
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

.home-themes-swiper :deep(.swiper-button-prev) {
  left: 6px;
}

.home-themes-swiper :deep(.swiper-button-next) {
  right: 6px;
}

.home-themes-swiper :deep(.swiper-button-prev:after),
.home-themes-swiper :deep(.swiper-button-next:after) {
  font-size: 14px;
  color: #111827;
  font-weight: 700;
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
  height: 40vh;
  cursor: pointer;
}

@media (min-width: 768px) {
  .theme-hero {
    min-height: 20vh;
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
  padding: 10px 10px 4px;
  font-size: 20px;
  font-weight: 800;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.theme-store-meta {
  padding: 0 10px 6px;
  font-size: 18px;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.theme-store-stats {
  padding: 0 10px 10px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 25px;
  gap: 10px;
  font-size: 18px;
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
</style>

