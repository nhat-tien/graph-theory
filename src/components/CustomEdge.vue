<template>
  <BaseEdge
    :id="id"
    :style="style"
    :label="data.text"
    :path="path"
    :marker-end="markerEnd"
    :label-x="pathFromFlow[1]"
    :label-y="pathFromFlow[2]"
    :label-style="{ fill: '#fff', fontSize: 12, textAlign: 'center'}"
    :label-show-bg="true"
    :label-bg-style="{ fill: '#000' }"
    :label-bg-padding="[8, 5]"
    :label-bg-border-radius="0"
  />
</template>

<script setup lang="ts">
import { BaseEdge, getStraightPath } from '@vue-flow/core';
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

const pathFromFlow = computed(() => getStraightPath(props))
const path = computed(() => `M ${props.sourceX},${props.sourceY-22}L ${props.targetX},${props.targetY+22}`);
  

</script>

<style scoped lang="scss">
</style>
