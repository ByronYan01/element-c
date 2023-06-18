const {
  stripScript,
  stripTemplate,
  genInlineComponentText
} = require('./util');
const md = require('./config');

module.exports = function(source) {
  // md 转化 html
  const content = md.render(source);

  // html 中占位注释标记
  const startTag = '<!--element-demo:';
  const startTagLen = startTag.length;
  const endTag = ':element-demo-->';
  const endTagLen = endTag.length;

  let componenetsString = '';
  let id = 0; // demo 的 id
  let output = []; // 输出的内容
  let start = 0; // 字符串开始位置

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  // 逐一解析 <!--element-demo :element-demo--> 占位注释内容
  while (commentStart !== -1 && commentEnd !== -1) {
    // 将占位注释内容前的字符串放入内容数组中
    output.push(content.slice(start, commentStart));
    // md 中定义的组件实现代码 -- vue 单文件组件
    const commentContent = content.slice(commentStart + startTagLen, commentEnd);
    // 提取 template 标签以及内部内容
    const html = stripTemplate(commentContent);
    // 提取 script 标签内部内容
    const script = stripScript(commentContent);
    // 组件转换为自执行函数,内容返回含有 render 函数的对象
    let demoComponentContent = genInlineComponentText(html, script);
    const demoComponentName = `element-demo${id}`;
    // 增加组件运行插槽并使用局部组件名
    output.push(`<template slot="source"><${demoComponentName} /></template>`);
    // 定义局部组件声明
    componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`;

    // 重新计算下一次的位置
    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
  let pageScript = '';
  if (componenetsString) {
    // 未用自定义容器
    pageScript = `<script>
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`;
  } else if (content.indexOf('<script>') === 0) { // 硬编码，有待改善
    // 没有 html,开头就是 script 标签
    start = content.indexOf('</script>') + '</script>'.length;
    pageScript = content.slice(0, start);
  }
  // 将占位注释内容后的字符串放入内容数组中
  output.push(content.slice(start));
  return `
    <template>
      <section class="content element-doc">
        ${output.join('')}
      </section>
    </template>
    ${pageScript}
  `;
};
