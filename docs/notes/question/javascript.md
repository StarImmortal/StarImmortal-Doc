---
title: JavaScript
---

:::tip
本专栏介绍JavaScript常遇到的一些错误问题，让你避免踩雷，节省开发时间！
:::

## splice方法删除元素被跳过或只删除部分元素

问题说明：

对数组遍历，使用 splice 方法移除符合条件的元素。由于 splice 方法改变原数组的长度，但循环中 i 仍然读取原始数组长度，造成跳过或只删除数组中符合条件的部分元素。

1. 方案一

实时同步索引法。对数组遍历，当对符合条件的元素执行 splice 方法，进行 i-- 操作，使读取的索引跟 splice 后的数组同步。

```javascript
const studentList = [
  { name: 'Tom', grade: 55 },
  { name: 'Jane', grade: 59 },
  { name: 'Murphy', grade: 80 }
]

for(let i = 0; i < studentList.length; i++) {
  if (studentList[i].grade < 60) {
    studentList.splice(i, 1)
    i--
  }
}
```

2. 方案二

倒序遍历法。因 splice 方法会直接操作原数组，导致数组宽度变小，后面的元素往前推。因此，从后往前读取，无论是否满足删除条件，每次循环都是读取到正确的数组项值。

```javascript
const studentList = [
  { name: 'Tom', grade: 55 },
  { name: 'Jane', grade: 59 },
  { name: 'Murphy', grade: 80 }
]

for(let i = studentList.length - 1; i >= 0; i--) {
  if (studentList[i].grade < 60) {
    studentList.splice(i, 1)
  }
}
```

3. 方案三

filter 代替法。与 splice 方法不同，filter 方法并不会更改原数组，而是满足条件的元素组成一个新数组返回。

```javascript
const studentList = [
  { name: 'Tom', grade: 55 },
  { name: 'Jane', grade: 59 },
  { name: 'Murphy', grade: 80 }
]

const goodStudentList = studentList.filter(student => {
  return student.grade > 60
})
```

<RightMenu />