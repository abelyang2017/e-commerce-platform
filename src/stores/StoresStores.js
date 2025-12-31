import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { maybeShuffleArray } from '@/utils/shuffle'

// 假資料：精選品牌
const featuredBrands = [
  {
    id: 1,
    name: '星巴克',
    logo: 'https://images.unsplash.com/photo-1657979964801-3e3bb6c03a7e?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 2,
    name: 'IKEA',
    logo: 'https://images.unsplash.com/photo-1679050367261-d7a4a7747ef4?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 3,
    name: '全聯',
    logo: 'https://images.unsplash.com/photo-1671427478482-2968e71a6311?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 4,
    name: '家樂福',
    logo: 'https://images.unsplash.com/photo-1757940059931-6e3c6572d989?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 5,
    name: '誠品書店',
    logo: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 6,
    name: '康是美',
    logo: 'https://images.unsplash.com/photo-1761036602705-48c4b69232c8?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 7,
    name: '7-11',
    logo: 'https://images.unsplash.com/photo-1613535738534-5e4d22597ab5?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 8,
    name: '屈臣氏',
    logo: 'https://images.unsplash.com/photo-1713937187927-4e80f5a54efa?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 9,
    name: '寶雅',
    logo: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 10,
    name: 'NET',
    logo: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 11,
    name: 'UNIQLO',
    logo: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 12,
    name: 'MUJI無印良品',
    logo: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 13,
    name: '肯德基',
    logo: 'https://images.unsplash.com/photo-1696522618649-403387cb93bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 14,
    name: 'Taco Bell',
    logo: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 15,
    name: 'DQ',
    logo: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 16,
    name: 'Subway',
    logo: 'https://images.unsplash.com/photo-1764344815160-0e2afc6939a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 17,
    name: '漢堡王',
    logo: 'https://images.unsplash.com/photo-1654573821777-e00c3a414335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 18,
    name: '麥當勞',
    logo: 'https://images.unsplash.com/photo-1699727277806-fc241c142c04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 19,
    name: '必勝客',
    logo: 'https://images.unsplash.com/photo-1620174645265-05820da4ff20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 20,
    name: '溫蒂漢堡',
    logo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 21,
    name: '開飯川食堂',
    logo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 22,
    name: '饗食天堂',
    logo: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 23,
    name: '勺日咖啡',
    logo: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 24,
    name: '真珠台灣家味',
    logo: 'https://images.unsplash.com/photo-1731929454954-c96aad09e5e1?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 25,
    name: '王品集團',
    logo: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 26,
    name: '藏壽司',
    logo: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 27,
    name: '藏王極上鍋物',
    logo: 'https://images.unsplash.com/photo-1604908176997-125f25cc500f?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 28,
    name: '博多一風堂',
    logo: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 29,
    name: 'ikea餐廳',
    logo: 'https://images.unsplash.com/photo-1550547660-ef8f0c0d6063?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 30,
    name: '誠品生活',
    logo: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 31,
    name: '全家便利商店',
    logo: 'https://images.unsplash.com/photo-1618536394242-0d70c10b9f21?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 32,
    name: '萊爾富',
    logo: 'https://images.unsplash.com/photo-1613227531902-7a8bc9b87222?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 33,
    name: '摩斯漢堡',
    logo: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 34,
    name: '頂呱呱',
    logo: 'https://images.unsplash.com/photo-1604909052881-3e0b2c3b2d80?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 35,
    name: 'Sukiya',
    logo: 'https://images.unsplash.com/photo-1617196034796-73cbb2e3b9b2?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 36,
    name: '爭鮮',
    logo: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 37,
    name: '壽司郎',
    logo: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 38,
    name: 'Giordano',
    logo: 'https://images.unsplash.com/photo-1520975958225-9d0b7e29c0b9?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 39,
    name: 'H&M',
    logo: 'https://images.unsplash.com/photo-1520975682031-a63f3d7002b7?w=800&h=800&fit=crop&q=90',
  },
  {
    id: 40,
    name: 'ZARA',
    logo: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=800&fit=crop&q=90',
  },
]

// 假資料：熱門票券
const popularTickets = [
  {
    id: 1,
    storeName: 'Subway信義店',
    points: 350,
    ticketName: 'PayEasy大吉大利套餐',
    image: 'https://images.unsplash.com/photo-1764344815160-0e2afc6939a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWJ3YXklMjBzYW5kd2ljaCUyMHNob3B8ZW58MXx8fHwxNzY1MTg4ODEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    // 假資料：票券可使用期間（CuponTicket 用）
    period: '2024/08/21-2024/12/31',
    // 假資料：使用步驟（CuponTicket 用，文字對齊你提供的範例）
    usageSteps: [
      '選擇餐點，前往大吉大利堡，選擇您喜愛的滿額套合。',
      '結帳前，結帳時，告知服務人員您持有 PayEasy 優惠券，並出示優惠券號碼。',
      '輸入優惠碼，如果您使用的是電子優惠券，請在結帳時輸入優惠碼或掃描二維碼。',
      '享受折扣，結帳時，NT$125 元的折扣將自動應用於您的總金額。',
    ],
    // 假資料：使用條款（CuponTicket 用，文字對齊你提供的範例）
    usageTerms: [
      '此優惠僅限於大吉大利堡套餐與特定的分店使用。',
      '優惠券不得與其他優惠或促銷活動合併使用。',
      '優惠券一經使用即失效，不可重複使用。',
      '請在有效期限內使用，逾期無效。',
    ],
  },
  {
    id: 2,
    storeName: '星巴克南京店',
    points: 280,
    ticketName: '中杯咖啡兌換券',
    image: 'https://images.unsplash.com/photo-1581470762681-018024ce84a7?w=1200&h=1200&fit=crop&q=90',
  },
  {
    id: 3,
    storeName: '威秀影城信義店',
    points: 420,
    ticketName: '電影票兌換券',
    image: 'https://images.unsplash.com/photo-1751823886813-0cfc86cb9478?w=1200&h=1200&fit=crop&q=90',
  },
  {
    id: 4,
    storeName: '康是美忠孝店',
    points: 180,
    ticketName: '購物金兌換券',
    image: 'https://images.unsplash.com/photo-1762420873673-f712e44b5dfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMHN0b3JlJTIwY29sb3JmdWx8ZW58MXx8fHwxNzY1MTg4ODExfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    storeName: 'SPA會館大安店',
    points: 500,
    ticketName: '按摩體驗券',
    image: 'https://images.unsplash.com/photo-1757689314932-bec6e9c39e51?w=1200&h=1200&fit=crop&q=90',
  },
  {
    id: 6,
    storeName: '家樂福桂林店',
    points: 280,
    ticketName: '購物金兌換券',
    image: 'https://images.unsplash.com/photo-1627189783170-b65ff48da3b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGNhcnJlZm91ciUyMGNvbG9yZnVsfGVufDF8fHx8MTc2NTE4ODgxMXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
]

// 假資料：主題推薦店家
const themeStores = [
  {
    id: 1,
    theme: '美食饗宴',
    storeCount: 12,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=900&fit=crop&q=90',
    stores: [
      {
        id: 101,
        name: '築間幸福鍋物',
        category: '美食 > 火鍋',
        rating: 4.5,
        distance: 1.2,
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&h=900&fit=crop&q=90'
      },
      {
        id: 102,
        name: '欣葉台菜',
        category: '美食 > 台菜',
        rating: 4.8,
        distance: 2.5,
        image: 'https://images.unsplash.com/photo-1665898362159-616b0ade1044?w=1200&h=900&fit=crop&q=90'
      },
      {
        id: 103,
        name: '饗食天堂',
        category: '美食 > 吃到飽',
        rating: 4.3,
        distance: 3.1,
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=900&fit=crop&q=90'
      },
    ],
  },
  {
    id: 2,
    theme: '美味甜點',
    storeCount: 16,
    image: 'https://images.unsplash.com/photo-1760144597294-1242e99658c8?w=1200&h=900&fit=crop&q=90', stores: [
      {
        id: 201,
        name: 'Lady M',
        category: '甜點 > 蛋糕',
        rating: 4.6,
        distance: 0.8,
        image: 'https://images.unsplash.com/photo-1692448971346-2433e35d50d5?w=1200&h=900&fit=crop&q=90'
      },
      {
        id: 202,
        name: 'Häagen-Dazs',
        category: '甜點 > 冰淇淋',
        rating: 4.5,
        distance: 1.5,
        image: 'https://images.unsplash.com/photo-1673551494246-0ea345ddbf86?w=1200&h=900&fit=crop&q=90'
      },
      {
        id: 203,
        name: '春水堂',
        category: '甜點 > 珍珠奶茶',
        rating: 4.4,
        distance: 1.1,
        image: 'https://images.unsplash.com/photo-1756969953423-2c199c6dbd79?w=1200&h=900&fit=crop&q=90'
      },
    ],
  },
  {
    id: 3,
    theme: '生活家居',
    storeCount: 18,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&h=900&fit=crop&q=90', stores: [
      {
        id: 301,
        name: 'HOLA',
        category: '生活家居 > 家居用品',
        rating: 4.4,
        distance: 1.6,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=900&fit=crop&q=90'
      },
      {
        id: 302,
        name: '特力屋',
        category: '生活家居 > 生活修繕',
        rating: 4.2,
        distance: 2.4,
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=900&fit=crop&q=90'
      },
      {
        id: 303,
        name: '生活工場',
        category: '生活家居 > 生活雜貨',
        rating: 4.1,
        distance: 0.9,
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=900&fit=crop&q=90'
      },
    ],
  },
  {
    id: 4,
    theme: '休閒娛樂',
    storeCount: 14,
    image: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=1200&h=900&fit=crop&q=90',
    stores: [
      {
        id: 401,
        name: '威秀影城',
        category: '休閒娛樂 > 電影院',
        rating: 4.6,
        distance: 1.3,
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=900&fit=crop&q=90'
      },
      {
        id: 402,
        name: '錢櫃KTV',
        category: '休閒娛樂 > KTV',
        rating: 4.2,
        distance: 2.1,
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=900&fit=crop&q=90'
      },
      {
        id: 403,
        name: '湯姆熊',
        category: '休閒娛樂 > 遊樂場',
        rating: 4.0,
        distance: 1.8,
        image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=1200&h=900&fit=crop&q=90'
      },
    ],
  },
  {
    id: 5,
    theme: '時尚服飾',
    storeCount: 20,
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=900&fit=crop&q=90',
    stores: [
      {
        id: 501,
        name: 'UNIQLO',
        category: '時尚服飾 > 服飾店',
        rating: 4.5,
        distance: 1.2,
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=900&fit=crop&q=90'
      },
      {
        id: 502,
        name: 'ZARA',
        category: '時尚服飾 > 服飾店',
        rating: 4.4,
        distance: 2.0,
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=900&fit=crop&q=90'
      },
      {
        id: 503,
        name: 'NET',
        category: '時尚服飾 > 服飾店',
        rating: 4.2,
        distance: 1.5,
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&h=900&fit=crop&q=90'
      },
    ],
  },
  {
    id: 6,
    theme: '運動健身',
    storeCount: 15,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=900&fit=crop&q=90',
    stores: [
      {
        id: 601,
        name: 'World Gym',
        category: '運動健身 > 健身中心',
        rating: 4.3,
        distance: 2.6,
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=900&fit=crop&q=90'
      },
      {
        id: 602,
        name: 'Nike',
        category: '運動健身 > 運動用品',
        rating: 4.6,
        distance: 1.7,
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=900&fit=crop&q=90'
      },
      {
        id: 603,
        name: 'Adidas',
        category: '運動健身 > 運動用品',
        rating: 4.5,
        distance: 2.2,
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=900&fit=crop&q=90'
      },
    ],
  },
]

