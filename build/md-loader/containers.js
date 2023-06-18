const mdContainer = require('markdown-it-container');

module.exports = md => {
  // 自定义容器实现
  md.use(mdContainer, 'demo', {
    // 解析到 :::    ::: 就会触发 validate 函数
    // params 就是第一个 ::: 与 ``` 间的内容，就是例子中的【 demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。】
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    /**
     * validate 函数返回 true，会触发 render
     * tokens 是通过 markdown-it 规则链解析 md 产生的
     * idx 是对应容器 opening、closing tokens 的下标 --- 所以 render 会触发两次
     */
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      // nesting `1` 容器打开标记、`-1` 容器关闭标记（标记就是 :::）
      if (tokens[idx].nesting === 1) {
        // 获取 demo-block 默认插槽内容
        const description = m && m.length > 1 ? m[1] : '';
        // type fence：代码块
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
        // 使用 demo-block 组件，<!--element-demo  :element-demo--> 作为 html 转 vue 的标记
        return `<demo-block>
        ${description ? `<div>${md.render(description)}</div>` : ''}
        <!--element-demo: ${content}:element-demo-->
        `;
      }
      return '</demo-block>';
    }
  });

  md.use(mdContainer, 'tip');
  md.use(mdContainer, 'warning');
};
