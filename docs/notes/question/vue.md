---
title: Vue
---

:::tip
本专栏介绍Vue开发中常遇到的一些错误问题，让你避免踩雷，节省开发时间！
:::

## options has an unknown property 'prependData'.

:::danger
Syntax Error: ValidationError: Invalid options object. Sass Loader has been initialized using an options object that does not match the API schema.
:::

:::tip
由于`sass-loader`版本不同，`loaderOptions`中`additionalData`的键名也不同
:::

检查`vue.config.js`配置：

```js
module.exports = {
  css: {
    loaderOptions: {
      sass: { 
        // 加载全局scss文件
        additionalData: ''
      }
    }
  },  
}
```

:::tip
- sass-loader v8-，选项名是：`"data"`
- sass-loader v8，选项名是：`"prependData"`
- sass-loader v10+，选项名是：`"additionalData"`
:::

## Error in event handler for "el.form.change"

:::danger
Error in event handler for "el.form.change": "TypeError: value.getTime is not a function"
:::

问题描述：

Element UI的日期选择器`el-date-picker`在加上格式`value-format="yyyy-MM-dd"`和`format="yyyy-MM-dd"`，在表单验证时会出现冲突

```js
{ type: 'date', required: true, message: '请选择日期', trigger: 'change' } 
```

解决方法：修改校验规则

`type: 'date'`->`type: 'string'`

错误可能原因：

Element UI自带的格式转换后会将绑定值转为字符串，而校验规则中的`type: 'date'`已经不匹配，至于它的报错是因为转换为字符串，不是`date`对象所以没有`getTime`这个方法。

## Ant Design Vue Select 组件 placeholder 不显示

```html
<a-select v-model="level" placeholder="选择日志级别" allow-clear>
  <a-select-option value="info">一般</a-select-option>
  <a-select-option value="warn">警告</a-select-option>
  <a-select-option value="error">错误</a-select-option>
</a-select>
```

问题描述：当同时绑定`v-model`和`placeholder`时，`placeholder`属性不显示。

问题原因：`placeholder`是当前组件值为空时显示的替换文本，只有值为空的时候才会显示。当组件使用`v-model`指令后，值不再是空，即时初始化值为`""`或`null`也视为有值，所以placeholder自然就不会显示。

解决办法：将`v-model`绑定值初始化时设为`undefined`即可显示。

<RightMenu />