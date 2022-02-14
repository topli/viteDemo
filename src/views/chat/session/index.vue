<template>
  <div class="session-container">
    <van-nav-bar
      left-arrow
      :title="chatState.session.to?.nickName || chatState.session.to?.phone"
      @click-left="router.go(-1)"
    />
    <div ref="messagesWrap" class="messages-wrap">
      <template v-for="msg in chatState.messages" :key="msg.id">
        <div class="p-10 flex" :class="{ 'me-msg': isMe(msg.from._id) }">
          <div class="avatar flex flex-align-center">
            <van-image :src="msg.from?.avatar" width="35" height="35"></van-image>
          </div>
          <Message :msg="msg"></Message>
        </div>
      </template>
    </div>
    <div class="footer-wrap">
      <input v-model="inputText" />
      <van-button type="success" @click="sendMessage">发送</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Message from '../message/index.vue'
  import { Messages } from '@/model'
  import { nextTick, ref, watch } from 'vue'
  import { chatStore } from '@/store/chat'
  import { useRouter } from 'vue-router'
  import { isMe } from '@/hooks/user'

  const router = useRouter()
  const chatState = chatStore()
  const messagesWrap = ref()
  const inputText = ref('')
  console.log(chatState.session)

  const getList = () => {
    // 获取消息列表
    Messages.getList(chatState.session._id).then((res) => {
      chatState.setMessages(res.data)
      // 消息最底部显示
      nextTick(() => {
        toBottom()
      })
    })
  }
  getList()
  const sendMessage = () => {
    const data = {
      sessionId: chatState.session._id,
      content: inputText.value,
      from: chatState.session.from._id,
      type: 'text',
      time: Date.now(),
      mark: ''
    }

    // 发送消息
    Messages.sendMessage(data).then((res) => {
      console.log(res)
      inputText.value = ''
    })
  }

  watch(
    () => chatState.messages,
    () => {
      console.log(123)
      // 消息最底部显示
      nextTick(() => {
        toBottom()
      })
    },
    { deep: true }
  )

  const toBottom = () => {
    const el = messagesWrap.value
    if (el) el.scrollTop = el.scrollHeight - el.clientHeight
  }
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
