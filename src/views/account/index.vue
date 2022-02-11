<template>
  <div class="account-container">
    <div class="account-user-card">
      <UserCard
        :user="userInfo"
        :type="UserCardType.account"
        is-link
        :border="false"
        @click="goInformation"
      ></UserCard>
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
  import UserCard from '@/components/UserCard/index.vue'
  import { UserCardType } from '@/emun/user'
  import { getUserInfo } from '@/hooks/user'
  import { useRouter } from 'vue-router'

  const userInfo = getUserInfo()
  const router = useRouter()

  const goInformation = () => {
    router.push({ path: '/account/information', query: { id: userInfo._id } })
  }
</script>
<style scoped lang="scss">
  .account-container {
    .account-user-card {
      padding-top: 2rem;
      background-color: white;
    }
  }
</style>
