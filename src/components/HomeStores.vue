<template>
  <!-- 特約店家 -->
  <div class="w-10/12 mx-auto px-4 py-8">
    <h2 class="mb-6 text-2xl font-bold text-gray-900">特約店家</h2>

    <div class="px-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="store in paginatedStores"
        :key="store.id"
        class="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
        @click="handleStoreClick(store)"
      >
        <div class="relative h-48 overflow-hidden">
          <img
            :src="store.image"
            :alt="store.name"
            class="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>

        <div class="p-4">
          <div class="mb-1 text-sm font-medium text-gray-900">{{ store.name }}</div>
          <div class="mb-2 text-xs text-gray-500">{{ store.category }}</div>

          <div class="mb-3 flex items-center justify-between gap-4 text-xs text-gray-600">
            <span class="flex items-center gap-1">
              <span class="text-[#f57c0b]">★</span>
              {{ store.rating }}
            </span>

            <span class="flex items-center gap-1">
              <span class="inline-flex items-center leading-none text-gray-600" aria-hidden="true">
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
            class="inline-block rounded-full border border-[#FFD4A3] bg-[#fff3e6] px-3 py-1 text-xs font-medium text-[#FF8A00]"
          >
            {{ store.coupon }}
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
