<template>
  <div class="container">
    <div class="choose-algo">
      <ul>
        <li v-for="algo in listOfAlgo" :class="{choose: algo === selectedItem}" @click="() => selectItem(algo)" >{{algo}}</li>
      </ul>
    </div>
    <div class="divider"></div>
    <div class="algo-container">
      <Kruskal v-if="selectedItem === 'Kruskal'" />
      <Prim v-if="selectedItem === 'Prime'"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Kruskal from '../AlgorithmPage/Kruskal.vue';
import Prim from '../AlgorithmPage/Prim.vue';

const listOfAlgo = ref([
  "Prime",
  "Kruskal"
]);


// const store = useMainGraphStore();

const selectedItem = ref<string>("");

function selectItem(algoName: string) {
  selectedItem.value = algoName;
}

</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.choose-algo {
  font-size: 1rem;
  height: 100px;
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
  padding: 5px 20px 5px 10px;
  overflow-y: auto;
  height: calc(100vh - 155px);
}
.divider {
  height: 1px;
  background-color: $gray-color;
}
</style>
