export default {
  options(h, conf) {
    const list = []
    conf.__slot__.options.forEach((item) => {
      list.push(<el-option label={item.label} value={item.value} disabled={item.disabled}></el-option>)
    })
    return list
  },
  prefix(h, conf, key) {
    return <template slot="prefix">{typeof conf.__slot__[key] === 'function' ? conf.__slot__[key]() : conf.__slot__[key]}</template>
  },
  empty(h, conf, key) {
    return <template slot="empty">{typeof conf.__slot__[key] === 'function' ? conf.__slot__[key]() : conf.__slot__[key]}</template>
  },
}
