---
title: CSS
---

:::tip
本专栏介绍CSS常用的奇技淫巧，让你解放双手，提高开发效率！
:::

## 伪类实现竖线效果

```html
<div>
	<h3 class="tips">解析 &#128220</h3>
</div>
```

```css
.tips {
    position: relative;
    padding-left: 14px;
}

.tips::after {
    position: absolute; /*绝对定位*/
    top: 50%; /*Y轴方向偏移自身高度的50%*/
    transform: translatey(-40%); /*Y轴方向偏移微调*/
    left: 0; /*紧靠容器左边缘*/
    content: ''; /*伪元素需要有内容才能显示*/
    width: 4px; /*伪元素宽度*/
    height: 18px; /*伪元素高度*/
    background-color: #2EB976; /*伪元素颜色*/
}
```

![](https://img-blog.csdnimg.cn/c6de595ceea94ffbbf3e6e03ce3fb058.png)

<RightMenu />