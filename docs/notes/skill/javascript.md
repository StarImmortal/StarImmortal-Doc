---
title: JavaScript
---

:::tip
本专栏介绍JavaScript常用的奇技淫巧，让你解放双手，提高开发效率！
:::

## 判断数组中某个元素是否存在

1. indexOf()：返回索引，大于0则存在，-1则不存在

```js
const array = ['apple', 'banance', 'orange']

array.indexOf('apple') --> 0：存在

array.indexOf('strawBerry') --> -1：不存在
```

2. find()：找出第一个符合条件的数组元素，存在则返回该元素，如果不存在，就返回undefined

```js
const array = ['apple', 'banance', 'orange']

array.find(arr => arr === 'banance') --> banance：存在

array.find(arr => arr === 'strawBally') --> undefined：不存在
```

```js
[1, 5, 15, 20, 25].find((value,index,arr) => { return value > 20 })
```

```js
const arrayList = [{name: '张三'}, {name: '李四'}]

arrayList.find(obj => obj.name === '李四') --> {name: '李四'}：存在

arrayList.find(obj => obj.name === '王五') --> undefined：不存在
```

3. findIndex()：返回第一个符合条件的数组元素的位置，如果所有的元素都不符合条件，就返回-1

```js
const array = ['apple', 'banance', 'orange']

array.findIndex(arr => arr === 'banance') --> 大于0：存在

array.findIndex(arr => arr === 'strawBally') --> -1：不存在
```

4. includes()：返回值为布尔类型（note：ie不太兼容，慎用）

```js
const array = ['apple', 'banance', 'orange']

array.includes('banance') --> true：存在

array.includes('strawBally') --> false：存在
```

5. filter()：返回一个数组

```js
const array = ['apple', 'banance', 'orange']

array.filter(obj => obj == 'orange') --> ['orange']：存在

array.filter(obj => obj == 'strawBally') --> []：不存在
```

```js
const array = [{ name: 'banance' }, { name: 'apple' }]

console.log(array.filter(obj => obj.name === 'apple')) --> [{name: 'apple'}]：存在

console.log(array.filter(obj => obj.name === 'strawBally')) --> []：不存在
```

## 获取视屏时长

```js
getVideoDuration(file){
  return new Promise((resolve,reject)=>{
    const url = URL.createObjectURL(file)
    const audioElement = new Audio(url)
    audioElement.addEventListener("loadedmetadata",() => {
      const duration = parseInt(audioElement.duration)
      if(duration > this.duration){
        this.$message.warning('仅支持20秒以内的视频哦')
        this.uploadGoOn=false
        reject()
      }
      resolve()
    })
  })
},
```

<RightMenu />