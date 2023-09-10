import LayoutObserver from './layout-observer'
import { mapStates } from './store/helper'
import TableRow from './table-row.js'

export default {
  name: 'ElTableBody',

  mixins: [LayoutObserver],

  components: {
    TableRow,
  },

  props: {
    store: {
      required: true,
    },
    context: {},
  },

  // eslint-disable-next-line no-unused-vars
  render(h) {
    const data = this.data || []
    return (
      <table class="el-table__body" cellspacing="0" cellpadding="0" border="0">
        <colgroup>
          {this.columns.map((column) => (
            <col name={column.id} key={column.id} />
          ))}
        </colgroup>
        <tbody>
          {
            // renderRow list
            data.reduce((acc, row) => {
              return acc.concat(this.wrappedRowRender(row, acc.length))
            }, [])
          }
        </tbody>
      </table>
    )
  },

  computed: {
    table() {
      return this.$parent
    },

    ...mapStates({
      data: 'data',
      columns: 'columns',
    }),
  },

  watch: {},

  data() {
    return {}
  },

  created() {},

  methods: {
    getCellClass(rowIndex, columnIndex, row, column) {
      const classes = [column.id, column.align, column.className]

      classes.push('el-table__cell')

      return classes.join(' ')
    },
    getKeyOfRow(row, index) {
      return index
    },

    rowRender(row, $index) {
      const { columns } = this
      let display = true
      // 指令 v-show 会覆盖 row-style 中 display
      // 使用 :style 代替 v-show https://github.com/ElemeFE/element/issues/16995
      let displayStyle = display
        ? null
        : {
            display: 'none',
          }
      return (
        <TableRow
          style={[displayStyle]}
          key={this.getKeyOfRow(row, $index)}
          columns={columns}
          row={row}
          index={$index}
          store={this.store}
          context={this.context || this.table.$vnode.context}
          getCellClass={this.getCellClass}
        ></TableRow>
      )
    },

    wrappedRowRender(row, $index) {
      // 普通行
      return this.rowRender(row, $index)
    },
  },
}
