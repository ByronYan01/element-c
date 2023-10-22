<template>
  <div>
    <div class="select-upload-area">
      <el-button type="primary" @click="uploadRes"> 上传 </el-button>
      <el-button type="primary" @click="createFolder"> 新建文件夹 </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'fileManage',
  data() {
    return {
      uploadShow: false,
    }
  },
  methods: {
    uploadRes() {},
    createFolder() {},
  },
}
</script>
