<!-- 全部分類視窗：桌機版為導覽列下方下拉；手機版可用 bottom-sheet（variant="bottomSheet"） -->
<template>
  <!-- 桌機：導覽列下方下拉（維持原本行為，避免破壞既有版型） -->
  <div
    v-if="variant !== 'bottomSheet'"
    v-show="show"
    class="absolute top-full left-0 right-0 bg-white border-t border-b border-[#e0e0e0] shadow-lg z-50 max-h-[70vh] overflow-y-auto"
  >
    <div class="w-full mx-auto px-4 md:px-6 py-6">
      <div class="mb-6">
        <h3 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[16px] text-[#FF8A00] mb-3">特店分類</h3>
        <div class="grid grid-cols-5 gap-2">
          <button
            v-for="item in allCategoriesMain"
            :key="item"
            type="button"
            class="text-left py-2 px-3 font-['Noto_Sans_TC:Regular',sans-serif] text-[14px] transition-colors rounded-md"
            :class="
              selectedMainCategoryModel === item
                ? 'text-[#FF8A00] bg-[#fff3e6]'
                : 'text-[#4f4f4f] md:hover:text-[#FF8A00] md:hover:bg-[#f7f6f5]'
            "
            @click="selectedMainCategoryModel = item"
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
              selectedSubCategoryModel === item
                ? 'text-[#FF8A00] bg-[#fff3e6]'
                : 'text-[#4f4f4f] md:hover:text-[#FF8A00] md:hover:bg-[#f7f6f5]'
            "
            @click="selectedSubCategoryModel = item"
          >
            {{ item }}
          </button>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[16px] text-[#FF8A00] mb-3">縣市區域</h3>
        <div class="flex gap-4">
          <select
            v-model="selectedCityModel"
            class="flex-1 px-4 py-2.5 bg-white border border-[#e0e0e0] text-[#4f4f4f] rounded-lg font-['Noto_Sans_TC:Regular',sans-serif] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/20 focus:border-[#FF8A00] cursor-pointer"
          >
            <option v-for="city in cityOptions" :key="city" :value="city">{{ city }}</option>
          </select>
          <select
            v-model="selectedDistrictModel"
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
              selectedRatingModel === item
                ? 'text-[#FF8A00] bg-[#fff3e6]'
                : 'text-[#4f4f4f] md:hover:text-[#FF8A00] md:hover:bg-[#f7f6f5]'
            "
            @click="selectedRatingModel = item"
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

  <!-- 手機：底部彈窗（符合設計稿） -->
  <Teleport v-else to="body">
    <Transition name="cw-fade">
      <div
        v-show="show"
        class="fixed inset-0 z-[999] md:hidden"
        aria-modal="true"
        role="dialog"
      >
        <div class="absolute inset-0 bg-black/40" @click="requestClose"></div>

        <Transition name="cw-sheet">
          <div
            v-show="show"
            class="absolute inset-x-0 bottom-0 bg-white rounded-t-[24px] shadow-2xl max-h-[85vh] overflow-hidden"
          >
            <!-- 手機版：上方固定標題列 + 關閉鈕（樣式對齊設計稿） -->
            <div class="sticky top-0 bg-white border-b border-[#e0e0e0] px-4 py-4 flex items-center justify-between rounded-t-[24px] z-10">
              <h3 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[18px] text-[#191919]">分類篩選</h3>
              <button class="p-2 hover:bg-[#f5f5f5] rounded-full transition-colors" type="button" aria-label="關閉" @click="requestClose">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x w-5 h-5 text-[#191919]" aria-hidden="true">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>

            <div class="overflow-y-auto max-h-[calc(85vh-72px)]">
              <div class="p-4">
                <div class="mb-6">
                  <h3 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[15px] text-[#FF8A00] mb-3">特店分類</h3>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="item in allCategoriesMain"
                      :key="item"
                      type="button"
                      class="text-center py-2 px-2 font-['Noto_Sans_TC:Regular',sans-serif] text-[12px] transition-colors rounded-md"
                      :class="
                        selectedMainCategoryModel === item
                          ? 'text-[#FF8A00] bg-[#fff3e6]'
                          : 'text-[#4f4f4f] hover:text-[#FF8A00] hover:bg-[#f7f6f5]'
                      "
                      @click="selectedMainCategoryModel = item"
                    >
                      {{ item }}
                    </button>
                  </div>
                </div>

                <div class="mb-6">
                  <h3 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[15px] text-[#FF8A00] mb-3">細部分類</h3>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="item in allCategoriesSub"
                      :key="item"
                      type="button"
                      class="text-center py-2 px-2 font-['Noto_Sans_TC:Regular',sans-serif] text-[12px] transition-colors rounded-md"
                      :class="
                        selectedSubCategoryModel === item
                          ? 'text-[#FF8A00] bg-[#fff3e6]'
                          : 'text-[#4f4f4f] hover:text-[#FF8A00] hover:bg-[#f7f6f5]'
                      "
                      @click="selectedSubCategoryModel = item"
                    >
                      {{ item }}
                    </button>
                  </div>
                </div>

                <div class="mb-6">
                  <h3 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[15px] text-[#FF8A00] mb-3">縣市區域</h3>
                  <div class="flex gap-2">
                    <select
                      v-model="selectedCityModel"
                      class="flex-1 px-3 py-3 bg-white border border-[#e0e0e0] text-[#4f4f4f] rounded-lg font-['Noto_Sans_TC:Regular',sans-serif] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/20 focus:border-[#FF8A00] cursor-pointer"
                    >
                      <option v-for="city in cityOptions" :key="city" :value="city">{{ city }}</option>
                    </select>
                    <select
                      v-model="selectedDistrictModel"
                      class="flex-1 px-3 py-3 bg-white border border-[#e0e0e0] text-[#4f4f4f] rounded-lg font-['Noto_Sans_TC:Regular',sans-serif] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/20 focus:border-[#FF8A00] cursor-pointer"
                    >
                      <option v-for="d in districtOptions" :key="d" :value="d">{{ d }}</option>
                    </select>
                  </div>
                </div>

                <div class="mb-6">
                  <h3 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[15px] text-[#FF8A00] mb-3">服務</h3>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="item in serviceOptions"
                      :key="item"
                      type="button"
                      class="text-center py-2 px-2 font-['Noto_Sans_TC:Regular',sans-serif] text-[12px] transition-colors rounded-md"
                      :class="
                        selectedServices.includes(item)
                          ? 'text-[#FF8A00] bg-[#fff3e6]'
                          : 'text-[#4f4f4f] hover:text-[#FF8A00] hover:bg-[#f7f6f5]'
                      "
                      @click="toggleService(item)"
                    >
                      {{ item }}
                    </button>
                  </div>
                </div>

                <div class="mb-4">
                  <h3 class="font-['Noto_Sans_TC:Bold',sans-serif] text-[15px] text-[#FF8A00] mb-3">評分</h3>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="item in ratingOptions"
                      :key="item"
                      type="button"
                      class="text-center py-2 px-2 font-['Noto_Sans_TC:Regular',sans-serif] text-[12px] transition-colors rounded-md"
                      :class="
                        selectedRatingModel === item
                          ? 'text-[#FF8A00] bg-[#fff3e6]'
                          : 'text-[#4f4f4f] hover:text-[#FF8A00] hover:bg-[#f7f6f5]'
                      "
                      @click="selectedRatingModel = item"
                    >
                      {{ item }}
                    </button>
                  </div>
                </div>
              </div>

              <div class="sticky bottom-0 bg-white p-4 border-t border-[#e0e0e0]">
                <div class="flex items-center gap-3">
                  <button
                    type="button"
                    class="flex-1 px-6 py-3 bg-white border border-[#e0e0e0] text-[#4f4f4f] rounded-md font-['Noto_Sans_TC:Medium',sans-serif] text-[14px] transition-colors"
                    @click="clearAllFilters"
                  >
                    清除篩選
                  </button>
                  <button
                    type="button"
                    class="flex-1 px-6 py-3 bg-[#FF8A00] text-white rounded-md font-['Noto_Sans_TC:Bold',sans-serif] text-[14px] transition-colors shadow-md"
                    @click="applyAllFilters"
                  >
                    確定
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, watch, onUnmounted } from 'vue'

defineOptions({
  name: 'CatgWindow',
})

const props = defineProps({
  show: { type: Boolean, default: false },
  variant: { type: String, default: 'dropdown' }, // 'dropdown' | 'bottomSheet'

  allCategoriesMain: { type: Array, default: () => [] },
  allCategoriesSub: { type: Array, default: () => [] },
  cityOptions: { type: Array, default: () => [] },
  districtOptions: { type: Array, default: () => [] },
  serviceOptions: { type: Array, default: () => [] },
  ratingOptions: { type: Array, default: () => [] },

  selectedMainCategory: { type: String, default: '' },
  selectedSubCategory: { type: String, default: '' },
  selectedCity: { type: String, default: '' },
  selectedDistrict: { type: String, default: '' },
  selectedServices: { type: Array, default: () => [] },
  selectedRating: { type: String, default: '' },

  // 行為由父層維持：避免重複一份商業邏輯
  toggleService: { type: Function, required: true },
  clearAllFilters: { type: Function, required: true },
  applyAllFilters: { type: Function, required: true },
})

const emit = defineEmits([
  'update:show',
  'update:selectedMainCategory',
  'update:selectedSubCategory',
  'update:selectedCity',
  'update:selectedDistrict',
  'update:selectedRating',
  'close',
])

const selectedMainCategoryModel = computed({
  get: () => props.selectedMainCategory,
  set: (v) => emit('update:selectedMainCategory', v),
})

const selectedSubCategoryModel = computed({
  get: () => props.selectedSubCategory,
  set: (v) => emit('update:selectedSubCategory', v),
})

const selectedCityModel = computed({
  get: () => props.selectedCity,
  set: (v) => emit('update:selectedCity', v),
})

const selectedDistrictModel = computed({
  get: () => props.selectedDistrict,
  set: (v) => emit('update:selectedDistrict', v),
})

const selectedRatingModel = computed({
  get: () => props.selectedRating,
  set: (v) => emit('update:selectedRating', v),
})

const requestClose = () => {
  emit('update:show', false)
  emit('close')
}

// 手機 bottom-sheet 開啟時鎖住背景捲動（避免穿透）
const isBottomSheet = computed(() => props.variant === 'bottomSheet')
const unlock = () => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = ''
}

watch(
  () => [props.show, isBottomSheet.value],
  ([isShow, isBS]) => {
    if (!isBS) return
    if (typeof document === 'undefined') return
    document.body.style.overflow = isShow ? 'hidden' : ''
  },
  { immediate: true },
)

onUnmounted(() => {
  unlock()
})
</script>

<style scoped>
/* 動畫：淡入淡出 + 底部滑入（符合手機 bottom sheet） */
.cw-fade-enter-active,
.cw-fade-leave-active {
  transition: opacity 0.18s ease;
}
.cw-fade-enter-from,
.cw-fade-leave-to {
  opacity: 0;
}

.cw-sheet-enter-active,
.cw-sheet-leave-active {
  transition: transform 0.22s ease;
}
.cw-sheet-enter-from,
.cw-sheet-leave-to {
  transform: translateY(100%);
}
</style>

