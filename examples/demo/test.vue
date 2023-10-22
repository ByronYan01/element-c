<template>
  <div class="wrap">
    <test1 placement="right"></test1>
    <demo></demo>
    <fileFolderDrop></fileFolderDrop>
    <!-- <simple-source-table :data="tableData" border style="width: 100%" maxHeight="300px">
      <simple-source-table-column prop="date" label="日期" width="180"> </simple-source-table-column>
      <simple-source-table-column prop="name" label="姓名" width="180"> </simple-source-table-column>
      <simple-source-table-column prop="address" label="地址"> </simple-source-table-column>
    </simple-source-table>
    <br />
    <el-table :data="tableData" border style="width: 100%" maxHeight="300px">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table> -->
    <el-table :data="tableData1" style="width: 100%" row-key="id" border lazy :load="load" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
import demo from './other/demo'
import test1 from './other/test'
import fileFolderDrop from './fileManage/file-folder-drop'
import { random } from 'file-folder-util'
// import { random } from 'dip-utils'
export default {
  name: 'test',
  components: {
    fileFolderDrop,
    demo,
    test1,
  },
  data() {
    return {
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
      tableData1: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          hasChildren: true,
        },
        {
          id: 2,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          hasChildren: true,
        },
        {
          id: 2,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          hasChildren: true,
        },
      ],
    }
  },
  created() {
    console.log('random====', random(1, 10))
  },
  methods: {
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
          {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },
        ])
      }, 1000)
    },
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
}
</style>
