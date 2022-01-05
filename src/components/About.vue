<script setup lang="ts">
  import { useStore } from '@/store'

  const store = useStore()

  const countPlus = function () {
    store.countPlusOne()
  }
</script>

<template>
  <span>{{ store.count }}</span>
  <el-button @click="countPlus">123</el-button>
</template>

<style scoped></style>
