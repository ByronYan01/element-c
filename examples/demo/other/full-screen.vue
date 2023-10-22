<template>
  <div :class="{ 'my-full-screen': isFullScreen }" :style="{ zIndex: currentZIndex }">
    <slot></slot>
  </div>
</template>
<script>
import { PopupManager } from 'element-ui/src/utils/popup'

export default {
  data() {
    return {
      isFullScreen: false,
      currentZIndex: null,
    }
  },
  methods: {
    request() {
      this.isFullScreen = true
      this.currentZIndex = PopupManager.nextZIndex()
    },
  },
}
</script>
<style>
.my-full-screen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100% !important;
  height: 100% !important;
}
</style>