// 假資料：特約店家第一頁（固定 12 筆，對齊你提供的 UI 範例）
const page1PartnerStores = [
  {
    id: 1,
    name: '王品牛排 台北信義店',
    category: '美食 > 連鎖餐廳',
    rating: 4.5,
    distance: 1.2,
    coupon: '平日午餐9折優惠券',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=1200&h=900&fit=crop&q=90',
    description: '王品牛排是台灣知名的高級牛排餐廳，提供優質的牛排料理和精緻的用餐體驗。',
    address: '台北市信義區信義路五段7號',
    phone: '02-2345-6789',
    coupons: [
      {
        id: 1,
        name: '內用85折優惠',
        condition: '消費滿$100元',
        period: '至 2024.02.03',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=96&h=96&fit=crop&q=90',
      },
      {
        id: 2,
        name: '雙人套餐優惠',
        condition: '消費滿$2000元',
        period: '至 2024.03.15',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=96&h=96&fit=crop&q=90',
      },
      {
        id: 3,
        name: '經典牛排買一送一',
        condition: '限平日使用',
        period: '至 2024.04.30',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=96&h=96&fit=crop&q=90',
      },
      {
        id: 4,
        name: '生日專屬優惠',
        condition: '當月壽星憑證',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=96&h=96&fit=crop&q=90',
      },
      {
        id: 5,
        name: '甜點飲品免費升級',
        condition: '消費滿$1500元',
        period: '至 2024.06.30',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=96&h=96&fit=crop&q=90',
      },
    ],
  },
  {
    id: 2,
    name: '屈臣氏 忠孝復興門市',
    category: '美妝保養 > 連鎖藥妝',
    rating: 4.3,
    distance: 0.8,
    coupon: '滿千送百購物金',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop',
    description: '屈臣氏是亞洲領先的保健及美容產品零售商，提供多樣化的美妝保養商品。',
    address: '台北市大安區忠孝東路四段200號',
    phone: '02-2771-2345',
    coupons: [
      {
        id: 1,
        name: '滿千送百購物金',
        condition: '消費滿$1000元',
        period: '至 2024.05.31',
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=96&h=96&fit=crop&q=90',
      },
    ],
  },
  {
    id: 3,
    name: '誠品書店 信義旗艦店',
    category: '書籍文具 > 連鎖書店',
    rating: 4.7,
    distance: 1.5,
    coupon: '會員專屬折價券',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=300&h=200&fit=crop',
    description: '誠品書店是台灣知名的連鎖書店，提供豐富的書籍、文創商品和文化活動。',
    address: '台北市信義區松高路11號',
    phone: '02-8789-3388',
    coupons: [
      {
        id: 1,
        name: '會員專屬折價券',
        condition: '會員專屬',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=96&h=96&fit=crop&q=90',
      },
    ],
  },
  {
    id: 4,
    name: 'NET 西門門市',
    category: '服飾配件 > 服飾店',
    rating: 4.2,
    distance: 2.3,
    coupon: '新品上市優惠券',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&h=200&fit=crop',
    description: 'NET 是台灣知名的服飾品牌，提供時尚、平價的服飾商品。',
    address: '台北市萬華區西門町',
    phone: '02-2311-2233',
    coupons: [
      {
        id: 1,
        name: '新品上市優惠券',
        condition: '新品專區適用',
        period: '至 2024.06.30',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=96&h=96&fit=crop&q=90',
      },
    ],
  },
  {
    id: 5,
    name: '85度C 南京東路店',
    category: '咖啡飲品 > 連鎖咖啡',
    rating: 4.4,
    distance: 0.5,
    coupon: '指定商品買一送一',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300&h=200&fit=crop',
    description: '85度C 是台灣知名的連鎖咖啡品牌，提供優質的咖啡和蛋糕。',
    address: '台北市中山區南京東路三段',
    phone: '02-2508-8888',
    coupons: [
      {
        id: 1,
        name: '指定商品買一送一',
        condition: '指定商品適用',
        period: '至 2024.07.31',
        image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=96&h=96&fit=crop&q=90',
      },
    ],
  },
  {
    id: 6,
    name: '寶雅 中山店',
    category: '生活百貨 > 連鎖商店',
    rating: 4.1,
    distance: 1.8,
    coupon: '滿額贈品兌換券',
    image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=300&h=200&fit=crop',
    description: '寶雅是台灣知名的生活百貨連鎖店，提供多樣化的生活用品。',
    address: '台北市中山區中山北路二段',
    phone: '02-2567-8899',
    coupons: [
      {
        id: 1,
        name: '滿額贈品兌換券',
        condition: '消費滿$500元',
        period: '至 2024.08.31',
        image: 'https://images.unsplash.com/photo-1604719312566-8912e92277c6?w=96&h=96&fit=crop&q=90',
      },
    ],
  },
  {
    id: 7,
    name: 'SOGO 忠孝館',
    category: '百貨商場 > 百貨公司',
    rating: 4.6,
    distance: 1.3,
    coupon: '週年慶滿額禮券',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=300&h=200&fit=crop',
    description: 'SOGO 是台灣知名的百貨公司，提供時尚、精品和美食。',
    address: '台北市大安區忠孝東路四段45號',
    phone: '02-2776-5555',
    coupons: [
      {
        id: 1,
        name: '週年慶滿額禮券',
        condition: '消費滿$3000元',
        period: '至 2024.09.30',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=96&h=96&fit=crop&q=90',
      },
    ],
  },
  {
    id: 8,
    name: '家樂福 桂林店',
    category: '量販超市 > 連鎖超市',
    rating: 4.0,
    distance: 2.7,
    coupon: '生鮮商品折扣券',
    image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=300&h=200&fit=crop',
    description: '家樂福是台灣知名的量販超市，提供多樣化的生鮮和日用品。',
    address: '台北市萬華區桂林路',
    phone: '02-2308-1234',
    coupons: [
      {
        id: 1,
        name: '生鮮商品折扣券',
        condition: '生鮮專區適用',
        period: '至 2024.10.31',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=96&h=96&fit=crop&q=90',
      },
    ],
  },
  {
    id: 9,
    name: 'Uniqlo 信義旗艦店',
    category: '服飾配件 > 服飾店',
    rating: 4.5,
    distance: 1.6,
    coupon: '限時特價優惠券',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=200&fit=crop',
    description: 'Uniqlo 是日本知名的服飾品牌，提供簡約、高品質的服飾。',
    address: '台北市信義區松高路19號',
    phone: '02-2723-4567',
    coupons: [
      {
        id: 1,
        name: '限時特價優惠券',
        condition: '特價商品適用',
        period: '至 2024.11.30',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=96&h=96&fit=crop&q=90',
      },
    ],
  },
  {
    id: 10,
    name: '莫凡彼 微風廣場店',
    category: '冰品甜點 > 冰淇淋店',
    rating: 4.8,
    distance: 1.1,
    coupon: 'VIP點數回饋券',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop',
    address: '台北市松山區復興南路一段39號',
    phone: '02-8772-3456',
    coupons: [
      {
        id: 1,
        name: 'VIP點數回饋券',
        condition: 'VIP會員專屬',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=96&h=96&fit=crop&q=90',
      },
    ],
  },
  {
    id: 11,
    name: '健身工廠 內湖旗艦店',
    category: '運動健身 > 健身中心',
    rating: 4.4,
    distance: 3.2,
    coupon: '首月入會優惠券',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop',
    description: '健身工廠是台灣知名的連鎖健身中心，提供專業的健身設備和課程。',
    address: '台北市內湖區內湖路一段',
    phone: '02-2799-8888',
    coupons: [
      {
        id: 1,
        name: '首月入會優惠券',
        condition: '新會員專屬',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=96&h=96&fit=crop&q=90',
      },
    ],
  },
  {
    id: 12,
    name: '康是美 南京店',
    category: '藥妝保健 > 連鎖藥妝',
    rating: 4.3,
    distance: 0.9,
    coupon: '會員獨享折扣券',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop',
    description: '康是美是台灣知名的連鎖藥妝店，提供多樣化的美妝和保健商品。',
    address: '台北市中山區南京東路二段',
    phone: '02-2507-9999',
    coupons: [
      {
        id: 1,
        name: '會員獨享折扣券',
        condition: '會員專屬',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=96&h=96&fit=crop&q=90',
      },
    ],
  },
]

