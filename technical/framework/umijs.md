# umi


umi相关的包非常多，所以我们先从入口来熟悉各个包的作用。


## 插件体系

## packages/umi

umi-cli提供主要的命令如下：

- generate
- dev
- build
- others

在cli中，所有的命令都是调用umi-build-dev/lib/Service文件来处理

```
const Service = require('umi-build-dev/lib/Service').default;
new Service(buildDevOpts(args)).run('dev', args);
```

回过头来看看umi，除了提供cli命令之外，还提供一些通用的第三方库的包装接口, 像umi-test、router、

## packages/umi-build-dev

/src/Service.js

提供服务类，cli每个工具都会创建一个service，并执行run方法，去执行对应的command
service主要用来处理生命周期 以及初始化工作。

执行dev，会收集并解析所有的router信息，并创建.umi文件夹，.umi文件夹里面包含你所看不到的一些内容，比如，dva启动、router、history文件等


## 功能

### 约定式路由

通过启动时，从已有源码目录中解析

### 开发启动快



### IE9兼容

### DVA融合

### 支持多页应用




