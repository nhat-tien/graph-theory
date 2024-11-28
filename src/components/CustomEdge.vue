<template>
  <BaseEdge
    :id="id"
    :label="data.text"
    :path="path"
    :class="{
      solid: props.data.highlight == 'solid',
      blink: props.data.highlight == 'blink',
    }"
    :label-x="pathFromFlow[1]"
    :label-y="pathFromFlow[2]"
    :label-style="{ fill: '#fff', fontSize: 12, textAlign: 'center' }"
    :label-show-bg="true"
    :label-bg-style="{ fill: '#000' }"
    :label-bg-padding="[8, 5]"
    :label-bg-border-radius="0"
  />
  <EdgeLabelRenderer>
    <div
      v-if="props.data.marker"
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        transform: `translate(${labelX}px,${labelY}px) rotate(-45deg) rotate(${labelRad}rad)`,
        transformOrigin: '0% 0%',
      }"
      class="nodrag nopan label"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
        />
      </svg>
    </div>
  </EdgeLabelRenderer>
</template>

<script setup lang="ts">
import { BaseEdge, getStraightPath, EdgeLabelRenderer } from "@vue-flow/core";
import { computed } from "vue";

const props = defineProps<{
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: string;
  targetPosition: string;
  data: any;
}>();

const pathFromFlow = computed(() => getStraightPath(props));
const path = computed(
  () =>
    `M ${props.sourceX},${props.sourceY - 25}L ${props.targetX},${props.targetY + 25}`,
);
// const path = computed(() => `M ${props.sourceX},${props.sourceY}L ${props.targetX},${props.targetY}`);
const lineLength = computed(() => {
  const horizon = props.targetX - props.sourceX;
  const vertical = props.targetY + 25 - (props.sourceY - 25);
  return Math.sqrt(horizon ** 2 + vertical ** 2);
});

const labelX = computed(() => {
  const horizon = props.targetX - props.sourceX;
  return props.targetX - (horizon * 48) / lineLength.value;
});

const labelY = computed(() => {
  const vertical = props.targetY + 25 - (props.sourceY - 25);
  return props.targetY + 25 - (vertical * 48) / lineLength.value;
});

const labelRad = computed(() => {
  const horizon = props.targetX - props.sourceX;
  if (props.targetY + 25 < props.sourceY - 25) {
    return -1 * Math.acos(horizon / lineLength.value);
  }
  return Math.acos(horizon / lineLength.value);
});
</script>

<style lang="scss">
.label {
  width: 20px;
}
.vue-flow__edge-path.solid {
  stroke: #1602f0;
  stroke-width: 5px;
}
.vue-flow__edge-path.blink {
  stroke: #f20302;
  stroke-width: 5px;
  animation: blinker 0.5s ease-in-out 0s infinite;
}

@keyframes blinker {
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
}
</style>
