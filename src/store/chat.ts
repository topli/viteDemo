import { defineStore } from 'pinia'
import { Chat, Messages } from '@/model'
import { useLocalStorage } from '@vueuse/core'

const localSession = useLocalStorage('session', '')

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const chatStore = defineStore('chatStore', {
  // state: 返回对象的函数
  state: () => ({
    session: JSON.parse(localSession.value || '{}'),
    sessionList: <any>[],
    messages: <any>[]
  }),
  getters: {
    sessionArr: (state) => {
      return state.sessionList.sort((a: any, b: any) => b.newTime - a.newTime)
    }
  },
  actions: {
    setSession(chat: Chat) {
      this.session = chat
      localSession.value = JSON.stringify(chat)
    },
    setMessages(messages: Messages[]) {
      this.messages = messages
    },
    pushMessage(message: Messages) {
      this.messages.push(message)
    },
    setSessionList(sessionList: Chat[]) {
      this.sessionList = sessionList
    },
    pushSessionList(session: Chat) {
      this.sessionList.push(session)
    }
  }
})
