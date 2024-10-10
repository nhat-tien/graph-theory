<template>
  <div class="custom-node">
    {{ props.label }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  label: string
}>()
</script>

<style scoped lang="scss">
.custom-node {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3em;
  height: 3em;
  border-radius: 50%;
  background-color: $primary-color;
  font-size: $node-font-size;
}

</style>
