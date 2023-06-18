<template>
  <el-table-column :key="column.prop" v-bind="column.attrs">
    <!-- 头：插槽默认生效，renderHeader、slot 同时使用优先 renderHeader  -->
    <template slot="header" slot-scope="scope">
      <slot :name="`${column.prop}Header`" v-bind="scope">{{ column.attrs.label || '暂无' }}</slot>
    </template>
    <!-- 体 -->
    <template slot-scope="scope">
      <template v-if="column.render"> <render :render="column.render" :scope="scope"></render> </template>
      <!-- column 内容插槽默认生效 -->
      <template v-else>
        <slot :name="column.prop" v-bind="scope">{{ scope.row[column.attrs.prop] || '暂无' }}</slot>
      </template>
    </template>
  </el-table-column>
</template>
<script>
import render from './render.vue'
export default {
  name: 'SimpleColumn',
  components: {
    render,
  },
  props: {
    column: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  created() {},
}
</script>
