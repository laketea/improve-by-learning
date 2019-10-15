# lerna
learn 是monorepos思想的一种体现，方便管理多package项目

lerna有两种模式：

- fixed模式，所有模块使用单一的single verion？
- independent模式，格子独立发布

## 安装

```
npm install --global lerna
```

## 初始化

```
lerna init lerna-repo && cd lerna-repo
```

lerna有两种模式：

- fixed模式，所有模块使用单一的single verion, 大部分monorepo仍然采用此类方式
- independent模式，所有的子模块使用独立的版本

fixed模式，大部分还是适合开源项目，班车发布的模式
fixed模式，在publish的时候，会将改动的模块以及以来的模块统一发新版本

## 创建子包

```
lerna create module-a
```

在项目中创建module-a packages


## 安装依赖
默认给所有的packages安装依赖

```
leran add jquery
```

如果指定scope参数，则只安装到某个固定的package，

```
lerna add module-1 packages/prefix-*

# Install module-1 to module-2
lerna add module-1 --scope=module-2

# Install module-1 to module-2 in devDependencies
lerna add module-1 --scope=module-2 --dev
```

?? 关联的模块是否需要安装？
?? add除了安装到所有子模块，是否有link的处理？
?? 主项目的安装，如何？只能在根目录，使用npm install?

## 启动
安装所有子包的依赖，并执行互相的link
在所有子包中执行，prepublish, prepare ?？ 有何作用？

根据理解，就是在clone项目的时候，执行boostrap
```
lerna bootstrap
```

## 在每个包下面执行命令

```
lerna exec -- rm -rf ./node_modules
```

## 查看代码改动

```
lerna diff
```

查看自上次release后，所有包的代码diff

## 查看自上一次release tag的改动的包列表

```
lerna changed
```

## link所有包

将所有的子包互相link
```
lerna link
```
版本不一样是否会？？

## 获取所有的包列表

```
leran list
```

## 升级版本并commit以及push

version会处理如下几个步骤：

1. 标记从上次发布的tag起，有哪些包修改过
2. 提示用户选择version
3. 修改package中的version
4. 将上面的改动提交commit,并打tag
5. push 代码到远程


```
lerna version 弹出选择，来提示
lerna version 1.0.1 升级指定版本
lerna major/minor/patch， 升级指定sem版本号
```

?? indep模式下，如何处理？

如何处理changelog

```
lerna version --conventional-commits --no-push
```

调用cc来生产changelog

??indep模式下，如何处理？

> 适用--conventional-commits,参数会自动扫描所有的代码，并检查出改动的模块，针对每个模块生产changelog

git version 默认会触发push操作(—no-push可以ignore)

如何只version单个package？

通过--no-publish可以指定某个packge，但是不能自动生成changelog

也就是说version不能针对单个package单独处理，只能在分支管理上考虑了，在主分支上面开发，必须功能开发完成之后再发版本

## 发布项目

发布项目存在下面几种可能：

1. 发布自上次release之后改动的模块
2. 发布当前commit的tag
3. 发布
2. 





lenra version：

主要是检查tag，是否有待发布的commit，如果当前tag之后没有commit，则会报错

version之后会自动提交tag，并push

version 三种模式：

- 制定版本
- semver-keyword  ( [major | minor | patch | premajor | preminor | prepatch | prerelease])
- 提示选择

注意：
git version 默认会触发push操作(—no-push可以ignore)， ~考虑是否会影响现有的工作流程？~
—skip-git 会忽略添加git-tag 以及 push;

~changelog合适生成?~

lerna publish： 貌似不成功

init, 初始化一个lerno项目
add，默认给所有package添加一个依赖
bootstrap，安装所有依赖，并执行link
clean，移除所有package下的node_mdoules目录
exec，在package 下执行npm scripts



## fixed模式
version 只更改



#学习