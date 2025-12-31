import { ref } from 'vue'
import { defineStore } from 'pinia'
import { maybeShuffleArray } from '@/utils/shuffle'

// 假資料：熱門搜尋標籤
const popularTags = [
  '星巴克',
  'IKEA',
  '全聯',
  '家樂福',
  '誠品書店',
  '康是美',
  '屈臣氏',
  '寶雅',
]

export const usePopularTagsStore = defineStore('popularTags', () => {
  // 只在 store 初始化時洗牌一次，避免每次渲染都亂跳
  const tags = ref(maybeShuffleArray(popularTags))

  return {
    tags,
  }
})

