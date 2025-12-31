<template>
  <div class="w-full bg-white">
    <!-- 手機版：響應式 Header（md 以下） -->
    <div class="md:hidden border-b border-gray-200">
      <div class="apphead-mobile-bar flex items-center justify-between">
        <div class="flex items-center gap-2">
          <button
            v-if="!isHome"
            type="button"
            class="text-[#191919] md:hover:text-[#FF8A00] transition-colors p-1"
            aria-label="返回上一頁"
            @click="goBack"
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
              class="w-5 h-5"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>
          <button
            type="button"
            aria-label="回到首頁"
            class="flex items-center gap-2 bg-transparent border-0 p-0 cursor-pointer transition-opacity hover:opacity-80"
            @click="goToHome"
          >
            <span role="img" aria-hidden="true" class="apphead-yelp-logo h-8 w-8 shrink-0"></span>
            <span class="inline-flex flex-col text-base font-semibold text-[#FF8A00] leading-tight select-none">
              <span>LOGO</span>
              <span>Here</span>
            </span>
          </button>
        </div>

        <button
          v-if="!userStore.isLoggedIn"
          type="button"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#FF8A00] text-[#FF8A00] md:hover:bg-[#fff3e6] md:hover:border-[#FF8A00] transition-colors font-['Noto_Sans_TC:Medium',sans-serif] text-[13px]"
          @click="showLoginDialog = true"
          aria-label="登入"
        >
          <el-icon class="login-icon">
            <User />
          </el-icon>
        </button>

        <button
          v-else
          type="button"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#FF8A00] text-[#FF8A00] md:hover:bg-[#fff3e6] md:hover:border-[#FF8A00] transition-colors font-['Noto_Sans_TC:Medium',sans-serif] text-[13px]"
          @click="handleLogout"
          aria-label="登出"
        >
          <el-icon class="login-icon">
            <User />
          </el-icon>
        </button>
      </div>
    </div>

    <!-- 頂部 Header Bar -->
    <el-header class="hidden md:flex apphead-bottom-shadow apphead-desktop-bar w-full items-center justify-between border-b border-gray-200 px-6">
      <div class="w-10/12 mx-auto flex items-center justify-between">
      <div class="flex items-center">
        <button
          type="button"
          aria-label="回到首頁"
          class="flex items-center gap-4 bg-transparent border-0 p-0 cursor-pointer transition-opacity hover:opacity-80"
          @click="goToHome"
        >
          <span role="img" aria-hidden="true" class="apphead-yelp-logo h-[50px] w-[50px] shrink-0"></span>
          <span class="inline-flex flex-col font-semibold text-[#FF8A00] leading-tight select-none">
            <span class="text-[#FF8A00] text-md mt-5">LOGO</span>
            <span class="text-[#FF8A00] text-sm mb-3">Here</span>
          </span>
        </button>
      </div>
      <div>
        <el-button
          v-if="!userStore.isLoggedIn"
          plain
          class="login-btn !bg-white !border !border-[#ffa940] !rounded-full !px-4 !py-2 transition duration-300 hover:!bg-[#fff7e6] hover:!border-[#ffa940] [&_.el-button__inner]:flex [&_.el-button__inner]:items-center [&_.el-button__inner]:gap-1.5"
          @click="showLoginDialog = true"
        >
          <el-icon class="login-icon">
            <User />
          </el-icon>
          <span class="text-sm font-normal text-[#ffa940] login-text">登入</span>
        </el-button>
        <el-button
          v-else
          plain
          class="!bg-white !border !border-[#ffa940] !rounded-full !px-4 !py-2 transition duration-300 hover:!bg-white hover:!border-[#ffa940]"
          @click="handleLogout"
        >
          <span class="text-sm font-normal text-[#ffa940]">{{ userStore.userInfo?.name || '登出' }}</span>
        </el-button>
      </div>
      </div>
    </el-header>
    <!-- 導航欄 -->

    <div ref="allCategoriesWrapperRef" class="relative hidden md:block">
      <el-menu
        :style="{
          '--el-menu-text-color': '#111827',
          '--el-menu-active-color': '#111827',
          '--el-menu-hover-bg-color': 'transparent',
        }"
        class="w-full justify-center px-6 overflow-x-auto whitespace-nowrap [&_.el-menu-item]:bg-transparent [&_.el-menu-item]:text-sm [&_.el-menu-item]:text-gray-600 [&_.el-menu-item]:shrink-0 [&_.el-menu-item:hover]:bg-transparent [&_.el-menu-item:hover]:text-[#ffa940] [&_.el-menu-item.is-active]:bg-transparent [&_.el-menu-item.is-active]:text-gray-900 [&_.el-menu-item.is-active]:border-b-2 [&_.el-menu-item.is-active]:border-[#ffa940]"
        :default-active="activeIndex"
        @select="handleSelect"
      >
        <div class="w-10/12 mx-auto flex justify-between">
          <el-menu-item v-for="category in categories" :key="category" :index="category" class="categories-container">
            {{ category }}
          </el-menu-item>
          <el-menu-item index="全部分類" class="all-categories-menu-item flex items-center !text-[16px] gap-1 !text-[#ffa940]">
            <span>全部分類</span>
            <el-icon
              class="!text-[#ffa940] transition-transform duration-200"
              :class="showAllCategories ? 'rotate-180' : 'rotate-0'"
            >
              <ArrowDown />
            </el-icon>
          </el-menu-item>
        </div>
      </el-menu>

      <CatgWindow
        v-model:show="showAllCategories"
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
      />
    </div>
    <!-- 登入彈窗 -->
    <LoginDialog v-model="showLoginDialog" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { User, ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/UserStores'
import { useProductsStore } from '@/stores/ProductsStores'
import LoginDialog from '@/components/LoginDialog.vue'
import CatgWindow from '@/components/CatgWindow.vue'

defineOptions({
  name: 'AppHeader',
})

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const productsStore = useProductsStore()

const isHome = computed(() => route.name === 'Home' || route.path === '/')

const goBack = () => {
  // 手機版返回：優先回上一頁；若無可回退歷史則回首頁，避免導到站外
  if (typeof window !== 'undefined' && window.history.length > 1) {
    router.back()
    return
  }
  router.push({ name: 'Home' })
}

const showLoginDialog = ref(false)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1920)
const showAllCategories = ref(false)
const allCategoriesWrapperRef = ref(null)

