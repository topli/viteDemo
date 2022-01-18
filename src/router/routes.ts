import { RouteRecordRaw } from 'vue-router'

const childMain = () => import(/* webpackChunkName: "login" */ '@/views/childMain/index.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '主页',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
  },
  {
    path: '/login',
    name: '登录',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
  {
    path: '/friends',
    name: '朋友',
    component: childMain,
    children: [
      {
        path: 'add',
        name: ' 添加朋友',
        component: () => import(/* webpackChunkName: "addFriend" */ '@/views/friends/add.vue')
      },
      {
        path: 'info',
        name: ' ',
        component: () => import(/* webpackChunkName: "addFriend" */ '@/views/friends/userCard.vue')
      }
    ]
  }
]
export default routes
