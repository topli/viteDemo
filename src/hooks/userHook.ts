import { IUser } from '@/entity/user'
import { userStore } from '@/store/user'
import { useLocalStorage } from '@vueuse/core'
import { reactive } from 'vue'
const userState = userStore()
export const setUserInfo = (user: IUser) => {
  userState.setUserInfo(user)
  useLocalStorage('userInfo', user)
}

export const getUserInfo = () => {
  const state = reactive<{ userInfo: IUser }>({
    userInfo: {} as IUser
  })

  state.userInfo = userState.userInfo._id
    ? userState.userInfo
    : JSON.parse(useLocalStorage('userInfo', '').value)
  return state
}
