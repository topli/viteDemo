<template>
  <div class="session-container">
    <van-nav-bar left-arrow :title="state.user?.nickName" @click-left="router.go(-1)" />
    <div class="messages-wrap">
      <template v-for="msg in state.messages" :key="msg.id">
        <div class="p-10 flex" :class="{ 'me-msg': msg.form?._id === user.userInfo?._id }">
          <div class="avatar flex flex-align-center">
            <van-image :src="state.user?.avatar" width="35" height="35"></van-image>
          </div>
          <Message :msg="msg"></Message>
        </div>
      </template>
    </div>
    <div class="footer-wrap">
      <input v-model="inputText" />
      <van-button type="success">发送</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Message from '../message/index.vue'
  import { UserApi } from '@/api/userApi'
  import { IUser } from '@/entity/user'
  import { reactive, ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { getUserInfo } from '@/hooks/userHook'

  const user = getUserInfo()
  console.log(user)

  const router = useRouter()

  const route = useRoute()

  const query = route.query

  const state = reactive<{ user?: IUser; messages?: any[] }>({})

  UserApi.getInfoById(query.id as string).then((res) => {
    console.log(res)
    state.user = res.data.data
  })

  const inputText = ref('')

  state.messages = [{ type: 'text', text: '今天晚上吃什么' }]
</script>
<style scoped lang="scss">
  .session-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    .messages-wrap {
      flex: 1;
      overflow-y: auto;
      background-color: #f2f3f3;
      .avatar {
        .van-image {
          border-radius: 2px;
          overflow: hidden;
        }
      }
      .me-msg {
        flex-direction: row-reverse;
        .message-item {
          text-align: right;
          ::v-deep(.message-content) {
            background-color: var(--van-green);
            &::before {
              left: auto;
              right: -10px;
              border-left-color: var(--van-green);
              border-right-color: transparent;
            }
          }
        }
      }
    }
    .footer-wrap {
      width: 100%;
      background-color: #f4f4f4d6;
      border-top: 1px solid #e4e4e4;
      display: flex;
      align-items: center;
      padding: 0.5rem;
      input {
        width: 100%;
        border-color: transparent;
        border-radius: 5px;
        height: 2rem;
      }
      ::v-deep(.van-button) {
        height: auto;
        padding: 0.5rem 0.8rem;
        margin-left: 10px;
        .van-button__content {
          word-break: keep-all;
        }
      }
    }
  }
</style>
