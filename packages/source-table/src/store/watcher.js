import Vue from 'vue'

const doFlattenColumns = (columns) => {
  const result = []
  columns.forEach((column) => {
    if (column.children) {
      result.push.apply(result, doFlattenColumns(column.children))
    } else {
      result.push(column)
    }
  })
  return result
}

export default Vue.extend({
  data() {
    return {
      states: {
        // 3.0 版本后要求必须设置该属性
        rowKey: null,

        // 渲染的数据来源，是对 table 中的 data 过滤排序后的结果
        data: [],

        // 是否包含固定列
        isComplex: false,

        // 列
        _columns: [], // 不可响应的
        originColumns: [],
        columns: [],
        fixedColumns: [],
        rightFixedColumns: [],
        leafColumns: [],
        fixedLeafColumns: [],
        rightFixedLeafColumns: [],
        leafColumnsLength: 0,
        fixedLeafColumnsLength: 0,
        rightFixedLeafColumnsLength: 0,

        hoverRow: null,
      },
    }
  },

  methods: {
    // 检查 rowKey 是否存在
    assertRowKey() {
      const rowKey = this.states.rowKey
      if (!rowKey) throw new Error('[ElTable] prop row-key is required')
    },

    // 更新列
    updateColumns() {
      const states = this.states
      const _columns = states._columns || []
      states.fixedColumns = _columns.filter((column) => column.fixed === true || column.fixed === 'left')
      states.rightFixedColumns = _columns.filter((column) => column.fixed === 'right')

      if (states.fixedColumns.length > 0 && _columns[0] && _columns[0].type === 'selection' && !_columns[0].fixed) {
        _columns[0].fixed = true
        states.fixedColumns.unshift(_columns[0])
      }

      const notFixedColumns = _columns.filter((column) => !column.fixed)
      states.originColumns = [].concat(states.fixedColumns).concat(notFixedColumns).concat(states.rightFixedColumns)

      const leafColumns = doFlattenColumns(notFixedColumns)
      const fixedLeafColumns = doFlattenColumns(states.fixedColumns)
      const rightFixedLeafColumns = doFlattenColumns(states.rightFixedColumns)

      states.leafColumnsLength = leafColumns.length
      states.fixedLeafColumnsLength = fixedLeafColumns.length
      states.rightFixedLeafColumnsLength = rightFixedLeafColumns.length

      states.columns = [].concat(fixedLeafColumns).concat(leafColumns).concat(rightFixedLeafColumns)
      states.isComplex = states.fixedColumns.length > 0 || states.rightFixedColumns.length > 0
    },

    // 更新 DOM
    scheduleLayout(needUpdateColumns) {
      if (needUpdateColumns) {
        this.updateColumns()
      }
      this.table.debouncedUpdateLayout()
    },
  },
})
