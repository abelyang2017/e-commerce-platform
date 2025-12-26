import { ref } from 'vue'
import { defineStore } from 'pinia'

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
  const tags = ref(popularTags)

  return {
    tags,
  }
})

