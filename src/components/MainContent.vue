<template>
  <div class="main-container" ref="mainContainerRef">
    <div class="side-menu" :style="{ 'width' : widthPercentOfSideMenu + '%' }">
      <slot name="side-menu"></slot>
    </div>
    <div class="divider">
      <div class="hover-area" ref="hoverAreaRef" @mousedown="handleMouseDown"></div>
    </div>
    <div class="graph-container">
      <slot name="graph"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const widthPercentOfSideMenu = ref(25);
const mainContainerRef = ref<null | HTMLDivElement>(null)
const hoverAreaRef = ref<null | HTMLDivElement>(null)

function handleMouseDown(e: MouseEvent) {
    e.preventDefault();
    hoverAreaRef.value?.classList.add("hover");
    const startX = e.clientX;
    const startLeftWidth = widthPercentOfSideMenu.value;
    const mainContainerInnerWidth = mainContainerRef.value?.offsetWidth ?? 1;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const newLeftWidth = Math.max(1, Math.min(25, startLeftWidth + deltaX / mainContainerInnerWidth * 100));
      widthPercentOfSideMenu.value = newLeftWidth;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      hoverAreaRef.value?.classList.remove("hover");
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

</script>

<style scoped lang="scss">
@mixin hover {
  background-color: $secondary-color;
  cursor: ew-resize;
}

.main-container {
  display: flex;
  flex-direction: row;
}
.side-menu {
  height: 100%;
}
.divider {
  height: 100%;
  border: $border;
  position: relative;
  .hover-area {
    position: absolute;
    width: 10px;
    height: calc(100% + 2px);
    left: -5px;
    top: -1px;
    z-index: 9999;
  }
}

.hover-area:hover {
  @include hover;
}

.hover {
  @include hover;
}

.graph-container {
  flex: 1;
  background-color: $gray-color;
  position: relative;
}
</style>
