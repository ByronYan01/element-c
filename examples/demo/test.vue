<template>
  <div class="wrap">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="配置规则" prop="name" placement="top" :popWidth="120">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="自定义规则" prop="FucName">
        <el-input v-model="ruleForm.FucName"></el-input>
      </el-form-item>
      <el-form-item label="非必填" prop="test">
        <el-input v-model="ruleForm.test"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"> 立即创建 </el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="ruleFormTip" :rules="rules" ref="ruleFormTip" label-width="100px" class="demo-ruleForm">
      <form-item-tip label="配置规则" prop="name" placement="top" :popWidth="120">
        <el-input v-model="ruleFormTip.name"></el-input>
      </form-item-tip>
      <form-item-tip label="自定义规则" prop="FucName">
        <el-input v-model="ruleFormTip.FucName"></el-input>
      </form-item-tip>
      <form-item-tip label="非必填" prop="test">
        <el-input v-model="ruleFormTip.test"></el-input>
      </form-item-tip>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleFormTip')"> 立即创建 </el-button>
        <el-button @click="resetForm('ruleFormTip')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'test',
  data() {
    return {
      ruleForm: {
        name: '',
        FucName: '',
        test: '',
      },
      ruleFormTip: {
        name: '',
        FucName: '',
        test: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入活动名称',
            trigger: ['change'],
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: ['change'],
          },
          // {
          //   pattern: /^[A-Za-z].*/,
          //   message: '支持字母开头',
          //   trigger: ['change'],
          // },
          {
            validator: this.validStart,
            trigger: ['change'],
            message: ['支持字母开头'],
          },
        ],
        FucName: [
          {
            required: true,
            message: '名称不能为空',
            trigger: ['change'],
          },
          {
            validator: this.validLen,
            trigger: ['change'],
            message: ['支持长度为6-10个字符'],
          },
          {
            validator: this.validStart,
            trigger: ['change'],
            message: ['支持字母开头'],
          },
          {
            validator: this.validAll,
            trigger: ['change'],
            message: () => ['支持中文、字母、数字'],
          },
        ],
        test: [
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: ['change'],
          },
          {
            pattern: /^[A-Za-z].*/,
            message: '支持字母开头',
            trigger: ['change'],
          },
        ],
      },
    }
  },
  methods: {
    validLen(rule, value, callback) {
      if (!/^.{6,10}$/.test(value)) {
        return callback(new Error('支持长度为6-10个字符'))
      }
      return callback()
    },
    validStart(rule, value, callback) {
      if (!/^[A-Za-z].*/.test(value)) {
        return callback(new Error('支持字母开头'))
      }
      return callback()
    },
    validAll(rule, value, callback) {
      if (!/^[\u4e00-\u9fa5A-Za-z0-9]+/.test(value)) {
        return callback(new Error('支持中文、字母、数字'))
      }
      return callback()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  display: flex;
}
.demo-ruleForm {
  width: 400px;
}
</style>
