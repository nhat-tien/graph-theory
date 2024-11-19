<script setup lang="ts">
import { VueFlow } from "@vue-flow/core";
import CustomNode from "@/components/CustomNode.vue";
import CustomEdge from "@/components/CustomEdge.vue";
import { Background } from "@vue-flow/background";
import useMainGraphStore from "@/stores/mainGraphStore";

const { edges, nodes }= useMainGraphStore();


</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
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
  </VueFlow>
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
