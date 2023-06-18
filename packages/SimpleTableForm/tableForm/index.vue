<template>
  <div>
    <simple-table ref="table-form" class="simple-table-form" v-bind="$attrs" :columns="innerColumns" v-on="$listeners">
      <template #behindColumn>
        <slot name="behindColumn"></slot>
      </template>
    </simple-table>
    <slot name="bottom"></slot>
  </div>
</template>
<script>
import SimpleTable from 'packages/SimpleTable'
import SimpleRender from 'packages/SimpleRender'
export default {
  name: 'SimpleTableForm',
  components: {
    SimpleTable,
    // eslint-disable-next-line vue/no-unused-components
    SimpleRender,
  },
  inheritAttrs: false,
  props: {
    /**
     * prop 同级拓展的参数
     * formMode：开启
     * formItem:{
     *  attrs
     *  listeners
     * }
     * CompType：默认 input
     * CompObj：{} 参考 simple-render 入参
     */
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    formItemKey: {
      type: String,
      default: '',
    },
    isChangeMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerColumns: [],
    }
  },
  created() {
    this.innerColumns = this.columns.map((item) => {
      // 列状态由列配置 formMode 配置 --- 用于部分列不同状态区分
      if (item.formMode) {
        return {
          render: (h, scope) => {
            if (this.isChangeMode) {
              // 行数据编辑、展示态是否能变化由 isChangeMode 决定 --- 用于展示并且支持编辑
              return this.renderChangeItem(h, scope, item)
            }
            // 默认全部编辑态 --- 用于表格表单
            return this.renderFormItem(h, scope, item)
          },
          // ...item,
        }
      } else {
        return item
      }
    })
  },
  methods: {
    transferChild(method, ...args) {
      this.$refs['table-form'][method](...args)
    },
    renderChangeItem(h, scope, item) {
      if (!scope.row.editState) {
        return <div>{typeof item.format === 'function' ? item.format(scope.row) : scope.row[item.prop] || '--'}</div>
      } else {
        return this.renderFormItem(h, scope, item)
      }
    },
    renderFormItem(h, scope, item) {
      return (
        <el-form-item
          prop={`${this.formItemKey}.${scope.$index}.${item.prop}`}
          label-width={`0px`}
          {...{ attrs: item.formItem?.attrs || {} }}
          {...{ listeners: item.formItem?.listeners || {} }}
        >
          {this.renderMax(h, scope, item)}
        </el-form-item>
      )
    },
    renderMax(h, scope, item) {
      return <SimpleRender v-model={scope.row[item.prop]} config={item.CompObj || {}}></SimpleRender>
    },
    renderContent(h, scope, item) {
      if (item.CompType === 'el-select') {
        return (
          <el-select vModel={scope.row[item.prop]} {...{ attrs: item.CompObj?.attrs || {} }}>
            {this.renderSelectOptions(item)}
          </el-select>
        )
      } else {
        return <el-input vModel={scope.row[item.prop]} {...{ attrs: item.CompObj?.attrs || {} }}></el-input>
      }
    },
    renderSelectOptions(item) {
      const options = item?.CompObj?.options
      return (options || []).map((item, index) => {
        return <el-option label={options[index].label} value={options[index].value}></el-option>
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.simple-table-form {
  ::v-deep .el-input__inner {
    width: 100%;
  }
  ::v-deep .el-table__cell {
    // vertical-align: top;
    .el-form-item {
      margin-bottom: 0;
      .el-select {
        width: 100%;
      }
      .el-form-item__error {
        position: relative;
      }
    }
  }
  ::v-deep .table-todo-operate {
    line-height: 30px;
  }
}
</style>
