import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/tailwind.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 註冊 Element Plus
app.use(ElementPlus)

// 註冊 Ant Design Vue（只啟用組件，不影響既有 Element Plus）
app.use(Antd)

// 註冊所有圖標
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)

app.mount('#app')
