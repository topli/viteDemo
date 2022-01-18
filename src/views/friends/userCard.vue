<template>
  <div>
    <div class="user-wrap">
      <div class="user-avatar">
        <van-image width="45" height="45" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </div>
      <div class="user-info">
        <div class="user-display-name">
          {{ displayName }}
        </div>
        <div class="user-we-id">
          <span>微信号：</span>
          {{ state.friendInfo.weId }}
        </div>
      </div>
    </div>
    <div class="action-btn">
      <van-button v-if="!isFriend" icon="plus" block type="default" @click="addFriend">
        添加好友
      </van-button>
      <van-button v-else icon="chat-o" block type="default">发消息</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, ref } from 'vue'
  import { userStore } from '@/store/user'
  import { RelationService } from './service'
  import { UserApi } from '@/api/userApi'

  const { userInfo } = userStore()

  let state = reactive<{ friendInfo: UserInfo }>({
    friendInfo: {
      _id: ''
    }
  })

  import { useRoute } from 'vue-router'
  import { UserInfo } from '@/entity/user'
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

  const displayName = computed(() => {
    return state.friendInfo.nickName || state.friendInfo.phone || state.friendInfo.account
  })

  const addFriend = () => {
    if (userInfo.id && state.friendInfo.id) {
      RelationService.save(userInfo.id, state.friendInfo.id).then((res) => {
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
