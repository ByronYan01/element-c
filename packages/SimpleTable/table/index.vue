<template>
  <div class="simple-table">
    <el-table ref="simple-table" border v-bind="$attrs" v-on="$listeners">
      <!-- 用于单选、多选、序号 -->
      <slot name="frontColumn"></slot>
      <template v-for="(item, index) in transformColumns">
        <!-- column 插槽 -->
        <template v-if="item.isSlot">
          <slot :name="item.prop" :item="item" :index="index"></slot>
        </template>
        <!-- 
          提取失败，由于插槽透传问题 
          收集所有插槽名，再次暴露，并坐在 colum内
        -->
        <column v-else :key="item.prop" :column="item">
          <!-- 
            逐步传递：才能将使用 table 组件传递来的插槽作用在 column 组件内的插槽位置上
            不逐步传递：column 插槽位置默认值生效
          -->
          <!-- <template slot="address" slot-scope="scope">
            <slot name="address" v-bind="scope"></slot>
          </template> -->
          <template v-for="slotItem in slotList" :slot="slotItem" slot-scope="scope">
            <slot :name="slotItem" v-bind="scope"></slot>
          </template>
        </column>
      </template>
      <slot name="behindColumn"></slot>
    </el-table>
    <el-pagination
      v-if="isShowPage"
      class="simple-pagination"
      :page-sizes="pageAttrs.pageSizes || [10, 20, 50]"
      :layout="pageAttrs.layout || 'total, sizes, prev, pager, next, jumper'"
      v-bind="pageAttrs"
      v-on="pageListener"
    ></el-pagination>
  </div>
</template>
<script>
import column from './column.vue'
export default {
  name: 'SimpleTable',
  components: {
    column,
  },
  inheritAttrs: false,
  props: {
    // 列属性全局配置
    columnsConfig: {
      type: Object,
      default() {
        return {
          label: '表头',
          align: 'left',
          'show-overflow-tooltip': true,
        }
      },
    },
    /**
     * prop 保持唯一
     * isSlot 使用插槽，默认使用
     * render 使用 render 函数
     * attrs element 参数，会覆盖全局配置
     */
    columns: {
      type: Array,
      default() {
        return [{}]
      },
    },
    isShowPage: {
      type: Boolean,
      default: true,
    },
    pageAttrs: {
      type: Object,
      default() {
        return {
          pageSizes: [10, 20, 50],
          pageSize: 10,
          currentPage: 1,
          total: 0,
          layout: 'total, sizes, prev, pager, next, jumper',
        }
      },
    },
    pageListener: {
      type: Object,
      default() {
        return {
          'size-change': () => {},
          'current-change': () => {},
        }
      },
    },
  },
  computed: {
    slotList() {
      // 需要过滤除了 column 文件声明的插槽名
      // return Object.keys(this.$scopedSlots)
      return Object.keys(this.$scopedSlots).filter((slotName) => {
        return this.propList.some((prop) => slotName.includes(prop))
      })
    },
    propList() {
      return this.columns.map((item) => item.prop)
    },
    transformColumns() {
      return this.columns.map((item) => {
        return {
          ...item,
          attrs: Object.assign({}, this.columnsConfig, { prop: item.prop }, item.attrs), // attrs.props全局可以重复
        }
      })
    },
  },
  mounted() {
    console.log('this=====', this.$scopedSlots)
    console.log('this.slotList=====', this.slotList)
  },
  updated() {
    this.$nextTick(() => {
      this.$refs['simple-table'].doLayout()
    })
  },
  methods: {
    // 使用此组件，通过调用此方法，来调用 el-table 方法
    transferChild(method, ...args) {
      this.$refs['simple-table'][method](...args)
    },
  },
}
</script>
<style scoped></style>
