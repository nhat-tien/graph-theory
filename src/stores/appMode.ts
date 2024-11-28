import { defineStore } from "pinia"
import { ref } from "vue";
import useGraphModeStore from "./graphModeStore";

export enum AppMode {
  Edit,
  Education
}

const useAppMode = defineStore('app-mode', () => {
  const appMode = ref<AppMode>(AppMode.Edit);
  const graphModeStore = useGraphModeStore();

  const changeAppMode = (newAppMode: AppMode) => {
    appMode.value = newAppMode;
    graphModeStore.resetToNormal();
  }
  return {
    appMode,
    changeAppMode
  }
});

export default useAppMode;
