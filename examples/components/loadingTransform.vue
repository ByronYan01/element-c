<template>
  <div>
    <h2 id="loading-zu-jian">
      <!-- 使用 markdown-it-anchor 插件进行转换实现 -->
      <a class="header-anchor" href="#loading-zu-jian">¶</a>
      Loading 组件
    </h2>
    \n
    <p>加载数据时显示动效。</p>
    \n
    <!-- 
      自定义 markdown-it-container 
        :::demo :::  ---》  <demo-block></demo-block>
      自定义 markdown-it 中 fence 渲染规则，
        将在 ```html   ``` 中间的内容   ---》   template slot="highlight"
      以下是执行 md.render 将 :::demo  ...  ::: 解析转换而来
    -->
    <demo-block>
      \n
      <div>
        <p>Loading 的基础用法。</p>
        \n
      </div>
      \n
      <!--sfui-demo: <template>\n  <me-loading :loading-text="text"></me-loading>\n</template>\n\n<script>\n  export default {\n    data() {\n      return {\n        text: "页面加载中……"\n      };\n    }\n  };\n</script>\n:sfui-demo-->
      \n
      <template slot="highlight">
        <pre
          v-pre
        ><code class="html">&lt;template&gt;\n  &lt;me-loading :loading-text=&quot;text&quot;&gt;&lt;/me-loading&gt;\n&lt;/template&gt;\n\n&lt;script&gt;\n  export default {\n    data() {\n      return {\n        text: &quot;页面加载中……&quot;\n      };\n    }\n  };\n&lt;/script&gt;\n</code></pre>
      </template>
    </demo-block>
  </div>
</template>
