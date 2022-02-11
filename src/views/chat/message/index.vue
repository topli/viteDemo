<template>
  <MessageText v-if="props.msg.type === messageType.text" :msg="props.msg"></MessageText>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import MessageText from './components/text.vue'
  const componentType = ref('MessageText')

  const props = defineProps<{ msg: { content: string; type: string } }>()

  enum messageType {
    text = 'text'
  }

  componentType.value = 'MessageText'
</script>
<style scoped lang="scss"></style>
