const componentChild = {}
/**
 * 将./slots中的文件挂载到对象componentChild上
 * 文件名为key，对应JSON配置中的__config__.tag
 * 文件内容为value，解析JSON配置中的__slot__
 */
const slotsFiles = require.context('./slots', false, /\.js$/)
const keys = slotsFiles.keys() || []
keys.forEach((key) => {
  const tag = key.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = slotsFiles(key).default
  componentChild[tag] = value
})

console.log('componentChild===', componentChild)

export default {
  inheritAttrs: false,
  name: 'SimpleRender',
  props: {
    config: {
      type: Object,
      default() {
        return {
          tag: 'el-input',
          // __vModel__: 'value',
          // __slot__: {
          //   prepend: '11',
          //   append: '99',
          // },
          __attrs__: {
            placeholder: '请输入手机号',
            // style: {
            //   width: '300px',
            // },
            clearable: true,
          },
          on: {
            change: (val) => {
              console.log('input change====', val)
            },
          },
          nativeOn: {
            // change: (val) => {
            //   console.log('input change====', val)
            // },
          },
        }
      },
    },
    value: {
      require: true,
    },
    // 没用
    obj: {
      type: Object,
      default() {
        return {
          value: '123',
        }
      },
    },
  },
  data() {
    return {
      innerValue: '',
    }
  },
  watch: {
    value: {
      handler() {
        this.innerValue = this.value
      },
      immediate: true,
    },
    innerValue(n) {
      this.$emit('input', n)
    },
  },
  render(h) {
    const { tag: Component, __attrs__: attrs, on, nativeOn } = this.config
    return (
      <Component vModel={this.innerValue} {...{ attrs: attrs || {} }} on={on} nativeOn={nativeOn}>
        {this.renderSlots(h)}
      </Component>
    )
  },
  methods: {
    renderSlots(h) {
      const { tag, __slot__: slot = {} } = this.config
      const compSlot = componentChild[tag],
        res = []
      Object.keys(slot).forEach((key) => {
        if (compSlot[key]) {
          res.push(compSlot[key](h, this.config, key))
        }
      })
      return res
    },
  },
}
