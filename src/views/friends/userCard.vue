<template>
  <div>
    <UserCard :user="state.friendInfo" :type="UserCardType.account"></UserCard>
    <div class="action-btn">
      <van-button v-if="!isFriend" icon="plus" block type="default" @click="addFriend">
        添加好友
      </van-button>
      <van-button v-else icon="chat-o" block type="default">发消息</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { userStore } from '@/store/user'
  import UserCard from '@c/UserCard/index.vue'
  import { RelationService } from './service'
  import { UserApi } from '@/api/userApi'
  import { UserCardType } from '@/emun/user'

  const { userInfo } = userStore()

  let state = reactive<{ friendInfo: IUser }>({
    friendInfo: {
      _id: ''
    }
  })

  import { useRoute } from 'vue-router'
  import { IUser } from '@/entity/user'
  import { Toast } from 'vant'

  const isFriend = ref(false)
  const route = useRoute()
  const id = route.query.id || ''
  const getFriendInfo = () => {
    UserApi.getInfoById(id as string).then((res: any) => {
      state.friendInfo = res.data.data
    })
  }

  getFriendInfo()

  const getRelation = () => {
    UserApi.getRelation(id as string).then((res: any) => {
      isFriend.value = res.data.data
    })
  }

  getRelation()

  const addFriend = () => {
    if (userInfo && state.friendInfo._id) {
      RelationService.save(userInfo._id, state.friendInfo._id).then((res) => {
        if (res.data.code !== 200) {
          Toast(res.data.message)
        } else {
          isFriend.value = true
        }
      })
    }
  }
</script>
<style scoped lang="scss">
  .user-wrap {
    padding: 10% 5% 5% 5%;
    display: flex;
    align-items: center;
    .user-info {
      position: relative;
      padding: 0 10px;
      height: 100%;
      .user-display-name {
        font-size: 1rem;
        font-weight: bold;
        height: 50%;
      }
      .user-we-id {
        height: 50%;
      }
    }
  }
</style>
