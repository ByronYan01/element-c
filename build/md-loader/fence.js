// 覆盖默认的 fence 渲染策略
module.exports = md => {
  const defaultRender = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    // type：fence 的渲染处理规则
    const token = tokens[idx];
    // 判断该 fence 是否在 :::demo 内
    const prevToken = tokens[idx - 1];
    const isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/);
    // 这里的 html 就是在 md 中 ```html  ``` 解析出来的（可以任意定义）
    if (token.info === 'html' && isInDemoContainer) {
      // 使用 v-pre 会被保留当前以及子标签按原样渲染；路由切换时，会获取 code 对应的 dom，使用 highlight.js 进行代码高亮
      return `<template slot="highlight"><pre v-pre><code class="html">${md.utils.escapeHtml(token.content)}</code></pre></template>`;
    }
    return defaultRender(tokens, idx, options, env, self);
  };
};
