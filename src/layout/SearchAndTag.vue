<!-- 搜尋區域 -->
 <template>
<div class="bg-white">
  <!-- 手機版（保留一般模式，僅在螢幕變小時顯示） -->
  <div class="px-4 py-3 flex items-center gap-2 md:hidden relative bg-white border-b border-gray-200">
    <div class="relative flex-1">
      <!-- 搜尋 icon（樣式對齊設計稿） -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666] w-4 h-4"
        aria-hidden="true"
      >
        <path d="m21 21-4.34-4.34"></path>
        <circle cx="11" cy="11" r="8"></circle>
      </svg>

      <input
        v-model="searchKeyword"
        type="text"
        placeholder="請輸入品牌、店家名稱"
        class="w-full pl-10 pr-3 py-2 rounded-full bg-[#f5f5f5] border-none focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/20 font-['Noto_Sans_TC:Regular',sans-serif] text-[#191919] text-[14px]"
        @keyup.enter="handleSearch"
      />
    </div>

    <button
      type="button"
      class="p-2 flex items-center justify-center"
      aria-label="篩選"
      @click="showMobileFilters = true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-5 h-5 text-[#191919]"
        aria-hidden="true"
      >
        <path d="M10 5H3"></path>
        <path d="M12 19H3"></path>
        <path d="M14 3v4"></path>
        <path d="M16 17v4"></path>
        <path d="M21 12h-9"></path>
        <path d="M21 19h-5"></path>
        <path d="M21 5h-7"></path>
        <path d="M8 10v4"></path>
        <path d="M8 12H3"></path>
      </svg>
    </button>
  </div>

  <!-- 手機版分類篩選：底部彈窗 -->
  <CatgWindow
    v-model:show="showMobileFilters"
    variant="bottomSheet"
    :all-categories-main="allCategoriesMain"
    :all-categories-sub="allCategoriesSub"
    :city-options="cityOptions"
    :district-options="districtOptions"
    :service-options="serviceOptions"
    :rating-options="ratingOptions"
    v-model:selected-main-category="selectedMainCategory"
    v-model:selected-sub-category="selectedSubCategory"
    v-model:selected-city="selectedCity"
    v-model:selected-district="selectedDistrict"
    v-model:selected-rating="selectedRating"
    :selected-services="selectedServices"
    :toggle-service="toggleService"
    :clear-all-filters="clearAllFilters"
    :apply-all-filters="applyAllFilters"
    @close="showMobileFilters = false"
  />

  <!-- 一般模式（桌機/平板）：保持既有行為與樣式 -->
  <div class="hidden md:block py-6">
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
</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { usePopularTagsStore } from '@/stores/PopularTagsStores'
import { useStoresStore } from '@/stores/StoresStores'
import CatgWindow from '@/components/CatgWindow.vue'

const router = useRouter()
const popularTagsStore = usePopularTagsStore()
const storesStore = useStoresStore()

const popularTagsContainer = ref(null)
const searchBarWidth = ref('auto')
const showMobileFilters = ref(false)

const searchKeyword = computed({
  get: () => storesStore.searchKeyword,
  set: (val) => {
    storesStore.searchKeyword = val
  },
})

const { tags: popularTags } = storeToRefs(popularTagsStore)

// 手機版 bottom sheet：篩選選項（與 AppHead.vue 保持一致的設計稿內容）
const allCategoriesMain = ref(['全部分類', '美食', '購物', '住宿', '娛樂', '交通', '教育', '美容美髮'])
const allCategoriesSub = ref(['全部選項'])

const cityOptions = ref([
  '所有縣市',
  '台北市',
  '新北市',
  '桃園市',
  '台中市',
  '台南市',
  '高雄市',
  '基隆市',
  '新竹市',
  '嘉義市',
])

const districtMap = {
  // 先依照設計稿：即使選「所有縣市」，區域下拉也要有完整選項（目前先放台北區域清單）
  所有縣市: [
    '所有區域',
    '中正區',
    '大同區',
    '中山區',
    '松山區',
    '大安區',
    '萬華區',
    '信義區',
    '士林區',
    '北投區',
    '內湖區',
    '南港區',
    '文山區',
  ],
  台北市: [
    '所有區域',
    '中正區',
    '大同區',
    '中山區',
    '松山區',
    '大安區',
    '萬華區',
    '信義區',
    '士林區',
    '北投區',
    '內湖區',
    '南港區',
    '文山區',
  ],
}

const serviceOptions = ref([
  '可刷卡',
  '寵物友善',
  '台新Pay',
  '提供插座',
  '停車場',
  '叫車服務',
  '提供WIFI',
  '汽車充電站',
  '可預約',
  '包廂服務',
])
const ratingOptions = ref(['不限', '4.5+', '4+', '3.5+'])

const selectedMainCategory = ref('全部分類')
const selectedSubCategory = ref('全部選項')
const selectedCity = ref('所有縣市')
const selectedDistrict = ref('所有區域')
const selectedServices = ref([])
const selectedRating = ref('不限')

const districtOptions = computed(() => {
  return districtMap[selectedCity.value] || ['所有區域']
})

const toggleService = (item) => {
  const idx = selectedServices.value.indexOf(item)
  if (idx >= 0) selectedServices.value.splice(idx, 1)
  else selectedServices.value.push(item)
}

const clearAllFilters = () => {
  selectedMainCategory.value = '全部分類'
  selectedSubCategory.value = '全部選項'
  selectedCity.value = '所有縣市'
  selectedDistrict.value = '所有區域'
  selectedServices.value = []
  selectedRating.value = '不限'
}

const applyAllFilters = () => {
  // 目前先以 UI/互動為主：按「確定」關閉視窗；後續可再把條件帶到 StoreSearch 的 query 或 store
  showMobileFilters.value = false
}

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
