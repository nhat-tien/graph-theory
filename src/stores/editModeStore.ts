import { defineStore } from "pinia"
import { ref } from "vue";

export enum EditMode {
  Normal,
  Node,
  Egde,
  EditEdge
}

const useEditMode = defineStore('edit-mode', () => {
  const editMode = ref<EditMode>(EditMode.Normal);

  return {
    editMode,
  }
});

export default useEditMode;


