<template>
  <div class="min-h-screen bg-gray-50">
    <div class="w-10/12 mx-auto px-4 py-8">
      <h1 class="mb-6 text-3xl font-bold text-gray-900">購物車</h1>

      <div v-if="cartStore.items.length > 0" class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- 購物車商品列表 -->
        <div class="lg:col-span-2">
          <div class="space-y-4">
            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="flex gap-4 rounded-lg bg-white p-4 shadow-sm"
            >
              <img :src="item.image" :alt="item.name" class="h-24 w-24 rounded object-cover" />
              <div class="flex flex-1 flex-col justify-between">
                <div>
                  <h3 class="font-medium text-gray-900">{{ item.name }}</h3>
                  <p class="text-sm text-gray-500">單價：NT$ {{ item.price }}</p>
                </div>
                <div class="flex items-center justify-between">
                  <el-input-number
                    v-model="item.quantity"
                    :min="1"
                    :max="10"
                    @change="(val) => cartStore.updateQuantity(item.id, val)"
                  />
                  <div class="text-lg font-bold text-[#ff6b35]">
                    NT$ {{ item.price * item.quantity }}
                  </div>
                </div>
              </div>
              <el-button
                type="danger"
                text
                @click="cartStore.removeFromCart(item.id)"
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
          </div>
        </div>

        <!-- 購物車摘要 -->
        <div class="lg:col-span-1">
          <div class="sticky top-4 rounded-lg bg-white p-6 shadow-sm">
            <h2 class="mb-4 text-xl font-bold text-gray-900">訂單摘要</h2>
            <div class="mb-4 space-y-2 border-b border-gray-200 pb-4">
              <div class="flex justify-between text-gray-600">
                <span>商品數量</span>
                <span>{{ cartStore.totalCount }} 件</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>小計</span>
                <span>NT$ {{ cartStore.totalAmount }}</span>
              </div>
            </div>
            <div class="mb-6 flex justify-between text-xl font-bold text-gray-900">
              <span>總計</span>
              <span class="text-[#ff6b35]">NT$ {{ cartStore.totalAmount }}</span>
            </div>
            <el-button
              type="primary"
              size="large"
              class="w-full !bg-[#ff6b35] hover:!bg-[#ff8c00]"
              @click="handleCheckout"
            >
              結帳
            </el-button>
            <el-button class="mt-2 w-full" @click="goShopping">繼續購物</el-button>
          </div>
        </div>
      </div>

      <!-- 空購物車 -->
      <el-empty v-else description="購物車是空的">
        <el-button type="primary" @click="goShopping">開始購物</el-button>
      </el-empty>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/CartStores'
import { Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const cartStore = useCartStore()

const handleCheckout = async () => {
  try {
    await ElMessageBox.confirm('確定要結帳嗎？', '確認結帳', {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'info',
    })
    ElMessage.success('結帳成功！（這是 demo 版本）')
    cartStore.clearCart()
    router.push({ name: 'Home' })
  } catch {
    // 用戶取消
  }
}

const goShopping = () => {
  router.push({ name: 'Category' })
}
</script>

