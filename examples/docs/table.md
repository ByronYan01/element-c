## table 组件

table 组件。

:::demo table 用法。

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

| 参数          | 说明                                                                                                | 类型    | 可选值 | 默认值 |
| ------------- | --------------------------------------------------------------------------------------------------- | ------- | ------ | ------ |
| data          | 表格显示的数据                                                                                      | Array   | -      | -      |
| columnsConfig | el-table-column 的数据全局描述                                                                      | Array   | -      | -      |
| columns       | el-table-column 的数据描述（默认会与 columnsConfig 合并，优先级大于 columnsConfig），详细参数见下面 | Array   | -      | -      |
| is-show-page  | el-pagination 是否使用                                                                              | Boolean | -      | true   |
| page-attrs    | el-pagination attributes 对象                                                                       | Object  | -      | {}     |
| page-listener | el-pagination events 对象                                                                           | Object  | -      | {}     |
| 其他参数      | el-table attributes 对 象                                                                           | Object  | -      | {}     |

### columns Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| is-hidden | 当前列是否显示 | Boolean | -- | false |
| prop | 列唯一 key，也用于插槽 name | String | - | - |
| attrs | el-table-column attributes 对象 | Object | - | - |
| is-slot | 是否渲染为插槽为，默认渲染出 ${prop}、\`${prop}Header` 名称的插槽位置来承接列内容、列头内容 | String | - | 默认列内容为 scope.row[column.attrs.prop]，列头内容为 column.attrs.label |
| render | 列内容渲染函数，支持 jsx 语法 | Function | - | - |

### Table Events

| 事件名   | 说明                 | 参数   |
| -------- | -------------------- | ------ |
| 其他事件 | el-table events 对象 | Object |

### Table Slot

| 插槽名       | 说明                                                                       |
| ------------ | -------------------------------------------------------------------------- |
| frontColumn  | 表格内渲染 columns 对应表格列前面的区域, 参数为 { columnsConfig, $index }  |
| behindColumn | 表格内渲染 columns 对应表格列后面的区域 , 参数为 { columnsConfig, $index } |
