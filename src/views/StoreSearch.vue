<template>
  <main class="w-full mx-auto px-4 md:px-6 py-6 md:py-8">
    <div class="mb-6 md:mb-8">
      <h1 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[20px] md:text-[28px] text-[#191919]">
        {{ pageTitle }}
      </h1>
      <p class="font-['Noto_Sans_TC:Regular',sans-serif] text-[13px] md:text-[15px] text-[#666666] mt-2">
        共 {{ totalCount }} 家特約店家
      </p>
    </div>

    <div>
      <div
        v-if="pagedStores.length > 0"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
      >
        <div
          v-for="s in pagedStores"
          :key="`store-${s.id}`"
          class="bg-white rounded-[12px] md:rounded-[16px] overflow-hidden shadow-[0px_1px_3px_rgba(0,0,0,0.06)] md:hover:shadow-[0px_2px_8px_rgba(0,0,0,0.08)] transition-shadow cursor-pointer group"
          @click="goToStore(s.id)"
        >
          <div class="aspect-[3/2] overflow-hidden">
            <img
              :src="s.image"
              :alt="s.name"
              class="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div class="p-3 md:p-4">
            <h3 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[14px] md:text-[16px] text-[#191919] mb-1 truncate">
              {{ s.name }}
            </h3>
            <p class="font-['Noto_Sans_TC:Regular',sans-serif] text-[11px] md:text-[12px] text-[#4f4f4f] mb-2 truncate">
              {{ s.category }}
            </p>

            <div class="flex items-center justify-between text-[11px] md:text-[12px] mb-2">
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
                  class="w-2.5 h-2.5 md:w-3 md:h-3 fill-[#f27400] text-[#f27400]"
                  aria-hidden="true"
                >
                  <path
                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
                  ></path>
                </svg>
                <span class="text-[#191919]">{{ s.rating }}</span>
              </div>

              <div class="flex items-center gap-1 text-[#4f4f4f]">
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
                  class="w-2.5 h-2.5 md:w-3 md:h-3"
                  aria-hidden="true"
                >
                  <path
                    d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
                  ></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{{ s.distance }}km</span>
              </div>
            </div>

            <div class="flex items-center gap-1">
              <span
                class="px-2 md:px-3 py-1 bg-[#fff3e6] text-[#f27400] rounded-full text-[10px] md:text-[12px] font-['Noto_Sans_TC:Medium',sans-serif] truncate"
              >
                {{ s.coupon }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <el-empty v-else description="找不到相關店家" />

      <!-- 分頁（沿用 PageSelecet.vue，並在此頁隱藏「跳至」） -->
      <div class="mt-8 md:mt-12">
        <PageSelecet v-model:currentPage="currentPage" :total-pages="totalPages" :show-jumper="false" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { useStoresStore } from '@/stores/StoresStores'
import PageSelecet from '@/components/PageSelecet.vue'

const route = useRoute()
const router = useRouter()
const storesStore = useStoresStore()

const pageTitle = computed(() => String(route.query.title || '搜尋結果'))
const totalCount = computed(() => storesStore.filteredStores.length)

// 一頁 12 筆
const pageSize = 12
const currentPage = ref(1)

const totalPages = computed(() => {
  const total = storesStore.filteredStores.length
  return Math.max(1, Math.ceil(total / pageSize))
})

const pagedStores = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return storesStore.filteredStores.slice(start, start + pageSize)
})

onMounted(() => {
  storesStore.searchKeyword = String(route.query.keyword || '').trim()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// 離開「搜尋結果頁」時清空搜尋字，避免帶到下一個頁面（例如店家詳情）
onBeforeRouteLeave(() => {
  storesStore.searchKeyword = ''
})

watch(
  () => route.query.keyword,
  (kw) => {
    storesStore.searchKeyword = String(kw || '').trim()
    currentPage.value = 1
  }
)

const goToStore = (id) => {
  router.push({ name: 'Store', params: { id } })
}
</script>
