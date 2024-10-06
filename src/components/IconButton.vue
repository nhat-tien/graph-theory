<script setup lang="ts">
interface Props {
   tooltip?: string
}
const props = defineProps<Props>();

</script>

<template>
  <div>
    <slot></slot>
  </div>
  <div>
  </div>
</template>
