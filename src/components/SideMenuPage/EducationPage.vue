<template>
  <div class="container">
    <div class="choose-algo">
      <ul>
        <li v-for="algo in listOfAlgo" :class="{choose: algo === selectedItem}" @click="() => selectItem(algo)" >{{algo}}</li>
      </ul>
    </div>
    <div class="divider"></div>
    <div class="algo-container">
      <button @click="grapMode.setMode(GraphMode.PresenMode)">Click</button>
      <button @click="grapMode.setMode(GraphMode.NormalMode)">Click Again</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { invoke } from '@tauri-apps/api/tauri';
import { ref, toRaw } from 'vue';
import useMainGraphStore from '@/stores/mainGraphStore';
import { GraphMode } from '@/stores/graphModeStore';
import useGraphModeStore from '@/stores/graphModeStore';

const listOfAlgo = ref([
  "Prime",
  "Kruskal"
]);

const grapMode = useGraphModeStore();

const store = useMainGraphStore();

const selectedItem = ref<string>(listOfAlgo.value[0]);

function selectItem(algoName: string) {
  selectedItem.value = algoName;
}

async function test() {
  const res = await invoke("kruskal", {graphFromFe: toRaw(store.edges)});
  console.log(res);
}

</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.choose-algo {
  font-size: 1rem;
  height: 20%;
  overflow-y: auto;
  /* background-color: red; */
  padding: 0.3em 0.5em 0.3em 0.5em;
  li {
    padding: 0.2em 0.5em;
    border-radius: 5px;
    transition: background-color .2s ease-in-out;
    cursor: pointer;
  }
  li.choose {
    background-color: $secondary-color;
    color: $primary-color;
  }
}
.algo-container {
  /* background-color: blue; */
  flex-grow: 1;
}
.divider {
  height: 1px;
  background-color: $gray-color;
}
</style>
