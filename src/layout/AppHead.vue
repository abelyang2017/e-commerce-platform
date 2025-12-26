<template>
  <div class="w-full bg-white">
    <!-- 頂部 Header Bar -->
    <el-header class="flex h-auto w-full items-center justify-between border-b border-gray-200 px-6 py-4">
      <div class="w-10/12 mx-auto flex items-center justify-between">
      <div class="flex items-center gap-4">
        <img
          src="@/assets/icons/logo.png"
          alt="Logo"
          class="h-[50px] w-auto cursor-pointer transition-opacity hover:opacity-80"
          @click="goToHome"
        />
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

    <div ref="allCategoriesWrapperRef" class="relative">
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
          <el-menu-item index="全部分類" class="all-categories-menu-item flex items-center gap-1 !text-[#ffa940]">
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

      <!-- 全部分類下拉彈窗（位置：導覽列下方） -->
      <div
        v-show="showAllCategories"
        class="absolute top-full left-0 right-0 bg-white border-t border-b border-[#e0e0e0] shadow-lg z-50 max-h-[70vh] overflow-y-auto"
      >
        <div class="max-w-[1400px] mx-auto px-4 md:px-6 py-6">
          <div class="mb-6">
            <h3 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[16px] text-[#FF8A00] mb-3">特店分類</h3>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="item in allCategoriesMain"
                :key="item"
                type="button"
                class="text-left py-2 px-3 font-['Noto_Sans_TC:Regular',sans-serif] text-[14px] transition-colors rounded-md"
                :class="
                  selectedMainCategory === item
                    ? 'text-[#FF8A00] bg-[#fff3e6]'
                    : 'text-[#4f4f4f] md:hover:text-[#FF8A00] md:hover:bg-[#f7f6f5]'
                "
                @click="selectedMainCategory = item"
              >
                {{ item }}
              </button>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[16px] text-[#FF8A00] mb-3">細部分類</h3>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="item in allCategoriesSub"
                :key="item"
                type="button"
                class="text-left py-2 px-3 font-['Noto_Sans_TC:Regular',sans-serif] text-[14px] transition-colors rounded-md"
                :class="
                  selectedSubCategory === item
                    ? 'text-[#FF8A00] bg-[#fff3e6]'
                    : 'text-[#4f4f4f] md:hover:text-[#FF8A00] md:hover:bg-[#f7f6f5]'
                "
                @click="selectedSubCategory = item"
              >
                {{ item }}
              </button>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[16px] text-[#FF8A00] mb-3">縣市區域</h3>
            <div class="flex gap-4">
              <select
                v-model="selectedCity"
                class="flex-1 px-4 py-2.5 bg-white border border-[#e0e0e0] text-[#4f4f4f] rounded-lg font-['Noto_Sans_TC:Regular',sans-serif] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/20 focus:border-[#FF8A00] cursor-pointer"
              >
                <option v-for="city in cityOptions" :key="city" :value="city">{{ city }}</option>
              </select>
              <select
                v-model="selectedDistrict"
                class="flex-1 px-4 py-2.5 bg-white border border-[#e0e0e0] text-[#4f4f4f] rounded-lg font-['Noto_Sans_TC:Regular',sans-serif] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/20 focus:border-[#FF8A00] cursor-pointer"
              >
                <option v-for="d in districtOptions" :key="d" :value="d">{{ d }}</option>
              </select>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[16px] text-[#FF8A00] mb-3">服務</h3>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="item in serviceOptions"
                :key="item"
                type="button"
                class="text-left py-2 px-3 font-['Noto_Sans_TC:Regular',sans-serif] text-[14px] transition-colors rounded-md"
                :class="
                  selectedServices.includes(item)
                    ? 'text-[#FF8A00] bg-[#fff3e6]'
                    : 'text-[#4f4f4f] md:hover:text-[#FF8A00] md:hover:bg-[#f7f6f5]'
                "
                @click="toggleService(item)"
              >
                {{ item }}
              </button>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[16px] text-[#FF8A00] mb-3">評分</h3>
            <div class="grid grid-cols-5 gap-2">
              <button
                v-for="item in ratingOptions"
                :key="item"
                type="button"
                class="text-left py-2 px-3 font-['Noto_Sans_TC:Regular',sans-serif] text-[14px] transition-colors rounded-md"
                :class="
                  selectedRating === item
                    ? 'text-[#FF8A00] bg-[#fff3e6]'
                    : 'text-[#4f4f4f] md:hover:text-[#FF8A00] md:hover:bg-[#f7f6f5]'
                "
                @click="selectedRating = item"
              >
                {{ item }}
              </button>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#e0e0e0]">
            <button
              type="button"
              class="w-32 px-6 py-2.5 bg-white border border-[#e0e0e0] text-[#4f4f4f] rounded-md font-['Noto_Sans_TC:Medium',sans-serif] text-[14px] md:hover:bg-[#f5f5f5] transition-colors"
              @click="clearAllFilters"
            >
              清除篩選
            </button>
            <button
              type="button"
              class="w-32 px-6 py-2.5 bg-[#FF8A00] text-white rounded-md font-['Noto_Sans_TC:Bold',sans-serif] text-[14px] md:hover:bg-[#e66a00] transition-colors shadow-md"
              @click="applyAllFilters"
            >
              確定
            </button>
          </div>
        </div>
      </div>
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

defineOptions({
  name: 'AppHeader',
})

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const productsStore = useProductsStore()

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

.categories-container:hover {
  background-color: #ffffff !important;
  color: #ffa940 !important;

}
</style>
