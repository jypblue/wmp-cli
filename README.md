# wmp-starter 脚手架打包依赖包

## 说明
1. 本项目是<a target="_blank" href="https://github.com/jypblue/wmp-starter">wmp-starter</a>脚手架打包配置的抽象包，主要用于<a target="_blank" href="https://github.com/jypblue/wmp-starter">wmp-starter</a>项目打包使用
2. 本仓库可以作为远程配置打包工具的案例，方便全局维护项目的打包配置，便于统一升级更新
3. 可以读取本地配置进行个性化操作，目前只支持几个简单特性：1.路径变量，2.全局环境变量
4. 后续想象空间：1.fork realywithoutname/mini-program-webpack-loader pr支持支付包等其它小程序类型（假设前提是app.json得路由规则基本一致的话，我认为可行）然后抽取对应的构建包，例如支付宝小程序就引入amp-cli这种模式

