import { defineStore } from 'pinia'
import { User } from '@/model'
import { useLocalStorage } from '@vueuse/core'

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const userStore = defineStore('userStore', {
  // state: 返回对象的函数
  state: () => ({
    user: null as User | null
  }),
  getters: {
    userInfo: (state) => state.user || JSON.parse(useLocalStorage('userInfo', '').value)
  },
  actions: {
    setUserInfo(info: User) {
      this.user = info
    },
    getUserInfo() {
      User.getUserInfo().then((res) => {
        this.user = res.data ?? null
        console.log(this.user)
      })
    }
  }
})
