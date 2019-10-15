# git message格式化以及changelog

主要参考 [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

下面主要罗列一下相关的内容：

## message格式规范

参考上面提到的文档即可

## Commitizen

cz是一个commit相关的命令行工具

cz本身只是一个工具，可以根据需求设置不同的adapters,也就是不同格式的message要求。

默认是推荐使用 cz-converntional-changelog, 也就是angular风格的commit message规范。

全局安装cz工具

```
npm install -g commitizen
```

在当前项目下初始化cz相关配置

```
commitizen init cz-conventional-changelog --save-dev --save-exact
```

初始化成功后，可以在package.json中看到如下配置：

```
...
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
```

## commitlint

commitlint是一个 commit message检查工具

### 本地检查

安装commitlint工具，并初始化风格配置文件

```
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

为了减少项目中的配置文件，建议将config的配置写入到package.json文件中

```
"commitlint": { 
   "extends": [ 
     "./@commitlint/config-conventional", 
   ] 
 }, 
```

为了支持git hook,建议使用husky来实现prev commit的检查

```
npm install --save-dev husky
```

配置hooks

```
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }  
  }
}
```

### ci集成

CI集成的基础是必须先完成本地的配置，然后参考如下：

```
npm install --save-dev @commitlint/travis-cli
```

配置travis.yaml文件

```
# travis.yml
language: node_js
script:
  - commitlint-travis
```

## conventional-changelog

cc是自动生成changelog的工具, 使用方式参考如下：

```
npm install conventional-changelog

{
  "scripts": {
    "version": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0 "
  }
}
```

跟上面的工具一样，cc一样是需要配置preset，根据preset规则来生成changelog的，cc默认集成的是angular风格的preset

## standard-version
 
我们先来看看使用cc工具的工作流程：

 1. 修改文件
 2. 提交commit
 3. 修改package.json
 4. 执行cc命令，生产changelog
 5. commit package.json 以及changelog
 6. 打对应的tag
 7. push
 8. 

在真正的发布过程中，changelog只是其中一小部，所以官方在cc的基础上，开发了standard-version来完成整个流程的操作, 使得发布的流程更加快捷

**安装**

```
npm i --save-dev standard-version

{
  "scripts": {
    "release": "standard-version"
  }
}
```

**使用**
我们再来看看version具体做了哪些事情

- 修改package.json文件中的版本, 这个地方非常智能， 自动根据changelog中的commit来判断major、minor、fix升级，严格遵循sem规范
- 使用cc来更新changelog.md, 目前发现一个bug, commit的link仍然指向github，并且根据公司的需求，需要加上jira的链接
- 自动commit package.json以及changelog.md
- 创建一个新的tag

vresion默认会自动处理version版本好，也支持release的时候制定版本号

```
npm run release --release-as 1.1.0 升级制定版本好
npm run release --release-as minor 升级制定的子版本
npm run release --prerelease alpha/beta等 发布非正式版本
```

除此之外，version还提供了scripts生命周期机制，提供扩展：

- prerelease
- perbump
- rechangelog
- precommit
- pretag

## 



