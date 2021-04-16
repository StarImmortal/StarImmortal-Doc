---
home: true
heroText: StarImmortal：Hi Friends!
tagline: 凡心所向，素履以往，生如逆旅，一苇以航
# actionText: 快速上手 →
# actionLink: /zh/guide/
# features:
# - title: 简洁至上
#   details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
# - title: Vue驱动
#   details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
# - title: 高性能
#   details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
# footer: MIT Licensed | Copyright © 2021-present William Young
---

<template>
    <div class="container">
      <div class="wave"><span>👋</span></div>
        <div class="footer">
          MIT Licensed | Copyright © 2021&nbsp;&nbsp;
          <a
            href="http://www.beian.miit.gov.cn"
            target="_blank"
            rel="nofollow me noopener noreferrer"
          >
          苏ICP备20038845号-3
          </a>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        content: ""
      }
    },
    mounted() {
      this.loadSentence()
    },
    methods: {
        loadSentence: function() {
          const jinrishici = require('jinrishici');
          jinrishici.load(result => {
            this.content = result.data.content
          }, err => {
            console.log("error");
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '/assets/font/font.css';

.container {

  .wave {
    font-size: 120px;
    position: relative;
  }

  span {
    transform: translate(-50%, 0) rotate(-10deg);
    transform-origin: 100% 100%;
    left: 50%;
    display: block;
    position: absolute;
    animation: wave 350ms ease-in-out infinite alternate;
  }

  @keyframes wave {
    0% {
      transform: translate(-50%, 0) rotate(15deg);
    }
    100% {
      transform: translate(-50%, 0) rotate(-10deg);
    }
  }

  .footer {
    position: absolute;
    bottom: 0;
    transform: translate(-50%, -50%);
    left: 50%;
    clear:both;
    border-top: none;
  }
}
</style>