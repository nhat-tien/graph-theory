import { defineStore } from "pinia"
import { ref } from "vue";

export enum AppMode {
  Edit,
  Education
}

const useAppMode = defineStore('app-mode', () => {
  const appMode = ref<AppMode>(AppMode.Edit);
  const changeAppMode = (newAppMode: AppMode) => {
    console.log(appMode);
    appMode.value = newAppMode;
  }
  return {
    appMode,
    changeAppMode
  }
});

export default useAppMode;
