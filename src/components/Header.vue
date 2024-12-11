<template>
  <div class="header">
    <img class="logo" src="../assets/vue.svg" />
    <div class="header__item">
      <div>File</div>
      <ul class="menu">
        <li @click="saveFile">Save</li>
        <li @click="openFile">Open file</li>
        <li @click="store.closeFile">Close file</li>
      </ul>
    </div>
    <div class="header__item">
      <div>Edit</div>
      <ul class="menu">
        <li @click="store.clearAll()">Clear All</li>
      </ul>
    </div>
    <div class="header__item">
      <div @click="aboutStore.handleOpen()">About</div>
    </div>
    <div class="file-name">{{ fileName }}</div>
  </div>
</template>

<script setup lang="ts">
import useMainGraphStore from '@/stores/mainGraphStore';
import useAbout from "@/stores/openAboutStore";
import { invoke } from '@tauri-apps/api/tauri';
import { computed } from 'vue';
import { toast } from 'vue3-toastify';

const store = useMainGraphStore();
const aboutStore = useAbout();

const fileName = computed(() => {
   // let result = store.fileName.match(/([^\/]+)(?=\.[^\.]+$)/g);
   // return result?.[0]
  return store.fileName
})

async function openFile() {
  const res: string = await invoke('open_file');
  if(res) {
    store.fileName = res;
    await store.readFile();
  }
}

async function saveFile() {
  let filePath: string = store.fileName;
  if (filePath.trim() == "") {
    const res: string = await invoke('get_location_to_save');
    store.fileName = res;
  }
  await store.writeFile();
  toast.success("Lưu thành công", {
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
  });
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  padding-left: 10px;
  height: 100%;
}
.logo {
  $side: 25px;
  width: $side;
  height: $side;
}
.header__item {
  cursor: pointer;
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & .menu {
    position: absolute;
    top: 100%;
    left: 0;
    display: none;
    background-color: $primary-color;
    border: $border;
    border-radius: 0 0 10px 10px;
    list-style-type: none;
    flex-direction: column;
    width: max-content;
    box-shadow: $shadow;
    li {
    padding: 0.5em 1em;
      &:hover {
        background-color: $gray-color;
      }
    }
  }
  &:hover .menu {
    display: flex;
  }
}
.file-name {
  position: absolute;
  left: 50%;
  bottom: 0;
  padding: 0.1em 1em;
  border-radius: 5px 5px 0 0;
  background-color: $gray-color;
  font-size: 0.8rem;
}
</style>
