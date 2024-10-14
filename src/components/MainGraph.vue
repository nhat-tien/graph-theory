<script setup lang="ts">
import { VueFlow } from "@vue-flow/core";
import CustomNode from "@/components/CustomNode.vue";
import CustomEdge from "@/components/CustomEdge.vue";
import FloatBottomPanel from "@/components/FloatBottomPanel.vue";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import useGraph from "@/composables/useGraph.ts";

const {
  store,
  isToolbarDisplay,
  toolbarPosition,
  edgeValueInput,
  changeEdgeData,
  closeToolbar,
} = useGraph();


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
  <div v-if="isToolbarDisplay" class="toolbar" :style="{top: toolbarPosition.y + 'px', left: toolbarPosition.x + 'px'}" >
    <input type="text" v-model="edgeValueInput"/>
    <div class="toolbar__btn toolbar__btn--accept" @click="changeEdgeData()">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    </div>
    <div class="toolbar__btn toolbar__btn--close" @click="closeToolbar()">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </div>
  </div>
  <FloatBottomPanel :toolbar="isToolbarDisplay" />
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
.toolbar {
  position: fixed;
  width: 150px;
  height: 40px;
  background-color: $primary-color;
  padding: 0.2em 0.5em;
  display: flex;
  flex-direction: row;
  align-items: center;
  input {
    border: none;
    font-size: 18px;
    outline: none;
    width: 80%;
  }
  .toolbar__btn {
    padding: 0.2em;
    width: 40px;
  }
  .toolbar__btn--accept:hover {
    background-color: $accept-bg-btn-color;
    color: $accept-fg-btn-color;
  }
  .toolbar__btn--close:hover {
    background-color: $error-bg-btn-color;
    color: $error-fg-btn-color;
  }
}
</style>
