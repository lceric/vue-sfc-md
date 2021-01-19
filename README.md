## vue-sfc-md

read vue sfc, or sfc string, output md modules. [@vuedoc/paser](https://github.com/vuedoc/parser)

## Install

```bash
npm i vue-sfc-md
```

## Config

```js
const opts = {
  encoding,
  features,
  loaders,
  ignoredVisibilities,
  jsx,
  commentExtra,
  removeEmptyColumns: true, // 是否需要移除空列
  emptyFlags: ['-'], // 空列的判断标识，默认是['-']
}

parsed(vueFileStr, opts)

// commentExtra
// file commont map
{
  design: '自定义',
  val: 'VAL'
}
```
## Usage

```js
const fs = require('fs')
const path = require('path')
const { parsed } = require('vue-sfc-md')
/**
 * 主线程
 */
async function main() {
  const sourceStr = fs.readFileSync(path.join(__dirname, './Btn.vue'), 'utf8')

  let docModules = await parsed(sourceStr, {
    jsx: true,
    removeEmptyColumns: true,
    emptyFlags: ['-', '`false`'],
  })

  let sfcDoc = docModules
    .filter((m) => !m.empty)
    .map((m) => m.doc)
    .join('\n')
  console.log(sfcDoc)
}

main()
```

## Support

### file top comment

**支持文件注释解析**
title 文件标题，h1

```vue
<!--
* Button组件的描述部分，描述补充，介绍部分
* @title 组件Title
* @design 统一button的表现
* @expect
  1. 测试
  2. 看看
-->
<template></template>
```

### slot bind

```vue
<!--
* 这是一个title slot
* @bind `{ size, type }`大小和类型
-->
<slot name="title" v-bind="{ size, type }"></slot>
```

### prop optional

```js
{
  /**
  * 尺寸
  * @optional mini|small|medium|large
  */
  size: {
   type: String,
   default: 'medium',
  },
}
```

## Example

a example sfc:

```html
<!--
* Button组件
* @design 统一button的表现
* @expect 按钮统一，提供多种类型
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
     * 禁用状态
     */
    disabled: Boolean,
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
```

output markdown source:

```markdown
## 组件说明

Button 组件

## 设计初衷

统一 button 的表现

## 组件期望

按钮统一，提供多种类型

## Props

| name       | description | type      | optional                  | required | default    |
| ---------- | ----------- | --------- | ------------------------- | -------- | ---------- |
| `disabled` | 禁用状态    | `Boolean` | -                         | `false`  | -          |
| `size`     | 尺寸        | `String`  | `mini,small,medium,large` | `false`  | `"medium"` |

## Events

| name       | description | args                                                                     |
| ---------- | ----------- | ------------------------------------------------------------------------ |
| `onChange` | 变化事件    | `value：string` The input value，`obj：object` `{ key: 'k', value: 'v'}` |

## Methods

| name    | description | params                            |
| ------- | ----------- | --------------------------------- |
| `click` | 点击事件    | `event：Event` description event. |

## Slots

| slot      | description         | bind                       |
| --------- | ------------------- | -------------------------- |
| `default` | 这是默认的 slot     | -                          |
| `title`   | 这是一个 title slot | `{ size, type }`大小和类型 |
```

