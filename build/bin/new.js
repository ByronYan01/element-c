'use strict';

/**
 * 通过命令 node .\build\bin\new-lang.js test-aa [中文名称] 创建新组件所需的文件
 *
 * components.json(增加组件引入)
 * 组件入口 index.js
 * 组件实现 index.vue
 */

console.log();
process.on('exit', () => {
  console.log();
});

if (!process.argv[2]) {
  console.error('[组件名]必填 - Please enter new component name');
  process.exit(1);
}

const path = require('path');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');
const componentname = process.argv[2];
const ComponentName = uppercamelcase(componentname);
const PackagePath = path.resolve(__dirname, '../../packages', componentname);
const Files = [
  {
    filename: 'index.js',
    content: `import ${ComponentName} from './src'

/* istanbul ignore next */
${ComponentName}.install = function (Vue) {
  Vue.component(${ComponentName}.name, ${ComponentName})
}

export default ${ComponentName}`
  },
  {
    filename: 'src/index.vue',
    content: `<template>
  <div class="simple-${componentname}"></div>
</template>

<script>
export default {
  name: 'Simple${ComponentName}',
}
</script>`
  },
];

// 添加到 components.json
const componentsFile = require('../../components.json');
if (componentsFile[componentname]) {
  console.error(`${componentname} 已存在.`);
  process.exit(1);
}
componentsFile[componentname] = `./packages/${componentname}/index.js`;
fileSave(path.join(__dirname, '../../components.json'))
  .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
  .end('\n');

// 创建 package
Files.forEach((file) => {
  fileSave(path.join(PackagePath, file.filename))
    .write(file.content, 'utf8')
    .end('\n');
});


console.log('DONE!');
