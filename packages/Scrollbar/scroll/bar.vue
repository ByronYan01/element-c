<template>
  <div :class="['scroll-track', 'is-' + barObj.key]" ref="track" @mousedown="clicktrackDown">
    <div class="scroll-thumb" :style="thumbStyle" ref="thumb" @mousedown="clickthumbDown"></div>
  </div>
</template>
<script>
export default {
  props: {
    // 是否为垂直
    isVertical: {
      type: Boolean,
      default: true,
    },
    // 手柄长度(传入值为空或者0%，则不可滚动)
    thumbLen: {
      type: Number,
      default: 0,
    },
    // 移动百分比
    moveRatio: {
      type: Number,
      default: 0,
    },
    wrapRefKey: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      BAR_MAP: {
        vertical: {
          offset: 'offsetHeight',
          scroll: 'scrollTop',
          scrollSize: 'scrollHeight',
          size: 'height',
          key: 'vertical',
          axis: 'Y',
          client: 'clientY',
          movement: 'movementY',
          direction: 'top',
        },
        horizontal: {
          offset: 'offsetWidth',
          scroll: 'scrollLeft',
          scrollSize: 'scrollWidth',
          size: 'width',
          key: 'horizontal',
          axis: 'X',
          client: 'clientX',
          movement: 'movementX',
          direction: 'left',
        },
      },
      downObj: {
        cursorDown: false,
        handleMove: 0,
      },
    }
  },
  computed: {
    barObj() {
      return this.BAR_MAP[this.isVertical ? 'vertical' : 'horizontal']
    },
    thumbStyle() {
      const style = {}
      style[this.barObj.size] = this.thumbLen === 0 ? '' : `${this.thumbLen}%`
      style.transform = `translate${this.barObj.axis}(${this.moveRatio}%)`
      return style
    },
    warpEl() {
      return this.$parent.$refs[this.wrapRefKey]
    },
  },
  methods: {
    clickthumbDown(e) {
      // 点击手柄，阻止点击事件到轨道
      e.stopPropagation()
      if (e.ctrlKey || e.button === 2) {
        return
      }
      this.downObj.cursorDown = true
      const clickClient = e[this.barObj.client]
      // 点击位置到轨道起点位置
      const clickToTrack = clickClient - this.$el.getBoundingClientRect()[this.barObj.direction]
      const clickToThumb = clickClient - e.target.getBoundingClientRect()[this.barObj.direction]
      // 记录此时的 handleMove
      this.downObj.handleMove = clickToTrack - clickToThumb
      this.initMoveFuc()
    },
    initMoveFuc() {
      this.onFun(document, 'mousemove', this.mouseMoveDoc)
      this.onFun(document, 'mouseup', this.mouseUpDoc)
      document.onselectstart = () => false
    },
    mouseMoveDoc(e) {
      this.downObj.handleMove = this.downObj.handleMove + e[this.barObj.movement]
      this.getScorllByclickToTrack(this.downObj.handleMove)
    },
    mouseUpDoc() {
      this.onFun(document, 'mousemove', this.mouseMoveDoc, 'removeEventListener')
      this.onFun(document, 'mouseup', this.mouseUpDoc, 'removeEventListener')
      document.onselectstart = null
      this.downObj.cursorDown = false
      this.downObj.distance = 0
    },
    // 点击轨道位置，手柄中心滑动到点击位置
    clicktrackDown(e) {
      console.log('clicktrackDown e===', e)
      // 点击位置到轨道起点位置(getBoundingClientRect  clientY 相对浏览器可视区域)
      const distance = e[this.barObj.client] - e.target.getBoundingClientRect()[this.barObj.direction]
      const halfThumb = this.$refs.thumb[this.barObj.offset] / 2

      this.getScorllByclickToTrack(distance - halfThumb)
    },
    // 入参：鼠标顶端到轨道起点位置的距离 handleMove
    getScorllByclickToTrack(handleMove) {
      // 轨道上的比率，移动距离 / 轨道长度
      const moveRatio = handleMove / this.$el[this.barObj.offset]

      // 基于比率，得出实际内容长度移动的距离
      this.$emit('wrapScroll', this.barObj.scroll, this.warpEl[this.barObj.scrollSize] * moveRatio)
    },
    onFun(element, event, handler, key = 'addEventListener') {
      if (element && event && handler) {
        element[key](event, handler, false)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.scroll-track {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 1;
  border-radius: 4px;
  // 移入可滚动区域，会覆盖为1
  opacity: 0;
  transition: opacity 120ms ease-out;
  .scroll-thumb {
    position: relative;
    display: block;
    width: 0;
    height: 0;
    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(73, 76, 90, 0.3);
    transition: 0.3s background-color;
    &:hover {
      background-color: rgba(73, 76, 90, 0.5);
    }
  }

  &.is-vertical {
    width: 6px;
    top: 2px;

    > .scroll-thumb {
      width: 100%;
    }
  }
  &.is-horizontal {
    height: 6px;
    left: 2px;

    > .scroll-thumb {
      height: 100%;
    }
  }
}
</style>
