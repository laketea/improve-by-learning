# lazyloading

- webpack lazyloading 配置以及实现
- dva lazyloading 支持
- umi lazyloading 支持


## webpack lazyloading

webpack 提供code splitting功能，可以将代码分离到不同的bundle中

本质上是提供了两种方式配置代码分离：

**通过entry配置多个入口分离**

```
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
+   another: './src/another-module.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

通过entry多个入口，打出的多个bundle之间会存在重复模块，可以通过SplitChunksPlugin插件，将多个entiry之间重复的模块，提取到独立的chunk中，以解决重复模块的问题。


```
const path = require('path');

  module.exports = {
    mode: 'development',
    entry: {
      index: './src/index.js',
      another: './src/another-module.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   optimization: {
+     splitChunks: {
+       chunks: 'all'
+     }
+   }
  };
```


**动态引入dynamic import**

以import() 为入口，将依赖的资源一起作为一个chunk
也可以通过require.ensure

webpack添加chunkFileName配置：

```
const path = require('path');

  module.exports = {
    mode: 'development',
    entry: {
+     index: './src/index.js'
    },
    output: {
      filename: '[name].bundle.js',
+     chunkFilename: '[id].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
  };

```


使用的时候通过import()引入
```
+ function getComponent() {

+   return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: 
+     var element = document.createElement('div');
+
+     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+
+     return element;
+
+   }).catch(error => 'An error occurred while loading the component');
  }
+ getComponent().then(component => {
+   document.body.appendChild(component);
+ })
```
 
上面这个例子，因为在程序初始化的时候就会调用import(), 固基本只实现代码分割的效果，而对于lazyloading，是期望在需要的时候再去加载，我们稍微修改下例子就可以看到效果：

```
+ import _ from 'lodash';
+
+ function component() {
    var element = document.createElement('div');
+   var button = document.createElement('button');
+   var br = document.createElement('br');

+   button.innerHTML = 'Click me and look at the console!';
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.appendChild(br);
+   element.appendChild(button);
+
+   // Note that because a network request is involved, some indication
+   // of loading would need to be shown in a production-level site/app.
+   button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
+     var print = module.default;
+
+     print();
+   });

    return element;
  }

+ document.body.appendChild(component());
```

上面的例子，仅在按钮点击的时候，执行import(), 在这个时候会去加载分割的代码。

所以，可以看看lazyloading，基本是依托import()来实现，import()不仅决定代码分割的分离点，也决定了lazyloading的加载时机。

> 这里存在一个问题，由于加载的时机，在import代码执行处，故如果加载时机较长如何处理？如果统一添加效果？
> 


## react lazyloading

提供了 loadable component，屏蔽细节以及处理服务端渲染相关的问题
## prefetch & preload






