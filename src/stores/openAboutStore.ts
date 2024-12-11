import { defineStore } from "pinia";
import { ref } from "vue";


const useAbout = defineStore('about-modal', () => {

const isDisplayAbout = ref(false);

function handleOpen() {
    console.log("Open")
  isDisplayAbout.value = true;
}

function handleClose() {
  console.log("Close")
  isDisplayAbout.value = false;
}
  return {
    isDisplayAbout,
    handleOpen,
    handleClose
  }
});

export default useAbout;


