
# 个人网站系统（前端）

这个项目由 [Angular CLI](https://github.com/angular/angular-cli)（版本：6.0.8）所生成。

## 运行项目

首先，你需要安装 [Node](https://nodejs.org/en/download/)，然后安装 Angular CLI：`npm install -g @angular/cli`。

在当前项目根目录下输入命令 `ng serve` 来运行开发环境，在浏览器输入 `http://localhost:4200` 来查看项目运行效果。如果你改变任何源文件，项目将会重新加载。

## 代码生成

输入命令 `ng generate component component-name` 生成新的组件，你还可以使用如下的命令：`ng generate directive|pipe|service|class|guard|interface|enum|module`。

## 项目结构

项目较为重要的文件结构，描述如下：

> e2e：端到端测试文件
> 
> src: 整个项目源文件
>> app：项目所有组件
>>> app-routing: 路由文件
>>>
>>> pages: 页面以及内部组件
>>>>
>>>> common: 可复用组件
>>>>
>>>> management: 管理系统
>>>>
>>>> page-not-found: 路由不匹配时显示的组件
>>>>
>>>
>>> services: 存放各种服务文件
>>>
>>> shared: 共享文件，如自定义指令、枚举、类
>>>
>>> route-strategy: 路由复用策略
>>>
>>
>> assets：静态资源文件
>>
>> environments：环境变量文件
>>
>>
>> favicon.ico：网页图标
>>
>> index.html：项目唯一的单页
>>
>> styles.less：全局样式
>
> angular.json：使用 Angular CLI 打包的配置文件
> 
> package.json：项目的配置以及依赖文件

## 打包构建

输入命令 `ng build` 构建项目，最终打包生成的文件将会存放在 `/dist` 文件夹下，使用 `--prod` 来在线上环境打包。

## 运行单元测试

输入命令 `ng test`，通过 [Karma](https://karma-runner.github.io) 运行单元测试。

## 运行端到端测试

输入命令 `ng e2e` ，通过 [Protractor](http://www.protractortest.org/) 运行端对端测试

## 帮助

如需获得更多关于 Angular CLI 的资料，输入 `ng help` 或者到 [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md) 查阅。