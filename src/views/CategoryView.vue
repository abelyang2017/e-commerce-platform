<template>
  <div class="min-h-screen bg-gray-50">
    <div class="w-10/12 mx-auto px-4 py-8">
      <!-- 分類標題 -->
      <h1 class="mb-6 text-3xl font-bold text-gray-900">
        {{ categoryName || '全部分類' }}
      </h1>

      <!-- 篩選器 -->
      <div class="mb-6 flex flex-wrap gap-4">
        <el-select
          v-model="selectedCategory"
          placeholder="選擇分類"
          clearable
          class="w-48"
          @change="handleCategoryChange"
        >
          <el-option
            v-for="cat in allCategories"
            :key="cat"
            :label="cat"
            :value="cat"
          />
        </el-select>

        <el-select v-model="sortBy" placeholder="排序方式" class="w-48">
          <el-option label="價格：低到高" value="price-asc" />
          <el-option label="價格：高到低" value="price-desc" />
          <el-option label="最新上架" value="newest" />
        </el-select>
      </div>

      <!-- 商品列表 -->
      <div v-if="displayProducts.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ProductCard
          v-for="product in displayProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <!-- 空狀態 -->
      <el-empty v-else description="暫無商品" />

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
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/ProductsStores'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()

const selectedCategory = ref(route.params.category || '')
const sortBy = ref('newest')
const currentPage = ref(1)
const pageSize = ref(12)

const { categories: allCategories } = storeToRefs(productsStore)

const categoryName = computed(() => {
  return selectedCategory.value || route.params.category || ''
})

// 監聽路由變化
watch(
  () => route.params.category,
  (newCategory) => {
    selectedCategory.value = newCategory || ''
    productsStore.selectedCategory = newCategory || ''
    currentPage.value = 1
  },
  { immediate: true }
)

onMounted(() => {
  if (route.params.category) {
    productsStore.selectedCategory = route.params.category
  }
})

const filteredProducts = computed(() => {
  let products = [...productsStore.filteredProducts]

  // 排序
  if (sortBy.value === 'price-asc') {
    products.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-desc') {
    products.sort((a, b) => b.price - a.price)
  }

  return products
})

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / pageSize.value)
})

const displayProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredProducts.value.slice(start, end)
})

const handleCategoryChange = () => {
  productsStore.selectedCategory = selectedCategory.value
  currentPage.value = 1
  if (selectedCategory.value) {
    router.push({ name: 'Category', params: { category: selectedCategory.value } })
  } else {
    router.push({ name: 'Category' })
  }
}

const handlePageChange = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

