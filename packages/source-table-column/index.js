import SourceTableColumn from '../source-table/src/table-column'

/* istanbul ignore next */
SourceTableColumn.install = function (Vue) {
  Vue.component(SourceTableColumn.name, SourceTableColumn)
}

export default SourceTableColumn
