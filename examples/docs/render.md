## render 组件

render 组件。

:::demo render 用法。

```html
<template>
  <div>
    <simple-render v-model="content" class="comp-render"></simple-render>
    <!-- <simple-render v-model="content" class="comp-render" :config="configInput"></simple-render> -->
    <!-- <simple-render v-model="content" class="comp-render" :config="configSelect"></simple-render> -->
    <!-- <simple-render v-model="content" class="comp-render" :config="configButton"></simple-render> -->
    <!-- <simple-render v-model="content" class="comp-render" :config="configDate"></simple-render> -->
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
<style lang="scss" scoped>
  .comp-render {
    width: 300px;
  }
</style>
```

:::
