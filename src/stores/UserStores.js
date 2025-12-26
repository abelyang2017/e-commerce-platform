import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const userInfo = ref(null)

  // 登入
  function login(userData) {
    isLoggedIn.value = true
    userInfo.value = userData
  }

  // 登出
  function logout() {
    isLoggedIn.value = false
    userInfo.value = null
  }

  return {
    isLoggedIn,
    userInfo,
    login,
    logout,
  }
})

