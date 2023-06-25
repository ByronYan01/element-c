"use strict";(self.webpackChunksf_ui=self.webpackChunksf_ui||[]).push([[30],{3030:function(t,e,n){n.r(e),n.d(e,{default:function(){return r}});var a={name:"component-doc",components:{"element-demo0":{render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[[n("div",[n("simple-table",{attrs:{data:t.tableData,columns:t.columns,"page-attrs":t.pageAttrs,"page-listener":t.pageListener},scopedSlots:t._u([{key:"frontColumn",fn:function(){return[n("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),n("el-table-column",{attrs:{label:"序号",type:"index",index:t.indexMethod}})]},proxy:!0},{key:"name",fn:function(e){var a=e.item,r=e.index;return[n("el-table-column",{attrs:{label:a.attrs.label},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.$index+JSON.stringify(t.tableData[r]))+" ")]}}],null,!0)})]}},{key:"addressHeader",fn:function(e){e.$index,e.row;var a=e.column;return[n("el-tag",[t._v(t._s(a.label))])]}}])})],1)]],2)},staticRenderFns:[],...{data(){return this.$createElement,{columns:[{isHidden:!0,prop:"indexTest",render:(t,e)=>t("el-tag",[e.$index+1]),attrs:{label:"序号Test",prop:"index",type:"index"}},{prop:"date",render:(t,e)=>t("el-tag",[e.row.date]),attrs:{label:"日期",renderHeader:(t,e)=>t("el-tag",[e.column.label])}},{prop:"name",isSlot:!0,attrs:{label:"名字"}},{prop:"address",attrs:{label:"地址"}}],tableData:[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"},{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}],pageAttrs:{pageSize:10,currentPage:1,total:4},pageListener:{"size-change":this.sizeChange,"current-change":this.currentChange}}},computed:{pageParam(){return{pageSize:this.pageAttrs.pageSize,currentPage:this.pageAttrs.currentPage}}},methods:{indexMethod(t){return 2*t},sizeChange(t){this.pageAttrs.pageSize=t,this.getList()},currentChange(t){this.pageAttrs.pageNum=t,this.getList()},getList(){console.log("pageParam=====",this.pageParam)}}}}}},r=(0,n(1900).Z)(a,(function(){var t=this,e=t._self._c;return e("section",{staticClass:"content element-doc"},[t._m(0),e("p",[t._v("table 组件。")]),e("demo-block",[e("div",[e("p",[t._v("table 用法。")])]),e("template",{slot:"source"},[e("element-demo0")],1),e("template",{slot:"highlight"},[e("pre",{pre:!0},[e("code",{pre:!0,attrs:{class:"html"}},[t._v("<template>\n  <div>\n    <simple-table :data=\"tableData\" :columns=\"columns\" :page-attrs=\"pageAttrs\" :page-listener=\"pageListener\">\n      <template #frontColumn>\n        <el-table-column type=\"selection\" width=\"55\"> </el-table-column>\n        <el-table-column label=\"序号\" type=\"index\" :index=\"indexMethod\"> </el-table-column>\n      </template>\n      <template v-slot:name=\"{ item, index }\">\n        <el-table-column :label=\"item.attrs.label\">\n          <template slot-scope=\"scope\"> {{ scope.$index + JSON.stringify(tableData[index]) }} </template>\n        </el-table-column>\n      </template>\n      <template v-slot:addressHeader=\"{ $index, row, column }\">\n        <el-tag>{{ column.label }}</el-tag>\n      </template>\n      \x3c!-- 指定使用插槽，但不指定插槽位置是什么，让插槽默认值生效 --\x3e\n      \x3c!-- <template v-slot:address=\"{ $index, row, column }\">\n      <el-tag>{{ row.address }}</el-tag>\n    </template> --\x3e\n    </simple-table>\n  </div>\n</template>\n\n<script>\n  export default {\n    data() {\n      return {\n        columns: [\n          {\n            isHidden: true,\n            prop: 'indexTest',\n            render: (h, scope) => {\n              return <el-tag>{scope.$index + 1}</el-tag>\n            },\n            attrs: { label: '序号Test', prop: 'index', type: 'index' },\n          },\n          {\n            prop: 'date',\n            render: (h, scope) => {\n              return <el-tag>{scope.row.date}</el-tag>\n            },\n            attrs: {\n              label: '日期',\n              renderHeader: (h, scope) => {\n                return <el-tag>{scope.column.label}</el-tag>\n              },\n            },\n          },\n          {\n            prop: 'name',\n            isSlot: true,\n            attrs: {\n              label: '名字',\n            },\n          },\n          {\n            prop: 'address',\n            attrs: {\n              label: '地址',\n            },\n          },\n        ],\n        tableData: [\n          {\n            date: '2016-05-02',\n            name: '王小虎',\n            address: '上海市普陀区金沙江路 1518 弄',\n          },\n          {\n            date: '2016-05-04',\n            name: '王小虎',\n            address: '上海市普陀区金沙江路 1517 弄',\n          },\n          {\n            date: '2016-05-01',\n            name: '王小虎',\n            address: '上海市普陀区金沙江路 1519 弄',\n          },\n          {\n            date: '2016-05-03',\n            name: '王小虎',\n            address: '上海市普陀区金沙江路 1516 弄',\n          },\n        ],\n        pageAttrs: {\n          pageSize: 10,\n          currentPage: 1,\n          total: 4,\n        },\n        pageListener: {\n          'size-change': this.sizeChange,\n          'current-change': this.currentChange,\n        },\n      }\n    },\n    computed: {\n      pageParam() {\n        return {\n          pageSize: this.pageAttrs.pageSize,\n          currentPage: this.pageAttrs.currentPage,\n        }\n      },\n    },\n    methods: {\n      indexMethod(index) {\n        return index * 2\n      },\n      sizeChange(pageSize) {\n        this.pageAttrs.pageSize = pageSize\n        this.getList()\n      },\n      currentChange(currentPage) {\n        this.pageAttrs.pageNum = currentPage\n        this.getList()\n      },\n      getList() {\n        console.log('pageParam=====', this.pageParam)\n      },\n    },\n  }\n<\/script>\n")])])])],2),t._m(1),t._m(2),t._m(3),t._m(4),t._m(5),t._m(6),t._m(7),t._m(8)],1)}),[function(){var t=this,e=t._self._c;return e("h2",{attrs:{id:"table-zu-jian"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#table-zu-jian"}},[t._v("¶")]),t._v(" table 组件")])},function(){var t=this,e=t._self._c;return e("h3",{attrs:{id:"table-attributes"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#table-attributes"}},[t._v("¶")]),t._v(" Table Attributes")])},function(){var t=this,e=t._self._c;return e("table",[e("thead",[e("tr",[e("th",[t._v("参数")]),e("th",[t._v("说明")]),e("th",[t._v("类型")]),e("th",[t._v("可选值")]),e("th",[t._v("默认值")])])]),e("tbody",[e("tr",[e("td",[t._v("data")]),e("td",[t._v("表格显示的数据")]),e("td",[t._v("Array")]),e("td",[t._v("-")]),e("td",[t._v("-")])]),e("tr",[e("td",[t._v("columnsConfig")]),e("td",[t._v("el-table-column 的数据全局描述")]),e("td",[t._v("Array")]),e("td",[t._v("-")]),e("td",[t._v("-")])]),e("tr",[e("td",[t._v("columns")]),e("td",[t._v("el-table-column 的数据描述（默认会与 columnsConfig 合并，优先级大于 columnsConfig），详细参数见下面")]),e("td",[t._v("Array")]),e("td",[t._v("-")]),e("td",[t._v("-")])]),e("tr",[e("td",[t._v("is-show-page")]),e("td",[t._v("el-pagination 是否使用")]),e("td",[t._v("Boolean")]),e("td",[t._v("-")]),e("td",[t._v("true")])]),e("tr",[e("td",[t._v("page-attrs")]),e("td",[t._v("el-pagination attributes 对象")]),e("td",[t._v("Object")]),e("td",[t._v("-")]),e("td",[t._v("{}")])]),e("tr",[e("td",[t._v("page-listener")]),e("td",[t._v("el-pagination events 对象")]),e("td",[t._v("Object")]),e("td",[t._v("-")]),e("td",[t._v("{}")])]),e("tr",[e("td",[t._v("其他参数")]),e("td",[t._v("el-table attributes 对 象")]),e("td",[t._v("Object")]),e("td",[t._v("-")]),e("td",[t._v("{}")])])])])},function(){var t=this,e=t._self._c;return e("h3",{attrs:{id:"columns-attributes"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#columns-attributes"}},[t._v("¶")]),t._v(" columns Attributes")])},function(){var t=this,e=t._self._c;return e("table",[e("thead",[e("tr",[e("th",[t._v("参数")]),e("th",[t._v("说明")]),e("th",[t._v("类型")]),e("th",[t._v("可选值")]),e("th",[t._v("默认值")])])]),e("tbody",[e("tr",[e("td",[t._v("is-hidden")]),e("td",[t._v("当前列是否显示")]),e("td",[t._v("Boolean")]),e("td",[t._v("--")]),e("td",[t._v("false")])]),e("tr",[e("td",[t._v("prop")]),e("td",[t._v("列唯一 key，也用于插槽 name")]),e("td",[t._v("String")]),e("td",[t._v("-")]),e("td",[t._v("-")])]),e("tr",[e("td",[t._v("attrs")]),e("td",[t._v("el-table-column attributes 对象")]),e("td",[t._v("Object")]),e("td",[t._v("-")]),e("td",[t._v("-")])]),e("tr",[e("td",[t._v("is-slot")]),e("td",[t._v("是否渲染为插槽为，默认渲染出 ${prop}、`${prop}Header` 名称的插槽位置来承接列内容、列头内容")]),e("td",[t._v("String")]),e("td",[t._v("-")]),e("td",[t._v("默认列内容为 scope.row[column.attrs.prop]，列头内容为 column.attrs.label")])]),e("tr",[e("td",[t._v("render")]),e("td",[t._v("列内容渲染函数，支持 jsx 语法")]),e("td",[t._v("Function")]),e("td",[t._v("-")]),e("td",[t._v("-")])])])])},function(){var t=this,e=t._self._c;return e("h3",{attrs:{id:"table-events"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#table-events"}},[t._v("¶")]),t._v(" Table Events")])},function(){var t=this,e=t._self._c;return e("table",[e("thead",[e("tr",[e("th",[t._v("事件名")]),e("th",[t._v("说明")]),e("th",[t._v("参数")])])]),e("tbody",[e("tr",[e("td",[t._v("其他事件")]),e("td",[t._v("el-table events 对象")]),e("td",[t._v("Object")])])])])},function(){var t=this,e=t._self._c;return e("h3",{attrs:{id:"table-slot"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#table-slot"}},[t._v("¶")]),t._v(" Table Slot")])},function(){var t=this,e=t._self._c;return e("table",[e("thead",[e("tr",[e("th",[t._v("插槽名")]),e("th",[t._v("说明")])])]),e("tbody",[e("tr",[e("td",[t._v("frontColumn")]),e("td",[t._v("表格内渲染 columns 对应表格列前面的区域, 参数为 { columnsConfig, $index }")])]),e("tr",[e("td",[t._v("behindColumn")]),e("td",[t._v("表格内渲染 columns 对应表格列后面的区域 , 参数为 { columnsConfig, $index }")])])])])}],!1,null,null,null).exports}}]);