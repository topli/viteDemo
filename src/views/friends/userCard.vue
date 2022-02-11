<template>
  <div>
    <UserCard :user="state.friendInfo" :type="UserCardType.account"></UserCard>
    <div class="action-btn">
      <van-button v-if="!isFriend" icon="plus" block type="default" @click="addFriend">
        添加好友
      </van-button>
      <van-button v-else icon="chat-o" block type="default" @click="goSession">发消息</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { userStore } from '@/store/user'
  import UserCard from '@c/UserCard/index.vue'
  import { Relation, User, Chat } from '@/model'
  import { UserCardType } from '@/emun/user'
  import { chatStore } from '@/store/chat'

  import { useRoute, useRouter } from 'vue-router'
  import { Toast } from 'vant'
  const router = useRouter()
  const userState = userStore()
  const chatState = chatStore()
  let state = reactive<{ friendInfo: User }>({
    friendInfo: {
      _id: ''
    }
  })

  const isFriend = ref(false)
  const route = useRoute()
  const id = route.query.id ?? ''
  const getFriendInfo = () => {
    User.getById(id as string).then((res: any) => {
      state.friendInfo = res.data
    })
  }

  getFriendInfo()

  const getRelation = () => {
    Relation.search(id as string).then((res: any) => {
      isFriend.value = res.data
    })
  }

  getRelation()

  const addFriend = () => {
    if (userState.userInfo && state.friendInfo._id) {
      Relation.save({ userId: userState.userInfo._id, friendId: state.friendInfo._id }).then(
        (res) => {
          if (res.code !== 200) {
            Toast(res.message)
          } else {
            isFriend.value = true
          }
        }
      )
    }
  }

  const goSession = () => {
    Chat.generate({ members: [userState.userInfo._id, state.friendInfo._id] } as Chat).then(
      (res) => {
        const session = res.data
        session.members = session.members.map((m: any) => {
          if (m._id === userState.userInfo._id) {
            session.from = m
          } else {
            session.to = m
          }
          return m
        })

        chatState.setSession(session)
        router.push('/session')
      }
    )
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
