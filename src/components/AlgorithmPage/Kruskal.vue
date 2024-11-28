<template>
  <div>
    <button>
      <img alt="stop" src="/images/stop.png" />
    </button>
    <button>
      <img alt="pause" src="/images/pause.png" />
    </button>
    <button>
      <img alt="play" src="/images/play.png" />
    </button>
  </div>
</template>

<script setup lang="ts">
import useKruskalAnimation from '@/composables/useKruskalAnimation';

const { start } = useKruskalAnimation();
</script>

<style scoped lang="scss">
</style>
