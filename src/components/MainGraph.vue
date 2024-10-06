<script setup lang="ts">
import { VueFlow } from '@vue-flow/core'
import CustomNode from './CustomNode.vue'
import { Background } from '@vue-flow/background'
import { ref } from 'vue'

const nodes = ref([
  { 
    id: '1',
    type: 'custom', 
    position: { x: 250, y: 5 },
    data: { label: 'Node 1' },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 50, y: 250 },
    data: { label: 'Node 2', },
  }
])

const edges = ref([
  {
    id: 'e1->2',
    source: '1',
    target: '2',
    type: 'straight'
  }
]);

</script>

<template>
    <VueFlow :nodes="nodes" :edges="edges">
       <template #node-custom="props">
         <CustomNode :label="props.data.label" />
       </template>
    <Background variant="lines"/>
    </VueFlow>
</template>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

.main-container {
  width: 100%;
  height: 100%;
}

</style>
