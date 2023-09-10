import { hasClass, addClass, removeClass } from 'element-ui/src/utils/dom'
import LayoutObserver from './layout-observer'
import { mapStates } from './store/helper'

export default {
  name: 'ElTableHeader',

  mixins: [LayoutObserver],

  render(h) {
    console.log('table-header this.columns===', this.columns)
    const columnRows = this.columns
    return (
      <table class="el-table__header" cellspacing="0" cellpadding="0" border="0">
        <colgroup>
          {this.columns.map((column) => (
            <col name={column.id} key={column.id} />
          ))}
          {this.hasGutter ? <col name="gutter" /> : ''}
        </colgroup>
        <thead class={[{ 'has-gutter': this.hasGutter }]}>
          {/* {this._l(columnRows, (columns) => ( */}
          <tr>
            {columnRows.map((column, cellIndex) => (
              <th
                on-mousemove={($event) => this.handleMouseMove($event, column)}
                on-mouseout={this.handleMouseOut}
                on-mousedown={($event) => this.handleMouseDown($event, column)}
                class={this.getHeaderCellClass(1, cellIndex, [], column)}
                key={column.id}
              >
                <div class={['cell']}>
                  {column.renderHeader
                    ? column.renderHeader.call(this._renderProxy, h, { column, $index: cellIndex, store: this.store, _self: this.$parent.$vnode.context })
                    : column.label}
                </div>
              </th>
            ))}
            {this.hasGutter ? <th class="el-table__cell gutter"></th> : ''}
          </tr>
          {/* ))} */}
        </thead>
      </table>
    )
  },

  props: {
    fixed: String,
    store: {
      required: true,
    },
    border: Boolean,
  },

  computed: {
    table() {
      return this.$parent
    },

    hasGutter() {
      return !this.fixed && this.tableLayout.gutterWidth
    },

    ...mapStates({
      columns: 'columns',
    }),
  },

  methods: {
    getHeaderCellClass(rowIndex, columnIndex, row, column) {
      const classes = [column.id, column.order, column.headerAlign, column.className, column.labelClassName]

      classes.push('el-table__cell')

      return classes.join(' ')
    },
    // 改变列宽
    handleMouseDown(event, column) {
      if (this.$isServer) return
      if (column.children && column.children.length > 0) return
      /* istanbul ignore if */
      if (this.draggingColumn && this.border) {
        this.dragging = true
        // 开启拖动线
        this.$parent.resizeProxyVisible = true

        const table = this.$parent
        const tableEl = table.$el
        const tableLeft = tableEl.getBoundingClientRect().left
        const columnEl = this.$el.querySelector(`th.${column.id}`)
        const columnRect = columnEl.getBoundingClientRect()
        // 最大左移 移动位置
        const minLeft = columnRect.left - tableLeft + 30

        addClass(columnEl, 'noclick')

        // 点击时状态
        this.dragState = {
          // x轴位置
          startMouseLeft: event.clientX,
          // 指定列的右侧线 到 表格左侧
          startLeft: columnRect.right - tableLeft,
          // 指定列的左侧线 到 表格左侧
          startColumnLeft: columnRect.left - tableLeft,
          // 表格左侧
          tableLeft,
        }

        const resizeProxy = table.$refs.resizeProxy
        resizeProxy.style.left = this.dragState.startLeft + 'px'

        document.onselectstart = function () {
          return false
        }
        document.ondragstart = function () {
          return false
        }

        const handleMouseMove = (event) => {
          const deltaLeft = event.clientX - this.dragState.startMouseLeft
          const proxyLeft = this.dragState.startLeft + deltaLeft
          // 拖动列，最小宽度 30
          resizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px'
        }

        const handleMouseUp = () => {
          if (this.dragging) {
            const { startColumnLeft, startLeft } = this.dragState
            const finalLeft = parseInt(resizeProxy.style.left, 10)
            // 指定列宽度 == 移动得右侧线位置 - 左侧线位置
            const columnWidth = finalLeft - startColumnLeft
            column.width = column.realWidth = columnWidth
            table.$emit('header-dragend', column.width, startLeft - startColumnLeft, column, event)
            // 重新布局更新dom
            this.store.scheduleLayout()

            document.body.style.cursor = ''
            this.dragging = false
            this.draggingColumn = null
            this.dragState = {}

            table.resizeProxyVisible = false
          }

          document.removeEventListener('mousemove', handleMouseMove)
          document.removeEventListener('mouseup', handleMouseUp)
          document.onselectstart = null
          document.ondragstart = null

          setTimeout(function () {
            removeClass(columnEl, 'noclick')
          }, 0)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      }
    },
    // 鼠标样式
    handleMouseMove(event, column) {
      if (column.children && column.children.length > 0) return
      let target = event.target
      while (target && target.tagName !== 'TH') {
        target = target.parentNode
      }

      if (!column || !column.resizable) return

      if (!this.dragging && this.border) {
        let rect = target.getBoundingClientRect()

        const bodyStyle = document.body.style
        if (rect.width > 12 && rect.right - event.pageX < 8) {
          bodyStyle.cursor = 'col-resize'
          if (hasClass(target, 'is-sortable')) {
            target.style.cursor = 'col-resize'
          }
          this.draggingColumn = column
        } else if (!this.dragging) {
          bodyStyle.cursor = ''
          if (hasClass(target, 'is-sortable')) {
            target.style.cursor = 'pointer'
          }
          this.draggingColumn = null
        }
      }
    },

    handleMouseOut() {
      if (this.$isServer) return
      document.body.style.cursor = ''
    },
  },

  data() {
    return {
      draggingColumn: null,
      dragging: false,
      dragState: {},
    }
  },
}
