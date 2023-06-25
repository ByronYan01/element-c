## render 组件

render 组件。

:::demo render 用法。

```html
<template>
  <div>
    <simple-render v-model="content" class="comp-render"></simple-render>
    <br />
    <simple-render class="comp-render" :config="configInput"></simple-render>
    <br />
    <simple-render class="comp-render" :config="configSelect"></simple-render>
    <br />
    <simple-render class="comp-render" :config="configButton"></simple-render>
    <br />
    <simple-render class="comp-render" :config="configDate"></simple-render>
  </div>
</template>

<script>
  import info from '../data/info.js'
  export default {
    mixins: [info],
    data() {
      return {
        content: '',
      }
    },
    watch: {
      content(o, n) {
        console.log('content========', o, n)
      },
    },
    methods: {},
  }
</script>
<style>
  .comp-render {
    width: 400px !important;
    margin-bottom: 12px;
  }
</style>
```

:::
