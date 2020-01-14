# 正则API

## 如何创建正则表达式

- 字面量方式
- 构建函数

区别：转义方式不一样，另外通过构造函数可以动态的构建正则表达式。

```
const pattern = /jg/ig;
const pattern = new RegExp('ks', 'ig'); // 两个参数：字符串模式、标志字符串
```

正则表达式中的元字符：

```
( [ { \ ^ $ | ) ? * + .]}
```

模式中的所有元字符都需要转义，字面量只需要一次转义，而通过构造函数创建的正则 需要双重转义。
双重转义，可以简单理解先做一次正常的转义，然后将所有的`\` 替换为`\\` 

```javascript
var pattern1 = /\[b\\c\]at/i;
var pattern2 = new RegExp("\\[b\\\\c\\]at", "i");
```


## Regex实例属性

- global, 取决与是否设置g
- ignoreCase, 取决于是否设置i
- lastIndex, 返回最近一次匹配字符串的下一个位置, 如果最近一次未匹配到任意字符串，则返回0
- multiline，取决于是否设置m
- source, 返回正则表达式的字符串表示，注意返回的是 字面量形式(不带//以及标志字符串)

## Regex实例方法

- exec 主要用于捕获取，也就是提取正则匹配的字符串。
- test 主要用于检测字符串是否与某个模式匹配，返回boolean


test 整体匹配时需要使用 ^ 和 $

```
console.log( /123/.test("a123b") );
// => true
console.log( /^123$/.test("a123b") );
// => false
console.log( /^123$/.test("123") );
// => true
```

exec方法，如果有匹配的字符串，则返回一个数组实例，如果不匹配，则返回null。
exec方法返回的格式如下:


```javascript
var text = "cat, bat, sat, fat";
var pattern1= /c(at)/;
var matches = pattern1.exec(text);
matches[0] // cat
matches[1] // at
matches.index // 0  匹配字符串在整个字符串中的位置
matches.input // 返回原始的字面量字符

```

- 如果regex不设置全局匹配模式，则每次都从起始位置查找
- 如果regex设置全局匹配模式，则每次都从上一次的lastIndex位置开始查找

```javascript
var text = "cat, bat, sat, fat";
var pattern1 = /.at/;
var matches = pattern1.exec(text);
alert(matches.index);        //0
alert(matches[0]);           //cat
alert(pattern1.lastIndex);   //0
matches = pattern1.exec(text); alert(matches.index); //0 alert(matches[0]); //cat alert(pattern1.lastIndex); //0


var pattern2 = /.at/g;
var matches = pattern2.exec(text); 
alert(matches.index); //0 
alert(matches[0]); 
//cat alert(pattern2.lastIndex); //3
matches = pattern2.exec(text);
alert(matches.index);        //5
alert(matches[0]);           //bat
alert(pattern2.lastIndex);   //8
```

注意，如果使用exec要达到全局匹配的效果，需要通过lastIndex来循环执行exec

```javascript
var string = "2017.06.27";
var regex2 = /\b(\d+)\b/g;
var result;
while ( result = regex2.exec(string) ) {
  console.log( result, regex2.lastIndex );
}
```


## Regex静态属性

基于最近一次正则表达式操作而变化，(需要注意执行时机)

- input $_ 最近一次要匹配的字符串。
- lastMatch $& 最近一次的匹配项。
- lastParen $+ 最近一次匹配的捕获组。
- leftContext $` input字符串中lastMatch之前的文本
- multiline $*  布尔值，表示是否所有表达式都使用多行模式。IE和Opera未实现此属性
- rightContext $' Input字符串中lastMatch之后的文本
- RegExp.$1、RegExp.$2...RegExp.$9, 分别代表第一个。。。第九个匹配的捕获组

```
var text = "this has been a short summer";
var pattern = /(.)hort/g;
/*
* 注意:Opera 不支持 input、lastMatch、lastParen 和 multiline 属性 * Internet Explorer 不支持 multiline 属性
*/
 if (pattern.test(text)){
    alert(RegExp.input); // this has been a short summer
    alert(RegExp.leftContext); // this has been a
    alert(RegExp.rightContext); // summer
    alert(RegExp.lastMatch); // short
    alert(RegExp.lastParen); // s
    alert(RegExp.multiline); // false
}
```

## String正则方法

- string.search(reg: regex) 参数为正则表达式，对字符串进行指定正则表达式的匹配搜索，返回第一个出现的匹配项的下标, 如果不存在匹配项则返回-1
- string.split(separator: string|regex, limit: number) 通过分离字符串成字串，将字符串对象分割成字符串数组。如果正则中包含组，则返回的数组中会包含分割符
- string.match(regexp: regexp)
- string.replace(search: string|regex, replaced: string)

search 以及 match 参数必须为正则，如果不是正则，则会默认将字符串使用构造函数转换为正则表达式对象。

match函数：
match返回执行结果也是返回一个数组的实例，且可能包含input & index属性
- 如果正则对象，修饰符g为true, 则返回所有匹配的内容，不返回 捕获组，则不返回 index & input属性。
- 如果正则对象，修饰符g为false, 则返回第一匹配的内容，且返回对应的捕获组，返回index & input属性
- 当没有匹配内容的时候，返回null

replace方法，存在两种用法：
- 第二个参数是字符串时候，通过特殊字符，可以饮用分组中的字符
- 第二个参数是函数时，函数第一个参数是匹配的内容，后续是对应的分组内容

```javascript
var result = "2,3,5".replace(/(\d+),(\d+),(\d+)/, "$3=$1+$2");
  console.log(result);
  // => "5=2+3"

"1234 2345 3456".replace(/(\d)\d{2}(\d)/g, function (match, $1, $2, index, input) {
      console.log([match, $1, $2, index, input]);
});
  // => ["1234", "1", "4", 0, "1234 2345 3456"]
  // => ["2345", "2", "5", 5, "1234 2345 3456"]
  // => ["3456", "3", "6", 10, "1234 2345 3456"]

```


## 参考列表

https://github.com/qdlaoyao/js-regex-mini-book


