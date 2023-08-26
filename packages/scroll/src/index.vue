<template>
  <!-- 用于视觉遮挡原生滚动条，本质使用借助原生滚动条进行滚动，只是展示给用户的是自定义的 dom 样式 -->
  <div class="scrollbar">
    <!-- 滚动的可视区域 -->
    <div class="scrollbar-wrap" :style="wrapStyle" ref="wrap" @scroll="scrollWrap">
      <!-- 实际内容容器 -->
      <div class="content-wrap" ref="content">
        <slot></slot>
      </div>
    </div>
    <!-- 两个方向滚动条 -->
    <bar :isVertical="true" wrapRefKey="wrap" :thumbLen="thumbHeight" :moveRatio="moveY" @wrapScroll="wrapScroll"></bar>
    <bar :isVertical="false" wrapRefKey="wrap" :thumbLen="thumbWidth" :moveRatio="moveX" @wrapScroll="wrapScroll"></bar>
  </div>
</template>
<script>
import bar from './bar.vue'
export default {
  inheritAttrs: false,
  name: 'SimpleScroll',
  components: {
    bar,
  },
  data() {
    return {
      barWidth: 0,
      thumbHeight: 0,
      moveY: 0,
      thumbWidth: 0,
      moveX: 0,
      contentObserver: null,
    }
  },
  computed: {
    wrapStyle() {
      // 配合 scrollbar 样式隐藏原生滚动条
      return {
        marginRight: `-${this.barWidth}px`,
        marginBottom: `-${this.barWidth}px`,
      }
    },
  },
  created() {
    this.barWidth = this.getNativeBarWidth()
    console.log('this.barWidth====', this.barWidth)
  },
  mounted() {
    this.$nextTick(this.observerDom)
  },
  methods: {
    wrapScroll(cssKey, ccsVal) {
      this.$refs.wrap[cssKey] = ccsVal
    },
    // 基于实际内容、可视区域计算出手柄长度
    initThumbLen() {
      const wrapEl = this.$refs.wrap
      if (!wrapEl) return
      // 可视区域 占 滚动区域 百分比 === 手柄占可视区域的百分比长度
      // 滚动区域 wrapEl.scrollHeight === contentWrapEl.clientHeight
      const heightRatio = wrapEl.clientHeight / wrapEl.scrollHeight
      const widthRatio = wrapEl.clientWidth / wrapEl.scrollWidth

      // 大于等于 1，则不会出现滚动条
      this.thumbHeight = heightRatio >= 1 ? 0 : heightRatio * 100
      this.thumbWidth = widthRatio >= 1 ? 0 : widthRatio * 100
    },
    // scorllTop 改动触发 scroll 事件，进而计算 moveY
    scrollWrap() {
      const wrapEl = this.$refs.wrap
      // 移动距离 / 可视区域（基于原生滚动条移动到的位置，计算出移动位置占可视区域的百分比）
      // 不用考虑超过，因为原生滚动条到底，再向下滚动就不触发了
      this.moveY = (wrapEl.scrollTop / wrapEl.clientHeight) * 100
      this.moveX = (wrapEl.scrollLeft / wrapEl.clientWidth) * 100
    },
    observerDom() {
      this.contentObserver?.disconnect()
      this.contentObserver = new ResizeObserver(() => {
        this.initThumbLen()
      })

      this.contentObserver.observe(this.$refs.content)
    },
    getNativeBarWidth() {
      const outer = document.createElement('div')
      // outer.className = 'el-scrollbar__wrap'
      outer.style.visibility = 'hidden'
      outer.style.width = '100px'
      outer.style.position = 'absolute'
      outer.style.top = '-9999px'
      document.body.appendChild(outer)

      // 显示滚动条
      outer.style.overflow = 'scroll'
      const widthNoScroll = outer.offsetWidth

      const inner = document.createElement('div')
      // 此 100% 会比父元素少一个滚动条的宽度
      inner.style.width = '100%'
      outer.appendChild(inner)

      const widthWithScroll = inner.offsetWidth
      outer.parentNode.removeChild(outer)

      return widthNoScroll - widthWithScroll
    },
  },
}
</script>
<style lang="scss" scoped>
.scrollbar {
  position: relative;
  overflow: hidden;
  &:hover,
  &:active,
  &:focus {
    > .scroll-track {
      opacity: 1;
      transition: opacity 340ms ease-out;
    }
  }
  .scrollbar-wrap {
    overflow: scroll;
    max-height: 200px;
  }
}
</style>
