export default {
  name: 'ElTableRow',
  props: ['columns', 'row', 'index', 'store', 'context', 'getCellClass'],
  render() {
    const { columns, row, index: $index, store, context } = this

    return (
      <tr>
        {columns.map((column, cellIndex) => {
          const columnData = { ...column }
          const data = {
            store,
            _self: context,
            column: columnData,
            row,
            $index,
          }
          return <td class={this.getCellClass($index, cellIndex, row, column)}>{column.renderCell.call(this._renderProxy, this.$createElement, data)}</td>
        })}
      </tr>
    )
  },
}
