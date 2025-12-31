import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { maybeShuffleArray } from '@/utils/shuffle'

// 假資料：商品列表
const mockProducts = [
  {
    id: 1,
    name: '星巴克咖啡券',
    category: '咖啡飲品',
    price: 150,
    originalPrice: 180,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300&h=300&fit=crop&q=90',
    description: '星巴克經典咖啡券，可兌換任一中杯飲品',
    brand: '星巴克',
    discount: 17,
  },
  {
    id: 2,
    name: 'IKEA 收納盒組',
    category: '傢俱收納',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&q=90',
    description: 'IKEA 經典收納盒，多種尺寸組合',
    brand: 'IKEA',
    discount: 25,
  },
  {
    id: 3,
    name: '全聯購物金',
    category: '生活雜貨',
    price: 500,
    originalPrice: 500,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=300&fit=crop&q=90',
    description: '全聯福利中心購物金，全店通用',
    brand: '全聯',
    discount: 0,
  },
  {
    id: 4,
    name: '家樂福禮券',
    category: '生活雜貨',
    price: 1000,
    originalPrice: 1000,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&q=90',
    description: '家樂福購物禮券，全店商品適用',
    brand: '家樂福',
    discount: 0,
  },
  {
    id: 5,
    name: '誠品書店購書券',
    category: '生活雜貨',
    price: 200,
    originalPrice: 200,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&q=90',
    description: '誠品書店購書券，可購買書籍及文創商品',
    brand: '誠品書店',
    discount: 0,
  },
  {
    id: 6,
    name: '康是美美妝券',
    category: '美容保養',
    price: 300,
    originalPrice: 300,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop&q=90',
    description: '康是美美妝保養品購物券',
    brand: '康是美',
    discount: 0,
  },
  {
    id: 7,
    name: '屈臣氏購物券',
    category: '美容保養',
    price: 250,
    originalPrice: 250,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop&q=90',
    description: '屈臣氏全店商品購物券',
    brand: '屈臣氏',
    discount: 0,
  },
  {
    id: 8,
    name: '寶雅生活券',
    category: '生活雜貨',
    price: 400,
    originalPrice: 400,
    image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=300&h=300&fit=crop&q=90',
    description: '寶雅生活用品購物券',
    brand: '寶雅',
    discount: 0,
  },
  {
    id: 9,
    name: '運動中心月票',
    category: '運動健身',
    price: 800,
    originalPrice: 1000,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop&q=90',
    description: '運動中心月票，無限次使用',
    brand: '運動中心',
    discount: 20,
  },
  {
    id: 10,
    name: '餐廳套餐券',
    category: '美味餐廳',
    price: 500,
    originalPrice: 600,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=300&fit=crop&q=90',
    description: '精選餐廳雙人套餐券',
    brand: '精選餐廳',
    discount: 17,
  },
  {
    id: 11,
    name: '飯店住宿券',
    category: '飯店旅館',
    price: 2000,
    originalPrice: 2500,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=300&fit=crop&q=90',
    description: '精選飯店住宿券，含早餐',
    brand: '精選飯店',
    discount: 20,
  },
  {
    id: 12,
    name: '家電優惠券',
    category: '家電',
    price: 1000,
    originalPrice: 1200,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&q=90',
    description: '家電商品專用優惠券',
    brand: '家電專賣',
    discount: 17,
  },
]

// 假資料：所有分類
const allCategories = [
  '美味餐廳',
  '生活雜貨',
  '飯店旅館',
  '運動健身',
  '美容保養',
  '咖啡飲品',
  '家電',
  '保健醫療',
  '傢俱收納',
  '手機相機',
  '日用紙品',
  '3C周邊',
  '寵物用品',
  '園藝',
  '電子票券',
]

export const useProductsStore = defineStore('products', () => {
  // 只在 store 初始化時洗牌一次，避免每次 computed 重新計算都導致順序改變
  const products = ref(maybeShuffleArray(mockProducts))
  const categories = ref(maybeShuffleArray(allCategories))
  const selectedCategory = ref('')
  const searchKeyword = ref('')

  // 篩選後的商品
  const filteredProducts = computed(() => {
    let result = products.value

    // 分類篩選
    if (selectedCategory.value) {
      result = result.filter((p) => p.category === selectedCategory.value)
    }

    // 搜尋篩選
    if (searchKeyword.value) {
      const keyword = searchKeyword.value.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(keyword) ||
          p.brand.toLowerCase().includes(keyword) ||
          p.description.toLowerCase().includes(keyword)
      )
    }

    return result
  })

  // 根據 ID 取得商品
  function getProductById(id) {
    return products.value.find((p) => p.id === Number(id))
  }

  // 根據分類取得商品
  function getProductsByCategory(category) {
    return products.value.filter((p) => p.category === category)
  }

  return {
    products,
    categories,
    selectedCategory,
    searchKeyword,
    filteredProducts,
    getProductById,
    getProductsByCategory,
  }
})

