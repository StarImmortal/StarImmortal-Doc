const highlight = require('./public/js/highlight')

module.exports = {
  title: "StarImmortal",
  evergreen: false,
  host: "localhost",
  port: 3000,
  base: "/",
  dest: "./dist",
  head: [
    [
      'script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?e99638603a0e17494686de24484ab5b3";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
      `
    ],
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3683d6" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
    ["link", { rel: "apple-touch-icon", href: "/favicon.ico" }],
    ["meta", { name: "msapplication-TileImage", content: "/favicon.ico" }],
    ["meta", { name: "msapplication-TileColor", content: "#3683d6" }],
  ],
  locales: {
    "/": {},
  },
  plugins: [
    "@vuepress/medium-zoom",
    "@vuepress/back-to-top",
    [
      "vuepress-plugin-code-copy",
      {
        align: "bottom",
        color: "#3963bc",
        successText: "复制成功~",
      },
    ],
    [
      "sakura",
      {
        num: 20,
        show: true,
        zIndex: -1,
        img: {
          replace: false,
          httpUrl: "",
        },
      },
    ],
    [
      'copyright',
      {
        // 作者名称
        authorName: 'StarImmortal团队',
        // 触发剪贴板组件或 noCopy 效果的最小文本长度
        minLength: 30
      },
    ],
    [
      'dynamic-title',
      {
        showIcon: '/favicon.ico',
        showText: '客官欢迎回来~',
        hideIcon: '/failure.ico',
        hideText: '客官不要走嘛~',
        recoverTime: 2000,
      }
    ],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          message: '有新内容啦~',
          buttonText: '刷新'
        },
        generateSWConfig: {
          importWorkboxFrom: 'local'
        }
      }
    ]
  ],
  chainMarkdown (config) {
    config
      .options
      .highlight(highlight)
      .end()
  },
  themeConfig: {
    docsDir: "docs",
    // 导航栏Logo
    logo: "/assets/image/left-logo.png",
    // 页面滚动
    smoothScroll: true,
    // 导航栏
    nav: [
      { text: "首页", link: "/" },
      { text: "微信小程序", link: "/wechat/" },
      { text: "学习笔记", link: "/notes/" },
      { text: "常用命令", link: "/command/" },
      { text: "GitHub", link: "https://github.com/StarImmortal" },
    ],
    docsRepo: "StarImmortal/StarImmortal-Dos",
    // 最后更新时间
    lastUpdated: "上次更新",
    // 作者
    author: "william",
    // 备案号
    record: "苏ICP备20038845号-3",
    // 项目开始时间
    startYear: "2021",
    editLinks: true,
    editLinkText: "纠正错误",
    // 自动生成侧栏
    // sidebar: "auto",
    sidebar: {
      "/notes/": [
        {
          title: "后端笔记",
          children: [
            "/notes/server/",
            "server/java",
            "server/python",
            "server/c-sharp",
          ],
        },
        {
          title: "前端笔记",
          children: [
            "/notes/client/",
            "client/css",
            "client/vue-basic",
            "client/vue-press",
          ],
        },
        {
          title: "运维笔记",
          children: [
            "/notes/operation/",
            "operation/server-deployment",
            "operation/docker-server-deployment",
            "operation/docker",
            "operation/gitlab",
          ],
        },
        {
          title: "奇技淫巧",
          children: [
            "/notes/skill/",
            "skill/github",
            "skill/css",
            "skill/javascript",
            "skill/mysql",
            "skill/spring-boot",
            "skill/vue",
            "skill/wechat-mini-program"
          ],
        },
        {
          title: "常见问题",
          children: [
            "/notes/question/",
            "question/npm",
            "question/yarn",
            "question/maven",
            "question/css",
            "question/javascript",
            "question/mysql",
            "question/mybatis",
            "question/spring-boot",
            "question/wechat-mini-program"
          ],
        },
        {
          title: "计算机基础",
          children: [
            "/notes/basic/",
            "basic/development-tools",
            "basic/shortcut-key",
            "basic/data-structure",
            "basic/algorithm",
            "basic/regex"
          ],
        },
        {
          title: "数据库",
          children: [
            "/notes/database/",
            "database/mysql",
            "database/redis",
            "database/mongodb",
            "database/mysql-specification",
          ],
        },
        {
          title: "中间件",
          children: [
            "/notes/middleware/",
            "middleware/maven",
            "middleware/nginx",
            "middleware/elasticsearch",
            "middleware/rocketmq"
          ]
        }
      ],
    },
  },
};
