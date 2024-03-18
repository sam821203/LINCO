<template>
  <!-- svg 被認為是圖標的容器節點，內部需要與 use 標籤結合使用 -->
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + 'smell'" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-'
  },
  name: String,
  color: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '16px'
  },
  height: {
    type: String,
    default: '16px'
  }
})
</script>

<style lang=""></style>
