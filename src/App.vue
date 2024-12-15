<script setup lang="ts">
import Layout from './components/Layout.vue';
import Graph from './components/Graph.vue';
import MainContent from './components/MainContent.vue';
import Header from './components/Header.vue';
import SideColumn from '@/components/SideColumn.vue';
import SideMenu from './components/SideMenuPage/SideMenu.vue';
</script>

<template>
   <Layout>
    <template #header>
      <Header />
    </template>
    <template #sidebar>
      <SideColumn />
    </template>
    <template #center>
      <MainContent>
        <template #side-menu>
          <SideMenu />
        </template>
        <template #graph>
          <Graph />
        </template>
      </MainContent>
    </template>
  </Layout>
</template>
<style lang="scss">
@import '@vue-flow/controls/dist/style.css';
@import "@vue-flow/core/dist/style.css";
@import "@vue-flow/core/dist/theme-default.css";
@import "./global.scss";
</style>
