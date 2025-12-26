<template>
  <el-badge :value="cartStore.totalCount" :hidden="cartStore.totalCount === 0" class="cursor-pointer">
    <el-button
      circle
      class="!border-0 !bg-transparent hover:!bg-gray-100"
      @click="goToCart"
    >
      <el-icon class="text-xl text-gray-700">
        <ShoppingCart />
      </el-icon>
    </el-button>
  </el-badge>
</template>

<script setup>
import { ShoppingCart } from '@element-plus/icons-vue'
import { useCartStore } from '@/stores/CartStores'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const goToCart = () => {
  router.push({ name: 'Cart' })
}
</script>

