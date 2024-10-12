<script setup lang="ts">
import { VueFlow, useVueFlow, NodePositionChange } from "@vue-flow/core";
import CustomNode from "@/components/CustomNode.vue";
import CustomEdge from "@/components/CustomEdge.vue";
import FloatBottomPanel from "@/components/FloatBottomPanel.vue";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import useGraphStore from "@/store.ts";


const store = useGraphStore();
const { onNodesChange } = useVueFlow();

onNodesChange(( param ) => {
  param = param as NodePositionChange[];
  param.forEach((each) => {
    each = each as NodePositionChange
    if(each.dragging) {
      store.updateNodePosition(each.id, each.position.x, each.position.y);
    }
  });
});

</script>

<template>
  <VueFlow :nodes="store.nodes" :edges="store.edges">
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
    <Background variant="dots" />
    <Controls position="top-right">
    </Controls>
  </VueFlow>
  <FloatBottomPanel />
</template>
<style lang="scss">
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/controls@latest/dist/style.css';
@import "@vue-flow/core/dist/style.css";
@import "@vue-flow/core/dist/theme-default.css";

.main-container {
  width: 100%;
  height: 100%;
}

.vue-flow__controls {
  border-radius: 7px;
}

.vue-flow__controls-button:first-child {
  border-radius: 7px 7px 0 0;
}

.vue-flow__controls-button:last-child {
  border-radius: 0 0 7px 7px;
}

.vue-flow__edge-path {
  stroke: #000;
}

</style>
