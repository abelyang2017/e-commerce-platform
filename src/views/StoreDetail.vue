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
          <div>
            <!-- 不依賴 Swiper：用 scroll-snap 做手機手指左右滑動（連續卡片列） -->
            <div
              ref="couponMobileScrollerEl"
              class="overflow-x-auto -mx-4 px-4 snap-x snap-mandatory scrollbar-hide scroll-smooth scroll-px-4"
              @scroll.passive="onCouponMobileScroll"
            >
              <div class="flex gap-2 w-max">
                <div
                  v-for="c in coupons"
                  :key="`c-${c.id}`"
                  class="w-[320px] max-w-full flex-shrink-0 snap-start bg-white rounded-[12px] border border-[#e0e0e0] p-3 flex gap-3"
                >
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
              </div>
            </div>
          </div>

          <div class="flex justify-center gap-1.5 mt-3" v-if="coupons.length > 1">
            <button
              v-for="(_, idx) in coupons"
              :key="`coupon-m-dot-${idx}`"
              type="button"
              class="h-1.5 rounded-full transition-all"
              :class="idx === couponMobilePageIndex ? 'w-6 bg-[#FF8A00]' : 'w-1.5 bg-[#e0e0e0]'"
              @click="scrollToCouponMobilePage(idx)"
              aria-label="切換優惠券分頁"
            ></button>
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
            <!-- 不依賴 Swiper：用 scroll-snap 做手機手指左右滑動（每頁 2 張） -->
            <div
              ref="eTicketMobileScrollerEl"
              class="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide mx-5 scroll-smooth"
              @scroll.passive="onETicketMobileScroll"
            >
              <div
                v-for="(page, pageIdx) in eTicketMobilePages"
                :key="`eticket-m-page-${pageIdx}`"
                class="min-w-full flex gap-3 snap-start"
              >
                <div
                  v-for="t in page"
                  :key="`t-${t.id}`"
                  class="flex-[0_0_calc(50%-6px)] min-w-0 cursor-pointer group"
                  @click="goToETicket(t)"
                >
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

                <!-- 最後一頁如果只有 1 張，補一個透明佔位讓間距/對齊一致 -->
                <div
                  v-if="page.length === 1"
                  class="flex-[0_0_calc(50%-6px)] min-w-0 opacity-0 pointer-events-none"
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          </div>

          <div class="flex justify-center gap-2 mt-4" v-if="eTicketMobilePages.length > 1">
            <button
              v-for="(_, idx) in eTicketMobilePages"
              :key="`eticket-m-dot-${idx}`"
              type="button"
              class="h-2 rounded-full transition-all"
              :class="idx === eTicketMobilePageIndex ? 'w-8 bg-[#f27400]' : 'w-2 bg-[#e0e0e0]'"
              @click="scrollToETicketMobilePage(idx)"
              aria-label="切換電子票券分頁"
            ></button>
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
            <!-- 不依賴 Swiper：桌機用 scroll-snap（每頁 2 張） -->
            <div
              ref="couponDesktopScrollerEl"
              class="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
              @scroll.passive="onCouponDesktopScroll"
            >
              <div
                v-for="(page, pageIdx) in couponDesktopPages"
                :key="`coupon-d-page-${pageIdx}`"
                class="min-w-full snap-start flex gap-4"
              >
                <div
                  v-for="c in page"
                  :key="`dc-${c.id}`"
                  class="w-[380px] shrink-0 bg-white rounded-[16px] border border-[#e0e0e0] p-4 md:hover:border-[#FF8A00] transition-colors flex gap-4"
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
              </div>
            </div>

            <div class="flex justify-center gap-2 mt-4" v-if="couponDesktopPages.length > 1">
              <button
                v-for="(_, idx) in couponDesktopPages"
                :key="`coupon-d-dot-${idx}`"
                type="button"
                class="h-2 rounded-full transition-all"
                :class="idx === couponDesktopPageIndex ? 'w-8 bg-[#f27400]' : 'w-2 bg-[#e0e0e0]'"
                @click="scrollToCouponDesktopPage(idx)"
                aria-label="切換優惠券分頁"
              ></button>
            </div>
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

            <!-- 不依賴 Swiper：桌機用 scroll-snap（每頁 4 張） -->
            <div
              ref="eTicketDesktopScrollerEl"
              class="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
              @scroll.passive="onETicketDesktopScroll"
            >
              <div
                v-for="(page, pageIdx) in eTicketDesktopPages"
                :key="`eticket-d-page-${pageIdx}`"
                class="min-w-full snap-start flex gap-4"
              >
                <div
                  v-for="t in page"
                  :key="`dt-${t.id}`"
                  class="w-[200px] shrink-0 cursor-pointer group"
                  @click="goToETicket(t)"
                >
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

                <!-- 最後一頁不足 4 張時，補透明佔位讓間距/對齊一致 -->
                <div
                  v-for="n in Math.max(0, 4 - page.length)"
                  :key="`eticket-d-placeholder-${pageIdx}-${n}`"
                  class="w-[200px] shrink-0 opacity-0 pointer-events-none"
                  aria-hidden="true"
                ></div>
              </div>
            </div>

            <div class="flex justify-center gap-2 mt-4" v-if="eTicketDesktopPages.length > 1">
              <button
                v-for="(_, idx) in eTicketDesktopPages"
                :key="`eticket-d-dot-${idx}`"
                type="button"
                class="h-2 rounded-full transition-all"
                :class="idx === eTicketDesktopPageIndex ? 'w-8 bg-[#f27400]' : 'w-2 bg-[#e0e0e0]'"
                @click="scrollToETicketDesktopPage(idx)"
                aria-label="切換電子票券分頁"
              ></button>
            </div>
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
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStoresStore } from '@/stores/StoresStores'

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
    name: 'ScoreSystem',
    params: { storeId: route.params.id, ticketId: ticket?.id },
  })
}

