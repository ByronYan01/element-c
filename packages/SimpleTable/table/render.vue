<script>
export default {
  name: 'FucRender',
  functional: true,
  props: {
    scope: {
      type: Object,
      default() {
        return {}
      },
    },
    render: {
      type: Function,
      default: null,
    },
  },
  render: (h, ctx) => {
    // 承载传入 render 函数的执行作用
    return ctx.props.render ? ctx.props.render(h, ctx.props.scope) : ''
  },
}
</script>
