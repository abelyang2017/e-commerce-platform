<template>
  <!-- 熱門票券（依照設計稿：桌機雙欄 / 手機橫滑分頁） -->
  <section class="max-w-[1400px] mx-auto px-4 md:px-6 py-4 md:py-8">
    <h2
      class="font-['Noto_Sans_TC:Bold',sans-serif] text-[20px] md:text-[28px] text-[#191919] mb-4 md:mb-6"
    >
      熱門票券
    </h2>

    <!-- 桌機：2 欄列表 -->
    <div class="hidden md:grid md:grid-cols-2 gap-3 md:gap-4">
      <div
        v-for="ticket in tickets"
        :key="ticket.id"
        class="relative bg-white rounded-[16px] md:rounded-[20px] overflow-hidden shadow-[0px_1px_3px_rgba(0,0,0,0.06)] md:hover:shadow-[0px_2px_8px_rgba(0,0,0,0.08)] transition-shadow cursor-pointer group"
        role="button"
        tabindex="0"
        @click="goCuponTicket(ticket)"
        @keydown.enter.prevent="goCuponTicket(ticket)"
        @keydown.space.prevent="goCuponTicket(ticket)"
      >
        <div class="flex items-stretch">
          <div
            class="flex-1 flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-[#fffbf5] to-white border-r border-dashed border-[#d4a574]"
          >
            <div
              class="w-16 h-16 md:w-20 md:h-20 rounded-[8px] md:rounded-[12px] overflow-hidden shrink-0 border border-[#e0e0e0]"
            >
              <img :src="ticket.image" :alt="ticket.storeName" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1 min-w-0">
              <h3
                class="font-['Noto_Sans_TC:Bold',sans-serif] text-[15px] md:text-[17px] text-[#191919] mb-1.5 md:mb-2 truncate"
              >
                {{ ticket.storeName }}
              </h3>
              <p class="font-['Noto_Sans_TC:Regular',sans-serif] text-[12px] md:text-[13px] text-[#4f4f4f] truncate">
                {{ ticket.ticketName }}
              </p>
            </div>
          </div>

          <div
            class="w-[100px] md:w-[120px] bg-[#FED330] flex flex-col items-center justify-center gap-2 md:gap-3 p-3 md:p-4 relative"
          >
            <div class="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-white rounded-r-full -translate-x-1.5"></div>
            <div class="text-center">
              <div
                class="font-['Noto_Sans_TC:Bold',sans-serif] text-[20px] md:text-[26px] text-[#191919] leading-none whitespace-nowrap"
              >
                {{ ticket.points }}積分
              </div>
            </div>
            <button
              class="px-3 md:px-4 py-1.5 md:py-2 bg-white md:hover:bg-[#f7f6f5] text-[#191919] rounded-full font-['Noto_Sans_TC:Bold',sans-serif] text-[11px] md:text-[12px] transition-colors shadow-md w-full"
              type="button"
              @click.stop="goCuponTicket(ticket)"
            >
              兌換
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 手機：橫向滑動（每頁 2 張） -->
    <div class="md:hidden">
      <div
        ref="mobileScrollerEl"
        class="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        @scroll.passive="onMobileScroll"
      >
        <div v-for="(page, pageIdx) in mobilePages" :key="`page-${pageIdx}`" class="min-w-full flex gap-3 snap-start">
          <div
            v-for="ticket in page"
            :key="ticket.id"
            class="flex-1 relative cursor-pointer"
            role="button"
            tabindex="0"
            @click="goCuponTicket(ticket)"
            @keydown.enter.prevent="goCuponTicket(ticket)"
            @keydown.space.prevent="goCuponTicket(ticket)"
          >
            <div class="flex flex-col gap-2">
              <div class="relative aspect-[4/3] bg-white rounded-[16px] overflow-hidden shadow-[0px_1px_3px_rgba(0,0,0,0.06)]">
                <img :src="ticket.image" :alt="ticket.storeName" class="w-full h-full object-cover" />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3"
                >
                  <div class="w-full">
                    <h3 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[15px] text-white mb-1 truncate">
                      {{ ticket.storeName }}
                    </h3>
                    <p class="font-['Noto_Sans_TC:Regular',sans-serif] text-[12px] text-white/90 truncate">
                      {{ ticket.ticketName }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="relative bg-[#FED330] rounded-[16px] overflow-hidden shadow-[0px_1px_3px_rgba(0,0,0,0.06)]">
                <div class="flex items-center justify-between px-4 py-3 relative">
                  <div
                    class="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-white rounded-r-full -translate-x-1.5"
                  ></div>
                  <div
                    class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-white rounded-l-full translate-x-1.5"
                  ></div>
                  <div class="flex items-center justify-between w-full gap-3">
                    <div
                      class="font-['Noto_Sans_TC:Bold',sans-serif] text-[22px] text-[#191919] leading-none whitespace-nowrap"
                    >
                      {{ ticket.points }}積分
                    </div>
                    <button
                      class="px-4 py-1.5 bg-white md:hover:bg-[#f7f6f5] text-[#191919] rounded-full font-['Noto_Sans_TC:Bold',sans-serif] text-[11px] transition-colors shadow-md"
                      type="button"
                      @click.stop="goCuponTicket(ticket)"
                    >
                      兌換
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center gap-2 mt-4" v-if="mobilePages.length > 1">
        <button
          v-for="(_, idx) in mobilePages"
          :key="`dot-${idx}`"
          type="button"
          class="h-2 rounded-full transition-all"
          :class="idx === mobilePageIndex ? 'w-8 bg-[#f27400]' : 'w-2 bg-[#e0e0e0]'"
          @click="scrollToMobilePage(idx)"
          aria-label="切換票券分頁"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useStoresStore } from '@/stores/StoresStores'
import { storeToRefs } from 'pinia'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'HomeTickets',
})

const storesStore = useStoresStore()
const { tickets } = storeToRefs(storesStore)

const router = useRouter()

const goCuponTicket = (ticket) => {
  router.push({ name: 'HomeTicketCupon', params: { id: ticket.id } })
}

const mobileScrollerEl = ref(null)
const mobilePageIndex = ref(0)

const mobilePages = computed(() => {
  const list = Array.isArray(tickets.value) ? tickets.value : []
  const perPage = 2
  const pages = []
  for (let i = 0; i < list.length; i += perPage) pages.push(list.slice(i, i + perPage))
  return pages
})

let rafId = 0
const onMobileScroll = () => {
  if (!mobileScrollerEl.value) return
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(() => {
    const el = mobileScrollerEl.value
    const pageWidth = el.clientWidth || 1
    const idx = Math.round(el.scrollLeft / pageWidth)
    mobilePageIndex.value = Math.max(0, Math.min(idx, mobilePages.value.length - 1))
  })
}

const scrollToMobilePage = async (idx) => {
  await nextTick()
  const el = mobileScrollerEl.value
  if (!el) return
  const pageWidth = el.clientWidth || 0
  el.scrollTo({ left: idx * pageWidth, behavior: 'smooth' })
}

onMounted(() => {
  onMobileScroll()
  window.addEventListener('resize', onMobileScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onMobileScroll)
  cancelAnimationFrame(rafId)
})
</script>

<style scoped>
/* 隱藏手機橫向捲軸（等同常見的 scrollbar-hide 插件） */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
</style>

