// store.js
import { defineStore } from 'pinia'

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useStore = defineStore('myGlobalState', {
  // state: 返回对象的函数
  state: () => ({
    count: 1
  }),
  actions: {
    countPlusOne() {
      this.count++
    },
    countPlus(num: number) {
      this.count += num
    }
  }
})
