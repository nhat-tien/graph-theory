<script setup lang="ts"></script>

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
  </div>
</template>

<style scoped lang="scss">
.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
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
}
.footer {
  width: 100%;
  height: 20px;
  border-top: $border;
}
</style>
