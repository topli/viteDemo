import router from './index'
import NProgress from 'nprogress'
import { useTitle } from '@vueuse/core'

import { clearPending } from '@/libs/axiosRequest'
import { useLocalStorage } from '@vueuse/core'

import { userStore } from '@/store/user'

import { client, createMQTT } from '@/libs/mqtt'

NProgress.configure({ showSpinner: false })
const title = useTitle()

router.beforeEach((to, from, next) => {
  const userState = userStore()
  clearPending()
  NProgress.start()
  title.value = `vite - ${to.name?.toString()}`
  const token = useLocalStorage('token', '')

  if (token.value) {
    // 连接mqtt
    if (!client) {
      createMQTT({
        topic: userState.userInfo._id
      })
    }
    // todo: 获取用户权限，进行路由权限判断 然后跳转路由
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else if (to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})
