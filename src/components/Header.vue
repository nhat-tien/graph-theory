<template>
  <div class="header">
    <img class="logo" src="../assets/vue.svg" />
    <div class="header__item">File</div>
    <div class="header__item">Edit</div>
    <div class="header__item">About</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  padding-left: 10px;
}
.logo {
  $side: 25px;
  width: $side;
  height: $side;
}
.header__item {
  cursor: pointer;
}
</style>
