<template>
  <main v-if="store && coupon" class="bg-white">
    <!-- 手機版 -->
    <div class="md:hidden">
      <div class="relative aspect-square overflow-hidden">
        <img :src="heroImage" :alt="coupon.name" class="w-full h-full object-cover" />
      </div>

      <!-- 手機底部有固定操作列：內容區需要預留底部空間避免被蓋住 -->
      <div class="px-4 py-6 pb-24">
        <div class="mb-6">
          <h1 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[22px] text-[#191919] mb-2">
            {{ coupon.name }}
          </h1>
          <p class="font-['Noto_Sans_TC:Regular',sans-serif] text-[14px] text-[#999999] pb-6 border-b border-[#e0e0e0]">
            {{ store.name }}
          </p>
        </div>

        <div class="mb-6">
          <h2 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[16px] text-[#191919] mb-3">使用說明</h2>
          <div class="space-y-4">
            <div>
              <h3 class="font-['Noto_Sans_TC:Medium',sans-serif] text-[14px] text-[#191919] mb-2">使用方式：</h3>
              <p class="text-[13px] text-[#4f4f4f] font-['Noto_Sans_TC:Regular',sans-serif]">
                {{ usageMethodText }}
              </p>
            </div>
            <div>
              <h3 class="font-['Noto_Sans_TC:Medium',sans-serif] text-[14px] text-[#191919] mb-2">注意事項：</h3>
              <ul class="space-y-2 text-[13px] text-[#4f4f4f] font-['Noto_Sans_TC:Regular',sans-serif] pl-5">
                <li v-for="(t, idx) in usageNotes" :key="`note-m-${idx}`" class="list-disc">
                  {{ t }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <h2 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[16px] text-[#191919] mb-3">核銷碼</h2>
          <input
            v-model.trim="redeemCode"
            type="text"
            placeholder="請輸入核銷碼"
            class="w-full px-4 py-3 border border-[#e0e0e0] rounded-[12px] font-['Noto_Sans_TC:Regular',sans-serif] text-[16px] text-[#191919] placeholder:text-[#999999] focus:outline-none focus:border-[#FF8A00] transition-colors mb-2"
          />
          <p class="font-['Noto_Sans_TC:Regular',sans-serif] text-[13px] text-[#999999]">請向店家服務人員索取核銷碼</p>
        </div>
      </div>

      <!-- 手機版：固定在底部的操作列（不隨內容滾動消失） -->
      <div
        class="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e0e0e0] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-[0px_-2px_8px_rgba(0,0,0,0.08)] z-40"
      >
        <button
          type="button"
          class="w-full bg-[#FF8A00] active:bg-[#e66a00] !text-white font-['Noto_Sans_TC:Bold',sans-serif] text-[16px] py-4 rounded-[12px] transition-colors shadow-md"
          @click="handleUse"
        >
          使用
        </button>
      </div>
    </div>

    <!-- 桌機版（套用你提供的版型） -->
    <div class="hidden md:block max-w-[1000px] mx-auto px-6 py-8">
      <div class="bg-white rounded-[24px] overflow-hidden shadow-lg">
        <div class="relative aspect-square overflow-hidden">
          <img :src="heroImage" :alt="coupon.name" class="w-full h-full object-cover" />
        </div>

        <div class="p-8">
          <div class="mb-8">
            <h1 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[32px] text-[#191919] mb-3">
              {{ coupon.name }}
            </h1>
            <p class="font-['Noto_Sans_TC:Regular',sans-serif] text-[16px] text-[#999999] pb-8 border-b border-[#e0e0e0]">
              {{ store.name }}
            </p>
          </div>

          <div class="mb-8">
            <h2 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[20px] text-[#191919] mb-4">使用說明</h2>
            <div class="space-y-6">
              <div>
                <h3 class="font-['Noto_Sans_TC:Medium',sans-serif] text-[16px] text-[#191919] mb-3">使用方式：</h3>
                <p class="text-[15px] text-[#4f4f4f] font-['Noto_Sans_TC:Regular',sans-serif]">
                  {{ usageMethodText }}
                </p>
              </div>
              <div>
                <h3 class="font-['Noto_Sans_TC:Medium',sans-serif] text-[16px] text-[#191919] mb-3">注意事項：</h3>
                <ul class="space-y-2 text-[15px] text-[#4f4f4f] font-['Noto_Sans_TC:Regular',sans-serif] pl-5">
                  <li v-for="(t, idx) in usageNotes" :key="`note-d-${idx}`" class="list-disc">
                    {{ t }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <h2 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[20px] text-[#191919] mb-4">核銷碼</h2>
            <input
              v-model.trim="redeemCode"
              type="text"
              placeholder="請輸入核銷碼"
              class="w-full px-4 py-3 border border-[#e0e0e0] rounded-[12px] font-['Noto_Sans_TC:Regular',sans-serif] text-[16px] text-[#191919] placeholder:text-[#999999] focus:outline-none focus:border-[#FF8A00] transition-colors mb-2"
            />
            <p class="font-['Noto_Sans_TC:Regular',sans-serif] text-[14px] text-[#999999]">請向店家服務人員索取核銷碼</p>
          </div>

          <button
            type="button"
            class="w-full bg-[#FF8A00] hover:bg-[#e66a00] text-white font-['Noto_Sans_TC:Bold',sans-serif] text-[18px] py-4 rounded-[12px] transition-colors shadow-md"
            @click="handleUse"
          >
            使用
          </button>
        </div>
      </div>
    </div>
  </main>

  <div v-else class="flex min-h-screen items-center justify-center bg-gray-50">
    <el-result icon="error" title="優惠券不存在" sub-title="請返回上一頁重新選擇">
      <template #extra>
        <el-button type="primary" @click="goBack">返回上一頁</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useStoresStore } from '@/stores/StoresStores'

defineOptions({
  name: 'CodeCupon',
})

const route = useRoute()
const router = useRouter()
const storesStore = useStoresStore()

const redeemCode = ref('')

const store = computed(() => storesStore.getStoreById(route.params.storeId))
const coupon = computed(() => storesStore.getCouponByStoreId(route.params.storeId, route.params.couponId))

const heroImage = computed(() => {
  const c = coupon.value
  if (!c) return ''
  // coupon 圖多數為小圖，這裡優先用券圖，其次用店家大圖做 hero
  return c.heroImage || c.image || store.value?.image || ''
})

const usageNotes = computed(() => {
  const notes = store.value?.usageNotes
  return Array.isArray(notes) && notes.length ? notes : ['依門市規範']
})

const usageMethodText = computed(() => {
  const cond = coupon.value?.condition ? String(coupon.value.condition) : ''
  if (!cond) return '出示此優惠券於結帳時，依門市規範使用。'
  // 讓顯示更自然：把「條件」包成一句話
  return `出示此優惠券於結帳時，可享${cond}。`
})

const handleUse = () => {
  if (!coupon.value) return
  if (!redeemCode.value) {
    ElMessage.warning('請先輸入核銷碼')
    return
  }
  // 假互動：目前沒有後端核銷 API，先給使用者明確回饋
  ElMessage.success(`已送出核銷：${coupon.value.name}`)
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  window.scrollTo({ top: 0, left: 0 })
})
</script>
