<!--
* button组件
* @kkk 年后
-->
<template>
  <div class="na">
    这是一个btn
    <header class="header">
      <!--
      * 这是一个title slot
      * @bind `{ size, type }`大小和类型
      -->
      <slot name="title" v-bind="{ size, type }"></slot>
    </header>

    <!-- 这是默认的slot -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'button',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    /**
     * 尺寸
     * @optional mini|small|medium|large
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
      default: false,
    },
  },
  methods: {
    /**
     * 点击事件
     * @param {Event} event - description event.
     */
    click(event) {
      let obj = { key: 'k', value: 'v' }
      /**
       * 变化事件
       * @arg {string} value - The input value
       * @arg {object} obj - `{ key: 'k', value: 'v'}`
       */
      this.$emit('onChange', this.value, obj)
    },
    /**
     * @private
     * 这是一个私有方法
     */
    demo() {
      /**
       * @ignore
       * 在文档中忽略当前事件
       */
      this.$emit('change', '111')
    },
  },
}
</script>