// 假資料：特約店家（種子資料，後續用來產生更多假資料）
const seedPartnerStores = [
  {
    id: 1,
    name: '漢堡王 新店門市',
    category: '美食 > 速食餐廳',
    rating: 4.3,
    distance: 2.8,
    coupon: '套餐折價券',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '套餐折價券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 2,
    name: '麥當勞 士林店',
    category: '美食 > 速食餐廳',
    rating: 4.4,
    distance: 1.9,
    coupon: '早餐優惠券',
    image: 'https://images.unsplash.com/photo-1619454016518-697bc231e7cb?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '早餐優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1619454016518-697bc231e7cb?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 3,
    name: 'KFC 肯德基 三重店',
    category: '美食 > 速食餐廳',
    rating: 4.2,
    distance: 3.3,
    coupon: '全家餐折扣券',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '全家餐折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 4,
    name: '摩斯漢堡 永和店',
    category: '美食 > 速食餐廳',
    rating: 4.5,
    distance: 2.4,
    coupon: '飲料升級券',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '飲料升級券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 5,
    name: '路易莎咖啡 內湖店',
    category: '咖啡飲品 > 連鎖咖啡',
    rating: 4.6,
    distance: 1.2,
    coupon: '咖啡買一送一券',
    image: 'https://images.unsplash.com/photo-1542992015-4a0b729b1385?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '咖啡買一送一券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1542992015-4a0b729b1385?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 6,
    name: 'Cama Café 中山店',
    category: '咖啡飲品 > 連鎖咖啡',
    rating: 4.4,
    distance: 0.7,
    coupon: '會員積點雙倍券',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '會員積點雙倍券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 7,
    name: '丹堤咖啡 南港店',
    category: '咖啡飲品 > 連鎖咖啡',
    rating: 4.3,
    distance: 2.6,
    coupon: '輕食組合折扣券',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '輕食組合折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 8,
    name: '西雅圖咖啡 板橋店',
    category: '咖啡飲品 > 連鎖咖啡',
    rating: 4.2,
    distance: 3.1,
    coupon: '外帶飲品優惠券',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '外帶飲品優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 9,
    name: '日藥本舖 西門店',
    category: '藥妝保健 > 連鎖藥妝',
    rating: 4.4,
    distance: 1.8,
    coupon: '美妝滿額贈券',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '美妝滿額贈券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 10,
    name: '杏一醫療 天母店',
    category: '藥妝保健 > 連鎖藥妝',
    rating: 4.1,
    distance: 2.7,
    coupon: '保健品折扣券',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '保健品折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 11,
    name: '小林藥局 林口店',
    category: '藥妝保健 > 連鎖藥妝',
    rating: 4.0,
    distance: 4.2,
    coupon: '會員日優惠券',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '會員日優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 12,
    name: 'Tomod\'s 中和店',
    category: '藥妝保健 > 連鎖藥妝',
    rating: 4.3,
    distance: 3.4,
    coupon: '指定品牌折扣券',
    image: 'https://images.unsplash.com/photo-1556228852-80f751a62c7b?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '指定品牌折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1556228852-80f751a62c7b?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 13,
    name: 'World Gym 台北旗艦店',
    category: '運動健身 > 健身中心',
    rating: 4.7,
    distance: 2.5,
    coupon: '體驗課程券',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '體驗課程券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 14,
    name: 'True Fitness 信義店',
    category: '運動健身 > 健身中心',
    rating: 4.5,
    distance: 1.5,
    coupon: '入會優惠券',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '入會優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 15,
    name: 'Curves 女性健身 松山店',
    category: '運動健身 > 健身中心',
    rating: 4.4,
    distance: 1.3,
    coupon: '女性專屬優惠券',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '女性專屬優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 16,
    name: '亞力山大健身 桃園店',
    category: '運動健身 > 健身中心',
    rating: 4.2,
    distance: 3.9,
    coupon: '季度方案折扣券',
    image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '季度方案折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 17,
    name: '寬庭美學 大直店',
    category: '美容保養 > 美容院',
    rating: 4.8,
    distance: 2.3,
    coupon: '美容課程優惠券',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '美容課程優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 18,
    name: '曼都髮型 中壢店',
    category: '美容保養 > 美髮沙龍',
    rating: 4.3,
    distance: 3.7,
    coupon: '造型服務折扣券',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '造型服務折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 19,
    name: '小林髮廊 台中店',
    category: '美容保養 > 美髮沙龍',
    rating: 4.4,
    distance: 2.8,
    coupon: '洗剪護優惠券',
    image: 'https://images.unsplash.com/photo-1521490683712-35a1cb235d1c?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '洗剪護優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1521490683712-35a1cb235d1c?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 20,
    name: 'LUSSO 髮藝 高雄店',
    category: '美容保養 > 美髮沙龍',
    rating: 4.6,
    distance: 1.6,
    coupon: '燙染套餐折扣券',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '燙染套餐折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 21,
    name: '春天百貨 嘉義店',
    category: '百貨商場 > 百貨公司',
    rating: 4.1,
    distance: 4.8,
    coupon: '滿額贈禮券',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '滿額贈禮券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 22,
    name: '新光三越 台南店',
    category: '百貨商場 > 百貨公司',
    rating: 4.5,
    distance: 3.2,
    coupon: '週年慶優惠券',
    image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c2a6?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '週年慶優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c2a6?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 23,
    name: '大遠百 板橋店',
    category: '百貨商場 > 百貨公司',
    rating: 4.4,
    distance: 2.1,
    coupon: '會員專屬折扣券',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '會員專屬折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 24,
    name: '微風廣場 松高店',
    category: '百貨商場 > 百貨公司',
    rating: 4.7,
    distance: 1.2,
    coupon: '貴賓卡點數加倍券',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '貴賓卡點數加倍券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 25,
    name: 'Costco 好市多 汐止店',
    category: '量販超市 > 連鎖賣場',
    rating: 4.6,
    distance: 5.2,
    coupon: '會員續約優惠券',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '會員續約優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 26,
    name: '大潤發 中和店',
    category: '量販超市 > 連鎖賣場',
    rating: 4.2,
    distance: 3.6,
    coupon: '生鮮商品折扣券',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '生鮮商品折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 27,
    name: '愛買 桃園店',
    category: '量販超市 > 連鎖賣場',
    rating: 4.0,
    distance: 4.1,
    coupon: '滿額現折券',
    image: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '滿額現折券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 28,
    name: '頂好超市 大安店',
    category: '量販超市 > 連鎖超市',
    rating: 4.1,
    distance: 0.9,
    coupon: '會員積點券',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '會員積點券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 29,
    name: 'CoCo都可 文山店',
    category: '咖啡飲品 > 手搖飲',
    rating: 4.5,
    distance: 1.1,
    coupon: '第二杯半價券',
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '第二杯半價券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 30,
    name: '清心福全 新莊店',
    category: '咖啡飲品 > 手搖飲',
    rating: 4.3,
    distance: 2.9,
    coupon: '飲料折價券',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '飲料折價券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 31,
    name: '50嵐 三重店',
    category: '咖啡飲品 > 手搖飲',
    rating: 4.4,
    distance: 3.4,
    coupon: '指定品項優惠券',
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '指定品項優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 32,
    name: '天仁茗茶 永和店',
    category: '咖啡飲品 > 茶飲店',
    rating: 4.2,
    distance: 2.5,
    coupon: '茶葉禮盒折扣券',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '茶葉禮盒折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 33,
    name: '日出茶太 南港店',
    category: '咖啡飲品 > 手搖飲',
    rating: 4.6,
    distance: 2.7,
    coupon: '買一送一券',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '買一送一券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 34,
    name: '貢茶 板橋店',
    category: '咖啡飲品 > 手搖飲',
    rating: 4.5,
    distance: 2.3,
    coupon: '會員日優惠券',
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '會員日優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 35,
    name: '三商巧福 中和店',
    category: '美食 > 速食餐廳',
    rating: 4.1,
    distance: 3.1,
    coupon: '套餐升級券',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '套餐升級券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 36,
    name: '鬍鬚張 台北車站店',
    category: '美食 > 連鎖餐廳',
    rating: 4.4,
    distance: 1.4,
    coupon: '滷肉飯折扣券',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '滷肉飯折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 37,
    name: '八方雲集 內湖店',
    category: '美食 > 連鎖餐廳',
    rating: 4.3,
    distance: 1.8,
    coupon: '鍋貼優惠券',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '鍋貼優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 38,
    name: '五花馬 桃園店',
    category: '美食 > 連鎖餐廳',
    rating: 4.2,
    distance: 3.8,
    coupon: '水餃折價券',
    image: 'https://images.unsplash.com/photo-1626158404058-44d3d9d1d159?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '水餃折價券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1626158404058-44d3d9d1d159?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 39,
    name: '添好運 台北101店',
    category: '美食 > 港式餐廳',
    rating: 4.7,
    distance: 1.5,
    coupon: '點心折扣券',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '點心折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 40,
    name: '鼎泰豐 信義店',
    category: '美食 > 台式餐廳',
    rating: 4.9,
    distance: 1.3,
    coupon: '小籠包優惠券',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '小籠包優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 41,
    name: '瓦城泰統 南港店',
    category: '美食 > 泰式餐廳',
    rating: 4.6,
    distance: 2.6,
    coupon: '雙人套餐折扣券',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '雙人套餐折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 42,
    name: '涓豆腐 板橋店',
    category: '美食 > 韓式餐廳',
    rating: 4.5,
    distance: 2.2,
    coupon: '豆腐鍋優惠券',
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '豆腐鍋優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 43,
    name: '和民居食屋 台北店',
    category: '美食 > 日式餐廳',
    rating: 4.4,
    distance: 1.7,
    coupon: '串燒折扣券',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '串燒折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 44,
    name: '勝博殿 信義店',
    category: '美食 > 日式餐廳',
    rating: 4.7,
    distance: 1.4,
    coupon: '定食套餐優惠券',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '定食套餐優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 45,
    name: '藏壽司 新北店',
    category: '美食 > 日式餐廳',
    rating: 4.6,
    distance: 3.3,
    coupon: '迴轉壽司折扣券',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '迴轉壽司折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 46,
    name: '爭鮮迴轉壽司 中壢店',
    category: '美食 > 日式餐廳',
    rating: 4.3,
    distance: 3.9,
    coupon: '壽司優惠券',
    image: 'https://images.unsplash.com/photo-1563612116625-3012372fccce?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '壽司優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1563612116625-3012372fccce?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 47,
    name: '必勝客 士林店',
    category: '美食 > 速食餐廳',
    rating: 4.2,
    distance: 2.4,
    coupon: '披薩買一送一券',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '披薩買一送一券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 48,
    name: '達美樂 三重店',
    category: '美食 > 速食餐廳',
    rating: 4.4,
    distance: 3.2,
    coupon: '外送免運券',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '外送免運券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 49,
    name: 'Subway 南京店',
    category: '美食 > 速食餐廳',
    rating: 4.3,
    distance: 1.1,
    coupon: '潛艇堡折扣券',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '潛艇堡折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 50,
    name: 'Haagen-Dazs 信義店',
    category: '冰品甜點 > 冰淇淋店',
    rating: 4.8,
    distance: 1.6,
    coupon: '冰淇淋優惠券',
    image: 'https://images.unsplash.com/photo-1560008581-09b41e1a2d2f?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '冰淇淋優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1560008581-09b41e1a2d2f?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 51,
    name: 'Cold Stone 台北店',
    category: '冰品甜點 > 冰淇淋店',
    rating: 4.7,
    distance: 1.8,
    coupon: '冰品升級券',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '冰品升級券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 52,
    name: '31冰淇淋 板橋店',
    category: '冰品甜點 > 冰淇淋店',
    rating: 4.6,
    distance: 2.7,
    coupon: '雙球優惠券',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '雙球優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 53,
    name: '鮮芋仙 西門店',
    category: '冰品甜點 > 甜品店',
    rating: 4.5,
    distance: 2.1,
    coupon: '甜品折扣券',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '甜品折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 54,
    name: '滿茶堂 永和店',
    category: '冰品甜點 > 甜品店',
    rating: 4.4,
    distance: 2.5,
    coupon: '豆花優惠券',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '豆花優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 55,
    name: '黑丸嫩仙草 新莊店',
    category: '冰品甜點 > 甜品店',
    rating: 4.3,
    distance: 3.1,
    coupon: '仙草折價券',
    image: 'https://images.unsplash.com/photo-1559527403-7a818dc94821?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '仙草折價券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1559527403-7a818dc94821?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 56,
    name: '爭鮮外帶壽司 桃園店',
    category: '美食 > 日式餐廳',
    rating: 4.2,
    distance: 3.7,
    coupon: '外帶壽司優惠券',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '外帶壽司優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 57,
    name: 'Mo-Mo-Paradise 台北店',
    category: '美食 > 火鍋',
    rating: 4.6,
    distance: 1.9,
    coupon: '壽喜燒吃到飽券',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '壽喜燒吃到飽券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 58,
    name: '聚北海道昆布鍋 南港店',
    category: '美食 > 火鍋',
    rating: 4.7,
    distance: 2.8,
    coupon: '火鍋套餐折扣券',
    image: 'https://images.unsplash.com/photo-1600188097001-6c054d9d65a6?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '火鍋套餐折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1600188097001-6c054d9d65a6?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 59,
    name: '石二鍋 板橋店',
    category: '美食 > 火鍋',
    rating: 4.5,
    distance: 2.3,
    coupon: '個人鍋優惠券',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '個人鍋優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 60,
    name: '馬辣頂級麻辣鴛鴦火鍋 信義店',
    category: '美食 > 火鍋',
    rating: 4.8,
    distance: 1.5,
    coupon: '吃到飽折扣券',
    image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '吃到飽折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 61,
    name: '大心新泰式麵食 台北店',
    category: '美食 > 泰式餐廳',
    rating: 4.4,
    distance: 1.7,
    coupon: '泰式料理優惠券',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '泰式料理優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 62,
    name: '瓦城泰國料理 板橋店',
    category: '美食 > 泰式餐廳',
    rating: 4.6,
    distance: 2.4,
    coupon: '套餐折扣券',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '套餐折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 63,
    name: '金色三麥 信義店',
    category: '美食 > 異國餐廳',
    rating: 4.5,
    distance: 1.6,
    coupon: '啤酒餐廳優惠券',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '啤酒餐廳優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 64,
    name: '好樂迪KTV 台北店',
    category: '休閒娛樂 > KTV',
    rating: 4.3,
    distance: 2.2,
    coupon: '歡唱優惠券',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '歡唱優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 65,
    name: '星聚點KTV 板橋店',
    category: '休閒娛樂 > KTV',
    rating: 4.4,
    distance: 2.6,
    coupon: 'KTV包廂折扣券',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: 'KTV包廂折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 66,
    name: '王品集團 陶板屋 台北店',
    category: '美食 > 連鎖餐廳',
    rating: 4.7,
    distance: 1.4,
    coupon: '和風套餐折扣券',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '和風套餐折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 67,
    name: '王品集團 夏慕尼 信義店',
    category: '美食 > 連鎖餐廳',
    rating: 4.8,
    distance: 1.5,
    coupon: '鐵板燒優惠券',
    image: 'https://images.unsplash.com/photo-1542992015-4a0b729b1385?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '鐵板燒優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1542992015-4a0b729b1385?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 68,
    name: '王品集團 原燒 南港店',
    category: '美食 > 連鎖餐廳',
    rating: 4.6,
    distance: 2.7,
    coupon: '燒肉套餐折扣券',
    image: 'https://images.unsplash.com/photo-1590189599125-67138c6509ef?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '燒肉套餐折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1590189599125-67138c6509ef?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 69,
    name: '欣葉日本料理 台北店',
    category: '美食 > 日式餐廳',
    rating: 4.7,
    distance: 1.8,
    coupon: '日式料理優惠券',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '日式料理優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 70,
    name: '寬心園精緻蔬食 板橋店',
    category: '美食 > 素食餐廳',
    rating: 4.5,
    distance: 2.5,
    coupon: '素食套餐折扣券',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '素食套餐折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 71,
    name: '果然匯蔬食宴 台北店',
    category: '美食 > 素食餐廳',
    rating: 4.6,
    distance: 1.9,
    coupon: '蔬食buffet優惠券',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '蔬食buffet優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 72,
    name: '上閤屋日式料理 南港店',
    category: '美食 > 日式餐廳',
    rating: 4.4,
    distance: 2.9,
    coupon: '日式吃到飽券',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '日式吃到飽券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 73,
    name: '品田牧場 信義店',
    category: '美食 > 日式餐廳',
    rating: 4.5,
    distance: 1.6,
    coupon: '豬排套餐優惠券',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '豬排套餐優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 74,
    name: '和食さと 板橋店',
    category: '美食 > 日式餐廳',
    rating: 4.3,
    distance: 2.4,
    coupon: '日式料理折扣券',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '日式料理折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 75,
    name: '千葉火鍋 台北店',
    category: '美食 > 火鍋',
    rating: 4.5,
    distance: 2.1,
    coupon: '火鍋吃到飽券',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '火鍋吃到飽券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 76,
    name: '海底撈火鍋 信義店',
    category: '美食 > 火鍋',
    rating: 4.9,
    distance: 1.7,
    coupon: '麻辣火鍋優惠券',
    image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '麻辣火鍋優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 77,
    name: '饗樂全日餐廳 台北店',
    category: '美食 > 吃到飽',
    rating: 4.6,
    distance: 1.8,
    coupon: 'buffet折扣券',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: 'buffet折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 78,
    name: '漢來海港餐廳 板橋店',
    category: '美食 > 吃到飽',
    rating: 4.8,
    distance: 2.6,
    coupon: '海鮮buffet優惠券',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '海鮮buffet優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 79,
    name: '凱撒飯店 Checkers 台北店',
    category: '美食 > 吃到飽',
    rating: 4.7,
    distance: 1.5,
    coupon: '自助餐折扣券',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '自助餐折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 80,
    name: '君悅酒店 凱菲屋 信義店',
    category: '美食 > 吃到飽',
    rating: 4.9,
    distance: 1.4,
    coupon: '國際buffet優惠券',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '國際buffet優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 81,
    name: '神旺飯店 伯品廊 台北店',
    category: '美食 > 吃到飽',
    rating: 4.6,
    distance: 1.9,
    coupon: '自助晚餐折扣券',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '自助晚餐折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 82,
    name: '欣葉小聚今品 台北店',
    category: '美食 > 台菜',
    rating: 4.5,
    distance: 2.2,
    coupon: '台菜套餐優惠券',
    image: 'https://images.unsplash.com/photo-1665898362159-616b0ade1044?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '台菜套餐優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1665898362159-616b0ade1044?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 83,
    name: '青葉新樂園 信義店',
    category: '美食 > 台菜',
    rating: 4.4,
    distance: 1.6,
    coupon: '台灣料理折扣券',
    image: 'https://images.unsplash.com/photo-1665898362159-616b0ade1044?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '台灣料理折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1665898362159-616b0ade1044?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 84,
    name: '天香樓 台北店',
    category: '美食 > 台菜',
    rating: 4.6,
    distance: 1.7,
    coupon: '經典台菜優惠券',
    image: 'https://images.unsplash.com/photo-1665898362159-616b0ade1044?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '經典台菜優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1665898362159-616b0ade1044?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 85,
    name: '台南擔仔麵 南港店',
    category: '美食 > 台菜',
    rating: 4.3,
    distance: 2.8,
    coupon: '擔仔麵折扣券',
    image: 'https://images.unsplash.com/photo-1665898362159-616b0ade1044?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '擔仔麵折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1665898362159-616b0ade1044?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 86,
    name: '度小月 台北店',
    category: '美食 > 台菜',
    rating: 4.5,
    distance: 1.8,
    coupon: '小吃套餐優惠券',
    image: 'https://images.unsplash.com/photo-1665898362159-616b0ade1044?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '小吃套餐優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1665898362159-616b0ade1044?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 87,
    name: '鼎王麻辣鍋 板橋店',
    category: '美食 > 火鍋',
    rating: 4.7,
    distance: 2.5,
    coupon: '鴛鴦鍋折扣券',
    image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '鴛鴦鍋折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 88,
    name: '無老鍋 台北店',
    category: '美食 > 火鍋',
    rating: 4.6,
    distance: 2.0,
    coupon: '養生鍋優惠券',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '養生鍋優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 89,
    name: '老四川巴蜀麻辣燙 信義店',
    category: '美食 > 火鍋',
    rating: 4.5,
    distance: 1.6,
    coupon: '麻辣鍋折扣券',
    image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '麻辣鍋折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 90,
    name: '大方和風鍋物 南港店',
    category: '美食 > 火鍋',
    rating: 4.4,
    distance: 2.9,
    coupon: '日式鍋物優惠券',
    image: 'https://images.unsplash.com/photo-1600188097001-6c054d9d65a6?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '日式鍋物優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1600188097001-6c054d9d65a6?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 91,
    name: '肉多多火鍋 板橋店',
    category: '美食 > 火鍋',
    rating: 4.6,
    distance: 2.4,
    coupon: '肉盤加量券',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '肉盤加量券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 92,
    name: '錢都日式涮涮鍋 新莊店',
    category: '美食 > 火鍋',
    rating: 4.3,
    distance: 3.3,
    coupon: '涮涮鍋折扣券',
    image: 'https://images.unsplash.com/photo-1600188097001-6c054d9d65a6?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '涮涮鍋折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1600188097001-6c054d9d65a6?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 93,
    name: '酷聖石冰淇淋 信義店',
    category: '冰品甜點 > 冰淇淋店',
    rating: 4.7,
    distance: 1.5,
    coupon: '冰淇淋組合優惠券',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '冰淇淋組合優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 94,
    name: '義美餐廳 台北店',
    category: '美食 > 連鎖餐廳',
    rating: 4.2,
    distance: 2.1,
    coupon: '中式套餐折扣券',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '中式套餐折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 95,
    name: 'TGI Friday\'s 板橋店',
    category: '美食 > 異國餐廳',
    rating: 4.5,
    distance: 2.5,
    coupon: '美式餐廳優惠券',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '美式餐廳優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 96,
    name: 'Chili\'s 美式餐廳 台北店',
    category: '美食 > 異國餐廳',
    rating: 4.4,
    distance: 1.9,
    coupon: '西式套餐折扣券',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '西式套餐折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 97,
    name: '星巴克 信義門市',
    category: '咖啡飲品 > 連鎖咖啡',
    rating: 4.7,
    distance: 1.2,
    coupon: '第二杯半價券',
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '第二杯半價券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 98,
    name: '星巴克 南港門市',
    category: '咖啡飲品 > 連鎖咖啡',
    rating: 4.6,
    distance: 2.8,
    coupon: '買一送一券',
    image: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '買一送一券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 99,
    name: '星巴克 板橋門市',
    category: '咖啡飲品 > 連鎖咖啡',
    rating: 4.5,
    distance: 3.2,
    coupon: '早餐套餐優惠',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '早餐套餐優惠',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 100,
    name: '星巴克 中山門市',
    category: '咖啡飲品 > 連鎖咖啡',
    rating: 4.6,
    distance: 0.9,
    coupon: '會員積點雙倍',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '會員積點雙倍',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 101,
    name: '星巴克 內湖門市',
    category: '咖啡飲品 > 連鎖咖啡',
    rating: 4.5,
    distance: 3.5,
    coupon: '外帶飲品折扣',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '外帶飲品折扣',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 102,
    name: 'IKEA 台北店',
    category: '家居生活 > 家具賣場',
    rating: 4.6,
    distance: 5.1,
    coupon: '會員日9折券',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '會員日9折券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 103,
    name: 'IKEA 桃園店',
    category: '家居生活 > 家具賣場',
    rating: 4.5,
    distance: 15.2,
    coupon: '滿萬送千券',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '滿萬送千券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 104,
    name: 'IKEA 台中店',
    category: '家居生活 > 家具賣場',
    rating: 4.7,
    distance: 18.5,
    coupon: '家具組裝優惠',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '家具組裝優惠',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 105,
    name: '全聯 信義店',
    category: '量販超市 > 連鎖超市',
    rating: 4.3,
    distance: 0.8,
    coupon: '會員積點券',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '會員積點券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 106,
    name: '全聯 大安店',
    category: '量販超市 > 連鎖超市',
    rating: 4.2,
    distance: 1.2,
    coupon: '滿500送50',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '滿500送50',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 107,
    name: '全聯 南港店',
    category: '量販超市 > 連鎖超市',
    rating: 4.4,
    distance: 2.5,
    coupon: '生鮮折扣券',
    image: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '生鮮折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 108,
    name: '全聯 板橋店',
    category: '量販超市 > 連鎖超市',
    rating: 4.1,
    distance: 3.8,
    coupon: '週三會員日',
    image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '週三會員日',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 109,
    name: '全聯 內湖店',
    category: '量販超市 > 連鎖超市',
    rating: 4.3,
    distance: 2.9,
    coupon: '指定商品優惠',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '指定商品優惠',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 110,
    name: '全聯 松山店',
    category: '量販超市 > 連鎖超市',
    rating: 4.2,
    distance: 1.5,
    coupon: '滿千折百',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '滿千折百',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 111,
    name: '家樂福 信義店',
    category: '量販超市 > 連鎖賣場',
    rating: 4.3,
    distance: 1.8,
    coupon: '生鮮商品折扣券',
    image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '生鮮商品折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 112,
    name: '家樂福 南港店',
    category: '量販超市 > 連鎖賣場',
    rating: 4.2,
    distance: 3.2,
    coupon: '滿額現折券',
    image: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '滿額現折券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 113,
    name: '家樂福 內湖店',
    category: '量販超市 > 連鎖賣場',
    rating: 4.4,
    distance: 3.5,
    coupon: '會員專屬優惠',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '會員專屬優惠',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 114,
    name: '誠品書店 松菸店',
    category: '書籍文具 > 連鎖書店',
    rating: 4.8,
    distance: 1.8,
    coupon: '會員專屬折價券',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '會員專屬折價券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 115,
    name: '誠品書店 南港店',
    category: '書籍文具 > 連鎖書店',
    rating: 4.6,
    distance: 2.9,
    coupon: '全館79折優惠券',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '全館79折優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 116,
    name: '誠品書店 板橋店',
    category: '書籍文具 > 連鎖書店',
    rating: 4.7,
    distance: 3.5,
    coupon: '文具用品折扣',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '文具用品折扣',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 117,
    name: '誠品書店 敦南店',
    category: '書籍文具 > 連鎖書店',
    rating: 4.9,
    distance: 1.1,
    coupon: '滿千送百',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '滿千送百',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 118,
    name: '康是美 信義店',
    category: '藥妝保健 > 連鎖藥妝',
    rating: 4.4,
    distance: 1.3,
    coupon: '會員獨享折扣券',
    image: 'https://images.unsplash.com/photo-1556228578-c4024d13c247?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '會員獨享折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1556228578-c4024d13c247?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 119,
    name: '康是美 大安店',
    category: '藥妝保健 > 連鎖藥妝',
    rating: 4.3,
    distance: 0.7,
    coupon: '滿千送百購物金',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '滿千送百購物金',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 120,
    name: '康是美 板橋店',
    category: '藥妝保健 > 連鎖藥妝',
    rating: 4.2,
    distance: 3.3,
    coupon: '美妝滿額贈券',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '美妝滿額贈券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 121,
    name: '康是美 內湖店',
    category: '藥妝保健 > 連鎖藥妝',
    rating: 4.5,
    distance: 2.8,
    coupon: '保健品折扣券',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '保健品折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 122,
    name: '7-11 信義門市',
    category: '便利商店 > 連鎖超商',
    rating: 4.5,
    distance: 0.3,
    coupon: '咖啡買一送一',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '咖啡買一送一',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 123,
    name: '7-11 南港門市',
    category: '便利商店 > 連鎖超商',
    rating: 4.3,
    distance: 1.8,
    coupon: '指定商品優惠券',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '指定商品優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 124,
    name: '7-11 板橋門市',
    category: '便利商店 > 連鎖超商',
    rating: 4.4,
    distance: 2.9,
    coupon: '鮮食折扣券',
    image: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '鮮食折扣券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 125,
    name: '7-11 內湖門市',
    category: '便利商店 > 連鎖超商',
    rating: 4.2,
    distance: 2.2,
    coupon: '會員積點雙倍',
    image: 'https://images.unsplash.com/photo-1613535738534-5e4d22597ab5?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '會員積點雙倍',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1613535738534-5e4d22597ab5?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 126,
    name: '屈臣氏 信義門市',
    category: '美妝保養 > 連鎖藥妝',
    rating: 4.5,
    distance: 1.5,
    coupon: '滿千送百購物金',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '滿千送百購物金',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 127,
    name: '屈臣氏 南港門市',
    category: '美妝保養 > 連鎖藥妝',
    rating: 4.3,
    distance: 2.7,
    coupon: '美妝品牌優惠',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '美妝品牌優惠',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 128,
    name: '屈臣氏 板橋門市',
    category: '美妝保養 > 連鎖藥妝',
    rating: 4.4,
    distance: 3.1,
    coupon: '會員日折扣',
    image: 'https://images.unsplash.com/photo-1556228578-c4024d13c247?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '會員日折扣',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1556228578-c4024d13c247?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 129,
    name: '屈臣氏 大安門市',
    category: '美妝保養 > 連鎖藥妝',
    rating: 4.6,
    distance: 0.9,
    coupon: '指定品牌優惠',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '指定品牌優惠',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 130,
    name: '寶雅 信義店',
    category: '生活百貨 > 連鎖商店',
    rating: 4.3,
    distance: 1.6,
    coupon: '滿額贈品兌換券',
    image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '滿額贈品兌換券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 131,
    name: '寶雅 南港店',
    category: '生活百貨 > 連鎖商店',
    rating: 4.2,
    distance: 2.8,
    coupon: '美妝品優惠券',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '美妝品優惠券',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=96&h=96&fit=crop&q=90'
      }
    ]
  },
  {
    id: 132,
    name: '寶雅 板橋店',
    category: '生活百貨 > 連鎖商店',
    rating: 4.4,
    distance: 3.4,
    coupon: '滿千折百',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=900&fit=crop&q=90',
    description: '',
    address: '',
    phone: '',
    coupons: [
      {
        id: 1,
        name: '滿千折百',
        condition: '依門市規範',
        period: '至 2024.12.31',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=96&h=96&fit=crop&q=90'
      }
    ]
  }
]

