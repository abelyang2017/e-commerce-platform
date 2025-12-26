<template>
  <main v-if="ticket" class="bg-white">
    <!-- 手機版 -->
    <div class="md:hidden">
      <div class="relative aspect-[4/3] overflow-hidden">
        <img :src="ticket.image" :alt="ticket.ticketName" class="w-full h-full object-cover" />
      </div>

      <div class="px-4 py-6 pb-28">
        <div class="mb-6">
          <h1 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[22px] text-[#191919] mb-4">
            {{ ticket.ticketName }}
          </h1>

          <div class="space-y-2 pb-6 border-b border-[#e0e0e0]">
            <div class="flex justify-between items-center">
              <span class="text-[#666666] text-[13px] font-['Noto_Sans_TC:Regular',sans-serif]">扣除積分</span>
              <span class="text-[#FF8A00] text-[20px] font-['Noto_Sans_TC:Bold',sans-serif]">
                {{ ticket.points }} 積分/份
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[#666666] text-[13px] font-['Noto_Sans_TC:Regular',sans-serif]">可使用期間</span>
              <span class="text-[#191919] text-[13px] font-['Noto_Sans_TC:Regular',sans-serif]">
                {{ displayPeriod }}
              </span>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <h2 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[16px] text-[#191919] mb-3">使用說明</h2>
          <div class="space-y-4">
            <div>
              <h3 class="font-['Noto_Sans_TC:Medium',sans-serif] text-[14px] text-[#191919] mb-2">使用步驟：</h3>
              <ol class="space-y-2 text-[13px] text-[#4f4f4f] font-['Noto_Sans_TC:Regular',sans-serif] pl-5">
                <li v-for="(s, idx) in usageSteps" :key="`step-m-${idx}`" class="list-decimal">
                  {{ s }}
                </li>
              </ol>
            </div>
            <div>
              <h3 class="font-['Noto_Sans_TC:Medium',sans-serif] text-[14px] text-[#191919] mb-2">使用條款：</h3>
              <ul class="space-y-2 text-[13px] text-[#4f4f4f] font-['Noto_Sans_TC:Regular',sans-serif] pl-5">
                <li v-for="(t, idx) in usageTerms" :key="`term-m-${idx}`" class="list-disc">
                  {{ t }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        class="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e0e0e0] p-4 shadow-[0px_-2px_8px_rgba(0,0,0,0.08)] z-40"
      >
        <button
          type="button"
          class="w-full bg-[#FF8A00] text-white font-['Noto_Sans_TC:Bold',sans-serif] text-[16px] py-4 rounded-[12px] transition-colors shadow-md"
          @click="handleRedeem"
        >
          立即兌換
        </button>
      </div>
    </div>

    <!-- 桌機版 -->
    <div class="hidden md:block max-w-[1000px] mx-auto px-6 py-8">
      <div class="bg-white rounded-[24px] overflow-hidden shadow-lg">
        <div class="relative aspect-[16/9] overflow-hidden">
          <img :src="ticket.image" :alt="ticket.ticketName" class="w-full h-full object-cover" />
        </div>

        <div class="p-8">
          <div class="mb-8">
            <h1 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[32px] text-[#191919] mb-4">
              {{ ticket.ticketName }}
            </h1>
            <div class="space-y-3 pb-8 border-b border-[#e0e0e0]">
              <div class="flex justify-between items-center">
                <span class="text-[#666666] text-[15px] font-['Noto_Sans_TC:Regular',sans-serif]">扣除積分</span>
                <span class="text-[#FF8A00] text-[28px] font-['Noto_Sans_TC:Bold',sans-serif]">
                  {{ ticket.points }} 積分/份
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-[#666666] text-[15px] font-['Noto_Sans_TC:Regular',sans-serif]">可使用期間</span>
                <span class="text-[#191919] text-[15px] font-['Noto_Sans_TC:Regular',sans-serif]">
                  {{ displayPeriod }}
                </span>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <h2 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[20px] text-[#191919] mb-4">使用說明</h2>
            <div class="space-y-6">
              <div>
                <h3 class="font-['Noto_Sans_TC:Medium',sans-serif] text-[16px] text-[#191919] mb-3">使用步驟：</h3>
                <ol class="space-y-2 text-[15px] text-[#4f4f4f] font-['Noto_Sans_TC:Regular',sans-serif] pl-5">
                  <li v-for="(s, idx) in usageSteps" :key="`step-d-${idx}`" class="list-decimal">
                    {{ s }}
                  </li>
                </ol>
              </div>
              <div>
                <h3 class="font-['Noto_Sans_TC:Medium',sans-serif] text-[16px] text-[#191919] mb-3">使用條款：</h3>
                <ul class="space-y-2 text-[15px] text-[#4f4f4f] font-['Noto_Sans_TC:Regular',sans-serif] pl-5">
                  <li v-for="(t, idx) in usageTerms" :key="`term-d-${idx}`" class="list-disc">
                    {{ t }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="w-full bg-[#FF8A00] md:hover:bg-[#e66a00] text-white font-['Noto_Sans_TC:Bold',sans-serif] text-[18px] py-4 rounded-[12px] transition-colors shadow-md"
            @click="handleRedeem"
          >
            立即兌換
          </button>
        </div>
      </div>
    </div>
  </main>

  <div v-else class="flex min-h-screen items-center justify-center bg-gray-50">
    <el-result icon="error" title="票券不存在" sub-title="請返回首頁重新選擇">
      <template #extra>
        <el-button type="primary" @click="goBack">返回上一頁</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useStoresStore } from '@/stores/StoresStores'

defineOptions({
  name: 'CuponTicket',
})

const route = useRoute()
const router = useRouter()
const storesStore = useStoresStore()

const ticket = computed(() => storesStore.getPopularTicketById(route.params.id))

const displayPeriod = computed(() => {
  const raw = ticket.value?.period
  return raw ? String(raw) : '依門市規範'
})

const usageSteps = computed(() => {
  const list = ticket.value?.usageSteps
  return Array.isArray(list) && list.length ? list : ['依門市規範']
})

const usageTerms = computed(() => {
  const list = ticket.value?.usageTerms
  return Array.isArray(list) && list.length ? list : ['依門市規範']
})

const handleRedeem = () => {
  if (!ticket.value) return
  ElMessage.success(`已選擇兌換：${ticket.value.ticketName}`)
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  window.scrollTo({ top: 0, left: 0 })
})
</script>
