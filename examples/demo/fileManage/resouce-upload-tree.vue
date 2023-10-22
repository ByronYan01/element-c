<template>
  <div>
    <h3>树形结构场景 -- 前后两次相同路径会被替换（第一级）</h3>
    <h4 style="margin-bottom: 16px">文件大小限制 5M</h4>
    <!-- <el-input v-model="inputVal"></el-input> -->
    <div class="select-upload-area">
      <el-button type="primary" @click="clickSelectFile()"> 选择文件 </el-button>
      <el-button type="primary" @click="clickSelectFolder()"> 选择文件夹 </el-button>
      <el-button @click="getRes()"> 获取结果 </el-button>
    </div>
    <div :class="['drag-drop-area', { 'drag-over': dragOver1 }]" ref="dragDropArea1">
      <div class="left-top angle"></div>
      <div class="right-top angle"></div>
      <div class="left-bottom angle"></div>
      <div class="right-bottom angle"></div>
      <div class="center-area">
        <!-- <el-input v-model="inputVal"></el-input> -->
        <div class="img-show" draggable="false"></div>
        <div class="text-show" draggable="false">将目录或多个文件拖拽到此进行上传</div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" row-key="fullPath" border :tree-props="{ children: 'child' }">
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="size" label="大小" width="180">
        <template slot-scope="scope">
          <span>{{ filterSize(scope.row.totalSize || scope.row.size) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="180"> </el-table-column>
      <el-table-column prop="fullPath" label="完整路径"> </el-table-column>
      <el-table-column label="操作" width="70">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope)" type="text" size="small"> 移除 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { ResHandle, selectResource, selectFileChange, selectFolderChange, filterSize } from 'd-resouce'
export default {
  data() {
    return {
      dragOver1: false,
      tableData: [],
      filterSize,
      inputVal: '',
      maxSize: 5 * 1024 * 1024,
    }
  },
  mounted() {
    console.log('ResHandle===', ResHandle)
    this.$nextTick(() => {
      new ResHandle({
        targetDom: this.$refs.dragDropArea1,
        dragoverFuc: this.dragoverFuc1,
        dragleaveFuc: this.dragleaveFuc1,
        readDataFuc: this.dropFuc1,
        filterFuc: this.filterFuc1,
        validFuc: this.validFuc1,
        mode: 'tree',
      })
    })
  },
  methods: {
    getRes() {
      this.$message.info('请看 F12 日志')
      console.log('======当前读取到的资源======', this.tableData)
    },
    deleteRow({ row }) {
      this.removeNodeInTree(this.tableData, row.fullPath)
    },
    removeNodeInTree(treeList, fullPath) {
      // 通过id从数组（树结构）中移除元素
      if (!treeList || !treeList.length) {
        return
      }
      for (let i = 0; i < treeList.length; i++) {
        if (treeList[i].fullPath === fullPath) {
          treeList.splice(i, 1)
          break
        }
        this.removeNodeInTree(treeList[i].child, fullPath)
      }
    },
    clickSelectFile() {
      // accept: 'image/png, image/jpeg'
      selectResource(false, { multiple: true }).then(
        (files) => {
          console.log('clickSelectFile=====', files)
          const ifExist = files.some((file) => file.size > this.maxSize)
          if (ifExist) {
            this.$message.warning('文件大小超过 5M')
            return
          }
          this.dropFuc1(selectFileChange(files))
        },
        (err) => {
          console.log('clickSelectFile===', err)
        },
      )
    },
    clickSelectFolder() {
      // accept: 'image/png, image/jpeg'
      selectResource(true, { multiple: true }).then(
        (files) => {
          console.log('clickSelectFolder=====', files)
          const ifExist = files.some((file) => file.size > this.maxSize)
          if (ifExist) {
            this.$message.warning('文件大小超过 5M')
            return
          }
          this.dropFuc1(selectFolderChange(files))
        },
        (err) => {
          console.log('clickSelectFile===', err)
          this.$message.warning('请选择指定类型文件')
        },
      )
    },
    dragoverFuc1() {
      this.dragOver1 = true
    },
    dragleaveFuc1() {
      this.dragOver1 = false
    },
    dropFuc1(blockContent) {
      console.log('dropFuc1 blockContent===', blockContent)
      const oldTree = this.tableData.map((item) => item.name)
      const curTree = blockContent.map((item) => item.name)
      console.log('oldTree===', oldTree)
      console.log('curTree===', curTree)
      // this.tableData = blockContent
      curTree.forEach((item, i) => {
        const j = oldTree.indexOf(item)
        if (j > -1) {
          // 替换
          this.$set(this.tableData, j, blockContent[i])
        } else {
          // 新增
          this.tableData.push(blockContent[i])
        }
      })
    },
    filterFuc1(item) {
      console.log('filterFuc1 item===', item)
      // return item.fullPath !== 'aa/1111.png'
      // return item.fullPath !== '11/22/33'
      // return item.fullPath !== '11/11'
      // return item.type !== 'text/directory'
      return true
    },
    validFuc1(item) {
      console.log('validFuc1 item===', item)
      const isPass = item.size < this.maxSize
      // cb(isPass)
      if (!isPass) {
        this.$message.warning('文件大小超过 5M')
      }
      return isPass
    },
  },
}
</script>
<style lang="scss" scoped>
.select-upload-area {
  margin-bottom: 12px;
}
.drag-drop-area {
  margin-bottom: 12px;
  width: 100%;
  height: 154px;
  position: relative;
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #e6e8ec;
  .center-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img-show {
      width: 80px;
      height: 80px;
      background: url(../../../assets/svg/bk-dorp.svg) no-repeat center;
    }
    .text-show {
      font-size: 12px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #1b1d27;
      line-height: 16px;
    }
  }
  .angle {
    position: absolute;
    width: 50px;
    height: 50px;
    background-size: 100% 100%;
  }
  .left-top {
    top: -1px;
    left: -1px;
    background: url(../../../assets/svg/upload-left-top.svg) no-repeat center;
  }
  .right-top {
    top: -1px;
    right: -1px;
    background: url(../../../assets/svg/upload-right-top.svg) no-repeat center;
  }
  .left-bottom {
    bottom: -1px;
    left: -1px;
    background: url(../../../assets/svg/upload-left-bottom.svg) no-repeat center;
  }
  .right-bottom {
    bottom: -1px;
    right: -1px;
    background: url(../../../assets/svg/upload-right-bottom.svg) no-repeat center;
  }
  &.drag-over {
    border: 1px dashed #2d5fff;
    background: #f2f3f8;
    .left-top {
      background: url(../../../assets/svg/upload-left-top-hover.svg) no-repeat center;
    }
    .right-top {
      background: url(../../../assets/svg/upload-right-top-hover.svg) no-repeat center;
    }
    .left-bottom {
      background: url(../../../assets/svg/upload-left-bottom-hover.svg) no-repeat center;
    }
    .right-bottom {
      background: url(../../../assets/svg/upload-right-bottom-hover.svg) no-repeat center;
    }
  }
}
</style>
