import Cascader from './src'

/* istanbul ignore next */
Cascader.install = function (Vue) {
  Vue.component(Cascader.name, Cascader)
}

export default Cascader
