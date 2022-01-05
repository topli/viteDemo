import { RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '主页',
    component: () => import(/* webpackChunkName: "HelloWorld" */ '@/views/home/index.vue')
  },
  {
    path: '/login',
    name: '登录',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
  {
    path: '/about',
    name: '关于',
    component: () => import(/* webpackChunkName: "About" */ '@c/About.vue')
  }
]
export default routes