// 下拉彈窗：篩選狀態（先以 UI/互動為主，後續可接到 StoreSearch 的 query 或 store）
const allCategoriesMain = ref(['全部分類', '美食', '購物', '住宿', '娛樂', '交通', '教育', '美容美髮'])
const allCategoriesSub = ref(['全部選項'])

const cityOptions = ref(['所有縣市', '台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市', '基隆市', '新竹市', '嘉義市'])
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
const districtOptions = computed(() => {
  return districtMap[selectedCity.value] || ['所有區域']
})

const serviceOptions = ref(['可刷卡', '寵物友善', '台新Pay', '提供插座', '停車場', '叫車服務', '提供WIFI', '汽車充電站', '可預約', '包廂服務'])
const ratingOptions = ref(['不限', '4.5+', '4+', '3.5+'])

const selectedMainCategory = ref('全部分類')
const selectedSubCategory = ref('全部選項')
const selectedCity = ref('所有縣市')
const selectedDistrict = ref('所有區域')
const selectedServices = ref([])
const selectedRating = ref('不限')

let onDocClick = null
let onKeydown = null

const activeIndex = computed(() => {
  // Menu active：Category 頁沿用 params；店家搜尋頁則用 title（query）
  return route.params.category || String(route.query.title || '')
})

// 根據螢幕寬度計算可顯示的分類數量
const visibleCategoriesCount = computed(() => {
  const width = windowWidth.value
  const containerWidth = width * 0.833 // w-10/12 = 83.33%
  const subMenuWidth = 120 // "全部分類" 的寬度（大約）
  const availableWidth = containerWidth - subMenuWidth - 48 // 減去 padding

  // 每個分類項目大約需要 80-100px（根據字數不同）
  // 保守估計每個項目 90px
  const itemWidth = 90
  const maxItems = Math.floor(availableWidth / itemWidth)

  // 確保至少顯示 3 個，最多顯示所有分類
  return Math.max(3, Math.min(maxItems, productsStore.categories.length))
})

// 響應式顯示的分類列表
const categories = computed(() => {
  return productsStore.categories.slice(0, visibleCategoriesCount.value)
})

// 監聽視窗大小變化
const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', handleResize)

  onDocClick = (e) => {
    if (!showAllCategories.value) return
    const wrapper = allCategoriesWrapperRef.value
    if (wrapper && !wrapper.contains(e.target)) {
      showAllCategories.value = false
    }
  }

  onKeydown = (e) => {
    if (e.key === 'Escape') {
      showAllCategories.value = false
    }
  }

  // 用 capture 讓點擊外部更穩定（避免被內部 stopPropagation 影響）
  document.addEventListener('click', onDocClick, true)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (onDocClick) document.removeEventListener('click', onDocClick, true)
  if (onKeydown) document.removeEventListener('keydown', onKeydown)
})