const goToCoupon = (coupon) => {
  router.push({
    name: 'CodeCupon',
    params: { storeId: route.params.id, couponId: coupon?.id },
  })
}

// 優惠券：不依賴 Swiper，用 scroll-snap 做「整頁」左右滑動
function chunkList(list, perPage) {
  const safeList = Array.isArray(list) ? list : []
  const size = Math.max(1, Number(perPage) || 1)
  const pages = []
  for (let i = 0; i < safeList.length; i += size) pages.push(safeList.slice(i, i + size))
  return pages
}

const coupons = computed(() => {
  return Array.isArray(store.value?.coupons) ? store.value.coupons : []
})

const couponDesktopPages = computed(() => chunkList(coupons.value, 2))

const eTickets = computed(() => {
  return Array.isArray(store.value?.eTickets) ? store.value.eTickets : []
})

// 手機每頁 2 張，與 HomeTickets 體驗一致
const eTicketMobilePages = computed(() => chunkList(eTickets.value, 2))
// 桌機每頁 4 張（200px 卡片 + 16px 間距，1000px 容器可容納）
const eTicketDesktopPages = computed(() => chunkList(eTickets.value, 4))

function useSnapPager(pagesRef) {
  const scrollerEl = ref(null)
  const pageIndex = ref(0)
  let rafId = 0

  const onScroll = () => {
    if (!scrollerEl.value) return
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      const el = scrollerEl.value
      const pageWidth = el.clientWidth || 1
      const idx = Math.round(el.scrollLeft / pageWidth)
      const maxIdx = Math.max(0, pagesRef.value.length - 1)
      pageIndex.value = Math.max(0, Math.min(idx, maxIdx))
    })
  }

  const scrollToPage = async (idx) => {
    await nextTick()
    const el = scrollerEl.value
    if (!el) return
    const pageWidth = el.clientWidth || 0
    const maxIdx = Math.max(0, pagesRef.value.length - 1)
    const safeIdx = Math.max(0, Math.min(idx, maxIdx))
    el.scrollTo({ left: safeIdx * pageWidth, behavior: 'smooth' })
  }

  const onResize = () => {
    onScroll()
  }

  onMounted(() => {
    onScroll()
    window.addEventListener('resize', onResize, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
    cancelAnimationFrame(rafId)
  })

  watch(
    () => pagesRef.value.length,
    () => {
      onScroll()
    }
  )

  return { scrollerEl, pageIndex, onScroll, scrollToPage }
}

// 手機優惠券：連續卡片列（以卡片 offsetLeft 作為分頁基準）
function useSnapItemsPager(itemsCountRef) {
  const scrollerEl = ref(null)
  const pageIndex = ref(0)
  let rafId = 0

  const getItems = () => {
    const el = scrollerEl.value
    if (!el) return []
    const wrap = el.firstElementChild
    if (!wrap) return []
    return Array.from(wrap.children || [])
  }

  const onScroll = () => {
    if (!scrollerEl.value) return
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      const el = scrollerEl.value
      const items = getItems()
      if (!items.length) {
        pageIndex.value = 0
        return
      }
      const x = el.scrollLeft
      let bestIdx = 0
      let bestDist = Number.POSITIVE_INFINITY
      for (let i = 0; i < items.length; i++) {
        const itemLeft = items[i]?.offsetLeft ?? 0
        const dist = Math.abs(itemLeft - x)
        if (dist < bestDist) {
          bestDist = dist
          bestIdx = i
        }
      }
      const maxIdx = Math.max(0, (itemsCountRef.value || 0) - 1)
      pageIndex.value = Math.max(0, Math.min(bestIdx, maxIdx))
    })
  }

  const scrollToPage = async (idx) => {
    await nextTick()
    const el = scrollerEl.value
    if (!el) return
    const items = getItems()
    if (!items.length) return
    const maxIdx = Math.max(0, (itemsCountRef.value || 0) - 1)
    const safeIdx = Math.max(0, Math.min(idx, maxIdx))
    const left = items[safeIdx]?.offsetLeft ?? 0
    el.scrollTo({ left, behavior: 'smooth' })
  }

  const onResize = () => {
    onScroll()
  }

  onMounted(() => {
    onScroll()
    window.addEventListener('resize', onResize, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
    cancelAnimationFrame(rafId)
  })

  watch(
    () => itemsCountRef.value,
    () => {
      onScroll()
    }
  )

  return { scrollerEl, pageIndex, onScroll, scrollToPage }
}

const {
  scrollerEl: couponMobileScrollerEl,
  pageIndex: couponMobilePageIndex,
  onScroll: onCouponMobileScroll,
  scrollToPage: scrollToCouponMobilePage,
} = useSnapItemsPager(computed(() => coupons.value.length))

const {
  scrollerEl: couponDesktopScrollerEl,
  pageIndex: couponDesktopPageIndex,
  onScroll: onCouponDesktopScroll,
  scrollToPage: scrollToCouponDesktopPage,
} = useSnapPager(couponDesktopPages)

const {
  scrollerEl: eTicketMobileScrollerEl,
  pageIndex: eTicketMobilePageIndex,
  onScroll: onETicketMobileScroll,
  scrollToPage: scrollToETicketMobilePage,
} = useSnapPager(eTicketMobilePages)

const {
  scrollerEl: eTicketDesktopScrollerEl,
  pageIndex: eTicketDesktopPageIndex,
  onScroll: onETicketDesktopScroll,
  scrollToPage: scrollToETicketDesktopPage,
} = useSnapPager(eTicketDesktopPages)

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
/* 隱藏橫向捲軸（等同常見的 scrollbar-hide 插件） */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
</style>

