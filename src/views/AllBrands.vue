<template>
  <main class="max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-8">
    <div class="mb-6 md:mb-8">
      <h1 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[20px] md:text-[28px] text-[#191919]">
        全部品牌
      </h1>
    </div>

    <div class="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 pb-8">
      <button
        v-for="brand in pagedBrands"
        :key="`brand-${brand.id}`"
        type="button"
        class="flex flex-col items-center gap-2 md:gap-3 group"
        @click="goToBrandStores(brand)"
      >
        <div
          class="w-full aspect-square rounded-full overflow-hidden bg-[#f5f5f5] border border-[#e0e0e0] md:group-hover:border-[#FF8A00] transition-all shadow-sm md:group-hover:shadow-md"
        >
          <img
            :src="brand.logo"
            :alt="brand.name"
            class="w-full h-full object-cover"
            @error="onImgError"
          />
        </div>
        <span
          class="font-['Noto_Sans_TC:Medium',sans-serif] text-[12px] md:text-[13px] text-[#191919] text-center md:group-hover:text-[#FF8A00] transition-colors line-clamp-2"
        >
          {{ brand.name }}
        </span>
      </button>
    </div>

    <PageSelecet v-if="totalPages > 1" v-model:currentPage="currentPage" :total-pages="totalPages" />
  </main>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStoresStore } from '@/stores/StoresStores'
import { storeToRefs } from 'pinia'
import PageSelecet from '@/components/PageSelecet.vue'

defineOptions({ name: 'AllBrands' })

const router = useRouter()
const storesStore = useStoresStore()
const { brands } = storeToRefs(storesStore)

const PAGE_SIZE = 24
const currentPage = ref(1)

watch(
  () => brands.value?.length,
  () => {
    // 品牌數變動時，避免停留在不存在的頁碼
    if (currentPage.value > totalPages.value) currentPage.value = 1
  }
)

const totalPages = computed(() => {
  const total = Array.isArray(brands.value) ? brands.value.length : 0
  return Math.max(1, Math.ceil(total / PAGE_SIZE))
})

const pagedBrands = computed(() => {
  const list = Array.isArray(brands.value) ? brands.value : []
  const start = (currentPage.value - 1) * PAGE_SIZE
  return list.slice(start, start + PAGE_SIZE)
})

function onImgError(e) {
  // 品牌圖示載入失敗時，使用 ElementPlus 預設佔位圖
  e.target.src = 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
}

function goToBrandStores(brand) {
  const keyword = String(brand?.name || '').trim()
  router.push({
    name: 'StoreSearch',
    query: {
      keyword,
      title: keyword ? `${keyword}｜特約店家` : '搜尋結果',
    },
  })
}
</script>


