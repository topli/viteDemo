<template>
  <div class="add-friends-container">
    <van-search
      v-model="state.searchText"
      show-action
      placeholder="微信号/手机号"
      @search="onSearch"
      @cancel="onCancel"
    />
    <template v-for="user in state.searchList" :key="user.id">
      <UserCard :user="user" :type="UserCardType.account" @click="goUserCard(user._id)"></UserCard>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { User } from '@/model'
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import UserCard from '@/components/UserCard/index.vue'
  import { UserCardType } from '@/emun/user'

  const router = useRouter()

  const state = reactive<{ searchText: string; searchList: User[] }>({
    searchText: '',
    searchList: []
  })

  // 搜索朋友
  const onSearch = () => {
    User.serachByText(state.searchText).then((res) => {
      if (res.code === 200) {
        state.searchList = res.data || []
      }
    })
  }
  // 清空搜索文本、搜索用户
  const onCancel = () => {
    state.searchText = ''
    state.searchList = []
  }
  // 用户卡
  const goUserCard = (id: string) => {
    router.push({ path: '/friends/info', query: { id } })
  }
</script>
<style scoped lang="scss">
  .user-wrap {
    padding: 0.5rem 1rem;
    display: flex;
    .user-content {
      display: flex;
      flex-direction: column;
      align-items: left;
      padding-left: 0.5rem;
      .user-name {
        line-height: 1.5;
        font-size: 1rem;
        font-weight: bold;
      }
      .user-we-id {
        color: #666;
        font-size: 0.8rem;
      }
    }
  }
</style>
