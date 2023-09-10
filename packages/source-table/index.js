import SourceTable from './src'

/* istanbul ignore next */
SourceTable.install = function (Vue) {
  Vue.component(SourceTable.name, SourceTable)
}

export default SourceTable
