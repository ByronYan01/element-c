/**
 * 需要动态重新布局，可以混入此文件（table-header、table-body），混入后会将对应的 vue 实例维护到 table-layout 中
 * 赋值更新列宽 --- onColumnsChange、赋值更新滚动条
 */
export default {
  created() {
    this.tableLayout.addObserver(this)
  },

  destroyed() {
    this.tableLayout.removeObserver(this)
  },

  computed: {
    tableLayout() {
      let layout = this.layout
      if (!layout && this.table) {
        layout = this.table.layout
      }
      if (!layout) {
        throw new Error('Can not find table layout.')
      }
      return layout
    },
  },

  mounted() {
    console.log('mounted this.$options===', this.$options.name)
    this.onColumnsChange(this.tableLayout)
    this.onScrollableChange(this.tableLayout)
  },

  updated() {
    console.log('updated this.$options===', this.$options.name)
    console.log('this.__updated_===', this.__updated_)
    if (this.__updated__) return
    this.onColumnsChange(this.tableLayout)
    this.onScrollableChange(this.tableLayout)
    this.__updated__ = true
  },

  methods: {
    onColumnsChange(layout) {
      console.log('onColumnsChange===')
      const cols = this.$el.querySelectorAll('colgroup > col')
      if (!cols.length) return
      const flattenColumns = layout.getFlattenColumns()
      const columnsMap = {}
      flattenColumns.forEach((column) => {
        columnsMap[column.id] = column
      })
      for (let i = 0, j = cols.length; i < j; i++) {
        const col = cols[i]
        const name = col.getAttribute('name')
        const column = columnsMap[name]
        if (column) {
          col.setAttribute('width', column.realWidth || column.width)
        }
      }
    },

    onScrollableChange(layout) {
      const cols = this.$el.querySelectorAll('colgroup > col[name=gutter]')
      for (let i = 0, j = cols.length; i < j; i++) {
        const col = cols[i]
        col.setAttribute('width', layout.scrollY ? layout.gutterWidth : '0')
      }
      const ths = this.$el.querySelectorAll('th.gutter')
      for (let i = 0, j = ths.length; i < j; i++) {
        const th = ths[i]
        th.style.width = layout.scrollY ? layout.gutterWidth + 'px' : '0'
        th.style.display = layout.scrollY ? '' : 'none'
      }
    },
  },
}
