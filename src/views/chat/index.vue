<template>
  <div class="chat-container h-100">
    <div v-if="list.length" class="chat-list">
      <template v-for="session in list" :key="session.id">
        <UserCard
          :user="(session.to as User)"
          :type="UserCardType.chat"
          :unread="session.unread"
          :msg="session.newMsg"
          :time="session.newTime"
          :messages="session.messages"
          @click="goSession(session)"
        ></UserCard>
      </template>
    </div>
    <div v-if="loading" class="no-data"> 数据加载中。。。 </div>
  </div>
</template>

<script setup lang="ts">
  import _ from 'lodash'
  import { computed, ref } from 'vue'
  import UserCard from '@/components/UserCard/index.vue'
  import { Chat, User } from '@/model'
  import { chatStore } from '@/store/chat'
  import { UserCardType } from '@/emun/user'
  import { useRouter } from 'vue-router'
  import { userStore } from '@/store/user'

  const router = useRouter()
  const userState = userStore()
  const loading = ref()
  const chatState = chatStore()
  const list = computed(() => {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    return chatState.list
      .sort((a: Chat, b: Chat) => {
        return Number(b.newTime) - Number(a.newTime)
      })
      .map((item: Chat) => {
        item.members &&
          item.members.forEach((m: User) => {
            if (m._id === userState.userInfo._id) {
              item.from = m
            } else {
              item.to = m
            }
          })
        return item
      })
  })
  const getList = () => {
    loading.value = true
    const chatState = chatStore()
    Chat.getList().then((res) => {
      loading.value = false
      const { data } = res
      if (data && _.isArray(data)) {
        _.map(data, (item) => {
          if (item.members) {
            item.members.forEach((m: User) => {
              if (m._id === userState.userInfo._id) {
                item.from = m
              } else {
                item.to = m
              }
            })
          }
          if (item.messages && item.messages[0]) {
            item.newMsg = item.messages[0].content
            item.newTime = Number(item.messages[0].time)
          }
        })
        chatState.setSessionList(data)
      }
    })
  }
  getList()

  const goSession = (session: Chat) => {
    const chatState = chatStore()
    chatState.setSession(session)
    router.push('/session')
  }
</script>
<style scoped lang="scss">
  .chat-container {
    display: flex;
    flex-direction: column;
    .chat-list {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      .chat-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
      }
      .chat-img {
        padding: 0.2rem 0.8rem;
      }
      .chat-content {
        flex: 1;
        border-bottom: 1px solid rgba(204, 204, 204, 0.3);
        text-align: left;
        font-size: 1rem;
        line-height: 1.5;
        padding: 0.5rem 0;
        .chat-name {
          font-weight: bold;
        }
        .chat-msg {
          color: #8c8c8c;
          font-size: 0.8rem;
        }
      }
    }
  }
  .no-data {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
