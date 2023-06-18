/**
 * markdown-it-chain 实例化配置后，通过链式 api 配置设置选项、插件
 * 通过 toMd 使用上述配置创建一个 markdown-it 实例
 * 注：直接使用 markdown-it 也能达到 markdown-it-chain 效果
 */
const Config = require('markdown-it-chain');
const anchorPlugin = require('markdown-it-anchor');
const slugify = require('transliteration').slugify;
const containers = require('./containers');
const overWriteFenceRule = require('./fence');

const config = new Config();
// 1.设置选项
config.options
  .html(true)
  .end()
  .plugin('anchor')
  // 2.标签锚点插件 --- 针对 md 中标题增加锚点
  .use(anchorPlugin, [
    {
      level: 2,
      slugify: slugify, // 中文转拼音
      permalink: true,
      permalinkBefore: true
    }
  ])
  .end()
  // 3.自定义容器插件
  .plugin('containers')
  .use(containers)
  .end();

const md = config.toMd();
// 4.复写代码块渲染规则 -- 针对 type 为 fence 进行处理
overWriteFenceRule(md);

module.exports = md;
