import PicUpload from './src'

/* istanbul ignore next */
PicUpload.install = function (Vue) {
  Vue.component(PicUpload.name, PicUpload)
}

export default PicUpload
