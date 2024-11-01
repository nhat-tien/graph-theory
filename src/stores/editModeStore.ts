import { defineStore } from "pinia"
import { ref } from "vue";

export enum EditMode {
  None,
  Remove,
  AddNode,
  AddEdge,
}

const useEditMode = defineStore('edit-mode', () => {
  const editMode = ref<EditMode>(EditMode.None);

  const changeMode = (mode: EditMode) => {
    if(editMode.value == mode) {
      editMode.value = EditMode.None;
      return;
    }
      editMode.value = mode;
  }

  return {
    editMode,
    changeMode
  }
});

export default useEditMode;


