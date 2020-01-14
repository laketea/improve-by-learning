# blockly

blockly是什么？

blockly是一个基于web的可视化编程的编辑器。可以提供编程展示为相连的块的编辑器，。并且可以你制定的语法正确的代码\



## 源码分析

项目结构:

- closure, 模块化方案 goog， 类似seasjs requirejs
- blocks, block定义
- core  blocky 核心
- generators 代码生成器

打包方案

模块方案类似之前的seajs, 打包方案也跟之前的方案差不多。

- 压缩版本，大致原理，生成依赖表，根据依赖表顺序，插入代码以及压缩
- 未压缩版本，收集并生成依赖表，requre入口模块。

下面主要分析下未压缩版本，根据`core/requires.js`可以看到blockly的核心主要分为以下类型：


- blockly主系统, 包含blockly模块，布局模块，生成器？、工具栏
- blocks 依赖
- 渲染器，render
- 主体


## 核心流程

- 根据block 生成 toolbox
- 拖拽block 生成 workplace中的block


toolbox
flayout
tooltip
??
??

## 根据blockxml生成toolbox

treecontrol:handleMouseEvent， 监听toolbox node click事件
treecontrol:setSelectedItem, 选中节点
Toolbox:handleAfterTreeSelected_, 处理tree选中事件，显示toolbox flayout
floyt_base.show(xmllist), 遍历将将xml节点转化为block对象，并布局显示
xml.domToBlock(xml) 将xml节点转化为block对象
workspace..newBlock, 调用block_svg构建函数创建svg对象
block_svg构造函数重，调用block 构造函数
block构造函数中，将xml的属性，转化为json配置


熟悉blockly核心流程：

- 通过xml渲染，toolbox
- 在toolbox中拖拽 block到 workspace
- 通过workspace中的元素生成javascript

## 通过xml渲染toolbox

先看看toolbox的xml dom树：

```
        <block type="math_number">
      <field name="NUM">123</field>
      </block>
        <block type="text"></block>
      <block type="text_length"></block>
      <block type="text_print"></block>
```


初始化流程：

```
Blockly.inject(domId, options: { toolbox })
    - 创建inner div
    - 创建出实话参数options
    - 创建底部svg对象
    - 创建workspace对象 blockly.createMainWorkspace_ 
    - 初始化workspace以及渲染, Blockly.init_(workspace);  


blockly.createMainWorkspace_ (svg, options, ...)
1. var mainWorkspace = new Blockly.WorkspaceSvg(options, blockDragSurface, workspaceDragSurface); // 创建workspace_svg对象
2. mainWorkspace.createDom('blocklyMainBackground') 创建主要的svg 容器对象，包含如下几部分：
    blocklyMainBackground，blocklyBlockCanvas，blocklyBubbleCanvas，blocklyCursor，blocklyMarker
3. var flyout = mainWorkspace.addFlyout_('svg'); 如果不存在目录，则创建一个flyout对象以及svg dom，flyout是mainworkspace的一份copy
4. Blockly.svgResize(mainWorkspace); 重置svg尺寸
5. Blockly.WidgetDiv.createDom();
6. Blockly.DropDownDiv.createDom();
7. Blockly.Tooltip.createDom();


blockly.init_(workspace)
1. 屏蔽svg上面的系统右键菜单默认行为
2. 绑定window resize事件，Blockly.hideChaff(true);Blockly.svgResize(mainWorkspace);
3. 绑定document上面的event事件，mainWorkspace.setResizeHandlerWrapper(workspaceResizeHandler);
    主要包含：scroll, keydown, touchend, touchcancel
4. 初始化左侧 toolbox or flyout, 
    mainWorkspace.flyout_.init(mainWorkspace);
    mainWorkspace.flyout_.show(options.languageTree.childNodes);
    mainWorkspace.flyout_.scrollToStart();
5. 初始化 trashcan
6. 初始化 scrollbar
7. loadSounds


mainWorkspace.flyout_.init(mainWorkspace);
1. 设置targetWorkspace
2. 创建scrollbar
3. 绑定滚动事件，进行滚动
4. 绑定mouseDown事件
5. 手势？
6. 初始化variableMap_对象


mainWorkspace.flyout_.show(mainWorkspace);
1. 临时禁用resize
2. 隐藏界面
3. 清理已有的blocks
4. 针对动态xml做处理，
5. 遍历xml nodes, 
    如果是block节点，则调用Blockly.Xml.domToBlock(xml), 转化为block对象，并存入contents数组中
    如果是gap
    如果是label或者button, 则创建flyoutbutton对象，并存入contents中
6. this.layout_(content, gaps)
    遍历所有的content, 
    针对每个block，执行block.render()
    渲染完成之后，重新调整每个block的位置
    绑定各种mouse事件
7. 绑定mouseover事件，鼠标over的时候，取消所有选中状态
8. this.reflow();
9. this.filterForCapacity_();
10.this.position();
11.this.reflowWrapper_ = this.reflow.bind(this);
12.this.workspace_.addChangeListener(this.reflowWrapper_);


Blockly.Xml.domToBlock(xml, this.workspace_); 根据xml生成block对象
1. 根据xml节点，转换为topblock, Blockly.Xml.domToBlockHeadless_(xmlBlock, workspace);
2. 获取当前block所有的后代blocks
3. 遍历后代blocks
    如果已经渲染，则主窗口渲染了，
    则逐个 blocks[i].initSvg(), blocks[i].render(false)，
    如果没有渲染，则只是initmodel()
4. Blockly.Variables.getAddedVariables(workspace,
        variablesBeforeCreation);
5. 触发variable相关的事件
6. 触发新创建block的事件


Blockly.Xml.domToBlockHeadless_(xmlBlock, workspace); 此函数会递归调用
1. 根据block类型，创建block对象 workspace.newBlock(prototypeName, id);
2. 循环判断block的子节点，根据情况初始化input field 等模块， 
3. more

workspace.newBlock(prototypeName, id); // workspace_svg
1. 调用new Blockly.BlockSvg(this, prototypeName, opt_id) block_svg
2. blocksvg 构造函数中， 创建block对应svg group 也就是g节点
3. 调用workspace.getRenderer().makePathObject(this.svgGroup_)，获取pathObject
4. 调用block_svg的超类，也就是block 
构造函数进行初始化
block_svg.initSvg

block_svg.render(false)
1. (this.workspace)).getRenderer().render(this); 调用render渲染
2. var info = this.makeRenderInfo_(block); ::renderer.js
    renderer:new Blockly.geras.RenderInfo(this, block), 最终调用info.js的构造函数，初始化或者info对象
3. info.measure();
    this.createRows_();
    this.addElemSpacing_();
    this.computeBounds_();
    this.alignRowElements_();
    this.addRowSpacing_();
    this.finalize_();
4. this.makeDrawer_(block, info).draw(); // 真正的渲染
    renderer: new Blockly.geras.Drawer(block, Blockly.geras.RenderInfo(info));
    drawer:: draw() // 真正渲染的逻辑
        this.hideHiddenIcons_();
        this.drawOutline_();
        this.drawInternals_();
        this.block_.pathObject.setPaths(this.outlinePath_ + '\n' + this.inlinePath_,
        this.highlighter_.getPath());
        this.recordSizeOnBlock_();

```








