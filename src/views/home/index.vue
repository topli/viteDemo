<template>
  <div></div>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="chat-o" name="chat">聊天</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="links">联系人</van-tabbar-item>
    <van-tabbar-item icon="search" name="info">发现</van-tabbar-item>
    <van-tabbar-item icon="setting-o" name="my">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
  import { ref, watch } from 'vue'
  const active = ref('')

  watch(active, (val) => {
    console.log(val)
  })
</script>
<style scoped lang="scss"></style>
