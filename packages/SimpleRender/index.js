import simpleRender from './render'

simpleRender.install = function (Vue) {
  Vue.component(simpleRender.name, simpleRender)
}
export default simpleRender
