<template>
  <div class="like-a-page">
    <!-- 
      不知道你说的全屏是怎么实现的? 你实现的应该是浏览器窗口级别的全屏吧，俗称页内全屏，
      但是浏览器的全屏是操作系统级别的桌面全屏。其实有办法的，在进入 fullscreen mode 
      把 append to body 的那些相关 DOM 挪到当前 full screen的元素内，就能解决问题了，
      document.fullscreenElement 可以拿到当前正在全屏显示的元素，退出全屏后再把他们
      挪回 body 下。思路来自 Angular cdk的 FullscreenOverlay Container.
     -->
    <FullScreen class="like-a-module" ref="my-full-screen">
      <el-button @click="requestOwnFullScreen">我封装的全屏</el-button>
      <el-select>
        <el-option>随便写点啥</el-option>
      </el-select>
    </FullScreen>
    <div class="like-a-module" ref="browser-full-screen">
      <el-button @click="requestBrowserFullScreen">官方的全屏</el-button>
      <el-select>
        <el-option>随便写点啥</el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import FullScreen from './full-screen.vue'
export default {
  components: {
    FullScreen,
  },
  methods: {
    requestBrowserFullScreen() {
      this.$refs['browser-full-screen'].requestFullscreen()
    },
    requestOwnFullScreen() {
      this.$refs['my-full-screen'].request()
    },
  },
}
</script>
<style lang="css">
.like-a-page {
  width: 800px;
  height: 600px;
  background-color: #e5e5e5;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.like-a-module {
  width: 400px;
  height: 200px;
  background-color: white;
}
</style>
