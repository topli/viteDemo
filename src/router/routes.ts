import { RouteRecordRaw } from 'vue-router'

const childMain = () => import(/* webpackChunkName: "login" */ '@/views/childMain/index.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '主页',
    meta: {
      keepAlive: true
    },
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
        component: () => import(/* webpackChunkName: "userCard" */ '@/views/friends/userCard.vue')
      }
    ]
  },
  {
    path: '/account',
    name: '用户中心',
    component: childMain,
    children: [
      {
        path: 'information',
        name: '个人信息',
        component: () =>
          import(/* webpackChunkName: "information" */ '@/views/account/information.vue')
      },
      {
        path: 'updateField',
        name: '修改信息',
        component: () =>
          import(/* webpackChunkName: "updateField" */ '@/views/account/updateField.vue')
      }
    ]
  },
  {
    path: '/session',
    name: '聊天',
    component: () => import(/* webpackChunkName: "chat" */ '@/views/chat/session/index.vue')
  }
]
export default routes
