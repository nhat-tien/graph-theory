<script setup lang="ts">
import About from './About.vue';
import useAbout from '@/stores/openAboutStore';
const store = useAbout();
</script>

<template>
  <div class="app-container">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="main">
      <div class="main__sidebar">
        <slot name="sidebar"></slot>
      </div>
      <div class="main__center">
        <slot name="center"></slot>
      </div>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
    <About v-if="store.isDisplayAbout" @close="store.handleClose()"/>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.header {
  width: 100%;
  height: 30px;
  border-bottom: $border;
}
.main {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.main__sidebar {
  width: 80px;
  height: 100%;
  border-right: $border;
}
.main__center {
  flex: 1;
  height: 100%;
  overflow-y: auto;
}
.footer {
  width: 100%;
  height: 20px;
  border-top: $border;
}
</style>
