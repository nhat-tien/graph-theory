<script setup lang="ts">
import { VueFlow } from "@vue-flow/core";
import CustomNode from "@/components/CustomNode.vue";
import CustomEdge from "@/components/CustomEdge.vue";
import FloatBottomPanel from "@/components/FloatBottomPanel.vue";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import useGraph from "@/composables/useGraph.ts";
import useAddEdge from "@/composables/useAddEdge.ts";

const {
  store,
  isToolbarDisplay,
  toolbarPosition,
  edgeValueInput,
  changeEdgeData,
  closeToolbar,
} = useGraph();

const { isMarkDisplay } = useAddEdge();


</script>

<template>
  <VueFlow :nodes="store.nodes" :edges="store.edges">
    <template #node-custom="props">
      <CustomNode :data="props.data" />
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
  <div v-if="isMarkDisplay" class="node-mark"></div>
  <FloatBottomPanel :toolbar="isToolbarDisplay" />
</template>
<style lang="scss" scoped>
.node-mark {
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

.toolbar {
  position: fixed;
  width: 150px;
  height: 40px;
  background-color: $primary-color;
  padding: 0.2em 0.5em;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: $shadow;
  border-radius: 3px;
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
