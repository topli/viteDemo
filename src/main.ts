import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import '@/router/permission.ts'

import 'nprogress/nprogress.css'
import 'normalize.css'
// unplugin-vue-components 只加载页面上面存在的组件的css 这两个toast所用到的样式未加载
import 'vant/lib/popup/index.css'
import 'vant/lib/toast/index.css'
import components from '@c/index'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(components)

app.use(pinia)
app.use(router)
app.mount('#app')
