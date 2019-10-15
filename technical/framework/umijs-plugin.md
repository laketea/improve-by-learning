# umijs-plugin

---

## 插件开发

```
export default (api, opts) => {
  // your plugin code here
};
```

所有的插件接口都在api上面，opts是传递给插件的参数，api接口包含如下几部分：


- 环境变量
- 系统级变量
- 工具类api, 例如：log,debug等
- 系统级api, 例如：registerMethod, restart, registerCommand等
- 事件类api, 例如：onStart, onBuildSucess等
- 应用类api, 例如：addHtmlLink，addHTMLStyle等

所以通过以上可以看到，插件可以具备非常丰富的能力，注册command，注册系统级api,以及构建各个过程中的控制等等。


## 插件体系

通过上面了解了插件的开发方式，下面来了解umi的插件体系，以及内置插件，这块应该也是umi最核心的部分。

**调用命令**

所有的命令，都是通过创建并调用service来实现，所以service应该是umi核心的一个服务
```
new Service(buildDevOpts(args)).run(aliasMap[script] || script, args);
```

### Service

**构造函数**

构造函数，主要处理一些内部变量的初始化，这里面主要包含两部分：

- 初始化用户配置，主要通过config/config.js, umi.rc.js文件来读取
- 初始化插件，通过内置以及项目配置的插件，进行merge并require获取插件的apply函数，注意这里只要获取apply函数，并没有真正的执行或者说注册插件。


> resolve path, 这里可以看到内置的一些文件，都是通过模版规则来生成，这点以后可以借鉴
> 初始化插件，默认配置builtInPlugins, 命名以及处理方式均可借鉴，默认将内置插件以及用户插件，这样不使用的用户不需要获取builtInPlugins

**run函数**

run函数是command执行的入口，我们来看看具体做了哪些工作。

先执行init方法：

- loadEnv, 读取./.evn 以及 ./.env.local 中的变量，并配置到process.env[key] 上面
- initPlugins,
- 读取以及获取用户配置

initPlugin 设计比较巧妙，

通过PluginApi 代理并创建api对下，这个api其实是操作service的this.service.pluginMethods以及this.service.pluginHooks

pluginMethods 以及 pluginapi中的实例方法，就是实际api中真正调用的函数
pluginsHooks，所有的on/add/modify/after等hooks 都是存在这个上面，每次调用pluginMethods中的对应函数(hooks相关)，就会将hook存入这个内部变量中

这里的pluginapi 以及proxy，较为良好的配合实现api的机制，这里service只负责核心逻辑，api以及proxy配合作为代理实现api所有的功能，可以借鉴。


### 内置插件

```
    './plugins/commands/dev',
    './plugins/commands/build',
    './plugins/commands/inspect',
    './plugins/commands/test',
    './plugins/commands/help',
    './plugins/commands/generate',
    './plugins/commands/rm',
    './plugins/commands/config',
    './plugins/commands/block',
    // './plugins/commands/ui',
    './plugins/commands/version',
    './plugins/global-js',
    './plugins/global-css',
    './plugins/base',
    './plugins/mountElementId',
    './plugins/mock',
    './plugins/proxy',
    './plugins/history',
    './plugins/afwebpack-config',
    './plugins/mountElementId',
    './plugins/404', // 404 must after mock
    './plugins/targets',
    './plugins/importFromUmi',
```

从上面的插件的功能来看，一边先注册config，然后执行真正的功能代码






