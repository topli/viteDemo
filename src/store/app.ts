import { defineStore } from 'pinia'

// 全局状态管理
export const appStore = defineStore('appStore', {
  // state: 返回对象的函数
  state: () => ({
    navTitle: '',
    tabName: ''
  }),
  getters: {
    navTitle: (state) => state.navTitle,
    currentTab: (state) => {
      return state.tabName
    }
  },
  actions: {
    setNavTitle(title: string) {
      this.navTitle = title
    },
    setCurrentTab(tabName: string) {
      this.tabName = tabName
    }
  }
})
