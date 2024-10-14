<template>
  <div class="side-menu-container">
    <EditPage v-if="store.appMode == AppMode.Edit" />
    <EducationPage v-if="store.appMode == AppMode.Education" />
  </div>
</template>

<script setup lang="ts">
import EditPage from "@/components/SideMenuPage/EditPage.vue";
import EducationPage from "@/components/SideMenuPage/EducationPage.vue";
import useAppMode, { AppMode } from "@/stores/appMode.ts";

const store = useAppMode();

</script>

<style scoped lang="scss">
.side-menu-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  height: 100%;
}
</style>
