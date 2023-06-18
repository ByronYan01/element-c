<template>
  <div id="app">
    <el-button>sss</el-button>
    <!-- <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table> -->
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <simple-table :data="tableData" max-height="250" :columns="columns" :page-attrs="pageAttrs" :page-listener="pageListener"> </simple-table>
  </div>
</template>

<script>
export default {
  name: 'HelloWord',
  data() {
    return {
      columns: [
        {
          prop: 'name',
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
  created() {
    console.log('this===', this)
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

<style scoped>
#app {
  text-align: center;
  color: #2c3e50;
}
</style>
