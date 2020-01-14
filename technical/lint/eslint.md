# eslint

## 配置

【parser】

eslint解析器，默认为Espree, 目前支持的parsers如下:

- esprima
- babel-eslint
- @typescrpt-eslint/parser

如何创建解析器？ 需要是独立的npm模块，且需要符合 [custom-parser](https://cn.eslint.org/docs/developer-guide/working-with-plugins#working-with-custom-parsers) 接口规范

应用最多的应该是babel-eslint & typescript-eslint


【parserOptions】

用来制定语言解析的一些配置项目

```
{
    "parserOptions": {
        "ecmaVersion": 6, // js语言版本
        "sourceType": "module", // 模块类型
        "ecmaFeatures": {
            "jsx": true // jsx
            "globalReturn": ture,
            impliedStrict: strict mode
        }
    },
}
```

> parserOptions与plugin配置的关系？


【processor】

处理器？感觉是针对其他语言的，并且需要plugin的支持
如果这样是否可以制定markdown的eslint规范？

【env】

制定特定的环境，会默认开启对应的全局变量，常用的 browser, es6, node, jquery等

【global】

可以在对应文件的开头用注释制定，也可以在配置文件重制定。

```
/* global var1, var2 */

or

{
    "globals": {
        "var1": "writable",
        "var2": "readonly"
    }
}
```

【插件开发】

【rules】

规则配置，可以在配置中间重设置，也可以在文件中针对特定行，使用注视配置

【setting】

主要用于自定义的rules, 方便统一配置参数

【配置文件】
配置文件支持多种格式，建议使用.eslintrc or .eslint.js
支持一个项目中，多份eslint配置文件，优先查找当前以及父节点中，最靠近当前文件的eslint配置文件。

> 特殊场景下，可以在项目中设置多个eslint配置，比如旧项目的改造等等


【extends】

支持继承其他的规则集，
其值可以是：
- 指定配置的字符串(配置文件的路径、可共享配置的名称、eslint:recommended 或 eslint:all)
- 字符串数组：每个配置继承它前面的配置

使用rules时，如果rules与extends的规则及，命名一样，则递归扩展。

## 如何编写share configuration package?

可使用eslint init 生成一个scpm模版，需要具备如下规则：

- package name 需要是eslint-config-xxx or @scope/eslint-config-xxx
- package需要export eslint配置对象

如果想share multiple configs, 可以指定包中的文件

比如: eslint-config-xxx/typescript 

## 如何编写插件？



## 如何集成typescript?



