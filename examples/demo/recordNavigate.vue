<template>
  <div class="record-nav">
    <i :class="['iconfont', 'icon-fanhui', 'undo-redo-icon', { 'is-disable': undoDisable }]" @click="undoFuc"></i>
    <i :class="['iconfont', 'icon-zhankai', 'undo-redo-icon', { 'is-disable': redoDisable }]" @click="redoFuc"></i>
    <div class="nav-wrap">
      <span class="nav-item" v-for="(item, index) in navList" :key="item">
        <span :class="[{ text: index < navLen - 1 }]" @click="textClick(item, index)">
          {{ item }}
        </span>
        <span class="separator">/</span>
      </span>
    </div>
  </div>
</template>
<script>
import { createHistory } from './history'
export default {
  name: 'recordNavigate',
  props: {
    value: {
      type: String,
      default() {
        return ''
      },
    },
  },
  data() {
    const navhistory = createHistory()
    return {
      navhistory: navhistory,
      // 撤销
      undo: navhistory.getUndo(),
      // 回退
      redo: navhistory.getRedo(),
    }
  },
  computed: {
    navList() {
      return this.value.split('/')
    },
    navLen() {
      return this.navList.length
    },
    undoDisable() {
      return this.undo.length === 1
    },
    redoDisable() {
      return this.redo.length === 1
    },
  },
  created() {
    this.navhistory.addHistory(this.value)
  },
  methods: {
    undoFuc() {
      if (this.undoDisable) return
      this.navhistory.undoHistory()
      this.emitInput(this.navhistory.getCurItem())
    },
    redoFuc() {
      if (this.redoDisable) return
      this.navhistory.redoHistory()
      this.emitInput(this.navhistory.getCurItem())
    },
    textClick(item, index) {
      if (index === this.navList.length - 1) return
      const absolutePath = this.navList.slice(0, index + 1).join('/')
      debugger
      this.navhistory.addHistory(absolutePath)
      this.emitInput(absolutePath)
    },
    emitInput(absolutePath) {
      this.$emit('input', absolutePath)
    },
  },
}
</script>
<style lang="scss" scoped>
.record-nav {
  display: flex;
  align-items: center;
  border: 1px solid #e6e8ec;
  .undo-redo-icon {
    cursor: pointer;
    padding: 7px;
    border-right: 1px solid #e6e8ec;
    &.is-disable {
      cursor: not-allowed;
      opacity: 0.4;
    }
  }
  .nav-wrap {
    padding-left: 17px;
    font-size: 12px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #1b1d27;
    .nav-item {
      .text {
        cursor: pointer;
      }
      .separator {
        margin: 0 6px;
      }
      &:last-child {
        .separator {
          display: none;
        }
      }
    }
  }
}
</style>
