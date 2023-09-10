<template>
  <div class="simple-pic-upload" :class="[areaEditFlag ? 'upload-area-disable' : '']" @mouseenter="areaEnter" @mouseleave="areaLeave">
    <el-upload
      class="el-upload-wrap"
      ref="upload"
      v-bind="$attrs"
      v-on="$listeners"
      :show-file-list="false"
      :http-request="httpRequest"
      :disabled="areaEditFlag"
    >
      <div class="upload-area-bk">
        <div class="left-top angle"></div>
        <div class="right-top angle"></div>
        <div class="left-bottom angle"></div>
        <div class="right-bottom angle"></div>
        <div v-if="file" class="show-area">
          <img class="show-area-img" :src="file" alt="" srcset="" />
          <div class="show-area-icon">
            <div v-for="item in operateList" :key="item.key" :class="['show-area-common', 'icon-' + item.key]">
              <div class="icon-wrap" @click.stop="handleFuc(item)">
                <i :class="[item.icon]"></i>
              </div>
              <span class="show-area-text">{{ item.text }}</span>
            </div>
          </div>
        </div>
        <!-- 图片未上传展示 -->
        <slot v-else>
          <div class="upload-area" :style="uploadAreaStyle">
            <div class="upload-icon" v-if="!uploadDisable">
              <div class="icon-wrap">
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </div>
        </slot>
      </div>
    </el-upload>
    <el-dialog title="图片预览" v-if="previewVisible" :visible.sync="previewVisible" width="800px" top="15vh">
      <div class="material-wrap">
        <div class="img-wrap">
          <img class="material-img" draggable="false" :src="file" alt="" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
/**
 * 原有element组件功能不缺失的情况下
 *
 * 马赛克背景避免与背景同色图片无法清楚展示
 * 增加修改能力，避免先删除再上传的复杂操作
 * 展示图片自适应比例
 * 上传组件宽度自适应
 * 点九切图实现UI美化效果
 */
