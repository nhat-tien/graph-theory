<template>
  <div class="float-panel">
    <div v-tooltip:top="tooltipValue.addNode" class="float-panel__item">
      <svg
        class="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const tooltipValue  = reactive({
  addNode: "Thêm node"
})

</script>

<style scoped lang="scss">
.float-panel {
  position: absolute;
  bottom: 10px;
  left: 50%;
  padding: 0.5em;
  border-radius: $border-radius;
  background-color: $primary-color;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.08);
}
.float-panel__item {
  padding: 0.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    svg {
      color: $secondary-color;
    }
  }
}
</style>
