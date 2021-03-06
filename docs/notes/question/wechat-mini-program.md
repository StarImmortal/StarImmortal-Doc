---
title: 微信小程序
---

:::tip
本专栏介绍微信小程序开发中常遇到的一些问题，让你避免踩雷，节省开发时间！
:::

## wx:if与hidden区别

`wx:if`之中的模板也可能包含数据绑定，所以当`wx:if`的条件值切换时，框架有一个局部渲染的过程，因为它会确保条件块在切换时销毁或重新渲染。

同时`wx:if`也是惰性的，如果在初始渲染条件为`false`，框架什么也不做，在条件第一次变成真的时候才开始局部渲染。

相比之下，`hidden`就简单的多，组件始终会被渲染，只是简单的控制显示与隐藏。

一般来说，`wx:if`有更高的切换消耗而`hidden`有更高的初始渲染消耗。因此，如果需要频繁切换的情景下，用`hidden`更好，如果在运行时条件不大可能改变则`wx:if`较好。

## 自定义组件事件跨越组件边界

:::tip
如果自定义组件事件需跨越组件边界，进入其他任何组件内部时，需开启`bubbles`和`composed`属性
:::

事件分为冒泡事件和非冒泡事件：

冒泡事件：当一个组件上的事件被触发后，该事件会向父节点传递。

非冒泡事件：当一个组件上的事件被触发后，该事件不会向父节点传递。

bubbles：事件是否冒泡

composed：事件是否可以穿越组件边界，为`false`时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部

示例代码：

```js
methods: {
  onTap(event) {
    this.triggerEvent('tap', {}, {
      bubbles: true,
      composed: true
    })
  }
}
```

## new Date()转换时间时，IOS机型时间格式显示NaN异常问题

错误原因：ios不支持时间为2020-05-29这种格式的日期，必须转换为2020/05/29这种格式才能使用`new Date()`进行转换

解决方法：使用`replace`函数，将全部的“-”替换为”/“

```
const data= '2020-05-29 12:00:00'
const datatime= data.replace(/\-/g, "/")
const newdata = new Date(datatime).getTime()
```

## @tap与@click的区别

- @click是组件被点击时触发，会有约300ms的延迟（内置处理优化了）
- @tap是手指触摸离开时触发，没有300ms的延迟，但是会有事件穿透
- 编译到小程序端，@click会被转换成@tap

## 数据绑定多次触发问题

对于某组件来说，如果绑定了某一个属性时，组件初始化时，不管属性是否有值或者默认值，都会进行一次数据绑定

当页面调用该组件，并且绑定组件某个属性时，当改变了该属性的值，会再次触发数据监听

当组件属性有默认值时，如果我们调用组件时，不设置某一个属性，就会去取这个属性的默认值，但是，一旦设置了某一个属性，就不会再取该属性的默认值

<RightMenu />