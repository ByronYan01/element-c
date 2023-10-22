<template>
  <div>
    <div :class="['drag-drop-area', { 'drag-over': dragOver }]" ref="dragDropArea">
      <div class="left-top angle"></div>
      <div class="right-top angle"></div>
      <div class="left-bottom angle"></div>
      <div class="right-bottom angle"></div>
      <div class="center-area">
        <div class="img-show" draggable="false"></div>
        <div class="text-show" draggable="false">将目录或多个文件拖拽到此进行上传</div>
      </div>
    </div>
    <div :class="['drag-drop-area', { 'drag-over': dragOver1 }]" ref="dragDropArea1">
      <div class="left-top angle"></div>
      <div class="right-top angle"></div>
      <div class="left-bottom angle"></div>
      <div class="right-bottom angle"></div>
      <div class="center-area">
        <div class="img-show" draggable="false"></div>
        <div class="text-show" draggable="false">将目录或多个文件拖拽到此进行上传</div>
      </div>
    </div>
  </div>
</template>
<script>
import resouceDrop from './resouceDrop'
export default {
  data() {
    return {
      dragOver: false,
      dragOver1: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      new resouceDrop({
        targetDom: this.$refs.dragDropArea,
        dragoverFuc: this.dragoverFuc,
        dragleaveFuc: this.dragleaveFuc,
        readDataFuc: this.dropFuc,
        filterFuc: this.filterFuc,
        onlyFile: false,
        mode: 'array',
      })
      new resouceDrop({
        targetDom: this.$refs.dragDropArea1,
        dragoverFuc: this.dragoverFuc1,
        dragleaveFuc: this.dragleaveFuc1,
        readDataFuc: this.dropFuc1,
        filterFuc: this.filterFuc1,
        mode: 'tree',
      })
    })
  },
  methods: {
    dragoverFuc() {
      this.dragOver = true
    },
    dragleaveFuc() {
      this.dragOver = false
    },
    dropFuc(blockContent) {
      console.log('dropFuc blockContent===', blockContent)
    },
    filterFuc(item) {
      console.log('filterFuc item===', item)
      // return item.fullPath !== 'aa/1111.png'
      // return item.fullPath !== '11/22/33'
      // return item.fullPath !== '11/11'
      // return item.type !== 'text/directory'
      return true
    },
    dragoverFuc1() {
      this.dragOver1 = true
    },
    dragleaveFuc1() {
      this.dragOver1 = false
    },
    dropFuc1(blockContent) {
      console.log('dropFuc1 blockContent===', blockContent)
    },
    filterFuc1(item) {
      console.log('filterFuc1 item===', item)
      // return item.fullPath !== 'aa/1111.png'
      // return item.fullPath !== '11/22/33'
      // return item.fullPath !== '11/11'
      // return item.type !== 'text/directory'
      return true
    },
  },
}
</script>
<style lang="scss" scoped>
.drag-drop-area {
  width: 100%;
  height: 154px;
  position: relative;
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #e6e8ec;
  .center-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img-show {
      width: 80px;
      height: 80px;
      background: url(../../../assets/svg/bk-dorp.svg) no-repeat center;
    }
    .text-show {
      font-size: 12px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #1b1d27;
      line-height: 16px;
    }
  }
  .angle {
    position: absolute;
    width: 50px;
    height: 50px;
    background-size: 100% 100%;
  }
  .left-top {
    top: -1px;
    left: -1px;
    background: url(../../../assets/svg/upload-left-top.svg) no-repeat center;
  }
  .right-top {
    top: -1px;
    right: -1px;
    background: url(../../../assets/svg/upload-right-top.svg) no-repeat center;
  }
  .left-bottom {
    bottom: -1px;
    left: -1px;
    background: url(../../../assets/svg/upload-left-bottom.svg) no-repeat center;
  }
  .right-bottom {
    bottom: -1px;
    right: -1px;
    background: url(../../../assets/svg/upload-right-bottom.svg) no-repeat center;
  }
  &.drag-over {
    border: 1px dashed #2d5fff;
    background: #f2f3f8;
    .left-top {
      background: url(../../../assets/svg/upload-left-top-hover.svg) no-repeat center;
    }
    .right-top {
      background: url(../../../assets/svg/upload-right-top-hover.svg) no-repeat center;
    }
    .left-bottom {
      background: url(../../../assets/svg/upload-left-bottom-hover.svg) no-repeat center;
    }
    .right-bottom {
      background: url(../../../assets/svg/upload-right-bottom-hover.svg) no-repeat center;
    }
  }
}
</style>
