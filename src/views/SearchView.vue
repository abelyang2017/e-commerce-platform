<template>
  <div class="min-h-screen bg-gray-50">
    <div class="w-10/12 mx-auto px-4 py-8">
      <!-- 搜尋標題 -->
      <h1 class="mb-6 text-3xl font-bold text-gray-900">
        <span v-if="searchKeyword">搜尋結果：{{ searchKeyword }}</span>
        <span v-else>搜尋商品</span>
      </h1>

      <!-- 商品列表 -->
      <div v-if="displayProducts.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ProductCard
          v-for="product in displayProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <!-- 空狀態 -->
      <el-empty v-else description="找不到相關商品" />

      <!-- 分頁 -->
      <div v-if="totalPages > 1" class="mt-8 flex justify-center">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="filteredProducts.length"
          layout="prev, pager, next"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/ProductsStores'
import ProductCard from '@/components/ProductCard.vue'

defineOptions({
  name: 'SearchView',
})

const route = useRoute()
const productsStore = useProductsStore()

const currentPage = ref(1)
const pageSize = ref(12)

// 從路由 query 獲取關鍵字
const searchKeyword = computed(() => {
  return route.query.keyword || ''
})

// 監聽路由變化，更新搜尋關鍵字
watch(
  () => route.query.keyword,
  (newKeyword) => {
    productsStore.searchKeyword = newKeyword || ''
    currentPage.value = 1
  },
  { immediate: true }
)

// 篩選後的商品（根據搜尋關鍵字）
const filteredProducts = computed(() => {
  return productsStore.filteredProducts
})

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / pageSize.value)
})

const displayProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredProducts.value.slice(start, end)
})

const handlePageChange = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

