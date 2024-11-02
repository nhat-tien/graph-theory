import { defineStore } from "pinia"
import { ref } from "vue";

export enum EditMode {
  None,
  Remove,
  AddNode,
  AddEdge,
}

const useEditMode = defineStore('edit-mode', () => {
  const mode = ref<EditMode>(EditMode.None);

  const changeMode = (newMode: EditMode) => {
    if(mode.value == newMode) {
      mode.value = EditMode.None;
      return;
    }
      mode.value = newMode;
  }

  return {
    mode,
    changeMode
  }
});

export default useEditMode;


