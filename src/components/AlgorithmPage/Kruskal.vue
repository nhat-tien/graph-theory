<template>
  <div class="controller-container">
    <SpeedControl :on-change-speed="handleChangeSpeed" :disable-speed="isPauseEnable"/>
    <div>
    <button :disabled="!isStopEnable" @click="stop">
      <svg
        fill="#000000"
        width="800px"
        height="800px"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h16.128q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-16.128q-0.832 0-1.44 0.576t-0.576 1.44v16.16z"
        ></path>
      </svg>
    </button>
    <button :disabled="!isPauseEnable" @click="pause">
      <svg
        fill="#000000"
        width="800px"
        height="800px"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.44 0.576t-0.576 1.44v16.16zM18.016 24.096q0 0.832 0.608 1.408t1.408 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.408 0.576t-0.608 1.44v16.16z"
        ></path>
      </svg>
    </button>
    <button :disabled="!isPlayEnable" @click="start">
      <svg
        width="800px"
        height="800px"
        viewBox="-8 -7 40 40"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
        fill="#000000"
      >
        <g
          id="Page-1"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
          sketch:type="MSPage"
        >
          <g
            id="Icon-Set-Filled"
            sketch:type="MSLayerGroup"
            transform="translate(-419.000000, -571.000000)"
            fill="currentColor"
          >
            <path
              d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,583.554"
              id="play"
              sketch:type="MSShapeGroup"
            ></path>
          </g>
        </g>
      </svg>
    </button>
  </div>
  </div>
  <div class="table-container">
    <table v-if="timeLine.length != 0">
      <tbody>
        <tr>
          <th>Cạnh</th>
          <th>Trọng số</th>
        </tr>
        <tr v-for="edge in timeLine">
          <td>{{ changeEdgeIdDisplay(edge.edge.id) }}</td>
          <td>{{ edge.edge.weight }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p v-if="totalWeight > 0">Tổng trọng số: {{ totalWeight }}</p>
</template>

<script setup lang="ts">
import useKruskalAnimation from "@/composables/useKruskalAnimation";
import useGraphModeStore, { GraphMode } from "@/stores/graphModeStore";
import { computed, onMounted } from "vue";
import SpeedControl from "../SpeedControl.vue";

const { start, isRunning, pause, stop, timeLine, totalWeight, setIntervalTime } =
  useKruskalAnimation();

const graphModeStore = useGraphModeStore();

const isStopEnable = computed(() => isRunning.value);
const isPauseEnable = computed(() => isRunning.value);
const isPlayEnable = computed(() => !isRunning.value);

onMounted(() => {
  graphModeStore.setMode(GraphMode.PresenMode);
});

function changeEdgeIdDisplay(input: string): string {
  const firstNumberRegex = /(?<=e)\d+/g;
  const firstNumber = firstNumberRegex.exec(input);
  const secondNumberRegex = /(?<=->)\d+/g;
  const secondNumber = secondNumberRegex.exec(input);
  
  return `(${firstNumber}, ${secondNumber})`;
}

function handleChangeSpeed(speed: number) {
  setIntervalTime(speed);
}

</script>

<style scoped lang="scss">
button {
  svg {
    width: 30px;
    height: 30px;
  }
}

button:disabled {
  svg {
    fill: #a5a8a6;
  }
}

.controller-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.table-container {
  margin-top: 1em;
  display: flex;
  justify-content: center;
}

table,
td,
th {
  border: 1px solid black;
  border-collapse: collapse;
}

td,
th {
  padding: 0.5em 1em;
}
p {
  text-align: center;
  margin-top: 1em;
}
</style>
