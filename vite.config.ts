import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VantResolver } from 'unplugin-vue-components/resolvers'

const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      /* options */
      resolvers: [VantResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@c': resolve(__dirname, 'src/components')
    }
  },
  define: {
    'process.env': {}
  },
  // 公共样式
  css: {
    // 🔥此处添加全局scss🔥
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/commom.scss";'
      }
    }
  },
  // 服务
  server: {
    open: false,
    host: '0.0.0.0',
    port: 8000,
    // 代理配置
    proxy: {
      '/api': 'http://localhost:8081'
    }
  },
  build: {
    // 打包后目录,默认dist
    outDir: 'dist'
  },
  // 引入第三方的配置
  optimizeDeps: {
    include: []
  },
  // 生产环境路径，类似webpack的assetsPath
  base: './'
})
