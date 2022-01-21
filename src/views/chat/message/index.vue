<template>
  <MessageText v-if="props.msg.type === messageType.text" :msg="props.msg"></MessageText>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import MessageText from './components/text.vue'
  const componentType = ref('MessageText')

  const props = defineProps<{ msg: { text: string; type: string } }>()
  console.log(props.msg)

  // const props = defineProps<{ type: string }>()

  enum messageType {
    text = 'text'
  }

  componentType.value = 'MessageText'
</script>
<style scoped lang="scss"></style>
