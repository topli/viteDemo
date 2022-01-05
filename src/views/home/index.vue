<template>
  <div class="home-container" :class="showNav ? 'nav-container' : ''">
    <van-nav-bar v-if="showNav" :title="title" border fixed>
      <template #right>
        <van-icon name="search" size="18" @click="clickSearch" />
        <van-icon name="add-o" size="18" @click="clickAdd" />
      </template>
    </van-nav-bar>
    <Chat v-if="currentTabComponent === 'chat'"></Chat>
    <Friends v-if="currentTabComponent === 'friends'"></Friends>
    <Search v-if="currentTabComponent === 'search'"></Search>
  </div>
  <van-tabbar v-model="currentTabComponent">
    <van-tabbar-item icon="chat-o" name="chat">聊天</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="friends">联系人</van-tabbar-item>
    <van-tabbar-item icon="search" name="search">发现</van-tabbar-item>
    <van-tabbar-item icon="setting-o" name="setting">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import { Toast } from 'vant'
  import Chat from '@/views/chat/index.vue'
  import Friends from '@/views/friends/index.vue'
  import Search from '@/views/search/index.vue'

  const currentTabComponent = ref('chat')
  const title = ref('聊天')

  watch(currentTabComponent, (val) => {
    console.log(val)
    let t = ''
    switch (currentTabComponent.value) {
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
      case 'setting': {
        t = '我的'
        break
      }
    }
    title.value = t
  })

  const showNav = computed(() => {
    return currentTabComponent.value !== 'setting'
  })

  const clickSearch = () => {
    Toast('点击搜索')
  }
  const clickAdd = () => {
    Toast('点击增加')
  }
</script>
<style scoped lang="scss">
  .home-container {
    height: 100vh;
    padding-bottom: var(--van-tabbar-height);
    background-color: #f7f8fa;
  }
</style>
