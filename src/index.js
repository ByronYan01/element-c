/* Automatically generated by './build/bin/build-entry.js' */

import TableForm from '../packages/table-form/index.js'
import Table from '../packages/table/index.js'
import Render from '../packages/render/index.js'
import Scroll from '../packages/scroll/index.js'
import FormItemTip from '../packages/form-item-tip/index.js'
import Cascader from '../packages/cascader/index.js'
// 导入组件库所有组件
const components = [TableForm, Table, Render, Scroll, FormItemTip, Cascader]

// 定义组件库组件注册安装的install方法
// 如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  if (install.installed) return

  components.forEach((component) => {
    Vue.component(component.name, component) // 使用component注册组件
  })
}

// 自动安装  判断是否用<script scr=''></script>的方式直接引入文件
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// 导出install、各个组件
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 具体的组件列表
  TableForm,
  Table,
  Render,
  Scroll,
  FormItemTip,
  Cascader,
}
