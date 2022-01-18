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
  import { ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  const router = useRouter()
  const route = useRoute()

  const title = ref(route.name)
  const back = () => {
    router.go(-1)
  }

  watch(route, (to) => {
    title.value = to.name as string
  })
</script>
<style scoped lang="scss"></style>