const handleSelect = (key) => {
  if (key === '全部分類') {
    showAllCategories.value = !showAllCategories.value
    return
  }

  if (key) {
    showAllCategories.value = false
    // 導到店家搜尋結果頁（StoreSearch）並沿用同一套搜尋/分頁邏輯
    // 關鍵字用「模糊搜尋 + 多關鍵字」規則（StoresStores 內處理）
    const keywordMap = {
      美味餐廳: '美食',
      咖啡飲品: '咖啡',
      美容保養: '美妝',
      運動健身: '健身',
      生活雜貨: '生活',
      傢俱收納: '家居',
    }

    const keyword = keywordMap[key] || key
    router.push({ name: 'StoreSearch', query: { title: key, keyword } })
  } else {
    router.push({ name: 'StoreSearch' })
  }
}

const toggleService = (service) => {
  if (selectedServices.value.includes(service)) {
    selectedServices.value = selectedServices.value.filter((s) => s !== service)
  } else {
    selectedServices.value = [...selectedServices.value, service]
  }
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
  // 先做 UI 行為：關閉面板；若選了主分類就沿用既有導頁
  showAllCategories.value = false
  if (selectedMainCategory.value && selectedMainCategory.value !== '全部分類') {
    handleSelect(selectedMainCategory.value)
  }
}

// 切換縣市時，若當前區域不在新清單內則重置
watch(selectedCity, () => {
  if (!districtOptions.value.includes(selectedDistrict.value)) {
    selectedDistrict.value = districtOptions.value[0] || '所有區域'
  }
})

const handleLogout = () => {
  userStore.logout()
}

const goToHome = async () => {
  // 已在首頁時，再點一次 Logo 不會觸發導覽（也就不會觸發 scrollBehavior）
  // 這裡直接強制回到最頂部，符合使用者預期
  if (route.name === 'Home' || route.path === '/') {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, left: 0 })
    return
  }

  await router.push({ name: 'Home' })
  // 保險：部分情況（例如某些容器/瀏覽器）導覽後仍可能停在原捲動位置
  if (typeof window !== 'undefined') window.scrollTo({ top: 0, left: 0 })
}
</script>

<style scoped>
/* 強制設置 SVG 和所有子元素的顏色 */

.apphead-mobile-bar {
  /* 原本是 px-4 py-3（= 16px / 12px），依需求上下 +5px => 17px */
  padding: 17px 16px;
}

.apphead-desktop-bar {
  /* Element Plus el-header 可能有預設 height: 60px，會吃掉你想要的上下空間 */
  height: auto !important;
  /* 原本設計是 py-4（16px），依需求上下 +5px => 21px */
  padding-top: 16px !important;
  padding-bottom: 16px !important;
}

.apphead-yelp-logo {
  /*
    讓圖示「精準」跟文字同色：用 mask 方式把 PNG 當遮罩，再用背景色填滿
    注意：這會以單色方式呈現圖示（符合你要的橘色一致性）
  */
  background-color: #FF8A00;
  -webkit-mask-image: url('@/assets/icons/yelp.png');
  mask-image: url('@/assets/icons/yelp.png');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
}

.apphead-bottom-shadow{
  /* 保險：確保能打到 Element Plus 的 el-header 根節點 */
  position: relative;
  z-index: 50;
  /* 只做底部陰影（調明顯一點，避免肉眼看不出來） */
  box-shadow: 0 8px 12px -10px rgba(17, 24, 39, 0.35) ;
}

.login-icon :deep(svg *) {
  fill: #ffa940 !important;
  color: #ffa940 !important;
  stroke: #ffa940 !important;
  background-color: #ffa940 !important;
}
/* Hover 狀態 */
.login-btn:hover .login-icon :deep(svg *) {
  fill: #ffa940 !important;
  color: #ffa940 !important;
  stroke: #ffa940 !important;
}

/* 手機版：使用者 icon 強制橘色（避免 SVG 不吃 text color） */
.mobile-user-icon :deep(svg *) {
  fill: #FF8A00 !important;
  color: #FF8A00 !important;
  stroke: #FF8A00 !important;
}

.categories-container:hover {
  background-color: #ffffff !important;
  color: #ffa940 !important;

}
</style>
