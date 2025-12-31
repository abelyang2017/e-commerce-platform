/**
 * Fisher–Yates 洗牌：回傳「新陣列」，不會修改輸入陣列本身。
 * - 用途：讓靜態資料在頁面載入時以隨機順序顯示（但同一次載入期間保持穩定）
 */
import { SHUFFLE_STATIC_DATA } from '@/config/mockDataOrder'

export function shuffleArray(input, rng = Math.random) {
  const arr = Array.isArray(input) ? [...input] : []
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * 依照設定開關決定是否洗牌。
 * - 關閉時仍回傳新陣列（避免外部不小心 mutate 到原始常數）
 */
export function maybeShuffleArray(input, rng = Math.random) {
  if (!SHUFFLE_STATIC_DATA) return Array.isArray(input) ? [...input] : []
  return shuffleArray(input, rng)
}


