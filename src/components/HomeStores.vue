<template>
  <!-- 特約店家 -->
  <div class="w-full mx-auto px-4 md:px-6 py-4 md:py-8">
    <h2 class="mb-6 text-2xl font-bold text-gray-900">特約店家</h2>

    <!-- 版型：手機兩欄、平板三欄、桌機四欄 -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 px-3 md:px-3">
      <div
        v-for="store in paginatedStores"
        :key="store.id"
        class="group cursor-pointer bg-white rounded-[12px] md:rounded-[16px] overflow-hidden shadow-[0px_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0px_2px_8px_rgba(0,0,0,0.08)] transition-shadow"
        @click="handleStoreClick(store)"
      >
        <!-- 用寬高比控制圖片區塊高度，避免固定 h-48，讓長寬都能響應式縮放 -->
        <div class="relative w-full overflow-hidden aspect-[3/2]">
          <img
            :src="store.image"
            :alt="store.name"
            class="absolute inset-0 w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div class="p-3 md:p-4">
          <h3 class="text-[14px] md:text-[16px] text-[#191919] mb-1 truncate font-bold">{{ store.name }}</h3>
          <p class="text-[11px] md:text-[12px] text-[#4f4f4f] mb-2 truncate">
            {{ store.category }}
          </p>

          <div class="flex items-center justify-between text-[11px] md:text-[12px] mb-2">
            <span class="flex items-center gap-1">
              <span class="text-[#f27400]">★</span>
              <span class="text-[#191919]">{{ store.rating }}</span>
            </span>

            <span class="flex items-center gap-1 text-[#4f4f4f]">
              <span class="inline-flex items-center leading-none" aria-hidden="true">
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

          <div
            class="flex items-center gap-1"
          >
            <span class="px-2 md:px-3 py-1 bg-[#fff3e6] text-[#f27400] rounded-full text-[10px] md:text-[12px] font-medium truncate">
              {{ store.coupon }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <PageSelecet v-model:currentPage="currentPage" :total-pages="totalPages" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStoresStore } from '@/stores/StoresStores'
import PageSelecet from '@/components/PageSelecet.vue'

defineOptions({ name: 'HomeStores' })

const router = useRouter()
const storesStore = useStoresStore()

/** 列表資料 */
const paginatedStores = computed(() => storesStore.paginatedStores)

/** 分頁狀態（沿用你 store 的 setPage） */
const currentPage = computed({
  get: () => storesStore.currentPage,
  set: (v) => storesStore.setPage(v),
})
const totalPages = computed(() => storesStore.totalPages)

/** 跳店家 */
const handleStoreClick = (store) => {
  router.push({ name: 'Store', params: { id: store.id } })
}
</script>
