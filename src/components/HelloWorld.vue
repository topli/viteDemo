<script setup lang="ts">
  import { ref } from 'vue'
  import { useStore } from '@/store'
  import { useMouse, useFullscreen } from '@vueuse/core'
  import _ from 'lodash'

  const store = useStore()

  const { x, y } = useMouse()

  const { isFullscreen, toggle } = useFullscreen(document.getElementById('full'))

  defineProps<{ msg: string }>()

  const count = ref(0)

  const full = () => {
    toggle()
  }

  console.log(_.concat([1, 2], [5, 6]))
</script>

<template>
  <div id="full"> 123 </div>
  <div class="flex-test"></div>
  <button type="button" @click="count++">count is: {{ store.count }}</button>

  <span>{{ x + ',' + y }}</span>

  <span>{{ isFullscreen }}</span>

  <el-button @click="full"></el-button>
</template>

<style lang="scss" scoped>
  .flex-test {
    display: flex;
  }
</style>