// 假資料：第二頁（固定 12 筆，對齊你提供的 UI 範例）
const page2PartnerStores = [
  {
    id: 13,
    name: '西堤牛排 板橋店',
    category: '美食 > 連鎖餐廳',
    rating: 4.6,
    distance: 2.1,
    coupon: '雙人套餐85折券',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=300&h=200&fit=crop',
    description: '西堤牛排提供經典牛排與套餐組合，適合聚餐約會。',
    address: '新北市板橋區（假資料地址）',
    phone: '02-0000-0001',
    coupons: [
      {
        id: 1,
        name: '雙人套餐85折券',
        condition: '限內用',
        period: '至 2026.12.31',
        image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=96&h=96&fit=crop',
      },
    ],
  },
  {
    id: 14,
    name: '星巴克 敦南門市',
    category: '咖啡飲品 > 連鎖咖啡',
    rating: 4.7,
    distance: 0.6,
    coupon: '第二杯半價券',
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=300&h=200&fit=crop',
    description: '星巴克門市提供咖啡、茶飲與輕食，適合外帶與休憩。',
    address: '台北市大安區（假資料地址）',
    phone: '02-0000-0002',
    coupons: [
      {
        id: 1,
        name: '第二杯半價券',
        condition: '同品項適用',
        period: '至 2026.12.31',
        image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=96&h=96&fit=crop',
      },
    ],
  },
  {
    id: 15,
    name: 'IKEA 新莊店',
    category: '家居生活 > 家具賣場',
    rating: 4.5,
    distance: 4.5,
    coupon: '會員日95折券',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop',
    description: 'IKEA 提供家具家飾與餐飲服務，適合家庭採買。',
    address: '新北市新莊區（假資料地址）',
    phone: '02-0000-0003',
    coupons: [
      {
        id: 1,
        name: '會員日95折券',
        condition: '會員限定',
        period: '至 2026.12.31',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=96&h=96&fit=crop',
      },
    ],
  },
  {
    id: 16,
    name: '大創百貨 中壢店',
    category: '生活百貨 > 連鎖商店',
    rating: 4.2,
    distance: 3.8,
    coupon: '滿500折50券',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=300&h=200&fit=crop',
    description: '大創百貨提供平價生活用品，日常補貨方便。',
    address: '桃園市中壢區（假資料地址）',
    phone: '03-0000-0004',
    coupons: [
      {
        id: 1,
        name: '滿500折50券',
        condition: '單筆滿$500',
        period: '至 2026.12.31',
        image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=96&h=96&fit=crop',
      },
    ],
  },
  {
    id: 17,
    name: 'MUJI 無印良品 台中店',
    category: '生活雜貨 > 連鎖商店',
    rating: 4.8,
    distance: 2.9,
    coupon: '指定商品8折券',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&h=200&fit=crop',
    description: '無印良品提供簡約生活用品、服飾與食品。',
    address: '台中市（假資料地址）',
    phone: '04-0000-0005',
    coupons: [
      {
        id: 1,
        name: '指定商品8折券',
        condition: '指定品項',
        period: '至 2026.12.31',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=96&h=96&fit=crop',
      },
    ],
  },
  {
    id: 18,
    name: '金石堂書店 高雄店',
    category: '書籍文具 > 連鎖書店',
    rating: 4.4,
    distance: 1.7,
    coupon: '全館79折優惠券',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=200&fit=crop',
    description: '金石堂書店提供書籍、文具與生活選物。',
    address: '高雄市（假資料地址）',
    phone: '07-0000-0006',
    coupons: [
      {
        id: 1,
        name: '全館79折優惠券',
        condition: '部分商品除外',
        period: '至 2026.12.31',
        image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=96&h=96&fit=crop',
      },
    ],
  },
  {
    id: 19,
    name: 'Zara 台北101店',
    category: '服飾配件 > 服飾店',
    rating: 4.3,
    distance: 1.4,
    coupon: '秋冬新品折扣券',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop',
    description: 'ZARA 提供流行服飾與配件，快速上新。',
    address: '台北市信義區（假資料地址）',
    phone: '02-0000-0007',
    coupons: [
      {
        id: 1,
        name: '秋冬新品折扣券',
        condition: '新品專區',
        period: '至 2026.12.31',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=96&h=96&fit=crop',
      },
    ],
  },
  {
    id: 20,
    name: 'H&M 信義威秀店',
    category: '服飾配件 > 服飾店',
    rating: 4.1,
    distance: 1.3,
    coupon: '會員獨享優惠券',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=200&fit=crop',
    description: 'H&M 提供流行服飾與配件，適合日常穿搭。',
    address: '台北市信義區（假資料地址）',
    phone: '02-0000-0008',
    coupons: [
      {
        id: 1,
        name: '會員獨享優惠券',
        condition: '會員限定',
        period: '至 2026.12.31',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=96&h=96&fit=crop',
      },
    ],
  },
  {
    id: 21,
    name: '寬庭食品 敦化店',
    category: '美食 > 食品專賣',
    rating: 4.5,
    distance: 2.2,
    coupon: '滿千送禮券',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=300&h=200&fit=crop',
    description: '寬庭食品提供精選食品與伴手禮，適合送禮自用。',
    address: '台北市大安區（假資料地址）',
    phone: '02-0000-0009',
    coupons: [
      {
        id: 1,
        name: '滿千送禮券',
        condition: '單筆滿$1000',
        period: '至 2026.12.31',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=96&h=96&fit=crop',
      },
    ],
  },
  {
    id: 22,
    name: '全國電子 桃園店',
    category: '家電3C > 連鎖賣場',
    rating: 4.0,
    distance: 3.5,
    coupon: '家電特賣優惠券',
    image: 'https://images.unsplash.com/photo-1491677533189-49af1084b322?w=300&h=200&fit=crop',
    description: '全國電子提供家電與 3C 產品，促銷檔期優惠多。',
    address: '桃園市（假資料地址）',
    phone: '03-0000-0010',
    coupons: [
      {
        id: 1,
        name: '家電特賣優惠券',
        condition: '指定家電適用',
        period: '至 2026.12.31',
        image: 'https://images.unsplash.com/photo-1491677533189-49af1084b322?w=96&h=96&fit=crop',
      },
    ],
  },
  {
    id: 23,
    name: '燦坤3C 新竹店',
    category: '家電3C > 連鎖賣場',
    rating: 4.2,
    distance: 4.1,
    coupon: '滿萬折千券',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop',
    description: '燦坤 3C 提供電腦、家電與配件，門市服務完善。',
    address: '新竹市（假資料地址）',
    phone: '03-0000-0011',
    coupons: [
      {
        id: 1,
        name: '滿萬折千券',
        condition: '單筆滿$10000',
        period: '至 2026.12.31',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=96&h=96&fit=crop',
      },
    ],
  },
  {
    id: 24,
    name: '美廉社 松山店',
    category: '便利商店 > 連鎖超商',
    rating: 4.1,
    distance: 0.4,
    coupon: '指定商品優惠券',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=300&h=200&fit=crop',
    description: '美廉社提供日常民生用品與即食商品，方便快速。',
    address: '台北市松山區（假資料地址）',
    phone: '02-0000-0012',
    coupons: [
      {
        id: 1,
        name: '指定商品優惠券',
        condition: '指定品項',
        period: '至 2026.12.31',
        image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=96&h=96&fit=crop',
      },
    ],
  },
]

