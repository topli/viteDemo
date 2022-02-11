<template>
  <van-field v-model="value" :label="field?.label" />
  <van-button block @click="update">保存</van-button>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { UserApi } from '@/api/userApi'
  import { setUserInfo } from '@/hooks/user'
  import { Toast } from 'vant'

  const route = useRoute()
  const { key, id } = route.query

  const value = ref('')
  const fieldArr = [
    { label: '头像', key: 'avatar' },
    { label: '名字', key: 'nickName' },
    { label: '微信号', key: 'weId' }
  ]

  const field = fieldArr.find((item) => item.key === key)
  if (id) {
    UserApi.getInfoById(id as string).then((res) => {
      const { data } = res
      value.value = data.data[key as string]
    })
  }

  const update = () => {
    UserApi.updateUser(id as string, key as string, value.value).then((res) => {
      const { code, data } = res
      if (code === 200) {
        Toast('修改成功')
        setUserInfo(data)
      } else {
        Toast('修改失败')
      }
    })
  }
</script>
<style scoped lang="scss"></style>
