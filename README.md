# case-management-fe

case-management-fe 这是一个经侦案件管理系统

## 分支

- master：生产分支（新版本基于 master 新建）
- dev：开发分支（也可用版本号替代）
- feat：功能分支（根据议题号新建）

## 代码提交流程

- 创建功能议题并基于 master 创建分支
- dev：开发分支（也可用版本号替代）
- 测试完成后，将该分支合并至 master 发布至正式版

## 启动流程

- 正式版将 master 代码拉去下来
- 安装依赖 pnpm install (npm 或yarn)
- 启动项目 pnpm run dev  (npm 或yarn)
- 运行成功，可以正式访问  http://localhost:8086/

## 发布流程

- 正式版将 master 代码运行 pnpm run build(或者npm) 打包成静态文件dist目录下
- 将代码上传到服务器，nginx配置代理请求包括后端接口代理
- 发布成功，可以正式访问

## 页面划分

- 首页(主页): views/home
- 登陆页: views/Login
- 欢迎页面: views/Welcome
- 案件管理页面: views/cases/index
- 页面详情: views/cases/caseDetails/index

## 项目目录

- doc: 数据库以及文档整理之前用的是mongodb数据库
- api: 请求封装（按页面）
- assets: 静态资源
- components: 组件（按页面 or 按模块）
- config: 环境变量配置
- router: 路由文件
- views: 页面
- utils: 公用方法
  - storage: 持久化存储
  - request: 统一请求
  - util: 纯工具方法
- .eslintignore: eslint 检测忽略  暂未创建
- .eslintrc.js: eslint 配置  暂未创建
- .gitignore: git 提交忽略
- .prettierignore: prettier 忽略 暂未创建
- .prettierrc.js: prettier 配置 暂未创建
- .commitlint.config.js: commitlint 配置  暂未创建
- .lint-staged.config.js: lint-staged 配置 暂未创建
- app.vue: 视图根入口文件
- main.js: 程序入口文件
- vite.config.js vite配置文件


