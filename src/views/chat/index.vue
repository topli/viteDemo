<template>
  <div class="chat-container h-100">
    <div class="chat-list">
      <div class="chat-wrap">
        <div class="chat-img">
          <van-badge :content="5">
            <van-image width="45" height="45" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          </van-badge>
        </div>
        <div class="chat-content">
          <div class="chat-name">小猫</div>
          <div class="chat-msg">今天中午吃什么</div>
        </div>
      </div>
      <template v-for="i in 10" :key="i">
        <div class="chat-wrap">
          <div class="chat-img">
            <van-badge :content="10">
              <van-image width="45" height="45" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </van-badge>
          </div>
          <div class="chat-content">
            <div class="chat-name">小狗</div>
            <div class="chat-msg">今天晚上吃什么</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
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
        padding: 0.5rem 1rem;
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
</style>