// 假資料：優惠使用說明（StoreDetail 用）
const defaultUsageNotes = [
  '請於消費前出示優惠券給店員確認',
  '每人每次限用一張優惠券',
  '本優惠不得與其他優惠併用',
  '優惠券使用前請先電話預約訂位',
  '特殊節日可能不適用',
  '店家保留活動修改、暫停或終止之權利',
  '詳細使用規範以現場公告為準',
]

/**
 * 產生指定數量的特約店家假資料。
 * - **保留種子資料完整結構**（避免 StoreDetail 缺欄位）
 * - 透過循環複製 + 輕微變化，讓列表有 80 家可分頁展示
 */
function buildPartnerStores(totalCount = 80) {
  const seeds = seedPartnerStores
  if (!Array.isArray(seeds) || seeds.length === 0) return []

  // 先固定第一頁（種子資料）與第二頁（你指定的 12 筆）
  // 注意：seedPartnerStores 可能很大（例如 100+ 筆），但首頁 UI 仍以 12 筆為一頁；
  // 因此固定頁只取前 12 筆作為「第一頁」，其餘種子資料仍會被用於後續生成（讓店家更豐富）。
  const page1Seeds = page1PartnerStores
  const fixed = [
    ...page1Seeds.map((s, idx) => ({
      ...s,
      id: idx + 1,
      // 假資料：營業時間（用於 StoreDetail UI）
      hours: s?.hours || '週一至週日 11:00-22:00',
      // 假資料：電子票券（用於 StoreDetail UI）
      eTickets:
        Array.isArray(s?.eTickets) && s.eTickets.length > 0
          ? s.eTickets
          : buildStoreETickets(idx + 1, s?.image),
    })),
    ...page2PartnerStores.map((s, idx) => ({
      ...s,
      id: page1Seeds.length + idx + 1,
      hours: s?.hours || '週一至週日 11:00-22:00',
      eTickets:
        Array.isArray(s?.eTickets) && s.eTickets.length > 0
          ? s.eTickets
          : buildStoreETickets(page1Seeds.length + idx + 1, s?.image),
    })),
  ]

  if (totalCount <= fixed.length) return fixed.slice(0, totalCount)

  const result = [...fixed]
  for (let i = fixed.length + 1; i <= totalCount; i++) {
    // 從 seed[0] 開始循環（避免因固定頁數導致只取到 seed 的一小段，影響搜尋命中筆數）
    const seed = seeds[(i - fixed.length - 1) % seeds.length]
    const baseName = seed?.name || `特約店家 ${i}`

    // 用固定規則做「可預期」的變化（避免每次刷新亂跳）
    const rating = Number((4.0 + ((i % 9) * 0.1)).toFixed(1)) // 4.0 ~ 4.8
    const distance = Number((0.5 + ((i % 20) * 0.2)).toFixed(1)) // 0.5 ~ 4.3

    result.push({
      ...seed,
      id: i,
      name: `${baseName}（分店${i}）`,
      rating,
      distance,
      hours: seed?.hours || '週一至週日 11:00-22:00',
      // 讓列表顯示的 coupon 有變化（但仍保留 seed 的 coupons 詳細）
      coupon: seed?.coupon ? `${seed.coupon}` : '會員專屬優惠券',
      eTickets: buildStoreETickets(i, seed?.image),
    })
  }

  return result
}

