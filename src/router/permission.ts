import router from './index'
import NProgress from 'nprogress'
import { useTitle } from '@vueuse/core'

import { clearPending } from '@/libs/http'
import { useLocalStorage } from '@vueuse/core'

const title = useTitle()
router.beforeEach((to, from, next) => {
  clearPending()
  NProgress.start()
  title.value = `vite - ${to.name?.toString()}`

  const token = useLocalStorage('token', '')

  if (token.value) {
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
  setTimeout(() => {
    NProgress.done()
  }, 1000)
})
