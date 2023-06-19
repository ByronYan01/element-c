<template>
  <section class="content element-doc">
    <h2 id="biao-ge-xing-xuan-zhong"><a class="header-anchor" href="#biao-ge-xing-xuan-zhong">¶</a> 表格行选中</h2>
    <demo-block>
      <div><p>11111用户勾选,只能手动取消,其他操作不影响;支持自动勾选</p></div>
      <template slot="source"><element-demo0 /></template>
      <template slot="highlight">
        <pre v-pre><code class="html">&lt;template&gt;
  &lt;div&gt;
    &lt;div class=&quot;search-wrap&quot;&gt;
      &lt;el-input class=&quot;search-input&quot; v-model=&quot;nameStr&quot;&gt;&lt;/el-input&gt;
      &lt;el-button type=&quot;primary&quot; @click=&quot;search&quot;&gt;查询&lt;/el-button&gt;
    &lt;/div&gt;
    &lt;div class=&quot;show-wrap&quot;&gt;{{ `已选择${tableSelectList.length}个` }}&lt;/div&gt;
    &lt;el-table border ref=&quot;elTable&quot; :data=&quot;tableData&quot; @select=&quot;select&quot; @select-all=&quot;selectAll&quot; height=&quot;280&quot;&gt;
      &lt;el-table-column type=&quot;selection&quot; width=&quot;55&quot;&gt; &lt;/el-table-column&gt;
      &lt;el-table-column prop=&quot;date&quot; label=&quot;日期&quot; width=&quot;150&quot;&gt; &lt;/el-table-column&gt;
      &lt;el-table-column prop=&quot;name&quot; label=&quot;姓名&quot; width=&quot;120&quot;&gt; &lt;/el-table-column&gt;
      &lt;el-table-column prop=&quot;address&quot; label=&quot;地址&quot;&gt; &lt;/el-table-column&gt;
    &lt;/el-table&gt;
    &lt;el-pagination layout=&quot;total, prev, pager, next&quot; :total=&quot;total&quot; :current-page.sync=&quot;pageNum&quot; @current-change=&quot;handleCurrentChange&quot;&gt; &lt;/el-pagination&gt;
    &lt;div&gt;{{ selectNameList }}&lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
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
    console.log('tableSource===', tableSource)
    this.getList()
  },
  computed: {
    selectNameList() {
      return this.tableSelectList.map((item) =&gt; item.name)
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
      const isAdd = selection.some((selectRow) =&gt; selectRow[this.rowKey] === row[this.rowKey])
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
      changeSelect.forEach((row) =&gt; {
        this.rowChangeAll(row, isAdd)
      })
    },
    // row：表格行；isAdd：是否勾选
    rowChangeAll(row, isAdd) {
      const index = this.tableSelectList.findIndex((item) =&gt; item[this.rowKey] === row[this.rowKey])
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
      this.$nextTick(() =&gt; {
        this.tableSelectList.forEach((select) =&gt; {
          const resRow = this.tableData.find((row) =&gt; select[this.rowKey] == row[this.rowKey])
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
      console.log('nameStr===', nameStr)
      let source = tableSource
      if (nameStr) {
        source = tableSource.filter((item) =&gt; item.name.includes(nameStr))
      }
      if (this.pageNum === 1) {
        this.tableData = source.slice(0, 10)
      } else {
        this.tableData = source.slice(10)
      }
    },
  },
}
&lt;/script&gt;
&lt;style lang=&quot;scss&quot; scoped&gt;
.search-wrap {
  .search-input {
    width: 200px;
    margin-right: 12px;
  }
}
.show-wrap {
  margin: 12px 0;
}
&lt;/style&gt;

</code></pre>
      </template></demo-block
    >
  </section>
</template>
<script>
import * as DataTableRowCheck from '../data/tableRowCheck'
export default {
  name: 'component-doc',
  components: {
    'element-demo0': (function () {
      var render = function () {
        var _vm = this
        var _h = _vm.$createElement
        var _c = _vm._self._c || _h
        return _c(
          'div',
          [
            [
              _c(
                'div',
                [
                  _c(
                    'div',
                    { staticClass: 'search-wrap' },
                    [
                      _c('el-input', {
                        staticClass: 'search-input',
                        model: {
                          value: _vm.nameStr,
                          callback: function ($$v) {
                            _vm.nameStr = $$v
                          },
                          expression: 'nameStr',
                        },
                      }),
                      _vm._v(' '),
                      _c('el-button', { attrs: { type: 'primary' }, on: { click: _vm.search } }, [_vm._v('查询')]),
                    ],
                    1,
                  ),
                  _vm._v(' '),
                  _c('div', { staticClass: 'show-wrap' }, [_vm._v(_vm._s('已选择' + _vm.tableSelectList.length + '个'))]),
                  _vm._v(' '),
                  _c(
                    'el-table',
                    {
                      ref: 'elTable',
                      attrs: { border: '', data: _vm.tableData, height: '280' },
                      on: { select: _vm.select, 'select-all': _vm.selectAll },
                    },
                    [
                      _c('el-table-column', {
                        attrs: { type: 'selection', width: '55' },
                      }),
                      _vm._v(' '),
                      _c('el-table-column', {
                        attrs: { prop: 'date', label: '日期', width: '150' },
                      }),
                      _vm._v(' '),
                      _c('el-table-column', {
                        attrs: { prop: 'name', label: '姓名', width: '120' },
                      }),
                      _vm._v(' '),
                      _c('el-table-column', {
                        attrs: { prop: 'address', label: '地址' },
                      }),
                    ],
                    1,
                  ),
                  _vm._v(' '),
                  _c('el-pagination', {
                    attrs: {
                      layout: 'total, prev, pager, next',
                      total: _vm.total,
                      'current-page': _vm.pageNum,
                    },
                    on: {
                      'update:currentPage': function ($event) {
                        _vm.pageNum = $event
                      },
                      'update:current-page': function ($event) {
                        _vm.pageNum = $event
                      },
                      'current-change': _vm.handleCurrentChange,
                    },
                  }),
                  _vm._v(' '),
                  _c('div', [_vm._v(_vm._s(_vm.selectNameList))]),
                ],
                1,
              ),
            ],
          ],
          2,
        )
      }
      var staticRenderFns = []
      render._withStripped = true

      const { tableSource } = DataTableRowCheck
      const democomponentExport = {
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
          console.log('tableSource===', tableSource)
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
            console.log('nameStr===', nameStr)
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
      return {
        render,
        staticRenderFns,
        ...democomponentExport,
      }
    })(),
  },
}
</script>
