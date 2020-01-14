# hot-module-replacement

常用简写HMR, hrm也是常说的热更新，也就是开发阶段不需要刷新浏览器，即可更新模块，能够较大的提升开发效率。
hmr的概念，在web中比较常见，目前已经推广了native阔端开发平台，比如react-native & fluuter, 我们可以理解这已经是现代开发模式的标配了。

## webpack hmr 配置

webpack已经内置hmr功能，需要通过配置开启

- devServer配置中，设置hot = true
- 配置webpack内置插件 webpack.HotModuleReplacementPlugin

```
const path = require('path');
+ const webpack = require('webpack');

  module.exports = {
    entry: {
+      app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
+     hot: true
    },
    plugins: [
+     new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```


如果是通过nodejs调用webpack:

```
const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};


webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
```


## webpack hot api

webpack hmr 只是提供热替换的机制，也就是在webpack模块树中替换对应的模块，但是新模块的执行时机仍然需要应用层进行控制，应用层可以提供hot api

```
if (module.hot) {
    module.hot.accept('./print.js', function() {
    // do something..
})
```

具体可参考：https://webpack.docschina.org/api/hot-module-replacement

## hmr 应用

实际开发中，除了开启webpack hmr开关，仍然需要通过hot api来执行热更新的代码以达到真正的热更新，下面说明下常见模块的实现方案：

### css

style-loader & css-loader 已经自动集成

### react-hot-loader

### react-router

### dva-hot-loader




