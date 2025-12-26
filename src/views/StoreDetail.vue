<template>
  <main v-if="store" class="bg-white">
    <!-- Mobile -->
    <div class="md:hidden">
      <div class="relative aspect-[4/3] overflow-hidden">
        <img :src="store.image" :alt="store.name" class="w-full h-full object-cover" />
      </div>

      <div class="px-4 py-6 pb-28">
        <!-- Title -->
        <div class="mb-6">
          <h1 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[22px] text-[#191919] mb-2">
            {{ store.name }}
          </h1>
          <p class="font-['Noto_Sans_TC:Regular',sans-serif] text-[14px] text-[#666666] mb-3">
            {{ store.category }}
          </p>

          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-4 h-4 fill-[#f27400] text-[#f27400]"
                aria-hidden="true"
              >
                <path
                  d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
                ></path>
              </svg>
              <span class="font-['Noto_Sans_TC:Medium',sans-serif] text-[15px] text-[#191919]">
                {{ store.rating }}
              </span>
            </div>

            <div class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-4 h-4 text-[#666666]"
                aria-hidden="true"
              >
                <path
                  d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
                ></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span class="font-['Noto_Sans_TC:Regular',sans-serif] text-[14px] text-[#666666]">
                {{ store.distance }}km
              </span>
            </div>
          </div>
        </div>

        <!-- Info rows -->
        <div class="mb-6">
          <div class="space-y-3">
            <div v-if="store.hours" class="flex justify-between items-start">
              <span class="font-['Noto_Sans_TC:Regular',sans-serif] text-[13px] text-[#666666] w-20 shrink-0">營業時間</span>
              <span class="font-['Noto_Sans_TC:Regular',sans-serif] text-[13px] text-[#191919] text-right flex-1">
                {{ store.hours }}
              </span>
            </div>
            <div v-if="store.phone" class="flex justify-between items-start">
              <span class="font-['Noto_Sans_TC:Regular',sans-serif] text-[13px] text-[#666666] w-20 shrink-0">電話</span>
              <span class="font-['Noto_Sans_TC:Regular',sans-serif] text-[13px] text-[#191919] text-right flex-1">
                {{ store.phone }}
              </span>
            </div>
            <div v-if="store.address" class="flex justify-between items-start">
              <span class="font-['Noto_Sans_TC:Regular',sans-serif] text-[13px] text-[#666666] w-20 shrink-0">地址</span>
              <span class="font-['Noto_Sans_TC:Regular',sans-serif] text-[13px] text-[#191919] text-right flex-1">
                {{ store.address }}
              </span>
            </div>
          </div>
        </div>

        <!-- Coupons carousel -->
        <div v-if="store.coupons && store.coupons.length" class="mb-6">
          <div class="-mx-4">
            <Swiper
              class="ep-swiper ep-swiper--mobile px-4"
              :modules="swiperModules"
              :slides-per-view="'auto'"
              :space-between="12"
              :pagination="{ clickable: true }"
            >
              <SwiperSlide v-for="c in store.coupons" :key="`c-${c.id}`" style="width: 320px;">
                <div class="bg-white rounded-[12px] border border-[#e0e0e0] p-3 flex gap-3">
                  <div class="flex-shrink-0">
                    <img :src="c.image" :alt="c.name" class="w-24 h-24 rounded-[8px] object-cover" />
                  </div>
                  <div class="flex-1 flex flex-col min-w-0">
                    <h3 class="font-['Noto_Sans_TC:Medium',sans-serif] text-[14px] text-[#191919] mb-1 line-clamp-2">
                      {{ c.name }}
                    </h3>
                    <p class="font-['Noto_Sans_TC:Regular',sans-serif] text-[11px] text-[#666666] mb-0.5 line-clamp-1">
                      {{ c.condition }}
                    </p>
                    <p class="font-['Noto_Sans_TC:Regular',sans-serif] text-[10px] text-[#999999] mb-2">
                      使用期間{{ c.period }}
                    </p>
                    <button
                      type="button"
                      class="flex-1 w-full bg-[#fff3e6] md:hover:bg-[#FFD4A3] text-[#FF8A00] font-['Noto_Sans_TC:Medium',sans-serif] text-[13px] rounded-[8px] border border-[#FFD4A3] transition-colors"
                      @click="goToCoupon(c)"
                    >
                      使用
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <div class="mb-6 pb-6 border-b border-[#e0e0e0]"></div>

        <!-- Description -->
        <div v-if="store.description" class="mb-6">
          <h2 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[16px] text-[#191919] mb-3">店家介紹</h2>
          <div class="space-y-4">
            <p class="text-[13px] text-[#4f4f4f] font-['Noto_Sans_TC:Regular',sans-serif] leading-relaxed">
              {{ store.description }}
            </p>
          </div>
        </div>

        <!-- Usage notes -->
        <div v-if="store.usageNotes && store.usageNotes.length" class="mb-6">
          <h3 class="font-['Noto_Sans_TC:Medium',sans-serif] text-[14px] text-[#191919] mb-3">優惠使用說明</h3>
          <ul class="space-y-2 text-[13px] text-[#4f4f4f] font-['Noto_Sans_TC:Regular',sans-serif] pl-5">
            <li v-for="(note, idx) in store.usageNotes" :key="`m-usage-${idx}`" class="list-disc">
              {{ note }}
            </li>
          </ul>
        </div>

        <!-- eTickets -->
        <div v-if="store.eTickets && store.eTickets.length" class="mb-6">
          <div class="mb-3">
            <h2 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[16px] text-[#191919]">電子票券</h2>
          </div>

          <div class="-mx-4">
            <Swiper
              class="ep-swiper ep-swiper--mobile px-4"
              :modules="swiperModules"
              :slides-per-view="'auto'"
              :space-between="12"
              :pagination="{ clickable: true }"
            >
              <SwiperSlide v-for="t in store.eTickets" :key="`t-${t.id}`" style="width: 160px;">
                <div class="cursor-pointer group" @click="goToETicket(t)">
                  <div
                    class="bg-white rounded-[12px] overflow-hidden shadow-[0px_1px_3px_rgba(0,0,0,0.06)] transition-shadow border border-[#e0e0e0]"
                  >
                    <div class="aspect-square overflow-hidden relative">
                      <img :src="t.image" :alt="t.name" class="w-full h-full object-cover" />
                      <div
                        v-if="t.badge"
                        class="absolute top-2 right-2 bg-[#FF6B35] text-white px-2 py-1 rounded-[6px] font-['Noto_Sans_TC:Bold',sans-serif] text-[10px]"
                      >
                        {{ t.badge }}
                      </div>
                    </div>
                    <div class="p-3">
                      <h3
                        class="font-['Noto_Sans_TC:Medium',sans-serif] text-[13px] text-[#191919] mb-2 line-clamp-2 min-h-[36px]"
                      >
                        {{ store.name }}{{ t.name }}
                      </h3>
                      <div class="flex items-baseline gap-0.5">
                        <span class="font-['Noto_Sans_TC:Bold',sans-serif] text-[16px] text-[#FF8A00]">
                          {{ t.points }}
                        </span>
                        <span class="font-['Noto_Sans_TC:Regular',sans-serif] text-[12px] text-[#FF8A00]">積分</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop -->
    <div class="hidden md:block max-w-[1000px] mx-auto px-6 py-8">
      <div class="bg-white rounded-[24px] overflow-hidden shadow-lg">
        <div class="relative aspect-[21/9] overflow-hidden">
          <img :src="store.image" :alt="store.name" class="w-full h-full object-cover" />
        </div>

        <div class="p-10">
          <div class="mb-8">
            <h1 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[32px] text-[#191919] mb-3">
              {{ store.name }}
            </h1>
            <p class="font-['Noto_Sans_TC:Regular',sans-serif] text-[16px] text-[#666666] mb-4">
              {{ store.category }}
            </p>

            <div class="flex items-center gap-6">
              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-5 h-5 fill-[#f27400] text-[#f27400]"
                  aria-hidden="true"
                >
                  <path
                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
                  ></path>
                </svg>
                <span class="font-['Noto_Sans_TC:Medium',sans-serif] text-[18px] text-[#191919]">
                  {{ store.rating }}
                </span>
              </div>

              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-5 h-5 text-[#666666]"
                  aria-hidden="true"
                >
                  <path
                    d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
                  ></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span class="font-['Noto_Sans_TC:Regular',sans-serif] text-[16px] text-[#666666]">
                  {{ store.distance }}km
                </span>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <div class="space-y-4">
              <div v-if="store.hours" class="flex justify-between items-start">
                <span class="font-['Noto_Sans_TC:Regular',sans-serif] text-[15px] text-[#666666] w-24 shrink-0">營業時間</span>
                <span class="font-['Noto_Sans_TC:Regular',sans-serif] text-[15px] text-[#191919] text-right flex-1">
                  {{ store.hours }}
                </span>
              </div>
              <div v-if="store.phone" class="flex justify-between items-start">
                <span class="font-['Noto_Sans_TC:Regular',sans-serif] text-[15px] text-[#666666] w-24 shrink-0">電話</span>
                <span class="font-['Noto_Sans_TC:Regular',sans-serif] text-[15px] text-[#191919] text-right flex-1">
                  {{ store.phone }}
                </span>
              </div>
              <div v-if="store.address" class="flex justify-between items-start">
                <span class="font-['Noto_Sans_TC:Regular',sans-serif] text-[15px] text-[#666666] w-24 shrink-0">地址</span>
                <span class="font-['Noto_Sans_TC:Regular',sans-serif] text-[15px] text-[#191919] text-right flex-1">
                  {{ store.address }}
                </span>
              </div>
            </div>
          </div>

          <div v-if="store.coupons && store.coupons.length" class="mb-8">
            <Swiper
              class="ep-swiper ep-swiper--desktop"
              :modules="swiperModules"
              :slides-per-view="'auto'"
              :space-between="16"
              :pagination="{ clickable: true }"
            >
              <SwiperSlide v-for="c in store.coupons" :key="`dc-${c.id}`" style="width: 380px;">
                <div
                  class="bg-white rounded-[16px] border border-[#e0e0e0] p-4 md:hover:border-[#FF8A00] transition-colors flex gap-4"
                >
                  <div class="flex-shrink-0">
                    <img :src="c.image" :alt="c.name" class="w-28 h-28 rounded-[12px] object-cover" />
                  </div>
                  <div class="flex-1 flex flex-col min-w-0">
                    <h3 class="font-['Noto_Sans_TC:Medium',sans-serif] text-[16px] text-[#191919] mb-1.5 line-clamp-2">
                      {{ c.name }}
                    </h3>
                    <p class="font-['Noto_Sans_TC:Regular',sans-serif] text-[13px] text-[#666666] mb-1 line-clamp-1">
                      {{ c.condition }}
                    </p>
                    <p class="font-['Noto_Sans_TC:Regular',sans-serif] text-[12px] text-[#999999] mb-3">
                      使用期間{{ c.period }}
                    </p>
                    <button
                      type="button"
                      class="flex-1 w-full bg-[#fff3e6] md:hover:bg-[#FFD4A3] text-[#FF8A00] font-['Noto_Sans_TC:Medium',sans-serif] text-[14px] rounded-[10px] border border-[#FFD4A3] transition-colors"
                      @click="goToCoupon(c)"
                    >
                      使用
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div v-if="store.description" class="mb-8">
            <h2 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[20px] text-[#191919] mb-4">店家介紹</h2>
            <div class="space-y-4">
              <p class="text-[15px] text-[#4f4f4f] font-['Noto_Sans_TC:Regular',sans-serif] leading-relaxed">
                {{ store.description }}
              </p>
            </div>
          </div>

          <!-- Usage notes (desktop) -->
          <div v-if="store.usageNotes && store.usageNotes.length" class="mb-8">
            <h3 class="font-['Noto_Sans_TC:Medium',sans-serif] text-[16px] text-[#191919] mb-4">優惠使用說明</h3>
            <ul class="space-y-2 text-[15px] text-[#4f4f4f] font-['Noto_Sans_TC:Regular',sans-serif] pl-5">
              <li v-for="(note, idx) in store.usageNotes" :key="`usage-${idx}`" class="list-disc">
                {{ note }}
              </li>
            </ul>
          </div>

          <div v-if="store.eTickets && store.eTickets.length" class="mb-8">
            <div class="mb-4">
              <h2 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[20px] text-[#191919]">電子票券</h2>
            </div>

            <Swiper
              class="ep-swiper ep-swiper--desktop"
              :modules="swiperModules"
              :slides-per-view="'auto'"
              :space-between="16"
              :pagination="{ clickable: true }"
            >
              <SwiperSlide v-for="t in store.eTickets" :key="`dt-${t.id}`" style="width: 200px;">
                <div class="cursor-pointer group" @click="goToETicket(t)">
                  <div
                    class="bg-white rounded-[16px] overflow-hidden shadow-[0px_1px_3px_rgba(0,0,0,0.06)] md:group-hover:shadow-[0px_2px_8px_rgba(0,0,0,0.08)] transition-shadow border border-[#e0e0e0]"
                  >
                    <div class="aspect-square overflow-hidden relative">
                      <img :src="t.image" :alt="t.name" class="w-full h-full object-cover" />
                      <div
                        v-if="t.badge"
                        class="absolute top-3 right-3 bg-[#FF6B35] text-white px-3 py-1.5 rounded-[8px] font-['Noto_Sans_TC:Bold',sans-serif] text-[12px]"
                      >
                        {{ t.badge }}
                      </div>
                    </div>
                    <div class="p-4">
                      <h3
                        class="font-['Noto_Sans_TC:Medium',sans-serif] text-[15px] text-[#191919] mb-3 line-clamp-2 min-h-[42px]"
                      >
                        {{ store.name }}{{ t.name }}
                      </h3>
                      <div class="flex items-baseline gap-1">
                        <span class="font-['Noto_Sans_TC:Bold',sans-serif] text-[20px] text-[#FF8A00]">
                          {{ t.points }}
                        </span>
                        <span class="font-['Noto_Sans_TC:Regular',sans-serif] text-[14px] text-[#FF8A00]">積分</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- 店家不存在 -->
  <div v-else class="flex min-h-screen items-center justify-center">
    <el-result icon="error" title="店家不存在" sub-title="請返回首頁繼續瀏覽">
      <template #extra>
        <el-button type="primary" @click="goHome">返回首頁</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStoresStore } from '@/stores/StoresStores'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

const route = useRoute()
const router = useRouter()
const storesStore = useStoresStore()

const store = computed(() => {
  return storesStore.getStoreById(route.params.id)
})

const goHome = () => {
  router.push({ name: 'Home' })
}

const goToETicket = (ticket) => {
  router.push({
    name: 'ETicket',
    params: { storeId: route.params.id, ticketId: ticket?.id },
  })
}

const goToCoupon = (coupon) => {
  router.push({
    name: 'CodeCupon',
    params: { storeId: route.params.id, couponId: coupon?.id },
  })
}

const swiperModules = [Pagination]

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
/* Swiper pagination：用 CSS 做出你原本的「灰色圓點 / 橘色長條 active」 */
:deep(.ep-swiper .swiper-pagination) {
  position: static;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100% !important;
  gap: 6px;
  margin-top: 12px;
}

/* 避免 Swiper 內建樣式影響置中 */
:deep(.ep-swiper .swiper-pagination-bullets) {
  width: 100% !important;
  left: 0 !important;
}

:deep(.ep-swiper .swiper-pagination-bullet) {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: #e0e0e0;
  opacity: 1;
  transition: width 0.3s ease, background-color 0.3s ease;
}

:deep(.ep-swiper .swiper-pagination-bullet-active) {
  width: 24px;
  background: #ff8a00;
}

@media (min-width: 768px) {
  :deep(.ep-swiper--desktop .swiper-pagination) {
    gap: 8px;
    margin-top: 16px;
  }

  :deep(.ep-swiper--desktop .swiper-pagination-bullet) {
    width: 8px;
    height: 8px;
  }

  :deep(.ep-swiper--desktop .swiper-pagination-bullet-active) {
    width: 32px;
  }
}
</style>

