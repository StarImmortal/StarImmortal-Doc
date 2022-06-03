---
title: Vue
---

:::tip
本专栏介绍Vue框架结合ElementUI等常用组件库的奇技淫巧，让你解放双手，提高开发效率！
:::

## Vue + Element UI 中国省市区数据三级联动

### 安装数据

```js
npm install element-china-area-data
```

### 页面引入

```js
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
```

### 参数说明

- provinceAndCityData：省市二级联动数据（不带“全部”选项）
- regionData：省市区三级联动数据（不带“全部”选项）
- provinceAndCityDataPlus：省市区三级联动数据（带“全部”选项）
- regionDataPlus：省市区三级联动数据（带“全部”选项）
- "全部"选项绑定的value是空字符串""
- CodeToText：属性是区域码，属性值是汉字

:::tip
CodeToText['110000'] = 北京市
:::

- TextToCode：属性是汉字，属性值是区域码

:::tip
TextToCode['北京市'].code = 110000

TextToCode['北京市']['市辖区'].code = 110100

TextToCode['北京市']['市辖区']['朝阳区'].code = 110105
:::

### 示例代码

- 省市二级联动（不带“全部”选项）:

```Html
<template>
  <div id="app">
    <el-cascader
      size="large"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader>
  </div>
</template>
 
<script>
  import { provinceAndCityData } from 'element-china-area-data'
  export default {
    data () {
      return {
        options: provinceAndCityData,
        selectedOptions: []
      }
    },
 
    methods: {
      handleChange (value) {
        console.log(value)
      }
    }
  }
</script>
```

- 省市二级联动（带“全部”选项）:

```Html
<template>
  <div id="app">
    <el-cascader
      size="large"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader>
  </div>
</template>
 
<script>
  import { provinceAndCityDataPlus } from 'element-china-area-data'
  export default {
    data () {
      return {
        options: provinceAndCityDataPlus,
        selectedOptions: []
      }
    },
 
    methods: {
      handleChange (value) {
        console.log(value)
      }
    }
  }
</script>
```

- 省市区三级联动（不带“全部”选项）

```Html
<template>
  <div id="app">
    <el-cascader
      size="large"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader>
  </div>
</template>
 
<script>
  import { regionData } from 'element-china-area-data'
  export default {
    data () {
      return {
        options: regionData,
        selectedOptions: []
      }
    },
 
    methods: {
      handleChange (value) {
        console.log(value)
      }
    }
  }
</script>
```

- 省市区三级联动（带“全部”选项）

```Html
<template>
  <div id="app">
    <el-cascader
      size="large"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader>
  </div>
</template>
 
<script>
  import { regionDataPlus } from 'element-china-area-data'
  export default {
    data () {
      return {
        options: regionDataPlus,
        selectedOptions: []
      }
    },
 
    methods: {
      handleChange (value) {
        console.log(value)
      }
    }
  }
</script>
```

### 在线演示地址](https://plortinus.github.io/element-china-area-data/index.html)

<RightMenu />