<template>
  <div class="friends-container h-100">
    <div class="friends-list">
      <van-index-bar :index-list="state.indexList">
        <template v-for="item in state.list" :key="item.key">
          <van-index-anchor :index="item.key" />
          <template v-for="val in item.values" :key="val._id">
            <van-cell :title="val.nickName" :to="`/friends/info?id=${val._id}`">
              <template #icon>
                <van-image :width="30" :height="30" :src="val.avatar" />
              </template>
            </van-cell>
          </template>
        </template>
      </van-index-bar>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Relation } from '@/model/relation'
  import { reactive } from 'vue'

  const state = reactive<{ list: any[]; indexList: any[] }>({
    list: [],
    indexList: []
  })

  Relation.getAll().then(({ data }) => {
    state.list = data
    state.indexList = data.map((item: any) => item.key)
  })
</script>
<style scoped lang="scss">
  .friends-list {
    overflow-y: auto;
    height: 100%;
    ::v-deep(.van-cell__title) {
      padding-left: 0.5rem;
      display: flex;
      align-items: center;
    }
  }
</style>
