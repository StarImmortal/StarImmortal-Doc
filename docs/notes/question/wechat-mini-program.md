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

## 安全区域适配问题

### 问题描述

在微信小程序开发过程中，有些页面的按钮是需要固定在页面底部（如电商详情页中的加入购物车按钮等），如果将底部栏样式直接设置为**bottom：0;**，那么在iPhone X、iPhone XR、iPhone 12等机型中，就会出现下图所示问题：按钮区域距离底部太近，可点击区域缩小，用户体验感差。

### 问题复现

![安全区域适配问题](https://img-blog.csdnimg.cn/d7cee9f87b1e4ce19199e4ad66b1e37d.png#pic_center)

### 解决方案

#### 方案一（最快速）

利用IOS新增的 **env()** 和 **constant()** 特性即可解决，开发者不需要自己动态计算高度，只需将如下CSS代码添加至样式中：

示例代码：

```html
<!-- 底部栏 -->
<view class="bottom"></view>
```

```css
.bottom {
	position: fixed;
	bottom: 0;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}
```

#### 方案二（动态计算）

```html
<!-- 底部栏 -->
<view class="bottom" style="padding-bottom:{{bottomPadding}}px"></view>
```

```js
async onLoad() {
	const res = await wx.getSystemInfo({})
	const bottomPadding = res.screenHeight - res.safeArea.bottom
	this.setData({
	  bottomPadding
	})
}
```

```css
.bottom {
	position: fixed;
	bottom: 0;
}
```

## IOS机型 margin-bottom 属性失效问题

### 问题描述

在微信小程序中，给一个view设置 **margin-bottom** 属性，在模拟器上生效，但是IOS真机上无效。

### 解决方案

方案一：设置**一定高度**的view

```css
.view {
    height: 60px;
}
```

方案二：使用**padding-bottom**

```css
.view {
    padding-bottom: 60px;
}
```

## Vant DropdownMenu 下拉菜单组件穿透问题

### 问题描述

在微信小程序中使用Vant组件库提供的**DropdownMenu**下拉菜单组件时，当内容超过一定高度时，随着页面内容部分的滚动，顶部会出现部分间隙，继续划动会导致底层页面的滚动，这就是滚动穿透。

### 问题复现

![遮罩层滑动穿透问题](https://img-blog.csdnimg.cn/41c6db5f01d447dbaa98a1df18de336e.png#pic_center)

# 解决方案（禁止滚动穿透）

**DropdownMenu**下拉菜单组件内部结合了**Popup**弹出层组件。

目前，**Popup**组件可以通过**lock-scroll**属性处理部分滚动穿透问题。

但由于小程序自身原因，弹窗内容区域仍会出现滚动穿透。

不过，Vant组件为开发者提供了一个推荐方案以完整解决滚动穿透：**page-meta**

::: tip
当小程序基础库最低版本在 2.9.0 以上时，即可使用 [page-meta](https://developers.weixin.qq.com/miniprogram/dev/component/page-meta.html) 组件动态修改页面样式
:::

首先开发者在**wxml**页面中定义如下代码：

```html
<!-- page-meta 只能是页面内的第一个节点 -->
<page-meta page-style="{{ showDropdownMenu ? 'overflow: hidden;' : '' }}" />
```

其次需要控制**page-style**属性值，当下拉菜单显示时，将**page-style**属性值设置为**overflow: hidden**，隐藏时置空，这样就很好的解决了滚动穿透的问题。

```js
 onShowDropdownMenu() {
   this.setData({
     showDropdownMenu: true
   })
 }
```

<RightMenu />