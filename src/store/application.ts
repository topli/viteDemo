import { defineStore } from 'pinia'

// 全局状态管理
export const applicationState = defineStore('applicationState', {
  // state: 返回对象的函数
  state: () => ({
    navTitle: ''
  }),
  actions: {
    setNavTitle(title: string) {
      this.$state.navTitle = title
    }
  }
})
