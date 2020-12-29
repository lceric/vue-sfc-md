const jsdoc = require('jsdoc-api')

const sourceStr = `
#index.vue示例
<template src="./template.html"></template>

<script lang="js">
  // script.js示例
  import Vue from 'vue'
  export default {
      name: 'x-button',  // 组件名称
      props: {
          /** 
           * 尺寸
           * @optional mini|small|medium|large   // 属性可选值
          */
          size: {
              type: String,
              default: 'medium',
          },
          /** 
           * 类型
           * @optional primary|success|info|warning|danger
          */
          type: {
              type: String,
          },
          /** 
           * 是否禁止
          */
          disabled: {
              type: Boolean,
              default: false
          }
      },
      data() {
          return {

          }
      },
      methods: {
        click(){
          /**
           * 变化事件
           * @arg {string} value - The input value
           */
          this.$emit('onChange', '1')
        },
        /**
         * 测试demo
         * @emit test|测试emit事件
         * @emit success|测试emit success事件
         */
        demo(){
          // @doc-ignore
          this.$emit('test', '111')
        }
      }
  }
</script>
`
let jsSourceStr = extractJsPart(sourceStr)
// AST
const parsed = jsdoc.explainSync({ source: jsSourceStr })

console.log(parsed)


function extractJsPart(source) {
  let reg = /(?:<script .*?>)([\s\S]*?)(?:<\/script>)/gi
  let regRes = reg.exec(source)
  console.log(regRes[1])
  return regRes[1] || ''
}
