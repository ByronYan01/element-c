<template>
  <div
    class="el-form-item"
    :class="[
      {
        'el-form-item--feedback': elForm && elForm.statusIcon,
        'is-error': validateState === 'error',
        'is-validating': validateState === 'validating',
        'is-success': validateState === 'success',
        'is-required': isRequired || required,
        'is-no-asterisk': elForm && elForm.hideRequiredAsterisk,
      },
      sizeClass ? 'el-form-item--' + sizeClass : '',
    ]"
  >
    <label-wrap :is-auto-width="labelStyle && labelStyle.width === 'auto'" :update-all="form.labelWidth === 'auto'">
      <label :for="labelFor" class="el-form-item__label" :style="labelStyle" v-if="label || $slots.label">
        <slot name="label">{{ label + form.labelSuffix }}</slot>
      </label>
    </label-wrap>
    <div class="el-form-item__content" :style="contentStyle">
      <!-- 聚焦就展示 -->
      <el-popover
        popper-class="form-item-popover"
        :placement="popoverPlacement"
        :width="popoverWidth"
        :disabled="popoverDisable"
        trigger="focus"
        ref="popoverRef"
        @show="showPopover"
      >
        <slot name="tip" :tipList="tipList">
          <div class="tip-wrap">
            <div class="tip-item" v-for="(item, index) in tipList" :key="index">
              <i :class="[item.isError ? 'el-icon-error icon-error' : 'el-icon-success icon-success']"></i>
              <span>{{ item.message }}</span>
            </div>
          </div>
        </slot>
        <slot slot="reference"></slot>
      </el-popover>
    </div>
  </div>
</template>
<script>
import { FormItem } from 'element-ui'
import AsyncValidator from 'async-validator'
import { noop } from 'element-ui/src/utils/util'

