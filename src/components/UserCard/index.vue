<template>
  <van-cell class="user-card" :bind="attrs">
    <template #icon>
      <van-badge v-if="unread" :content="unread">
        <van-image :width="image.w" :height="image.h" :src="props.user?.avatar" />
      </van-badge>
      <van-image v-else :width="image.w" :height="image.h" :src="props.user?.avatar"></van-image>
    </template>
    <template #title>
      <div class="user-card-title">
        {{ displayName }}
      </div>
    </template>
    <template #label>
      <div v-if="props.msg" class="user-card-label overflow-ellipsis">{{ props.msg }} </div>
      <div v-else-if="type === UserCardType.account" class="user-card-label overflow-ellipsis">
        微信号：{{ props.user.weId }}
      </div>
    </template>
    <template v-if="props.msg" #value>
      <div class="user-card-right">
        <div class="time">
          {{ formatTime(time) }}
        </div>
      </div>
    </template>
  </van-cell>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import isToday from 'dayjs/plugin/isToday'
  import isYesterday from 'dayjs/plugin/isYesterday'
  import { UserCardType } from '@/emun/user'
  import { User } from '@/model/user'
  import { computed, reactive, useAttrs } from 'vue'
  import { Messages } from '@/model'

  interface UserCard {
    user: User
    type: UserCardType
    unread?: number
    msg?: string
    time?: number
    messages?: Array<Messages>
  }
  const props = defineProps<UserCard>()

  const attrs = useAttrs()

  const image = reactive({ w: 46, h: 46 })
  if (props.type === UserCardType.friend) {
    image.w = 24
    image.h = 24
  }

  const displayName = computed(() => {
    const { nickName, phone, account } = props.user
    console.log(props.user)

    return nickName || phone || account
  })

  const formatTime = computed(() => {
    return function (time: number | undefined) {
      dayjs.extend(isToday)
      dayjs.extend(isYesterday)

      let format = dayjs(new Date(Number(time)))
      if (format.isToday()) {
        return format.format('HH:mm')
      } else if (format.isYesterday()) {
        return '昨天'
      } else {
        return format.format('MM-DD')
      }
    }
  })
</script>
<style scoped lang="scss">
  .user-card {
    align-items: center;
    .user-card-title,
    .user-card-label {
      padding: 0 0.5rem;
      font-size: var(--van-font-size-lg);
    }
    ::v-deep(.van-cell__title) {
      overflow: hidden;
    }
    .user-card-label {
      font-size: var(--van-font-size-md);
    }
  }
</style>
