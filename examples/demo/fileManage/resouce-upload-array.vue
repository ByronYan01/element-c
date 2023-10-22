<template>
  <div>
    <h3>数组结构场景 -- 表格、拖拽框两种展示形式（自行设计）</h3>
    <h4 style="margin-bottom: 16px">只读文件，并且过滤展示图片以及限制个数，大小未限制</h4>
    <div class="select-upload-area">
      <el-button type="primary" @click="clickSelectFile()"> 选择文件 </el-button>
      <el-button type="primary" @click="clickSelectFolder()"> 选择文件夹 </el-button>
      <el-button @click="getRes()"> 获取结果 </el-button>
    </div>
    <div :class="['drag-drop-area', { 'drag-over': dragOver }, { 'auto-height': tableData.length }]" ref="dragDropArea">
      <div class="left-top angle"></div>
      <div class="right-top angle"></div>
      <div class="left-bottom angle"></div>
      <div class="right-bottom angle"></div>
      <div class="show-area" v-if="tableData.length">
        <div v-for="(item, index) in tableData" :key="item.fullPath" class="show-item">
          <div class="show-img-wrap">
            <img class="show-img" :src="item.srcFile" alt="" srcset="" />
            <el-button class="delete-img" icon="el-icon-close" circle @click="deleteRow({ $index: index })"></el-button>
          </div>
          <div class="show-area-text">{{ item.name }}</div>
          <div class="show-area-text">{{ filterSize(item.totalSize || item.size) }}</div>
        </div>
      </div>
      <div v-else class="center-area">
        <div class="img-show" draggable="false"></div>
        <div class="text-show" draggable="false">将目录或多个文件拖拽到此进行上传</div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%">
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
import { ResHandle, ModeType, selectResource, selectFileChange, selectFolderChange, filterSize } from 'd-resouce'
export default {
  data() {
    return {
      dragOver: false,
      tableData: [],
      filterSize,
      maxNum: 5,
    }
  },
  mounted() {
    this.$nextTick(() => {
      new ResHandle({
        targetDom: this.$refs.dragDropArea,
        dragoverFuc: this.dragoverFuc,
        dragleaveFuc: this.dragleaveFuc,
        beforeReadFuc: this.beforeReadFuc,
        readDataFuc: this.dropFuc,
        filterFuc: this.filterFuc,
        onlyFile: true,
        mode: 'array',
      })
    })
  },
  methods: {
    getRes() {
      this.$message.info('请看 F12 日志')
      console.log('======当前读取到的资源======', this.tableData)
    },
    deleteRow({ $index }) {
      this.tableData.splice($index, 1)
    },
    clickSelectFile() {
      selectResource(false, { multiple: true }).then(
        (files) => {
          console.log('clickSelectFile=====', files)
          this.dropFuc(selectFileChange(files.filter((file) => file.type.includes('image'))))
        },
        (err) => {
          console.log('clickSelectFile===', err)
        },
      )
    },
    clickSelectFolder() {
      selectResource(true, { multiple: true }).then(
        (files) => {
          console.log('clickSelectFolder=====', files)
          this.dropFuc(
            selectFolderChange(
              files.filter((file) => file.type.includes('image')),
              ModeType.Array,
            ),
          )
        },
        (err) => {
          console.log('clickSelectFile===', err)
        },
      )
    },
    dragoverFuc() {
      this.dragOver = true
    },
    dragleaveFuc() {
      this.dragOver = false
    },
    beforeReadFuc() {
      console.log('this.====', this)
      if ((this.tableData?.length || 0) < this.maxNum) {
        return true
      }
      this.$message.warning(`最多${this.maxNum}个`)
      return false
    },
    dropFuc(blockContent) {
      const windowURL = window.URL || window.webkitURL
      console.log('dropFuc1 blockContent===', blockContent)
      if (blockContent.length > this.maxNum - this.tableData.length) {
        this.$message.warning(`最多${this.maxNum}个`)
        return
      }
      this.tableData = [...this.tableData, ...blockContent]
      this.tableData.forEach((item) => {
        item.srcFile = windowURL.createObjectURL(item.file)
      })
      // const oldTree = this.tableData.map((item) => item.name)
      // const curTree = blockContent.map((item) => item.name)
      // curTree.forEach((item, i) => {
      //   const j = oldTree.indexOf(item)
      //   if (j > -1) {
      //     // 替换
      //     blockContent[i].srcFile = windowURL.createObjectURL(blockContent[j].file)
      //     this.$set(this.tableData, j, blockContent[i])
      //   } else {
      //     // 新增
      //     blockContent[i].srcFile = windowURL.createObjectURL(blockContent[i].file)
      //     this.tableData.push(blockContent[i])
      //   }
      // })
    },
    filterFuc(item) {
      console.log('filterFuc1 item===', item)
      // return item.fullPath !== 'aa/1111.png'
      // return item.fullPath !== '11/22/33'
      // return item.fullPath !== '11/11'
      return item.type.includes('image')
      // return item.type !== 'text/directory'
      // return true
    },
  },
}
</script>
<style lang="scss" scoped>
.select-upload-area {
  margin-bottom: 12px;
}
@mixin bk-mosaic {
  background-image: linear-gradient(45deg, #666666 25%, transparent 25%, transparent 75%, #666666 75%, #666666 100%),
    linear-gradient(45deg, #666666 25%, transparent 25%, transparent 75%, #666666 75%, #666666 100%), linear-gradient(45deg, #7f7f7f, #7f7f7f);
  background-position: 0 0, 5px 5px, 0 0;
  background-size: 10px 10px;
  background-repeat: repeat;
}
@mixin text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.drag-drop-area {
  margin-bottom: 12px;
  width: 100%;
  height: 154px;
  padding: 12px;
  position: relative;
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #e6e8ec;
  .show-area {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .show-item {
      width: 100px;
      margin-right: 12px;
      .show-img-wrap {
        user-select: none;
        width: 100%;
        height: 100px;
        position: relative;
        @include bk-mosaic;
        .show-img {
          width: 100%;
          height: 100%;
          position: relative;
          object-fit: contain;
        }
        .delete-img {
          position: absolute;
          right: 0;
          top: 0;
          padding: 2px;
          font-size: 12px;
        }
        &:last-child {
          margin-right: 0;
        }
      }
      .show-area-text {
        width: 100%;
        display: inline-block;
        @include text-ellipsis;
      }
    }
  }
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
  &.auto-height {
    height: auto;
  }
}
</style>
