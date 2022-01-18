<template>
  <div class="friends-container h-100">
    <div class="friends-list">
      <van-index-bar :index-list="state.indexList">
        <template v-for="item in state.list" :key="item.key">
          <van-index-anchor :index="item.key" />
          <template v-for="val in item.values" :key="val.id">
            <van-cell :title="val.nickName || val.account" />
          </template>
        </template>
      </van-index-bar>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { RelationService } from './service'

  const state = reactive<{ list: any[]; indexList: any[] }>({
    list: [],
    indexList: []
  })

  RelationService.getList().then((res) => {
    state.list = res.data.data
    state.indexList = res.data.data.map((item: any) => item.key)
  })
</script>
<style scoped lang="scss">
  .friends-list {
    overflow-y: auto;
    height: 100%;
  }
</style>
