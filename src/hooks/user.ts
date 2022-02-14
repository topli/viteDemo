import { User } from '@/model'
import { userStore } from '@/store/user'
import { useLocalStorage } from '@vueuse/core'

const userState = userStore()

export const setUserInfo = (user: User) => {
  userState.setUserInfo(user)
  useLocalStorage('userInfo', JSON.stringify(user))
}

export const getUserInfo = () => {
  return userState.userInfo._id
    ? userState.userInfo
    : JSON.parse(useLocalStorage('userInfo', '').value)
}
export const isMe = (id: string) => {
  console.log(id)

  return id === userState.userInfo._id
}