// import { uploadFileDirApi, GetFileUrlApi, uploadPublicFileApi, getPreSignatureUrlApi } from '@/api/public/api'
export default {
  name: 'SimplePicUpload',
  inheritAttrs: false,
  props: {
    picUrl: {
      type: String,
      default: '',
    },
    menuCode: {
      type: String,
      default: '',
    },
    // 支持功能操作
    startOperate: {
      type: Array,
      default() {
        return ['edit', 'preview', 'delete']
      },
    },
    // 指定目录上传
    uploadDir: {
      type: String,
      default: '',
    },
    // 自定义上传
    customeUpload: {
      type: Function,
      default: null,
    },
    uploadAreaStyle: {
      type: Object,
      default() {
        return {}
      },
    },
    // 上传状态禁用
    uploadDisable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      file: '',
      mouseOver: false,
      previewVisible: false,
      operateObj: {
        edit: {
          key: 'edit',
          icon: 'el-icon-plus',
          text: '修改',
        },
        preview: {
          key: 'preview',
          icon: 'el-icon-view',
          text: '预览',
        },
        delete: {
          key: 'delete',
          icon: 'el-icon-delete',
          text: '删除',
        },
      },
    }
  },
  computed: {
    areaEditFlag() {
      if (this.uploadDisable) {
        return true
      }
      if (this.mouseOver && this.file) {
        return true
      }
      return false
    },
    operateList() {
      return this.startOperate.map((key) => this.operateObj[key])
    },
  },
  created() {
    this.init()
  },
  watch: {
    picUrl(n, o) {
      if (!o && !this.file) {
        // 支持编辑默认回显
        this.init()
      }
    },
  },
  beforeDestroy() {
    if (this.file) {
      const windowURL = window.URL || window.webkitURL
      windowURL.revokeObjectURL(this.file)
    }
  },
  methods: {
    handleFuc(item) {
      this[`${item.key}Fuc`]()
    },
    editFuc() {
      const inputEl = this.$el.querySelector('.el-upload__input')
      inputEl.value = null
      inputEl.click()
    },
    previewFuc() {
      this.previewVisible = true
    },
    deleteFuc() {
      this.file = ''
      this.$emit('update:picUrl', '')
      this.$emit('uploadSuccess', '')
    },
    areaEnter() {
      this.mouseOver = true
    },
    areaLeave() {
      this.mouseOver = false
    },
    ishttp(url) {
      if (url.startsWith('http') || url.startsWith('https')) {
        return true
      }
      return false
    },
    async init() {
      // if (!this.picUrl) {
      //   return
      // }
      // if (this.picUrl.startsWith('data:image/x-icon;base64') || this.ishttp(this.picUrl)) {
      //   this.file = this.picUrl
      // } else {
      //   const rs = await GetFileUrlApi(
      //     {
      //       KeyName: this.picUrl,
      //     },
      //     this.menuCode,
      //   )
      //   this.file = rs.data.Url
      // }
    },
    uploadSuccess(val, KeyName) {
      const windowURL = window.URL || window.webkitURL
      this.file = windowURL.createObjectURL(val.file)
      this.$emit('update:picUrl', KeyName)
      this.$emit('uploadSuccess', KeyName)
    },
    httpRequest(val) {
      console.log('val===', val)
      this.uploadSuccess(val, '')
      // const form = new FormData()
      // // 自定义
      // if (typeof this.customeUpload === 'function') {
      //   this.customeUpload(val, (KeyName) => {
      //     this.uploadSuccess(val, KeyName)
      //   })
      // } else if (this.uploadDir) {
      //   // 指定目录
      //   form.append('file', val.file)
      //   uploadFileDirApi(form, this.menuCode, {
      //     params: { dirName: this.uploadDir },
      //   }).then((res) => {
      //     if (res.data.Error && !res.data.Error.Code) {
      //       this.uploadSuccess(val, res.data.KeyName)
      //     }
      //   })
      // } else {
      //   // 实名认证
      //   form.append('multipartFile', val.file)
      //   uploadPublicFileApi(form, this.menuCode).then((res) => {
      //     const windowURL = window.URL || window.webkitURL
      //     this.file = windowURL.createObjectURL(val.file)
      //     this.$emit('update:picUrl', res.data)
      //     this.$emit('uploadSuccess', res.data)
      //   })
      // }
    },
  },
}
</script>
<style lang="scss" scoped>
@mixin bk-mosaic {
  // 多个背景叠加，从前到后，层级逐步递减（第一个层级最高）
  background-image: linear-gradient(45deg, #666666 25%, transparent 25%, transparent 75%, #666666 75%, #666666 100%),
    linear-gradient(45deg, #666666 25%, transparent 25%, transparent 75%, #666666 75%, #666666 100%), linear-gradient(45deg, #7f7f7f, #7f7f7f);
  // background-position: 0 0, 5px 5px;
  // 基于默认位置进行偏移
  background-position: 0 0, 5px 5px, 0 0;
  background-size: 10px 10px;
  background-repeat: repeat;
  // background-origin 在元素哪块区域内充满背景图
}
.simple-pic-upload {
  &.upload-area-disable {
    cursor: default;
    ::v-deep .el-upload {
      cursor: default !important;
      .el-upload-dragger {
        cursor: default !important;
      }
    }
  }
  ::v-deep .el-upload-wrap {
    width: 100%;
    height: 100%;
  }
  ::v-deep .el-upload {
    width: 100%;
    height: 100%;
    display: block;
    .el-upload-dragger {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      border-radius: 0;
      .upload-area-bk {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: var(--color-default-bg);
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed #e6e8ec;
        position: absolute;
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
        &:hover {
          border: 1px dashed #2d5fff;
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
        .show-area {
          user-select: none;
          width: 100%;
          height: 100%;
          position: relative;
          @include bk-mosaic;
          .show-area-img {
            width: 100%;
            height: 100%;
            position: relative;
            object-fit: contain;
          }
          .show-area-icon,
          &::before {
            display: none;
          }
          &:hover {
            .show-area-icon {
              // display: block;
              width: 40%;
              display: flex;
              justify-content: space-around;
              align-items: center;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              z-index: 2;
            }
            .show-area-common {
              display: inline-block;
              // margin-right: 12px;
              width: 27px;
              height: 27px;
              background: #2d5fff;
              border-radius: 50%;
              position: relative;
              .icon-wrap {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                cursor: pointer;
              }
              .show-area-text {
                font-size: 12px;
                font-weight: 400;
                color: white;
                line-height: 16px;
                position: absolute;
                width: 100px;
                bottom: -24px;
                transform: translateX(-50%);
              }
              &:last-child {
                margin-right: 0;
              }
            }
            &::before {
              content: '';
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              // background-color: rgba(30, 16, 16, 0.5); /* 蒙版的颜色和透明度 */
              background: #000000;
              opacity: 0.5;
              z-index: 1;
            }
          }
        }
        .upload-area {
          width: 188px;
          height: 120px;
          position: relative;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
          .upload-icon {
            width: 27px;
            height: 27px;
            position: absolute;
            bottom: -13.5px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 50%;
            background: #9095aa;
            .icon-wrap {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              color: white;
              cursor: pointer;
            }
          }
          &:hover {
            .upload-icon {
              background: #2d5fff;
            }
          }
        }
      }
    }
  }
}
.material-wrap {
  width: 100%;
  height: 100%;
  padding-bottom: 24px;
  text-align: center;
  .img-wrap {
    width: 100%;
    height: 467px;
    @include bk-mosaic;
    .material-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
