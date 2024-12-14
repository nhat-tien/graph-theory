<template>
  <div class="screen">
    <div class="info-container" id="modal">
      <button @click="$emit('close')">
        <svg
          width="50px"
          height="50px"
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
      <p>App made by <a @click="openLinkGithub">@nhat-tien</a></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { open } from "@tauri-apps/api/shell";

function openLinkGithub() {
  open("https://github.com/nhat-tien");
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
  justify-content: center;
  align-items: center;
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
</style>
