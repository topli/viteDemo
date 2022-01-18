import { defineStore } from 'pinia'
import { IUser } from '@/entity/user'

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const userStore = defineStore('userState', {
  // state: 返回对象的函数
  state: () => ({
    user: null as IUser | null
  }),
  getters: {
    userInfo: (state) => state.user
  },
  actions: {
    setUserInfo(info: IUser) {
      this.user = info
    }
  }
})
