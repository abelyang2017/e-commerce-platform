<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 輪播 Banner -->
    <HomeBanner />

    <!-- 精選品牌 -->
    <HomeBrands />

    <!-- 熱門票券 -->
    <HomeTickets />

    <!-- 主題推薦 -->
    <HomeThemes />

    <!-- 特約店家 -->
    <HomeStores />
  </div>
</template>

<script setup>
import HomeBanner from '@/components/HomeBanner.vue'
import HomeBrands from '@/components/HomeBrands.vue'
import HomeTickets from '@/components/HomeTickets.vue'
import HomeThemes from '@/components/HomeThemes.vue'
import HomeStores from '@/components/HomeStores.vue'

defineOptions({
  name: 'HomePage',
})
</script>

