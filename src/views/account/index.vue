<template>
  <div>
    <div class="user-wrap">
      <div class="user-avatar">
        <van-image width="45" height="45" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </div>
      <div class="user-info">
        <div class="user-display-name">
          {{ displayName }}
        </div>
        <div class="user-we-id">
          {{ userInfo.weId }}
        </div>
      </div>
    </div>
    <div class="user-cell we-cell">
      <van-cell-group>
        <van-cell title="支付" is-link icon="location-o" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="收藏" is-link icon="location-o" />
        <van-cell title="朋友圈" is-link icon="location-o" />
        <van-cell title="卡包" is-link icon="location-o" />
        <van-cell title="表情" is-link icon="location-o" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="设置" is-link icon="location-o" />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { userStore } from '@/store/user'
  const { userInfo } = userStore()

  const displayName = computed(() => {
    return userInfo.nickName || userInfo.phone || userInfo.account
  })
</script>
<style scoped lang="scss">
  .user-wrap {
    padding: 10% 5% 5% 5%;
    display: flex;
    align-items: center;
    .user-info {
      position: relative;
      padding: 0 10px;
      height: 100%;
      .user-display-name {
        font-size: 1rem;
        font-weight: bold;
        height: 50%;
      }
      .user-we-id {
        height: 50%;
      }
    }
  }
</style>
