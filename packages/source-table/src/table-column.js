import { cellStarts, defaultRenderCell } from './config'
import { mergeOptions, parseWidth, parseMinWidth, compose } from './util'

let columnIdSeed = 1

export default {
  name: 'SimpleSourceTableColumn',

  props: {
    type: {
      type: String,
      default: 'default',
    },
    label: String,
    className: String,
    labelClassName: String,
    property: String,
    prop: String,
    width: {},
    minWidth: {},
    renderHeader: Function,
    resizable: {
      type: Boolean,
      default: true,
    },
    columnKey: String,
    fixed: [Boolean, String],
    formatter: Function,
    index: [Number, Function],
  },

  data() {
    return {
      columns: [],
    }
  },

  computed: {
    owner() {
      let parent = this.$parent
      while (parent && !parent.tableId) {
        parent = parent.$parent
      }
      return parent
    },

    columnOrTableParent() {
      let parent = this.$parent
      while (parent && !parent.tableId && !parent.columnId) {
        parent = parent.$parent
      }
      return parent
    },

    realWidth() {
      return parseWidth(this.width)
    },

    realMinWidth() {
      return parseMinWidth(this.minWidth)
    },
  },

  methods: {
    getPropsData(...props) {
      return props.reduce((prev, cur) => {
        if (Array.isArray(cur)) {
          cur.forEach((key) => {
            prev[key] = this[key]
          })
        }
        return prev
      }, {})
    },

    getColumnElIndex(children, child) {
      return [].indexOf.call(children, child)
    },
    /**
     * width：用户设置的固定宽度
     * minWidth：用户设置的固定最小宽度
     * realWidth：经过组件计算后的宽度
     */
    setColumnWidth(column) {
      if (this.realWidth) {
        column.width = this.realWidth
      }
      if (this.realMinWidth) {
        column.minWidth = this.realMinWidth
      }
      if (!column.minWidth) {
        column.minWidth = 80
      }
      // 优先级 width minWidth
      column.realWidth = column.width === undefined ? column.minWidth : column.width
      return column
    },

    setColumnRenders(column) {
      // renderHeader 属性不推荐使用。
      // 表头渲染
      if (this.renderHeader) {
        console.warn(
          '[Element Warn][TableColumn]Comparing to render-header, scoped-slot header is easier to use. We recommend users to use scoped-slot header.',
        )
      } else if (column.type !== 'selection') {
        column.renderHeader = (h, scope) => {
          const renderHeader = this.$scopedSlots.header
          return renderHeader ? renderHeader(scope) : column.label
        }
      }

      // 表体单元格渲染
      let originRenderCell = column.renderCell

      // 非展开标志
      originRenderCell = originRenderCell || defaultRenderCell
      // 对 renderCell 进行包装
      column.renderCell = (h, data) => {
        let children = null
        if (this.$scopedSlots.default) {
          children = this.$scopedSlots.default(data)
        } else {
          children = originRenderCell(h, data)
        }
        const props = {
          class: 'cell',
          style: {},
        }
        return <div {...props}>{children}</div>
      }
      return column
    },
  },

  beforeCreate() {
    this.row = {}
    this.columnId = ''
  },

  created() {
    const parent = this.columnOrTableParent
    this.columnId = (parent.tableId || parent.columnId) + '_column_' + columnIdSeed++

    const type = this.type || 'default'
    const defaults = {
      ...cellStarts[type],
      id: this.columnId,
      type: type,
      property: this.prop || this.property,
      // index 列
      index: this.index,
    }

    const basicProps = ['columnKey', 'label', 'className', 'labelClassName', 'type', 'renderHeader', 'formatter', 'fixed', 'resizable']

    // 返回对象，key 为数组元素、value 为 column 实例上的 key 值
    let column = this.getPropsData(basicProps)
    // 与默认配置合并
    column = mergeOptions(defaults, column)

    // 注意 compose 中函数执行的顺序是从右到左
    const chains = compose(this.setColumnRenders, this.setColumnWidth)
    // const chains = compose(this.setColumnRenders, this.setColumnWidth, this.setColumnForcedProps)
    column = chains(column)

    this.columnConfig = column
  },

  mounted() {
    const owner = this.owner
    const parent = this.columnOrTableParent
    const children = parent.$refs.hiddenColumns.children
    const columnIndex = this.getColumnElIndex(children, this.$el)

    owner.store.commit('insertColumn', this.columnConfig, columnIndex, null)
  },

  destroyed() {
    if (!this.$parent) return
    this.owner.store.commit('removeColumn', this.columnConfig, null)
  },

  render(h) {
    // slots 也要渲染，需要计算合并表头
    return h('div', this.$slots.default)
  },
}
