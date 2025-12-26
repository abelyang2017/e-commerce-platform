<template>
<div class="wrapper w-full mx-auto">
  <div class="sticky top-0 z-50 bg-white">
    <AppHead />
  </div>
  <SearchAndTag />

  <router-view />

  <AppFoot />

  <BackToTop />
</div>
</template>

<script setup>
import AppHead from './AppHead.vue'
import AppFoot from './AppFoot.vue'
import SearchAndTag from './SearchAndTag.vue'
import BackToTop from '@/layout/BackToTop.vue'
</script>
