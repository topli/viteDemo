<template>
  <div class="">
    <van-nav-bar left-arrow @click-left="back">
      <template #title>
        {{ title }}
      </template>
    </van-nav-bar>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { watchTitle } from '@/hooks/routerHook'
  const router = useRouter()

  const title = watchTitle()

  const back = () => {
    router.go(-1)
  }
</script>
<style scoped lang="scss"></style>
