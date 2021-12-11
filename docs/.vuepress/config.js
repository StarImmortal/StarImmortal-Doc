module.exports = {
  title: "StarImmortal",
  evergreen: false,
  host: "localhost",
  port: 3000,
  base: "/",
  dest: "./dist",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3683d6" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
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
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: {
          message: "有新内容啦~",
          buttonText: "刷新",
        },
        generateSWConfig: {
          importWorkboxFrom: "local",
        },
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
  ],
  themeConfig: {
    docsDir: "docs",
    // 导航栏Logo
    logo: "/assets/img/left-logo.png",
    // 页面滚动
    smoothScroll: true,
    // 导航栏
    nav: [
      { text: "首页", link: "/" },
      { text: "微信小程序", link: "/wechat/" },
      { text: "学习笔记", link: "/notes/" },
      { text: "常用命令", link: "/command/" },
      { text: "奇技淫巧", link: "/skill/" },
      { text: "常见问题", link: "/question/" },
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
            "operation/gitlab"
          ],
        },
        {
          title: "计算机基础",
          children: [
            "/notes/basic/",
            "basic/development-tools",
            "basic/idea",
            "basic/maven",
            "basic/data-structure",
            "basic/algorithm",
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
            "middleware/nginx",
            "middleware/elasticsearch",
            "middleware/rocketmq"
          ]
        }
      ],
    },
  },
};
