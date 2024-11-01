<template>
  <div
    class="custom-node"
    :class="{ select: props.data.select}"
  >
    {{ props.data.label }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  data: any
}>()
</script>

<style scoped lang="scss">
.custom-node {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: $primary-color;
  font-size: $node-font-size;
  box-shadow: $shadow;
}
.select {
  border: 2px solid blue;
}
</style>
