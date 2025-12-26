<template>
  <div v-if="product" class="min-h-screen bg-gray-50">
    <div class="w-10/12 mx-auto px-4 py-8">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <!-- 商品圖片 -->
        <div class="rounded-lg bg-white p-4 shadow-sm">
          <img :src="product.image" :alt="product.name" class="w-full rounded-lg" />
        </div>

        <!-- 商品資訊 -->
        <div class="flex flex-col">
          <div class="mb-4 text-sm text-gray-500">{{ product.brand }}</div>
          <h1 class="mb-4 text-3xl font-bold text-gray-900">{{ product.name }}</h1>
          <p class="mb-6 text-gray-600">{{ product.description }}</p>

          <!-- 價格 -->
          <div class="mb-6 flex items-center gap-4">
            <span class="text-4xl font-bold text-[#ff6b35]">NT$ {{ product.price }}</span>
            <span v-if="product.originalPrice > product.price" class="text-xl text-gray-400 line-through">
              NT$ {{ product.originalPrice }}
            </span>
            <span
              v-if="product.discount > 0"
              class="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600"
            >
              省 NT$ {{ product.originalPrice - product.price }}
            </span>
          </div>

          <!-- 數量選擇 -->
          <div class="mb-6 flex items-center gap-4">
            <span class="text-gray-700">數量：</span>
            <el-input-number v-model="quantity" :min="1" :max="10" />
          </div>

          <!-- 操作按鈕 -->
          <div class="flex gap-4">
            <el-button
              type="primary"
              size="large"
              class="flex-1 !bg-[#ff6b35] hover:!bg-[#ff8c00]"
              @click="handleAddToCart"
            >
              <el-icon class="mr-2"><ShoppingCart /></el-icon>
              加入購物車
            </el-button>
            <el-button size="large" @click="goBack">返回</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex min-h-screen items-center justify-center">
    <el-result icon="error" title="商品不存在" sub-title="請返回首頁繼續瀏覽">
      <template #extra>
        <el-button type="primary" @click="goHome">返回首頁</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/ProductsStores'
import { useCartStore } from '@/stores/CartStores'
import { ShoppingCart } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const quantity = ref(1)

const product = computed(() => {
  return productsStore.getProductById(route.params.id)
})

const handleAddToCart = () => {
  for (let i = 0; i < quantity.value; i++) {
    cartStore.addToCart(product.value)
  }
  ElMessage.success(`已加入 ${quantity.value} 件商品到購物車`)
}

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push({ name: 'Home' })
}
</script>

