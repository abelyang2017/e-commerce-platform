<template>
  <main v-if="store && ticket" class="min-h-screen bg-gray-50">
    <div class="max-w-[1000px] mx-auto px-4 md:px-6 py-6 md:py-8">
      <div class="bg-white rounded-[24px] overflow-hidden shadow-lg">
        <div class="relative aspect-[16/9] overflow-hidden">
          <img :src="ticket.image" :alt="ticketTitle" class="w-full h-full object-cover" />
        </div>

        <!-- 手機底部有固定操作列：內容區需要預留底部空間避免被蓋住 -->
        <div class="p-6 md:p-8 pb-24 md:pb-8">
          <div class="mb-8">
            <h1 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[24px] md:text-[32px] text-[#191919] mb-4">
              {{ ticketTitle }}
            </h1>

            <div class="space-y-3 pb-8 border-b border-[#e0e0e0]">
              <div class="flex justify-between items-center gap-4">
                <span class="text-[#666666] text-[14px] md:text-[15px] font-['Noto_Sans_TC:Regular',sans-serif]">扣除積分</span>
                <span class="text-[#FF8A00] text-[22px] md:text-[28px] font-['Noto_Sans_TC:Bold',sans-serif] text-right">
                  {{ ticket.points }} 積分/份
                </span>
              </div>

              <div class="flex justify-between items-center gap-4">
                <span class="text-[#666666] text-[14px] md:text-[15px] font-['Noto_Sans_TC:Regular',sans-serif]">可使用期間</span>
                <span class="text-[#191919] text-[14px] md:text-[15px] font-['Noto_Sans_TC:Regular',sans-serif] text-right">
                  {{ displayPeriod }}
                </span>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <h2 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[18px] md:text-[20px] text-[#191919] mb-4">使用說明</h2>
            <div class="space-y-6">
              <div v-if="usageSteps.length">
                <h3 class="font-['Noto_Sans_TC:Medium',sans-serif] text-[15px] md:text-[16px] text-[#191919] mb-3">使用步驟：</h3>
                <ol class="space-y-2 text-[14px] md:text-[15px] text-[#4f4f4f] font-['Noto_Sans_TC:Regular',sans-serif] pl-5">
                  <li v-for="(s, idx) in usageSteps" :key="`step-${idx}`" class="list-decimal">
                    {{ s }}
                  </li>
                </ol>
              </div>

              <div v-if="usageTerms.length">
                <h3 class="font-['Noto_Sans_TC:Medium',sans-serif] text-[15px] md:text-[16px] text-[#191919] mb-3">使用條款：</h3>
                <ul class="space-y-2 text-[14px] md:text-[15px] text-[#4f4f4f] font-['Noto_Sans_TC:Regular',sans-serif] pl-5">
                  <li v-for="(t, idx) in usageTerms" :key="`term-${idx}`" class="list-disc">
                    {{ t }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 桌機/平板：維持原本按鈕在內容流內 -->
          <div class="hidden md:block">
            <button
              type="button"
              class="w-full bg-[#FF8A00] md:hover:bg-[#e66a00] text-white font-['Noto_Sans_TC:Bold',sans-serif] text-[16px] md:text-[18px] py-4 rounded-[12px] transition-colors shadow-md"
            >
              立即兌換
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 手機版：固定在底部的操作列（不隨內容滾動消失） -->
    <div
      class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#e0e0e0] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-[0px_-2px_8px_rgba(0,0,0,0.08)] z-40"
    >
      <button
        type="button"
        class="w-full bg-[#FF8A00] !text-white font-['Noto_Sans_TC:Bold',sans-serif] text-[16px] py-4 rounded-[12px] transition-colors shadow-md"
      >
        立即兌換
      </button>
    </div>
  </main>

  <div v-else class="flex min-h-screen items-center justify-center bg-gray-50">
    <el-result icon="error" title="票券不存在" sub-title="請返回店家頁面重新選擇">
      <template #extra>
        <el-button type="primary" @click="goBack">返回上一頁</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStoresStore } from '@/stores/StoresStores'

const route = useRoute()
const router = useRouter()
const storesStore = useStoresStore()

const store = computed(() => storesStore.getStoreById(route.params.storeId))

const ticket = computed(() => {
  const list = store.value?.eTickets || []
  return list.find((t) => t.id === Number(route.params.ticketId))
})

const ticketTitle = computed(() => {
  if (!store.value || !ticket.value) return ''
  // 與 StoreDetail 的顯示一致：店名 + 票券名稱（不加空格）
  return `${store.value.name}${ticket.value.name}`
})

const displayPeriod = computed(() => {
  // 盡量從店家的優惠券期間推導（避免新增假資料）
  const raw = store.value?.coupons?.[0]?.period || ''
  if (!raw) return '依門市規範'

  // 常見格式：'至 2024.12.31' / '至 2026.12.31'
  const cleaned = String(raw).replace(/\s+/g, '').replace(/^至/, '')
  const ymd = cleaned.replace(/\./g, '/')
  return `即日起至${ymd}`
})

const usageSteps = computed(() => {
  // 以 store.usageNotes 前 4 條作為「步驟」（避免新增假資料）
  const notes = store.value?.usageNotes || []
  return notes.slice(0, 4)
})

const usageTerms = computed(() => {
  // 剩餘的作為「條款」
  const notes = store.value?.usageNotes || []
  return notes.slice(4)
})

const goBack = () => {
  router.back()
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>


