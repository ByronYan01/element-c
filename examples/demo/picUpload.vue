<template>
  <div class="picUploadContainer">
    <simple-pic-upload
      class="picUpload"
      :picUrl.sync="picUrl"
      :accept="upload.accept"
      :before-upload="upload.checkFile"
      action=""
      drag
      uploadDir="brand"
      :startOperate="startOperate"
      :uploadDisable="isDetail"
      :menuCode="curMenuCode"
      :uploadAreaStyle="upload.uploadAreaStyle"
      :customeUpload="upload.customeUpload"
    >
    </simple-pic-upload>
    <!-- <div class="bk test1"></div>
    <div class="bk test2"></div>
    <div class="bk test3"></div>
    <div class="bk test4"></div>
    <div class="bk test5"></div> -->
  </div>
</template>
<script>
export default {
  name: 'test',
  data() {
    return {
      upload: {
        key: 'LoginLogoImage',
        label: '登录页logo',
        desc: 'png格式  ·  ≤200KB  ·  尺寸（长*宽）:（<720）*96px',
        accept: '.png',
        checkFile: this.getCheckFuc('.png', {
          num: 200 * 1024,
          tip: '200KB',
        }),
        uploadAreaStyle: {
          width: '164px',
          height: '123px',
          'background-image': `url(${require('../assets/svg/bk-img.png')})`,
        },
      },
    }
  },
  methods: {
    // 1 * 1024 * 1024  1MB
    getCheckFuc(typeList, sizeLimit = { num: 1 * 1024 * 1024, tip: '1MB' }) {
      const checkFuc = (file) => {
        const fileName = file.name
        const targetFileType = fileName.substring(fileName.lastIndexOf('.')).toLowerCase()
        const typePass = typeList.split(',').some((item) => item === targetFileType)
        if (!typePass) {
          this.$message.warning(`您导入的文件格式不正确，请上传${typeList}格式的文件`)
          return false
        } else if (file.size > sizeLimit.num) {
          this.$message.warning(`上传文件的大小不能超过 ${sizeLimit.tip}`)
          return false
        } else {
          return true
        }
      }
      return checkFuc
    },
  },
}
</script>
<style lang="scss" scoped>
.picUploadContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .picUpload {
    width: 40%;
    height: 300px;
  }
}
.bk {
  width: 300px;
  height: 300px;
  margin-left: 20px;
  &.test1 {
    background-image: linear-gradient(#666666 25%, transparent 25%, transparent 75%, #666666 75%);
  }
  &.test2 {
    background-image: linear-gradient(45deg, #666666 25%, transparent 25%, transparent 75%, #666666 75%);
  }
  &.test3 {
    background-image: linear-gradient(45deg, #666666 25%, transparent 25%, transparent 75%, #666666 75%);
    background-size: 20px 20px;
    background-repeat: repeat;
  }
  &.test4 {
    background-image: linear-gradient(45deg, #666666 25%, transparent 25%, transparent 75%, #666666 75%),
      linear-gradient(45deg, #666666 25%, transparent 25%, transparent 75%, #666666 75%, #666666 100%);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
    background-repeat: repeat;
  }
  &.test5 {
    background-image: linear-gradient(45deg, #666666 25%, transparent 25%, transparent 75%, #666666 75%),
      linear-gradient(45deg, #666666 25%, transparent 25%, transparent 75%, #666666 75%, #666666 100%), linear-gradient(#7f7f7f, #7f7f7f);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
    background-repeat: repeat;
  }
}
</style>
