# lint tools

列举下lint相关的一些工具：

- prettier
- lint-stage
- commitlint
- stylelint
- husky


## husky

用于添加本地git hooks

```
npm install husky

{
    husky: {
      "hooks": {
        "pre-commit": "npm test",
        "commit-msg": "do something",
      }
    }
}
```


## commitlint

commitlint校验commit message格式

@commitlint/cli 校验工具
@commitlint/config-conventional angular风格msg校验规则

```
npm install --save-dev @commitlint/{config-conventional,cli}
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    } 
  }
}

```

如果需要更改校验规则，提供shared configuration package, 需要参考：

[config-conventional](https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional/index.js) 

也可以直接在commitlint.config.js下面配置rules

## lint-stage

```
npm install --save-dev lint-staged // 9.x
{
  "lint-staged": {
    "**/*.{js,jsx,tsx,ts,less,md,json}": [..]
  }
}
```


## prettier

prettier vs linter ?

linter一般包含两种rules: 格式化rule, 代码质量rule.

pretterier 主要解决代码风格问题，自动格式化，更彻底


配置，支持多种方式，package.json:prettier or .prettierrc.js
支持对不同的files，使用不同的配置项

另外prettier也支持shared configuration package, 如果需要统一可以考虑

```
npm install husky
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
npm install --save-dev @commitlint/{config-conventional,cli}
npm install --save-dev --save-exact prettier
```


## summary

安装

```
npm install husky
npm install --save-dev lint-staged
npm install --save-dev @commitlint/{config-conventional,cli}
npm install --save-dev --save-exact prettier
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

配置如下：

```
{   
    "husky": {
        "hooks": {
          "pre-commit": "lint-staged",
          "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
        }
    },
    "lint-staged": {
        "*.{js,jsx,md,html}": [
          "prettier --write",
          "eslint --fix",
          "git add",
          "eslint" 
        ],
    }
}
```




