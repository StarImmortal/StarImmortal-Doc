---
title: CSS
---

:::tip
本专栏介绍CSS常遇到的一些错误问题，让你避免踩雷，节省开发时间！
:::

## padding-right 不生效

代码片段：

```css
.top-info {
	width: 100%;
	position: absolute;
	bottom: -30rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 20rpx;
}
```

:::tip
此时的padding-right并不生效，加大padding-right的值也不会有效果
:::

![问题复现](https://z3.ax1x.com/2021/11/26/oEcTr4.png)

解决方法：

给元素添加`box-sizing: border-box;`属性，让元素变成一个盒模型。

| 值          | 描述                                                         |
| :---------- | :----------------------------------------------------------- |
| content-box | 这是由 CSS2.1 规定的宽度高度行为。宽度和高度分别应用到元素的内容框。在宽度和高度之外绘制元素的内边距和边框。 |
| border-box  | 为元素设定的宽度和高度决定了元素的边框盒。就是说，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。 |
| inherit     | 规定应从父元素继承 box-sizing 属性的值。  |

```css
.top-info {
	width: 100%;
	position: absolute;
	bottom: -30rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 0 20rpx;
}
```
![成功解决](https://z3.ax1x.com/2021/11/26/oEcXPx.png)

## 弹性布局flex属性详解

:::tip
注意：如果元素不是弹性盒模型对象的子元素，则 flex 属性不起作用。
:::

flex 属性用于设置或检索弹性盒模型对象的子元素如何分配空间。

flex 属性是 **flex-grow**、**flex-shrink** 和 **flex-basis** 属性的简写属性。

```
flex: auto | initial | none | inherit |  [ flex-grow ] || [ flex-shrink ] || [ flex-basis ]
```

- auto: 计算值为 **1 1 auto**
- initial: 计算值为 **0 1 auto**
- none：计算值为 **0 0 auto**
- inherit：从父元素继承
- [ flex-grow ]：定义弹性盒子元素的扩展比率。
- [ flex-shrink ]：定义弹性盒子元素的收缩比率。
- [ flex-basis ]：定义弹性盒子元素的默认基准值。

### flex-grow：用于设置或检索弹性盒子的扩展比率

让第二个元素的宽度为其他元素的三倍：

```html
<div id="main">
  <div style="background-color:coral;"></div>
  <div style="background-color:lightblue;"></div>
  <div style="background-color:khaki;"></div>
  <div style="background-color:pink;"></div>
  <div style="background-color:lightgrey;"></div>
</div>
```

```css
#main {
  width: 350px;
  height: 100px;
  border: 1px solid #c3c3c3;
  display: flex;
}

#main div:nth-of-type(1) {flex-grow: 1;}
#main div:nth-of-type(2) {flex-grow: 3;}
#main div:nth-of-type(3) {flex-grow: 1;}
#main div:nth-of-type(4) {flex-grow: 1;}
#main div:nth-of-type(5) {flex-grow: 1;}
```

![flex-grow](https://z3.ax1x.com/2021/12/02/oNaUKJ.png)

### flex-shrink：指定了 flex 元素的收缩规则

flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据`flex-shrink`的值。

```html
<div id="content">
  <div class="box" style="background-color:red;">A</div>
  <div class="box" style="background-color:lightblue;">B</div>
  <div class="box" style="background-color:yellow;">C</div>
  <div class="box1" style="background-color:brown;">D</div>
  <div class="box1" style="background-color:lightgreen;">E</div>
</div>
```

```css
#content {
  display: flex;
  width: 500px;
}

#content div {
  flex-basis: 120px;
  border: 3px solid rgba(0, 0, 0, .2);
}

.box { 
  flex-shrink: 1;
}

.box1 { 
  flex-shrink: 2; 
}
```

A、B、C 显式定义了`flex-shrink`为`1`

D、E 定义了`flex-shrink`为`2`

所以计算出来总共将剩余空间分成了`7`份，其中A、B、C占`1`份，D、E占`2`份，即`1:1:1:2:2`

父容器定义为500px，子项被定义为 20px，子项相加之后即为600px，超出父容器100px

那么超出的100px需要被A、B、C、D、E 消化通过收缩因子

所以加权综合可得：`100*1+100*1+100*1+100*2+100*2=700px`

于是我们可以计算 A、B、C、D、E 将被移除的溢出量是多少：

```
A 被移除溢出量：(100*1/700)*100，即约等于14px
B 被移除溢出量：(100*1/700)*100，即约等于14px
C 被移除溢出量：(100*1/700)*100，即约等于14px
D 被移除溢出量：(100*2/700)*100，即约等于28px
E 被移除溢出量：(100*2/700)*100，即约等于28px
```

最后A、B、C、D、E的实际宽度分别为：

120-14=106px, 120-14=106px, 120-14=106px, 120-28=92px,120-28=92px

此外，这个宽度是包含边框的。

![flex-shrink](https://z3.ax1x.com/2021/12/02/oNacxe.png)

### flex-basis：用于设置或检索弹性盒伸缩基准值

设置第二个弹性盒元素的初始长度为 80 像素：

```html
<div id="main">
  <div style="background-color:coral;"></div>
  <div style="background-color:lightblue;"></div>
  <div style="background-color:khaki;"></div>
  <div style="background-color:pink;"></div>
  <div style="background-color:lightgrey;"></div>
</div>
```

```css
#main {
    width: 350px;
    height: 100px;
    border: 1px solid #c3c3c3;
    display: -webkit-flex; /* Safari */
    display: flex;
}

#main div {
    -webkit-flex-grow: 0; /* Safari 6.1+ */
    -webkit-flex-shrink: 0; /* Safari 6.1+ */
    -webkit-flex-basis: 40px; /* Safari 6.1+ */
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 40px;
}

#main div:nth-of-type(2) {
    -webkit-flex-basis: 80px; /* Safari 6.1+ */
    flex-basis: 80px;
}
```

![flex-basis](https://z3.ax1x.com/2021/12/02/oNaWqA.png)

<RightMenu />