<template>
  <div class="grid-item">
    <slot name="icon"></slot>
    <div>
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.grid-item {
  color: black;
  width: max(100px, 35%);
}

</style>
