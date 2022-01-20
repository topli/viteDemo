<template>
  <div class="home-container" :class="showNav ? 'nav-container' : ''">
    <van-nav-bar v-if="showNav" :title="title" :border="true" fixed>
      <template #right>
        <van-icon name="search" size="18" @click="clickSearch" />
        <van-icon name="add-o" size="18" @click="clickAdd" />
      </template>
    </van-nav-bar>
    <Chat v-show="currentTabComponent === 'chat'"></Chat>
    <Friends v-show="currentTabComponent === 'friends'"></Friends>
    <Search v-show="currentTabComponent === 'search'"></Search>
    <Account v-show="currentTabComponent === 'account'"></Account>
  </div>
  <!-- <div v-else class="error-container"> 错误页面 </div> -->
  <van-tabbar v-model="currentTabComponent">
    <van-tabbar-item icon="chat-o" name="chat">聊天</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="friends">联系人</van-tabbar-item>
    <van-tabbar-item icon="search" name="search">发现</van-tabbar-item>
    <van-tabbar-item icon="user-o" name="account">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import { Toast } from 'vant'
  import { useRouter } from 'vue-router'
  import { appStore } from '@/store/app'
  import Chat from '@/views/chat/index.vue'
  import Friends from '@/views/friends/index.vue'
  import Search from '@/views/search/index.vue'
  import Account from '@/views/account/index.vue'

  const router = useRouter()

  const appState = appStore()

  const currentTabComponent = ref(appState.currentTab || 'chat')
  const title = ref('聊天')

  watch(currentTabComponent, (val) => {
    let t = ''
    switch (val) {
      case 'chat': {
        t = '聊天'
        break
      }
      case 'friends': {
        t = '联系人'
        break
      }
      case 'search': {
        t = '发现'
        break
      }
      case 'account': {
        t = '我的'
        break
      }
    }
    appState.setCurrentTab(val)
    title.value = t
  })

  const showNav = computed(() => {
    return currentTabComponent.value !== 'account'
  })

  const clickSearch = () => {
    Toast('点击搜索')
  }
  const clickAdd = () => {
    router.push('/friends/add')
  }
</script>
<style scoped lang="scss">
  .home-container {
    height: 100vh;
    padding-bottom: var(--van-tabbar-height);
    background-color: #f7f8fa;
  }
</style>
