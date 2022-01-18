<template>
  <div class="add-friends-container">
    <van-search
      v-model="searchIns.searchText"
      show-action
      placeholder="微信号/手机号"
      @search="onSearch"
      @cancel="onCancel"
    />
    <template v-for="user in searchIns.searchList" :key="user.id">
      <div class="user-wrap" @click="goUserCard(user._id)">
        <div class="user-avater">
          <van-image width="45" height="45" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div class="user-content">
          <div class="user-name">{{ user.nickName || user.account }}</div>
          <div class="user-we-id">
            <span>微信号：</span>
            {{ user.weId }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { UserApi } from '@/api/userApi'
  import { UserInfo } from '@/entity/user'
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const searchIns = reactive<{ searchText: string; searchList: UserInfo[] }>({
    searchText: '',
    searchList: []
  })

  // 搜索朋友
  const onSearch = () => {
    UserApi.getUserByText(searchIns.searchText).then((res) => {
      if (res.data.code === 200) {
        searchIns.searchList = res.data.data || []
      }
    })
  }
  // 清空搜索文本、搜索用户
  const onCancel = () => {
    searchIns.searchText = ''
    searchIns.searchList = []
  }
  // 用户卡
  const goUserCard = (id: string) => {
    console.log(id)

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
