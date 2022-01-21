<template>
  <div class="message-item message-text">
    <div class="message-content">
      {{ props.msg.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{ msg: { text: string } }>()
  console.log(props.msg)
</script>
<style scoped lang="scss">
  .message-text {
    flex: 1;
    .message-content {
      position: relative;
      background-color: white;
      border-radius: 5px;
      margin: 0 10px;
      padding: 0.5rem;
      width: auto;
      max-width: 100%;
      display: inline-block;
      &::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        left: -10px;
        top: 50%;
        transform: translateY(-50%);
        border-width: 5px;
        border-style: solid;
        border-left-color: transparent;
        border-right-color: white;
        border-top-color: transparent;
        border-bottom-color: transparent;
      }
    }
  }
</style>
