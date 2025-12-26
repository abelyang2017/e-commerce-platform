<template>
  <div
    class="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
  >
    <!-- 商品圖片 -->
    <div class="relative aspect-square w-full overflow-hidden bg-gray-100">
      <img
        :src="product.image"
        :alt="product.name"
        class="h-full w-full object-cover cursor-pointer"
        @click="handleProductClick"
        @error="handleImageError"
      />
      <!-- 折扣標籤 -->
      <div
        v-if="product.discount > 0"
        class="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white"
      >
        -{{ product.discount }}%
      </div>
    </div>

    <!-- 商品資訊 -->
    <div class="flex flex-1 flex-col p-4">
      <div class="mb-2 text-xs text-gray-500">{{ product.brand }}</div>
      <h3 class="mb-2 line-clamp-2 text-sm font-medium text-gray-900">{{ product.name }}</h3>
      <p class="mb-3 line-clamp-2 text-xs text-gray-600">{{ product.description }}</p>

      <!-- 價格 -->
      <div class="mt-auto flex items-center gap-2">
        <span class="text-lg font-bold text-[#ff6b35]">NT$ {{ product.price }}</span>
        <span v-if="product.originalPrice > product.price" class="text-xs text-gray-400 line-through">
          NT$ {{ product.originalPrice }}
        </span>
      </div>

      <!-- 加入購物車按鈕 -->
      <el-button
        type="primary"
        class="mt-3 w-full !bg-[#ff6b35] hover:!bg-[#ff8c00]"
        @click="handleAddToCart"
      >
        <el-icon class="mr-1"><ShoppingCart /></el-icon>
        加入購物車
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ShoppingCart } from '@element-plus/icons-vue'
import { useCartStore } from '@/stores/CartStores'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const cartStore = useCartStore()
const router = useRouter()

const handleAddToCart = () => {
  cartStore.addToCart(props.product)
  ElMessage.success('已加入購物車')
}

const handleProductClick = () => {
  router.push({ name: 'Product', params: { id: props.product.id } })
}

const handleImageError = (event) => {
  // 如果圖片載入失敗，使用預設的灰色背景
  event.target.style.display = 'none'
}
</script>

