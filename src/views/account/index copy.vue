<template>
  <div class="ai-warehouse-realmonitor" :class="videoClass">
    <div class="ai-warehouse-realmonitor-video">
      <div v-show="!loaded">
        <div v-if="videoStatus === 'pending'">视频加载中...</div>
        <div v-else-if="videoStatus === 'error'">
          <!-- <img src="/static/img/video_error.png" /> -->
          <div style="error-text">视频获取失败，请重新尝试</div>
        </div>
      </div>
      <div v-show="loaded" class="video-wrap">
        <!-- <video id="vd"></video> -->
        <div id="container" class="qn-rtplayer-media"></div>
        <!-- <img src="/static/img/ztbg.png" alt="" /> -->
      </div>
    </div>
  </div>
</template>
<script>
  import { QNRTPlayer } from 'qn-rtplayer-web'
  export default {
    data() {
      return {
        fullsrceen: false,
        rotate: 0,
        iotDeviceSn: '',
        bindDeviceId: '',
        deviceStatus: 0,
        videoClass: [],
        isFullscreen: false,
        loaded: false,
        videoStatus: 'pending',
        playUrls: ''
      }
    },
    created() {
      this.iotDeviceSn = this.$route.query.iotDeviceSn || ''
      this.bindDeviceId = this.$route.query.bindDeviceId || ''
      this.deviceStatus = this.$route.query.deviceStatus || null
    },
    mounted() {
      window.onorientationchange = () => {
        this.orientationChange()
      }
      this.orientationChange()

      this.getstreampullURLbyUser()
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      layout() {
        setTimeout(() => {
          this.videoClass = []
          if (this.isFullscreen) this.videoClass.push('video-fullscreen')

          if (window.orientation === 0) this.videoClass.push('rotate-0')

          if (window.orientation === 90) this.videoClass.push('rotate-90')
        }, 100)
      },
      fullscreen() {
        this.isFullscreen = !this.isFullscreen
        this.layout()
      },
      // 屏幕旋转重新计算视频大小
      orientationChange() {
        switch (window.orientation) {
          case 0:
            this.isFullscreen = false
            this.layout()
            break
          case -90:
            this.isFullscreen = true
            this.layout()
            break
          case 90:
            this.isFullscreen = true
            this.layout()
            break
          case 180:
            this.layout()
            break
        }
      },
      getstreampullURLbyUser() {
        setTimeout(() => {
          this.$nextTick(() => this.createPlayer())
          this.videoStatus = 'success'
          this.loaded = true
        }, 3000)
      },
      createPlayer() {
        const player = new QNRTPlayer()
        player.init({
          className: 'qn-rtplayer-media',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          volumn: 0.6,
          controls: true,
          playsinline: true,
          mHttpPost: false
        })
        player.play(
          'webrtc://streamsrvqiniutest.maxuscloud.cn:1240/3nm4x1eaws9mc/03f9db37f2e50c8614e4d38fd8e84bc6fc096e1f', // 本地测试
          // _this.playUrls,
          document.getElementById('container')
        )
      }
    }
  }
</script>

<style lang="scss">
  .ai-warehouse-realmonitor {
    background-color: #f8fafa;
    min-height: 100%;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .ai-warehouse-realmonitor-video {
    height: calc(100% - 40px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .video-wrap {
      position: relative;
      width: 100%;
      min-height: 10rem;
      background: #000000;
      video {
        width: 100%;
      }
    }
    .fullscreen {
      padding: 3px;
      border-radius: 5px;
      background: rgba(35, 35, 35, 0.5);
      position: absolute;
      bottom: 0.5rem;
      right: 0.5rem;
      text-align: right;
    }
    img {
      width: 100%;
      vertical-align: middle;
    }
  }
  .video-fullscreen {
    display: flex;
    justify-content: center;
    align-items: center;
    .mint-header-v2 {
      display: none;
    }
    .ai-warehouse-realmonitor-video {
      height: 100%;
    }
    .video-wrap {
      width: 100%;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(90deg);
      display: flex;
      align-items: center;
      justify-content: center;
      video {
        height: 100%;
        text-align: center;
      }
    }
    &.rotate-0 {
      .video-wrap {
        width: 100vh;
        height: 100vw;
      }
    }
  }
  .rotate-90 {
    display: flex;
    justify-content: center;
    align-items: center;
    .mint-header-v2 {
      display: none;
    }
    .ai-warehouse-realmonitor-video {
      height: 100%;
    }
    .video-wrap {
      // width: 100% !important;
      height: 100%;
      transform: unset;
      left: 0;
      top: 0;
      video {
        height: 100%;
        margin: 0 auto;
      }
    }
  }
  .error-text {
    font-size: 1.21rem;
    font-weight: bold;
    text-align: center;
  }
</style>
