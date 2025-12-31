<template>
  <!-- 輪播 Banner -->
  <div class="w-full mx-auto px-4 md:px-6 py-4 md:py-8">
    <!-- 用寬高比控制高度，避免寫死 h-120，讓長寬都能響應式縮放 -->
    <!-- GPT-banner.png 為偏「海報」比例，若用過寬的 aspect 會上下裁切太多造成跑版 -->
    <div class="relative w-full overflow-hidden rounded-3xl shadow-lg aspect-[3/2] sm:aspect-[16/10] lg:aspect-[16/9]">
      <img
        src="../assets/imges/GPT-banner.png"
        alt="Banner"
        class="absolute inset-0 w-full h-full object-cover object-[center_60%]"
      >
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'HomeBanner',
})
</script>

