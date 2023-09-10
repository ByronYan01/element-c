<template>
  <div class="wrap">
    <simple-source-table :data="tableData" border style="width: 100%" maxHeight="300px">
      <simple-source-table-column prop="date" label="日期" width="180"> </simple-source-table-column>
      <simple-source-table-column prop="name" label="姓名" width="180"> </simple-source-table-column>
      <simple-source-table-column prop="address" label="地址"> </simple-source-table-column>
    </simple-source-table>
  </div>
</template>
<script>
export default {
  name: 'test',
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
    }
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
}
</style>
