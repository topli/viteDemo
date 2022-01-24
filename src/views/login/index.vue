<template>
  <div class="login-wrap">
    <h2>VITE-DEMO</h2>
    <img src="../../assets/logo.png" />
    <div class="login-form">
      <van-form @submit="login">
        <van-field v-model="loginInfo.u" placeholder="请输入手机号" autocomplete="new-password" />
        <van-field
          v-model="loginInfo.p"
          type="password"
          placeholder="请输入验证码"
          autocomplete="new-password"
        >
          <template #button>
            <van-button size="small" type="primary" :disabled="!!timing" @click="sendCode">
              {{ timing ? timing + 'S' : '发送验证码' }}
            </van-button>
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button block type="primary" native-type="submit" class="login-btns">
            登录
          </van-button>
          <span>mode: {{ VITE_MODE_NAME }}</span>
          <!-- <van-button type="default">注册</van-button> -->
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Toast } from 'vant'
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useLocalStorage } from '@vueuse/core'
  import { setUserInfo } from '@/hooks/userHook'
  import { User } from '@/model'
  // 环境变量用法
  const VITE_MODE_NAME = import.meta.env.VITE_MODE_NAME
  // 路由
  const router = useRouter()
  // 验证码
  let timing = ref(0)
  let timer = 0
  const sendCode = () => {
    if (loginInfo.u) {
      if (timer) {
        return
      } else {
        timing.value = 60
        timer = window.setInterval(() => {
          timing.value = timing.value - 1
          if (timing.value === 0) {
            clearInterval(timer)
            timer = 0
          }
        }, 1000)
      }
    } else {
      Toast('请填写手机号')
    }
  }
  // 登录
  let loginInfo = reactive({
    u: '',
    p: ''
  })

  const login = () => {
    if (loginInfo.u && loginInfo.p) {
      User.login(loginInfo).then((res) => {
        const { code, data, token, message } = res
        if (code === 200) {
          const localToken = useLocalStorage('token', '')
          localToken.value = token
          setUserInfo(data)
          router.push('/')
        } else {
          Toast(message)
        }
      })
    }
  }
</script>
<style scoped lang="scss">
  .login-wrap {
    max-width: 750px;
    margin: 0 auto;
    padding: 10%;
    text-align: center;
    .login-btns {
      background: transparent;
      background-image: linear-gradient(150deg, rgb(0 255 173 / 50%), #0089ff);
      border: 0;
    }
  }
</style>
