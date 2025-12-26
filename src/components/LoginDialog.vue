<template>
  <el-dialog v-model="visible" :show-close="false" width="400px" class="login-dialog-custom" @close="handleClose">
    <div class="login-container">
      <div class="login-header">
          <h3 class=" text-3xl font-semibold text-gray-900 ">登入</h3>
          <button type="button" class="close-btn" @click="handleClose" aria-label="關閉">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-gray-500">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

      <div class="login-form">
        <!-- 帳號輸入框 -->
        <div class="input-group">
          <div class="input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="input-icon">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input v-model="form.username" type="text" class="login-input" placeholder="請輸入會員帳號" />
          </div>
        </div>

        <!-- 密碼輸入框 -->
        <div class="input-group">
          <div class="input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="input-icon">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input v-model="form.password" :type="showPassword ? 'text' : 'password'" class="login-input"
              placeholder="請輸入密碼" />
            <button type="button" class="password-toggle" @click="showPassword = !showPassword" aria-label="切換密碼顯示">
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="h-5 w-5 text-gray-400">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-gray-400">
                <path
                  d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24">
                </path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="login-footer">
        <div class="login-footer-container">
          <button type="button" class="login-btn" @click="handleLogin">登入</button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/UserStores'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const userStore = useUserStore()
const visible = ref(props.modelValue)
const showPassword = ref(false)
const form = ref({
  username: '',
  password: '',
})

const handleLogin = () => {
  // 模擬登入（demo 用）
  if (form.value.username && form.value.password) {
    userStore.login({
      username: form.value.username,
      name: form.value.username,
    })
    ElMessage.success('登入成功')
    handleClose()
  } else {
    ElMessage.warning('請輸入帳號和密碼')
  }
}

const handleClose = () => {
  visible.value = false
  emit('update:modelValue', false)
}

// 監聽外部 modelValue 變化
watch(
  () => props.modelValue,
  (val) => {
    visible.value = val
  }
)
</script>

<script>
import { watch } from 'vue'
</script>

<style>
/* 對話框圓角 - 使用非 scoped 樣式 */
.login-dialog-custom.el-dialog {
  border-radius: 20px !important;
  overflow: hidden !important;
}

.login-dialog-custom .el-dialog__body {
  padding: 0 !important;
}
</style>

<style scoped>

.login-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 4% 8%;
}
.login-header {
  display: flex;
  justify-content: space-between;

}
/* 關閉按鈕 */
.close-btn {
  top: 2px;
  right: 5px;
  position: absolute;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
  background-color: #fff;
}
/* 表單容器 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 輸入框組 */
.input-group {
  width: 100%;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.input-icon {
  position: absolute;
  left: 12px;
  width: 20px;
  height: 20px;
  color: #9ca3af;
  pointer-events: none;
  z-index: 1;
}

/* 輸入框 */
.login-input {
  width: 100%;
  height: 48px;
  padding: 12px 12px 12px 44px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background-color: #f9fafb;
  font-size: 14px;
  color: #111827;
  transition: all 0.2s;
}

.login-input::placeholder {
  color: #9ca3af;
}

.login-input:focus {
  outline: none;
  border-color: #d9663d;
  background-color: #ffffff;
}

/* 密碼顯示/隱藏按鈕 */
.password-toggle {
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.password-toggle:hover {
  background-color: #f3f4f6;
}

/* 底部按鈕區域 */
.login-footer {
  width: 100%;
}

/* 登入按鈕 */
.login-btn {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 12px;
  background-color: rgb(217, 102, 61);
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-btn:hover {
  background-color: rgb(200, 90, 55);
}

.login-btn:active {
  background-color: rgb(185, 80, 50);
}
</style>
