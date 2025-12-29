<template>
  <!-- 輪播 Banner -->
  <div class="w-full mx-auto px-4 md:px-6 py-4 md:py-8">
    <!-- 用寬高比控制高度，避免寫死 h-120，讓長寬都能響應式縮放 -->
    <div class="relative w-full overflow-hidden rounded-3xl shadow-lg aspect-[16/7] sm:aspect-[16/6] lg:aspect-[16/5]">
      <img
        src="../assets/imges/PayEasy.png"
        alt="Banner"
        class="absolute inset-0 w-full h-full object-cover"
      >
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'HomeBanner',
})
</script>