/**
 * 產生店家「電子票券」假資料（用於 StoreDetail 展示）
 * - 固定 5 筆，避免 UI 過長
 * - points 用 deterministic 規則，確保不同店家不同數字
 */
function buildStoreETickets(storeId, fallbackImage) {
  const base = Number(storeId) || 1
  const pointsBase = [2800, 1500, 5200, 4500, 880]
  const images = [
    fallbackImage,
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1558030006-450675393462?w=1200&h=900&fit=crop&q=90',
    'https://images.unsplash.com/photo-1598577789978-b87168a57b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ].filter(Boolean)

  const names = ['雙人套餐券', '經典單人套餐券', '家庭四人套餐券', '頂級和牛雙人套餐券', '商務午餐套餐券']

  return Array.from({ length: 5 }, (_, idx) => {
    // 讓不同店家的點數看起來有些差異，但保持可預期（不會每次刷新亂跳）
    const points = pointsBase[idx] + (base % 7) * 10
    return {
      id: Number(`${base}${idx + 1}`),
      // 票券名稱（StoreDetail 會以「店名 + name」顯示）
      name: names[idx],
      // 顯示用點數
      points,
      // 票券縮圖
      image: images[idx % images.length],
      // 標籤（符合你提供的 UI：第一張有「高人氣」）
      badge: idx === 0 ? '高人氣' : '',
      // 額外欄位（目前 UI 未用到，先補齊方便後續擴充）
      description: idx === 0 ? '熱門兌換' : '限時兌換',
      // 用於排序/篩選（目前未用到）
      sort: idx + 1,
    }
  })
}

export const useStoresStore = defineStore('stores', () => {
  // 只在 store 初始化時洗牌一次，避免每次渲染都亂跳
  const brands = ref(maybeShuffleArray(featuredBrands))
  const tickets = ref(maybeShuffleArray(popularTickets))
  // 主題本身與主題底下店家都打亂一次（HomeThemes 會取前三個顯示）
  const themes = ref(
    maybeShuffleArray(themeStores).map((t) => ({
      ...t,
      stores: maybeShuffleArray(t?.stores || []),
    }))
  )
  // 搜尋關鍵字（StoreSearch / 熱門票券搜尋共用）
  const searchKeyword = ref('')

  // 模糊搜尋：支援多關鍵字（空白分隔），全部關鍵字都需命中（every）
  const splitKeywords = (k) => String(k || '').trim().toLowerCase().split(/\s+/).filter(Boolean)

  const matchByKeywords = (fields, keywords) => {
    if (!keywords.length) return true
    const values = fields.map((v) => String(v || '').toLowerCase())
    return keywords.every((kw) => values.some((val) => val.includes(kw)))
  }
  // 生成足夠多的店家資料：讓「搜尋結果」能命中多筆（例如 星巴克 會出現多家分店）
  const stores = ref(
    maybeShuffleArray(buildPartnerStores(160)).map((s) => ({
      ...s,
      // 保證 StoreDetail 需要的欄位一定存在
      hours: s?.hours || '週一至週日 11:00-22:00',
      usageNotes:
        Array.isArray(s?.usageNotes) && s.usageNotes.length > 0 ? s.usageNotes : defaultUsageNotes,
      eTickets:
        Array.isArray(s?.eTickets) && s.eTickets.length > 0
          ? s.eTickets
          : buildStoreETickets(s?.id, s?.image),
    }))
  )
  const currentPage = ref(1)
  // 4 欄網格：一頁 12 筆（3 列 × 4 欄）
  const pageSize = ref(12)

  // 模糊搜尋：店家（支援多關鍵字）
  const filteredStores = computed(() => {
    const list = stores.value || []
    const keywords = splitKeywords(searchKeyword.value)
    if (!keywords.length) return list
    return list.filter((s) => matchByKeywords([s?.name, s?.category, s?.coupon], keywords))
  })

  // 模糊搜尋：熱門票券（支援多關鍵字）
  const filteredPopularTickets = computed(() => {
    const list = tickets.value || []
    const keywords = splitKeywords(searchKeyword.value)
    if (!keywords.length) return list
    return list.filter((t) => matchByKeywords([t?.storeName, t?.ticketName, t?.points], keywords))
  })

  // 分頁後的店家列表
  const paginatedStores = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return stores.value.slice(start, end)
  })

  // 總頁數
  const totalPages = computed(() => {
    return Math.ceil(stores.value.length / pageSize.value)
  })

  // 根據 ID 取得店家
  function getStoreById(id) {
    const store = stores.value.find((s) => s.id === Number(id))
    if (!store) return undefined

    // 保底：避免 HMR/舊 state 導致 StoreDetail 缺欄位（電子票券/營業時間）
    if (!store.hours) {
      store.hours = '週一至週日 11:00-22:00'
    }
    if (!Array.isArray(store.usageNotes) || store.usageNotes.length === 0) {
      store.usageNotes = defaultUsageNotes
    }
    if (!Array.isArray(store.eTickets) || store.eTickets.length === 0) {
      store.eTickets = buildStoreETickets(store.id, store.image)
    }

    return store
  }

  // 根據主題取得店家
  function getStoresByTheme(theme) {
    const themeData = themes.value.find((t) => t.theme === theme)
    return themeData ? themeData.stores : []
  }

  // 根據店家 ID 與優惠券 ID 取得優惠券
  function getCouponByStoreId(storeId, couponId) {
    const store = getStoreById(storeId)
    if (!store) return undefined
    const coupons = Array.isArray(store.coupons) ? store.coupons : []
    return coupons.find((c) => c.id === Number(couponId))
  }

  // 根據 ID 取得「熱門票券」
  function getPopularTicketById(id) {
    return (tickets.value || []).find((t) => t.id === Number(id))
  }

  // 設定頁碼
  function setPage(page) {
    currentPage.value = page
  }

  return {
    brands,
    tickets,
    themes,
    searchKeyword,
    stores,
    filteredStores,
    filteredPopularTickets,
    paginatedStores,
    currentPage,
    pageSize,
    totalPages,
    getStoreById,
    getStoresByTheme,
    getCouponByStoreId,
    getPopularTicketById,
    setPage,
  }
})


