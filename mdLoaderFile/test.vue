<template>
  <section class="content me-doc">
    <h2 id="button-an-niu"><a class="header-anchor" href="#button-an-niu">¶</a> Button 按钮</h2>
    <p>常用的操作按钮。</p>
    <demo-block>
      <div>
        <p>使用<code>type</code>、<code>plain</code>、<code>round</code>和<code>circle</code>属性来定义 Button 的样式。</p>
      </div>
      <!-- 局部组件 -->
      <template slot="source"><sfui-demo0 /></template>
      <template slot="highlight">
        <pre v-pre>
          <code class="html">&lt;template&gt;
            &lt;el-button type=&quot;primary&quot;&gt;主要按钮&lt;/el-button&gt;
          &lt;/template&gt;

          &lt;script&gt;
            export default {
              data() {
                return {
                }
              },
            };
          &lt;/script&gt;
          </code>
        </pre>
      </template>
    </demo-block>
  </section>
</template>
<script>
export default {
  name: 'component-doc',
  components: {
    'sfui-demo0': (function () {
      // 此处是通过 genInlineComponentText 函数得来
      var render = function () {
        var _vm = this
        var _h = _vm.$createElement
        var _c = _vm._self._c || _h
        return _c('div', [[_c('el-button', { attrs: { type: 'primary' } }, [_vm._v('主要按钮')])]], 2)
      }
      var staticRenderFns = []
      render._withStripped = true

      const democomponentExport = {
        data() {
          return {}
        },
      }
      return {
        render,
        staticRenderFns,
        ...democomponentExport,
      }
    })(),
  },
}
</script>
