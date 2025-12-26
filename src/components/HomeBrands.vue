<template>
  <!-- 精選品牌 -->
  <div class="w-10/12 mx-auto px-4 py-8">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-2xl font-medium text-gray-900">精選品牌</h2>
      <el-button class="see-all-btn" type="primary" text @click="goAllBrands">
        看全部
        <el-icon class="see-all-icon"><ArrowRight /></el-icon>
      </el-button>
    </div>
    <div class="grid grid-cols-5 gap-4 md:grid-cols-10">
      <div
        v-for="brand in displayBrands"
        :key="brand.id"
        class="group flex cursor-pointer flex-col items-center transition-all"
        role="button"
        tabindex="0"
        @click="goBrand(brand)"
        @keydown.enter.prevent="goBrand(brand)"
      >
        <el-avatar :size="100" :src="brand.logo" @error="errorHandler">
          <img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            :alt="brand.name"
          />
        </el-avatar>
        <span
          class="mt-2 text-xs text-gray-700 transition-colors group-hover:text-[#ff6b35]"
        >
          {{ brand.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStoresStore } from '@/stores/StoresStores'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
defineOptions({
  name: 'HomeBrands',
})

const router = useRouter()
const storesStore = useStoresStore()
const { brands } = storeToRefs(storesStore)

// 首頁只顯示第一列（10 個）
const displayBrands = computed(() => (Array.isArray(brands.value) ? brands.value.slice(0, 10) : []))

const errorHandler = () => true

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

<style scoped>
.see-all-btn {
  color: #ff6b35 !important;
  font-weight: 300;
  padding: 0 !important;
}

.see-all-btn:hover {
  color: #ff8c00 !important;
}

.see-all-icon {
  margin-left: 4px;
  font-size: 14px;
}
</style>

