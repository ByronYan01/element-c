## table 组件

table 组件。

:::demo table 的基础用法。

```html
<template>
  <div>
    <simple-table :data="tableData" :columns="columns" :page-attrs="pageAttrs" :page-listener="pageListener">
      <template #frontColumn>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="序号" type="index" :index="indexMethod"> </el-table-column>
      </template>
      <template v-slot:name="{ item, index }">
        <el-table-column :label="item.attrs.label">
          <template slot-scope="scope"> {{ scope.$index + JSON.stringify(tableData[index]) }} </template>
        </el-table-column>
      </template>
      <template v-slot:addressHeader="{ $index, row, column }">
        <el-tag>{{ column.label }}</el-tag>
      </template>
      <!-- 指定使用插槽，但不指定插槽位置是什么，让插槽默认值生效 -->
      <!-- <template v-slot:address="{ $index, row, column }">
      <el-tag>{{ row.address }}</el-tag>
    </template> -->
    </simple-table>
    <br />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [
          {
            isHidden: true,
            prop: 'indexTest',
            render: (h, scope) => {
              return <el-tag>{scope.$index + 1}</el-tag>
            },
            attrs: { label: '序号Test', prop: 'index', type: 'index' },
          },
          {
            prop: 'date',
            render: (h, scope) => {
              return <el-tag>{scope.row.date}</el-tag>
            },
            attrs: {
              label: '日期',
              renderHeader: (h, scope) => {
                return <el-tag>{scope.column.label}</el-tag>
              },
            },
          },
          {
            prop: 'name',
            isSlot: true,
            attrs: {
              label: '名字',
            },
          },
          {
            prop: 'address',
            attrs: {
              label: '地址',
            },
          },
        ],
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
          },
        ],
        pageAttrs: {
          pageSize: 10,
          currentPage: 1,
          total: 4,
        },
        pageListener: {
          'size-change': this.sizeChange,
          'current-change': this.currentChange,
        },
      }
    },
    computed: {
      pageParam() {
        return {
          pageSize: this.pageAttrs.pageSize,
          currentPage: this.pageAttrs.currentPage,
        }
      },
    },
    methods: {
      indexMethod(index) {
        return index * 2
      },
      sizeChange(pageSize) {
        this.pageAttrs.pageSize = pageSize
        this.getList()
      },
      currentChange(currentPage) {
        this.pageAttrs.pageNum = currentPage
        this.getList()
      },
      getList() {
        console.log('pageParam=====', this.pageParam)
      },
    },
  }
</script>
```

:::

### Table Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- | --- |
| data | 显示的数据 | array | — | — |
| height | Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。 | string/number | — | — |
| max-height | Table 的最大高度。合法的值为数字或者单位为 px 的高度。 | string/number | — | — |
| stripe | 是否为斑马纹 table | boolean | — | false |
| border | 是否带有纵向边框 | boolean | — | false |
| size | Table 的尺寸 | string | medium / small / mini | — |
| fit | 列的宽度是否自撑开 | boolean | — | true |
| show-header | 是否显示表头 | boolean | — | true |
| highlight-current-row | 是否要高亮当前行 | boolean | — | false |
| current-row-key | 当前行的 key，只写属性 | String,Number | — | — |
| row-class-name | 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。 | Function({row, rowIndex})/String | — | — |
| row-style | 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。 | Function({row, rowIndex})/Object | — | — |
| cell-class-name | 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。 | Function({row, column, rowIndex, columnIndex})/String | — | — |
| cell-style | 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。 | Function({row, column, rowIndex, columnIndex})/Object | — | — |
| header-row-class-name | 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。 | Function({row, rowIndex})/String | — | — |
| header-row-style | 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。 | Function({row, rowIndex})/Object | — | — |
| header-cell-class-name | 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。 | Function({row, column, rowIndex, columnIndex})/String | — | — |
| header-cell-style | 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。 | Function({row, column, rowIndex, columnIndex})/Object | — | — |
| row-key | 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：`user.info.id`，但不支持 `user.info[0].id`，此种情况请使用 `Function`。 | Function(row)/String | — | — |
| empty-text | 空数据时显示的文本内容，也可以通过 `slot="empty"` 设置 | String | — | 暂无数据 |
| default-expand-all | 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效 | Boolean | — | false |
| expand-row-keys | 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。 | Array | — |  |
| default-sort | 默认的排序列的 prop 和顺序。它的`prop`属性指定默认的排序的列，`order`指定默认排序的顺序 | Object | `order`: ascending, descending | 如果只指定了`prop`, 没有指定`order`, 则默认顺序是 ascending |
| tooltip-effect | tooltip `effect` 属性 | String | dark/light |  | dark |
| show-summary | 是否在表尾显示合计行 | Boolean | — | false |
| sum-text | 合计行第一列的文本 | String | — | 合计 |
| summary-method | 自定义的合计计算方法 | Function({ columns, data }) | — | — |
| span-method | 合并行或列的计算方法 | Function({ row, column, rowIndex, columnIndex }) | — | — |
| select-on-indeterminate | 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行 | Boolean | — | true |
| indent | 展示树形数据时，树节点的缩进 | Number | — | 16 |
| lazy | 是否懒加载子节点数据 | Boolean | — | — |
| load | 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息 | Function(row, treeNode, resolve) | — | — |
| tree-props | 渲染嵌套数据的配置选项 | Object | — | { hasChildren: 'hasChildren', children: 'children' } |