export default {
  extends: FormItem,
  name: 'form-item-tip',
  props: {
    popoverWidth: {
      type: Number,
      default: 300,
    },
    //提示位置 top | right
    popoverPlacement: {
      type: String,
      default: 'right',
    },
  },
  data() {
    return {
      tipList: [],
      disablePopover: false,
    }
  },
  created() {
    // 默认开始收集所有tip信息
    this.getErrorInfo()
  },
  computed: {
    // poppover 不展示情况
    popoverDisable() {
      // 无规则 || （有规则 && 规则非必填 && 字段无值）
      return !this.tipList.length || (this.tipList.length && !this.isRequired && this.fieldValueIsEmpty)
    },
    // 字段是否为空
    fieldValueIsEmpty() {
      return (
        this.fieldValue === '' || this.fieldValue === null || this.fieldValue === undefined || (Array.isArray(this.fieldValue) && this.fieldValue.length === 0)
      )
    },
  },
  watch: {
    // 监听 poppover 展示状态变化
    popoverDisable(nVal, oVal) {
      if (!nVal && oVal) {
        console.log('234234234')
        // true -> false 从禁用到展示
        this.updatePopover()
      } else {
        // false -> true 从展示到禁用（禁用则成功）
        this.validateState = 'success'
      }
    },
  },
  methods: {
    getErrorInfo() {
      // 生成当前 message 状态
      const mesErrorObj = {}
      this.tipList.forEach((item) => {
        mesErrorObj[item.message] = item.isError
      })
      // 获取当前最新规则集合
      const curRules = this.getRules()
      this.tipList = curRules.reduce((acc, cur) => {
        const message = cur.message
        if (Array.isArray(message)) {
          return this.handlerArray(acc, message, mesErrorObj)
        }
        if (typeof message === 'function') {
          // console.log("message()===", message());
          return this.handlerArray(acc, message(), mesErrorObj)
        }
        return [
          ...acc,
          {
            // 优先展示当前状态
            isError: mesErrorObj[message] === undefined ? true : mesErrorObj[message],
            message,
          },
        ]
      }, [])
      console.log(' this.tipList===', this.tipList)
    },
    handlerArray(acc, list, mesErrorObj) {
      if (Array.isArray(list)) {
        return [
          ...acc,
          ...list.map((mes) => ({
            isError: mesErrorObj[mes] === undefined ? true : mesErrorObj[mes],
            isValidator: true,
            message: mes,
          })),
        ]
      }
      return []
    },
    // poppover 展示后
    showPopover() {
      this.getErrorInfo()
      // 无检验状态，点击校验
      this.validate('', noop)
      // 展示 popover 时，纠正位置
      this.updatePopover()
    },
    // 更新位置
    updatePopover() {
      this.$nextTick(() => {
        this.$refs.popoverRef.updatePopper()
      })
    },
    // 阻断式判断
    tipMessage(message) {
      // 默认 mesage 为空，通过
      let errorIndex = this.tipList.length
      if (message) {
        errorIndex = this.tipList.findIndex((item) => item.message === message)
      }
      for (let index = 0; index < this.tipList.length; index++) {
        if (index >= errorIndex) {
          this.$set(this.tipList[index], 'isError', true)
        } else {
          this.$set(this.tipList[index], 'isError', false)
        }
      }
    },
    // 并发式判断
    tipAllMessage(errors) {
      console.log('errors===', errors)
      let errorMes = Array.isArray(errors) ? errors.map((item) => item.message) : []
      if (this.isRequired && this.fieldValueIsEmpty) {
        // 存在必填 && 字段值为空  --- 直接全部不通过(自定义函数除外：不管值为多少，都会执行自定义函数)
        // 必填情况下，只有必填规则、自定义规则会触发结果 --- 不过默认 el 配置的规则只要必填，字段值为空都不会通过；只需要处理一下自定义函数的结果
        // ----不是自定义函数 || AsyncValidator结果中包含的 都认为是错误信息
        // 非必填情况下，所有规则都会触发，直接用 errors 匹配即可
        errorMes = this.tipList
          .filter((item) => {
            if (!item.isValidator) {
              return true
            }
            if (errorMes.includes(item.message)) {
              return true
            }
            return false
          })
          .map((item) => item.message)
      }
      // errorMes 中存在的没通过，否则通过
      for (let index = 0; index < this.tipList.length; index++) {
        const infoItem = this.tipList[index]
        if (errorMes.includes(infoItem.message)) {
          this.$set(this.tipList[index], 'isError', true)
        } else {
          this.$set(this.tipList[index], 'isError', false)
        }
      }
    },
    validate(trigger, callback = noop) {
      this.validateDisabled = false

      const rules = this.getFilteredRule(trigger)

      if ((!rules || rules.length === 0) && this.required === undefined) {
        callback()
        return true
      }
      if (this.popoverDisable) {
        // 非必填，禁用 popover 情况下直接通过
        callback('', null)
        return
      }
      this.validateState = 'validating'

      const descriptor = {}
      if (rules && rules.length > 0) {
        rules.forEach((rule) => {
          delete rule.trigger
          if (rule.validator) {
            // 处理自定义字段
            delete rule.message
          }
        })
      }
      descriptor[this.prop] = rules

      const validator = new AsyncValidator(descriptor)
      const model = {}
      model[this.prop] = this.fieldValue

      validator.validate(model, { firstFields: false }, (errors, invalidFields) => {
        console.log('errors===', errors)
        console.log('invalidFields===', invalidFields)

        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''

        callback(this.validateMessage, invalidFields)
        this.elForm && this.elForm.$emit('validate', this.prop, !errors, this.validateMessage || null)
        // 变化 tip 状态
        // this.tipMessage(this.validateMessage);
        this.tipAllMessage(errors)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.tip-wrap {
  margin: -6px 0;
  .tip-item {
    margin: 6px 0;
    .icon-error {
      color: red;
      margin-right: 4px;
    }
    .icon-success {
      color: green;
      margin-right: 4px;
    }
  }
}
</style>
<style lang="scss">
.form-item-popover {
  width: auto !important;
  min-width: 200px;
}
</style>
