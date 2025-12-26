<!-- 搜尋區域 -->
 <template>
<div class="bg-white px-6 py-6">
  <div class="w-10/12 mx-auto mb-4">
    <div class="search-bar-wrapper">
      <div class="search-bar" :style="{ width: searchBarWidth }">
      <el-input
        v-model="searchKeyword"
        class="search-input"
        placeholder="請輸入品牌、店家"
        clearable
        @keyup.enter="handleSearch"
      >
        <template #prefix>
          <el-icon class="search-prefix-icon">
            <Search />
          </el-icon>
        </template>
      </el-input>

      <el-button class="search-btn" type="primary" @click="handleSearch">搜尋</el-button>
      </div>
    </div>
  </div>
  <div class=" mx-auto">
    <div
      ref="popularTagsContainer"
      class="flex flex-wrap items-center justify-center gap-2 mb-4 pb-4 border-b border-gray-200"
    >
    <span class="mr-2 text-sm text-gray-400">大家都在搜:</span>
    <el-tag
      v-for="tag in popularTags"
      :key="tag"
      class="cursor-pointer !bg-[#fff7e6] !border !border-[#ffa940] !text-[#ffa940] !rounded-full !px-3 !py-1 text-[13px] hover:!bg-[#fce6c7] hover:!border-[#ff6b35] hover:!text-[#ff6b35]"
      @click="handleTagClick(tag)"
    >
      {{ tag }}
    </el-tag>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { usePopularTagsStore } from '@/stores/PopularTagsStores'
import { useStoresStore } from '@/stores/StoresStores'

const router = useRouter()
const popularTagsStore = usePopularTagsStore()
const storesStore = useStoresStore()

const popularTagsContainer = ref(null)
const searchBarWidth = ref('auto')

const searchKeyword = computed({
  get: () => storesStore.searchKeyword,
  set: (val) => {
    storesStore.searchKeyword = val
  },
})

const { tags: popularTags } = storeToRefs(popularTagsStore)

// 更新搜尋欄寬度以匹配 popularTags 容器寬度
const updateSearchBarWidth = () => {
  if (popularTagsContainer.value) {
    const containerWidth = popularTagsContainer.value.offsetWidth
    if (containerWidth > 0) {
      searchBarWidth.value = `${containerWidth}px`
    }
  }
}

// 監聽視窗大小變化
const handleResize = () => {
  nextTick(() => {
    updateSearchBarWidth()
  })
}

let resizeObserver = null

onMounted(() => {
  // 初始計算
  nextTick(() => {
    updateSearchBarWidth()

    // 使用 ResizeObserver 監聽 popularTags 容器寬度變化
    if (popularTagsContainer.value && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        updateSearchBarWidth()
      })
      resizeObserver.observe(popularTagsContainer.value)
    }
  })

  // 監聽視窗大小變化
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push({ name: 'StoreSearch', query: { keyword: searchKeyword.value } })
  } else {
    router.push({ name: 'StoreSearch' })
  }
}

const handleTagClick = (tag) => {
  searchKeyword.value = tag
  router.push({ name: 'StoreSearch', query: { keyword: tag } })
}
</script>

<style scoped>
/* 搜尋欄容器：與熱門標籤同寬 */
.search-bar-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

/* 搜尋框外觀用 CSS 重做（覆寫 Element Plus） */
.search-bar {
  position: relative;
  width: auto;
  max-width: 640px;
  margin: 0 auto;
  padding: 1px;
  border: 1px solid #e5e7eb; /* gray-200 */
  border-radius: 9999px;
  background: #ffffff;
  transition: width 0.3s ease;
}

.search-btn {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  height: 36px;
  border-radius: 9999px;
  padding: 0 22px;
  border: 1px solid #ff6b35 !important;
  background: #ff6b35 !important;
  font-size: 14px;
}

.search-btn:hover {
  border-color: #ff8c00 !important;
  background: #ff8c00 !important;
}

/* 覆寫 el-input wrapper：移除內建邊框/陰影，保留圓角與右側按鈕空間 */
.search-input :deep(.el-input__wrapper) {
  border: 0 !important;
  box-shadow: none !important;
  border-radius: 9999px !important;
  padding: 10px 96px 10px 16px; /* 右側預留給「搜尋」按鈕 */
}

.search-prefix-icon {
  color: #9ca3af; /* gray-400 */
}
</style>
