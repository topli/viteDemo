import { defineStore } from 'pinia'
import { UserInfo } from '@/entity/user'

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const userStore = defineStore('userState', {
  // state: 返回对象的函数
  state: () => ({
    user: {
      _id: '',
      id: '',
      nickName: '',
      phone: 0,
      account: '',
      weId: ''
    } as UserInfo
  }),
  getters: {
    userInfo: (state) => state.user
  },
  actions: {
    setUserInfo(info: UserInfo) {
      this.user = info
    }
  }
})
