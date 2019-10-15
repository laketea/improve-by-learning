## plugin

webpack插件开发，webpack自身也是够贱在大量插件的基础之后，所以插件拥有非常强大的功能

## webpack插件配置

在配置文件中，配置plugins属性，并传入插件的实例

```
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```

如果是通过nodeapi调用webpack，可通过如下方式使用webpack

```
const webpack = require('webpack'); //访问 webpack 运行时(runtime)
const configuration = require('./webpack.config.js');

let compiler = webpack(configuration);

new webpack.ProgressPlugin().apply(compiler);

compiler.run(function(err, stats) {
  // ...
});
```

## tapable

webpack插件暴露的类，都是继承自tapable，我们先看看官方的例子，具体可以参考另外一片tapable的文档：

```
class Car {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(["newSpeed"]),
            brake: new SyncHook(),
            calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
        };
    }
}

const myCar = new Car();

myCar.hooks.brake.tap("WarningLampPlugin", () => warningLamp.on());
```

## 插件基本架构

插件的基本结构，在类的方法或者函数的原型或上提供apply函数，webpack默认会给apply函数传入compiler参数, 通过compiler的钩子注册订阅函数，可以实现非常多的工作。

上面已经讲过tapable, compiler继承成tabpable，提供了丰富的hook

```
class MyExampleWebpackPlugin {

  constructor(options){
  }
  
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'MyExampleWebpackPlugin',
      (compilation, callback) => {
        callback();
      }
    );
  }
}
```


