import { IUser } from '@/entity/user'
import { userStore } from '@/store/user'
import { useLocalStorage } from '@vueuse/core'
const userState = userStore()
export const setUserInfo = (user: IUser) => {
  userState.setUserInfo(user)
  useLocalStorage('userInfo', user)
}

export const getUserInfo = () => {
  return userState.userInfo ? userState.userInfo : JSON.parse(useLocalStorage('userInfo', '').value)
}
