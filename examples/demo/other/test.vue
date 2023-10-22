<template>
  <div class="custom-picker" v-clickoutside="() => toggleDropDownVisible(false)">
    <el-button @click="clickBtn(true)">点击</el-button>
    <el-button @click="clickBtn(false)">关闭</el-button>
    <span ref="reference">参考</span>
    <!-- 使用 transition 包裹，可以在展示前，消失后进行额外操作 -->
    <transition name="el-zoom-in-top" @before-enter="handleMenuEnter" @after-leave="doDestroy">
      <div ref="popper" v-show="showPopper" class="custom-picker__popper">
        <div v-for="item in 10" :key="item" @click="clickOption(item)">{{ item }}</div>
      </div>
    </transition>
  </div>
</template>
<script>
// 引入vue-popper组件
import Popper from 'element-ui/src/utils/vue-popper'
import Clickoutside from 'element-ui/src/utils/clickoutside'
export default {
  mixins: [Popper],
  directives: { Clickoutside },
  data() {
    return {
      showPopper: false,
    }
  },
  methods: {
    clickBtn(flag) {
      this.toggleDropDownVisible(flag)
    },
    clickOption(item) {
      console.log('clickOption(item)====', item)
      this.toggleDropDownVisible(false)
    },
    toggleDropDownVisible(visible) {
      const { showPopper } = this
      if (visible !== showPopper) {
        this.showPopper = visible
        if (visible) {
          this.$nextTick(() => {
            this.updatePopper()
          })
        }
      }
    },
    handleMenuEnter() {
      // this.$nextTick(() => this.scrollToOption(this.selected));
    },
    // doDestroy() {
    //   // this.$refs.popper && this.$refs.popper.doDestroy();
    //   this.doDestroy();
    // }
  },
}
</script>
<style lang="scss" scoped>
.custom-picker__popper {
  width: 100px;
  height: 500px;
  background: #ffffff7d;
}
</style>
