<template>
  <div class="cascader-wrap">
    <el-cascader
      v-model="innerValue"
      v-bind="$attrs"
      v-on="$listeners"
      ref="commonCascader"
      :placement="reverse ? 'bottom-end' : 'bottom-start'"
      :popper-class="`common-cascader-popper ${popperClass} ${reverse ? 'is-reverse' : ''} `"
    ></el-cascader>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  name: 'SimpleCascader',
  props: {
    // 一维、二维数组
    value: {
      type: Array,
      default() {
        return []
      },
    },
    popperClass: {
      type: String,
      default() {
        return ''
      },
    },
    level: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      innerValue: [],
      reverse: false,
    }
  },
  watch: {
    value: {
      handler() {
        this.innerValue = this.value
      },
      immediate: true,
    },
    innerValue(n) {
      this.$emit('input', n)
    },
  },
  mounted() {
    const positonInfo = this.$el.getBoundingClientRect()
    if (window.innerWidth - positonInfo.left < this.level * 200) {
      this.reverse = true
    }
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.cascader-wrap {
  display: inline-block;
}
</style>
<style lang="scss">
.el-cascader__dropdown.common-cascader-popper {
  &.is-reverse {
    .el-cascader-panel {
      flex-direction: row-reverse;
      .el-cascader-menu {
        max-width: 200px;
        .el-cascader-menu__list {
          .el-cascader-node {
            &[aria-haspopup='true'] > .el-checkbox {
              display: none;
            }
            & > .el-cascader-node__postfix {
              left: 10px;
              right: 0;
            }
            & > .el-icon-arrow-right::before {
              content: '\e6de';
            }
          }
        }
      }
    }
  }
  .el-cascader-panel {
    .el-cascader-menu {
      .el-cascader-menu__list {
        .el-cascader-node {
          &.in-active-path {
            background: #f5f7fa;
            .el-cascader-node__label,
            .el-cascader-node__postfix {
              color: var(--color-font-default);
              font-weight: normal;
            }
          }
          &.is-active {
            .el-cascader-node__label {
              font-weight: normal;
            }
          }
          & > .el-cascader-node__prefix {
            display: none;
          }
          &[aria-haspopup='true'] > .el-checkbox {
            display: none;
          }
          & > .el-cascader-node__label {
            word-break: break-word;
            line-height: 16px;
            white-space: normal;
          }
        }
      }
    }
  }
}
</style>
