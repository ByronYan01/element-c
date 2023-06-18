<template>
  <div>
    <div class="search-wrap">
      <el-input class="search-input" v-model="nameStr"></el-input>
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="show-wrap">{{ `已选择${tableSelectList.length}个` }}</div>
    <el-table border ref="elTable" :data="tableData" @select="select" @select-all="selectAll" height="280">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="date" label="日期" width="150"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <el-pagination layout="total, prev, pager, next" :total="total" :current-page.sync="pageNum" @current-change="handleCurrentChange"> </el-pagination>
    <div>{{ selectNameList }}</div>
  </div>
</template>
<script>
import { tableSource } from '../data/tableRowCheck'
export default {
  name: 'tableRowCheck',
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 15,
      nameStr: '',
      tableData: [],
      rowKey: 'name',
      tableSelectList: [],
    }
  },
  created() {
    this.getList()
  },
  computed: {
    selectNameList() {
      return this.tableSelectList.map((item) => item.name)
    },
  },
  watch: {
    tableData() {
      this.rowSelect()
    },
  },
  methods: {
    // 单个勾选、取消
    select(selection, row) {
      const isAdd = selection.some((selectRow) => selectRow[this.rowKey] === row[this.rowKey])
      this.rowChangeAll(row, isAdd)
    },
    // 当页勾选、取消
    selectAll(selection) {
      // 默认当页全选
      let isAdd = true
      let changeSelect = selection.slice()
      if (!changeSelect.length) {
        // 取消当页全选，获取表格当前页所有数据
        isAdd = false
        changeSelect = this.tableData.slice()
      }
      // 全选时，存在之前已经选上；只加不删
      changeSelect.forEach((row) => {
        this.rowChangeAll(row, isAdd)
      })
    },
    // row：表格行；isAdd：是否勾选
    rowChangeAll(row, isAdd) {
      const index = this.tableSelectList.findIndex((item) => item[this.rowKey] === row[this.rowKey])
      // 不存在只能加,存在只能减
      if (index === -1) {
        if (isAdd) {
          this.tableSelectList.push(row)
        }
      } else {
        if (!isAdd) {
          this.tableSelectList.splice(index, 1)
        }
      }
    },
    rowSelect() {
      this.$nextTick(() => {
        this.tableSelectList.forEach((select) => {
          const resRow = this.tableData.find((row) => select[this.rowKey] == row[this.rowKey])
          if (resRow) {
            this.$refs.elTable.toggleRowSelection(resRow, true)
          }
        })
      })
    },
    handleCurrentChange() {
      this.getList(this.nameStr)
    },
    search() {
      this.pageNum = 1
      this.getList(this.nameStr)
    },
    // tableSelectList 负责记录用户操作的变化；只需要改变 tableData，不管数据是否为全量
    getList(nameStr) {
      let source = tableSource
      if (nameStr) {
        source = tableSource.filter((item) => item.name.includes(nameStr))
      }
      if (this.pageNum === 1) {
        this.tableData = source.slice(0, 10)
      } else {
        this.tableData = source.slice(10)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.search-wrap {
  .search-input {
    width: 200px;
    margin-right: 12px;
  }
}
.show-wrap {
  margin: 12px 0;
}
</style>
