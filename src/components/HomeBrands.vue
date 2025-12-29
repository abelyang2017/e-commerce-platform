<template>
  <!-- 精選品牌 -->
  <section class="w-full  mx-auto px-4 md:px-6 py-4 md:py-8">
    <div class="flex items-center justify-between mb-4 md:mb-6">
      <h2
        class="font-['Noto_Sans_TC:Bold',sans-serif] text-[20px] md:text-[28px] text-[#191919]"
      >
        精選品牌
      </h2>
      <button
        type="button"
        class="text-[#FF8A00] md:hover:text-[#e66a00] font-['Noto_Sans_TC:Medium',sans-serif] text-[11px] md:text-[12px] transition-colors flex items-center gap-1"
        @click="goAllBrands"
      >
        看全部
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
          class="w-3 h-3 md:w-3.5 md:h-3.5"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </div>
    <div class="grid grid-cols-5 md:grid-cols-10 gap-3 md:gap-4">
      <div
        v-for="brand in displayBrands"
        :key="brand.id"
        class="flex flex-col items-center cursor-pointer group"
        role="button"
        tabindex="0"
        @click="goBrand(brand)"
        @keydown.enter.prevent="goBrand(brand)"
        @keydown.space.prevent="goBrand(brand)"
      >
        <div
          class="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden mb-1.5 md:mb-2 shadow-[0px_2px_4px_rgba(0,0,0,0.06)] md:group-hover:shadow-[0px_3px_6px_rgba(0,0,0,0.08)] transition-shadow"
        >
          <img
            :src="brand?.logo || fallbackLogo"
            :alt="brand?.name || ''"
            class="w-full h-full object-cover"
            loading="lazy"
            @error="onLogoError"
          />
        </div>
        <p
          class="text-center text-[11px] md:text-[12px] text-[#191919] md:group-hover:text-[#FF8A00] transition-colors"
        >
          {{ brand.name }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useStoresStore } from '@/stores/StoresStores'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
defineOptions({
  name: 'HomeBrands',
})

const router = useRouter()
const storesStore = useStoresStore()
const { brands } = storeToRefs(storesStore)

// logo 失敗時的預設圖（避免破圖影響排版）
const fallbackLogo = 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'

// 首頁只顯示第一列（10 個）
const displayBrands = computed(() => (Array.isArray(brands.value) ? brands.value.slice(0, 10) : []))

function onLogoError(e) {
  const img = e?.target
  if (!img) return
  if (img.src !== fallbackLogo) img.src = fallbackLogo
}

function goAllBrands() {
  router.push({ name: 'AllBrands' })
}

function goBrand(brand) {
  const name = String(brand?.name || '').trim()
  if (!name) return
  router.push({
    name: 'StoreSearch',
    query: {
      keyword: name,
      title: name,
    },
  })
}
</script>
