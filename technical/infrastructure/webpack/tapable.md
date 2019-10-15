## tapable

参考：https://juejin.im/post/5abf33f16fb9a028e46ec352

在熟悉webpack插件机制之前，先了解tapable， tapbale是一个轻量的插件体系，也类似事件机制
tapable本身是一种事件流的机制，配合webpack实现插件机制，主要是将各个插件串联起来。
webpack的核心类都是他判了的实例。


tapbale提供多种类型的钩子，方便控制插件的执行以及参数传递的流程

```
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
 } = require("tapable");

```

各个hook区别如下：

- SyncHook, 同步串行
- SyncBailHook, 同步串行，只要有一个函数的返回值不为null，则跳过剩下所有的逻辑
- SyncWaterfallHook， 同步串行，上一个函数的返回值会传递给下一个函数
- SyncLoopHook， 同步循环， 一般只会有一个钩子函数，如果返回true则循环执行，直到返回undefined
- AsyncParallelHook， 异步并发
- AsyncParallelBailHook，异步并发
- AsyncSeriesHook 异步串行
- AsyncSeriesBailHook， 异步串行，callback()的参数不为null，就会直接执行callAsync等触发函数绑定的回调函数
- AsyncSeriesWaterfallHook，异步串行，上一个监听函数的中的callback(err, data)的第二个参数,可以作为下一个监听函数的参数

**参数**

如果需要在发布的时候传递参数，则定义钩子函数的时候，就需要传入参数定义

```
const hook = new SyncHook(["arg1", "arg2", "arg3"]);
hook.tap('name', arg1, arg2, arg3)
```


### 同步hook

- tap 订阅事件
- call 发布事件

```
const { SyncHook } = require("tapable");

// 订阅
queue.tap('1', function (name) {// tap 的第一个参数是用来标识订阅的函数的
    console.log(name, 1）;
    return '1'
});

// 发布
queue.call('webpack');// 发布的


### 异步hook

异步hook 有三种订阅/发布模式：

- tap/ callAsync, 在订阅函数内部，不需要调用cb
- tapAsync/ callAsync, 在订阅函数内部无返回值，需调用cb来表示并传递返回值(callback模式)
- tapPromise/ promise，订阅函数需返回promise对象

