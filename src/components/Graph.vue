<template>
  <MainGraph v-if="store.mode === GraphMode.NormalMode" />
  <PresentationGraph v-if="store.mode === GraphMode.PresenMode" />
</template>

<script setup lang="ts">
import MainGraph from "@/components/MainGraph.vue";
import PresentationGraph from "@/components/PresentationGraph.vue";
import { GraphMode } from "@/stores/graphModeStore";
import useGraphModeStore from "@/stores/graphModeStore";
const store = useGraphModeStore();
</script>

<style lang="scss" scoped>

</style>
