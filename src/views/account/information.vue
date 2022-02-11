<template>
  <van-cell center title="头像" is-link value="内容" title-class="cell-title">
    <template #value>
      <van-image :width="45" :height="45" :src="state.userInfo.avatar"></van-image>
    </template>
  </van-cell>

  <van-cell center title="名字" is-link title-class="cell-title" @click="updateField('nickName')">
    <template #value>
      {{ state.userInfo.nickName }}
    </template>
  </van-cell>
  <van-cell center title="微信号" is-link title-class="cell-title" @click="updateField('weId')">
    <template #value>
      {{ state.userInfo.weId }}
    </template>
  </van-cell>
  <van-cell center title="手机号" :value="state.userInfo.phone" title-class="cell-title" />
</template>

<script setup lang="ts">
  import { UserApi } from '@/api/userApi'
  import { User } from '@/model/user'
  import { reactive } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  const route = useRoute()
  const router = useRouter()

  const state = reactive<{ userInfo: User }>({ userInfo: {} as User })

  const getUserInfo = () => {
    UserApi.getInfoById(route.query.id as string).then((res: any) => {
      state.userInfo = res.data
    })
  }
  getUserInfo()

  const updateField = (key: string) => {
    router.push({ path: '/account/updateField', query: { id: state.userInfo._id, key } })
  }
</script>
<style scoped lang="scss">
  ::v-deep(.cell-title) {
    max-width: 60px;
  }
</style>
