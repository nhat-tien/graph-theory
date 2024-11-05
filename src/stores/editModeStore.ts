import { defineStore } from "pinia"
import { ref, watch } from "vue";
import useAddEdgeStore from "./addEdgeStore";

export enum EditMode {
  None,
  Remove,
  AddNode,
  AddEdge,
}


const useEditMode = defineStore('edit-mode', () => {
  const mode = ref<EditMode>(EditMode.None);
  const addEdgeStore = useAddEdgeStore();

  const changeMode = (newMode: EditMode) => {
    if(mode.value == newMode) {
      mode.value = EditMode.None;
      return;
    }
      mode.value = newMode;
  }

  watch(mode,(newMode) => {
    if(newMode != EditMode.AddEdge) {
      addEdgeStore.reset()
    }
  });

  return {
    mode,
    changeMode
  }
});

export default useEditMode;


