<template>
  <div class="speed-container">
    <p>Tốc độ</p>
    <div class="input-container">
      <div class="input-num">{{speed}} s</div>
      <div class="controls">
        <button :disabled="disableSpeed" class="incre-btn" @click="increment">+</button>
        <button :disabled="disableSpeed" class="decre-btn" @click="decrement">-</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  disableSpeed: boolean;
  onChangeSpeed: (speed: number) => void;
}>();


const speed = ref(2);

const MIN = 1;   
const MAX = 10;

function increment() {
  if(speed.value < MAX) {
    speed.value = speed.value + 1;
  }
}

function decrement() {
  if(speed.value > MIN) {
    speed.value = speed.value - 1;
  }
}

watch(speed, (newSpeed: number) => {
  props.onChangeSpeed(newSpeed);
})

</script>

<style lang="scss" scoped>
.speed-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0.2em;
}

.input-container {
  width: 100px;
  height: 38px;
  border: $border;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.input-num {
  flex: 3;
  text-align: center;
}

.controls {
  display: flex;
  flex-direction: column;
  flex: 2;
}

</style>
