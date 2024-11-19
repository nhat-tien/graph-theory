<script setup lang="ts">
import { VueFlow } from "@vue-flow/core";
import CustomNode from "@/components/CustomNode.vue";
import CustomEdge from "@/components/CustomEdge.vue";
import FloatBottomPanel from "@/components/FloatBottomPanel.vue";
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import useGraph from "@/composables/useGraph.ts";
import useAddEdgeStore from "@/stores/addEdgeStore.ts";
import { computed, toRaw } from "vue";

const {
  store,
  isToolbarDisplay,
  toolbarPosition,
  edgeValueInput,
  changeEdgeData,
  closeToolbar,
} = useGraph();

const addEdgeStore = useAddEdgeStore();

const positionMark = computed(() => {
   const position = toRaw(addEdgeStore.sourceNode?.position);
  return {
    x: position ? position.x : 0,
    y: position ? position.y : 0
  }
});
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
  <div v-if="addEdgeStore.isMarkDisplay" class="node-mark" :style="{top: positionMark.y + 'px', left: positionMark.x + 'px'}"></div>
  <FloatBottomPanel />
</template>
<style lang="scss" scoped>
.node-mark {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid blue;
  background-color: transparent;
  position: absolute;
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
