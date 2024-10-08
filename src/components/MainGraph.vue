<script setup lang="ts">
import { VueFlow, MarkerType } from "@vue-flow/core";
import CustomNode from "./CustomNode.vue";
import CustomEdge from "./CustomEdge.vue";
import { Background } from "@vue-flow/background";
import { ref } from "vue";

const nodes = ref([
  {
    id: "1",
    type: "custom",
    position: { x: 250, y: 5 },
    data: { label: "1" },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 50, y: 250 },
    data: { label: "2" },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 300, y: 250},
    data: { label: "3" },
  },
]);

const edges = ref([
  {
    id: "e1->2",
    source: "1",
    target: "2",
    type: "custom",
    markerEnd: MarkerType.ArrowClosed,
  },
  {
    id: "e1->3",
    source: "1",
    target: "3",
    type: "custom",
    markerEnd: MarkerType.ArrowClosed,
  },
  {
    id: "e2->3",
    source: "2",
    target: "3",
    type: "custom",
    markerEnd: MarkerType.ArrowClosed,
  },
]);
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
    <template #node-custom="props">
      <CustomNode :label="props.data.label" />
    </template>
    <template #edge-custom="props">
      <CustomEdge
        :id="props.id"
        :source-x="props.sourceX"
        :source-y="props.sourceY"
        :target-x="props.targetX"
        :target-y="props.targetY"
        :source-position="props.sourcePosition"
        :target-position="props.targetPosition"
        :data="props.data"
        :marker-end="props.markerEnd"
      />
    </template>
    <Background variant="lines" />
  </VueFlow>
</template>

<style>
@import "@vue-flow/core/dist/style.css";
@import "@vue-flow/core/dist/theme-default.css";

.main-container {
  width: 100%;
  height: 100%;
}
</style>
