<template>
  <div class="chat-container h-100">
    <div v-if="chat.list.length" class="chat-list">
      <template v-for="session in chat.list" :key="session.id">
        <UserCard
          :user="session.to"
          :type="UserCardType.chat"
          :unread="session.unread"
          :msg="session.newMsg"
        ></UserCard>
      </template>
    </div>
    <div v-if="loading" class="no-data"> 数据加载中。。。 </div>
  </div>
</template>

<script setup lang="ts">
  import _ from 'lodash'
  import { reactive, ref } from 'vue'
  import UserCard from '@/components/UserCard/index.vue'
  import { IChat } from '@/entity/chat'
  import { ChatService } from './service'
  import { UserCardType } from '@/emun/user'

  const loading = ref()

  const chat = reactive<{ unread: number; list: IChat[] }>({
    unread: 0,
    list: []
  })
  const getList = () => {
    loading.value = true
    ChatService.getList().then((res) => {
      loading.value = false
      const { data } = res.data
      if (data && _.isArray(data)) {
        chat.list = data
      }
    })
  }
  getList()
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
