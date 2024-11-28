import { defineStore } from "pinia";
import { ref } from "vue";

export enum GraphMode {
  NormalMode,
  PresenMode
}

const useGraphModeStore = defineStore('graph-mod', () => {
  const mode = ref(GraphMode.NormalMode);

  function setMode(newMode: GraphMode) {
    mode.value = newMode;
  }

  function resetToNormal() {
    mode.value = GraphMode.NormalMode
  }

  return {
    mode,
    setMode,
    resetToNormal
  }
});

export default useGraphModeStore;
