<script setup lang="ts">
import Layout from './components/Layout.vue';
import MainGraph from './components/MainGraph.vue';
import MainContent from './components/MainContent.vue';
</script>

<template>
   <Layout>
    <template #center>
      <MainContent>
        <template #graph>
          <MainGraph />
        </template>
      </MainContent>
    </template>
  </Layout>
</template>
<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
}
</style>
