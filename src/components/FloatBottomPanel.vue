<template>
  <div class="float-panel">
    <div
      v-tooltip:top="'Thêm cạnh'"
      class="float-panel__item"
      :class="{ select: modeStore.mode == EditMode.AddEdge }"
      @click="() => modeStore.changeMode(EditMode.AddEdge)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        width="24"
        height="24"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m9 20.247 6-16.5"
        />
      </svg>
    </div>
    <div
      v-tooltip:top="'Thêm đỉnh'"
      class="float-panel__item"
      @click="addOneNode()"
    >
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
    <div
      v-tooltip:top="'Xóa'"
      class="float-panel__item"
      :class="{ select: modeStore.mode == EditMode.Remove }"
      @click="() => modeStore.changeMode(EditMode.Remove)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="size-6"
        width="24"
        height="24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import useMainGraphStore from "@/stores/mainGraphStore";
import useEditMode, { EditMode }from "@/stores/editModeStore";

const store = useMainGraphStore();
const modeStore = useEditMode();

const addOneNode = () => {
  // modeStore.changeMode(EditMode.AddNode)
  store.addNode(100, 100);
};
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
  position: relative;
  &:hover {
    svg {
      color: $secondary-color;
    }
  }
  &.select:after {
    content: "";
    width: 100%;
    height: 3px;
    position: absolute;
    background-color: $secondary-color;
    bottom: -2px;
  }
}
</style>
