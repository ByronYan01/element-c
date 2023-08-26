import Scroll from './src'

/* istanbul ignore next */
Scroll.install = function (Vue) {
  Vue.component(Scroll.name, Scroll)
}

export default Scroll
