# 自定义block


block可定义的元素如下：

- 类型
- 输入：value input, statement input, dummy input，
- field：text, text input, numeric input, angle inout dropdown, checkbox, colour, variable, image
- 类型：any，any of, boolean, number, string, array, other
- 颜色，
- 输入模式：auto，inner, external
- 连接器，top-preStatement, left-output, bottom-nextStatement
- tooltip,
- colour
- help url
- bottom type?


block定义参数：

```
{
    type: '', 类型
    message0: '', 输入参数
    args0: [], 输入参数定义
    inputsInline: true,
    preStatement: 'String',
    nextStatement: 'String',
    output: '',
    colour: 60,
    tooltip: 'xxx',
    helpUrl: '',
}
```