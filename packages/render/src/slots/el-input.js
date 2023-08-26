export default {
  prepend(h, conf, key) {
    return <template slot="prepend">{typeof conf.__slot__[key] === 'function' ? conf.__slot__[key]() : conf.__slot__[key]}</template>
  },
  append(h, conf, key) {
    return <template slot="append">{typeof conf.__slot__[key] === 'function' ? conf.__slot__[key]() : conf.__slot__[key]}</template>
  },
}
