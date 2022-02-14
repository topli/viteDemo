import { defineStore } from 'pinia'
import { Chat, Messages } from '@/model'
import { useLocalStorage } from '@vueuse/core'

const localSession = useLocalStorage('session', '')

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const chatStore = defineStore('chatStore', {
  // state: 返回对象的函数
  state: () => ({
    // 当前会话
    session: JSON.parse(localSession.value || '{}'),
    // 聊天列表
    list: <any>[],
    // 当前聊天消息数据
    messages: <any>[]
  }),
  actions: {
    setSession(chat: Chat) {
      this.session = chat
      localSession.value = JSON.stringify(chat)
    },
    setMessages(messages: Messages[]) {
      this.messages = messages
    },
    pushMessage(message: Messages) {
      this.list.map((item: Chat) => {
        if (item._id === message.sessionId) {
          item.messages.splice(0, 0, message)
          if (item.messages && item.messages[0]) {
            item.newMsg = item.messages[0].content
            item.newTime = Number(item.messages[0].time)
          }
        }
        return item
      })
      if (this.session._id === message.sessionId) {
        this.messages.push(message)
      }
    },
    setSessionList(list: Chat[]) {
      this.list = list
    },
    pushList(session: Chat) {
      this.list.push(session)
    },
    subscribe(message: any) {
      const { type, data } = message
      if (type === 'message') {
        this.pushMessage(data)
      }

      if (type === 'session') {
        this.pushList(data)
      }
    }
  }
})
