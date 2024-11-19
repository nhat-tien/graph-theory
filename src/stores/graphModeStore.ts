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

  return {
    mode,
    setMode
  }
});

export default useGraphModeStore;
