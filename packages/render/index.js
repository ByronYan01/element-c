import Render from './src'

/* istanbul ignore next */
Render.install = function (Vue) {
  Vue.component(Render.name, Render)
}

export default Render
