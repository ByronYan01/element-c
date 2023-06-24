export default {
  data() {
    return {
      configInput: {
        tag: 'el-input',
        __slot__: {
          // prepend: '11',
          prepend: () => {
            return <i class={('el-input__icon', 'el-icon-search')}></i>
          },
          append: '99',
        },
        __attrs__: {
          placeholder: '请输入手机号',
          style: {
            width: '300px',
          },
          clearable: true,
        },
        on: {
          change: (val) => {
            console.log('input change====', val)
          },
        },
        nativeOn: {
          click: (val) => {
            console.log('input click====', val)
          },
        },
      },
      configSelect: {
        tag: 'el-select',
        __slot__: {
          prefix: () => {
            return <i class={('el-input__icon', 'el-icon-search')}></i>
          },
          options: [
            { label: '测试1', value: '1', disabled: false },
            { label: '测试2', value: '2', disabled: false },
          ],
          empty: '暂无匹配值',
        },
        __attrs__: {
          filterable: true,
          placeholder: '请输入手机号',
          style: {
            width: '300px',
          },
          clearable: true,
        },
        on: {
          change: (val) => {
            console.log('input change====', val)
          },
        },
        nativeOn: {
          click: (val) => {
            console.log('input click====', val)
          },
        },
      },
      configButton: {
        tag: 'el-button',
        __slot__: {
          default: '测试按钮',
        },
        __attrs__: {
          type: 'primary',
          icon: 'el-icon-search',
          round: false,
          size: 'medium',
          plain: false,
          circle: false,
          disabled: false,
        },
        on: {
          click: (val) => {
            console.log('button click====', val)
          },
        },
        nativeOn: {
          click: (val) => {
            console.log('button nativeOn click====', val)
          },
        },
      },
      configDate: {
        tag: 'el-date-picker',
        __slot__: {},
        __attrs__: {
          type: 'daterange',
          'range-separator': '至',
          'start-placeholder': '开始日期',
          'end-placeholder': '结束日期',
          disabled: false,
          clearable: true,
          format: 'yyyy-MM-dd',
          'value-format': 'yyyy-MM-dd',
          readonly: false,
        },
        on: {
          click: (val) => {
            console.log('date click====', val)
          },
        },
        nativeOn: {
          click: (val) => {
            console.log('date nativeOn click====', val)
          },
        },
      },
    }
  },
}
