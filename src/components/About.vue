<template>
  <div class="screen">
    <div class="info-container" id="modal">
      <button @click="$emit('close')">
        <svg
          width="35px"
          height="35px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
            <path
              id="Vector"
              d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
        </svg>
      </button>
      <h2>Graph Theory <small>v0.3.0</small></h2>
      <div class="image-row"><img src="../assets/vue.svg"> + <img width="35px" src="../assets/typescript.svg" /> + <img width="38px" src="../assets/icon.png"> + <img width="38px" src="../assets/rust.svg" /> </div>
      <div>Source code <a @click="openLinkRepo">Github</a></div>
      <p>App made by <a @click="openLinkProfile">@nhat-tien</a></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { open } from "@tauri-apps/api/shell";

function openLinkProfile() {
  open("https://github.com/nhat-tien");
}

function openLinkRepo() {
  open("https://github.com/nhat-tien/graph-theory");
}
</script>

<style scoped lang="scss">
.screen {
  width: 100%;
  height: 100%;
  background-color: rgba(#000000, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.info-container {
  position: relative;
  width: 50%;
  height: 50%;
  background-color: $primary-color;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
a {
  cursor: pointer;
  text-decoration: underline;
}

button {
  position: absolute;
  right: 0;
  top: 0;
  background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
} 
.image-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
h2 {
  margin-bottom: 1em;
}
</style>
