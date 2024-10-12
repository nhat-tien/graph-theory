<template>
  <BaseEdge
    :id="id"
    :style="style"
    :path="path"
    :marker-end="markerEnd"
  />
</template>

<script setup lang="ts">
import { BaseEdge } from '@vue-flow/core';
import { computed, CSSProperties } from 'vue';

const props = defineProps<{
  id: string,
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
  sourcePosition: string,
  targetPosition: string,
  data: any,
  markerEnd: string,
  style?: CSSProperties,
}>();


const path = computed(() => `M ${props.sourceX},${props.sourceY-22}L ${props.targetX},${props.targetY+22}`);
  

</script>

<style scoped lang="scss">
</style>
