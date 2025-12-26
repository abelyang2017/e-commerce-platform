<template>
  <!-- 分頁（依照截圖版型） -->
  <div
    v-if="totalPagesSafe > 1"
    class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 pt-4 md:pt-6 border-t border-[#e0e0e0]"
  >
    <div class="flex items-center gap-3 md:gap-6">
      <!-- Prev -->
      <button
        type="button"
        :disabled="isFirst"
        class="flex items-center justify-center text-[#4f4f4f] md:hover:text-[#FF8A00] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        @click="goPrev"
        aria-label="Prev"
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
          class="w-4 h-4 md:w-5 md:h-5"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
      </button>

      <!-- Page buttons -->
      <div class="flex items-center gap-1.5 md:gap-2">
        <button
          v-for="item in pageItems"
          :key="item.key"
          type="button"
          class="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full transition-all font-['Noto_Sans_TC:Medium',sans-serif] text-[12px] md:text-[13px]"
          :disabled="item.type !== 'page'"
          :class="pageItemClass(item)"
          @click.stop.prevent="item.type === 'page' && goPage(item.value)"
          aria-label="Page"
        >
          <span v-if="item.type === 'page'">{{ item.value }}</span>
          <span v-else class="text-[#bdbdbd]">…</span>
        </button>
      </div>

      <!-- Next -->
      <button
        type="button"
        :disabled="isLast"
        class="flex items-center justify-center text-[#4f4f4f] md:hover:text-[#FF8A00] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        @click="goNext"
        aria-label="Next"
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
          class="w-4 h-4 md:w-5 md:h-5"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </div>

    <!-- Quick jumper（桌面才顯示） -->
    <div v-if="showJumper" class="hidden md:flex items-center gap-2 ml-4">
      <span class="text-[#4f4f4f] text-[13px] font-['Noto_Sans_TC:Regular',sans-serif]">跳至</span>
      <input
        v-model="jumpPage"
        type="number"
        inputmode="numeric"
        :min="1"
        :max="totalPagesSafe"
        class="w-14 px-2 py-1.5 bg-white border border-[#e0e0e0] text-[#4f4f4f] text-center rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#FF8A00] focus:border-[#FF8A00] font-['Noto_Sans_TC:Regular',sans-serif] text-[13px]"
        placeholder="頁"
        @keydown.enter.prevent="confirmJump"
        aria-label="Jump to page"
      />
      <span class="text-[#4f4f4f] text-[13px] font-['Noto_Sans_TC:Regular',sans-serif]">頁</span>
      <button
        type="button"
        class="px-3 py-1.5 bg-[#f27400] !text-white rounded-lg shadow-sm md:hover:bg-[#e66a00] transition-all font-['Noto_Sans_TC:Medium',sans-serif] text-[13px]"
        @click="confirmJump"
      >
        確定
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

defineOptions({ name: 'PageSelecet' })

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  showJumper: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:currentPage'])

const totalPagesSafe = computed(() => {
  const v = Number(props.totalPages)
  if (!Number.isFinite(v) || v <= 0) return 1
  return Math.trunc(v)
})

const isFirst = computed(() => props.currentPage <= 1)
const isLast = computed(() => props.currentPage >= totalPagesSafe.value)

/** 跳至 */
const jumpPage = ref('')
watch(
  () => props.currentPage,
  () => (jumpPage.value = ''),
  { immediate: true }
)

function clampPage(n) {
  const v = Number(n)
  if (!Number.isFinite(v)) return props.currentPage
  return Math.min(totalPagesSafe.value, Math.max(1, Math.trunc(v)))
}

function goPage(p) {
  const next = clampPage(p)
  if (next === props.currentPage) return
  emit('update:currentPage', next)
}

function goPrev() {
  if (isFirst.value) return
  goPage(props.currentPage - 1)
}

function goNext() {
  if (isLast.value) return
  goPage(props.currentPage + 1)
}

function confirmJump() {
  if (jumpPage.value === '') return
  goPage(jumpPage.value)
  // 送出後清空，回到 placeholder 狀態
  jumpPage.value = ''
}

/**
 * 頁碼列表（最多顯示 5 個頁碼）
 * - 只顯示數字頁碼，不顯示省略號
 * - 顯示區間會跟著目前頁移動，確保當前頁仍會出現在列表中
 */
const pageItems = computed(() => {
  const total = totalPagesSafe.value
  const cur = clampPage(props.currentPage)
  const maxVisible = 5

  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => ({
      key: `p-${i + 1}`,
      type: 'page',
      value: i + 1,
    }))
  }

  // 計算 5 個頁碼的滑動視窗起點
  // 例：total=20
  // - cur=1~3  => 1..5
  // - cur=10   => 8..12
  // - cur=18~20=> 16..20
  const half = Math.floor(maxVisible / 2) // 2
  const maxStart = total - maxVisible + 1
  const start = Math.min(maxStart, Math.max(1, cur - half))

  return Array.from({ length: maxVisible }, (_, i) => {
    const p = start + i
    return { key: `p-${p}`, type: 'page', value: p }
  })
})

function pageItemClass(item) {
  if (item.type !== 'page') {
    return 'bg-transparent text-[#bdbdbd]'
  }

  if (item.value === props.currentPage) {
    // 使用 !important 避免被靜態 class（例如 text-[#4f4f4f]）覆蓋
    return 'bg-[#f27400] !text-white shadow-md'
  }

  // 一般頁
  // hover 字色必須是橘色；同樣用 !important 避免被覆蓋
  return 'bg-white text-[#4f4f4f] border border-[#e0e0e0] md:hover:bg-[#fff3e6] md:hover:border-[#FF8A00] md:hover:!text-[#FF8A00]'
}
</script>
