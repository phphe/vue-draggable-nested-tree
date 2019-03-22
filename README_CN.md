<a name="vue_draggable_nested_tree"></a>
# vue-draggable-nested-tree vue可拖拽树, 可跨树拖拽
这是可拖拽树组件. 此组件没有css, 您需要自己添加您喜欢的样式, 参考demo, 只有几个样式, 不难.
此组件不负责节点的具体渲染, 暴露了一个节点渲染插槽, 请参考demo自行渲染.   
This is a draggable tree component. This component does not have css, you need to add your style refer to demo. The demo style is less, not difficult.
This component doesn't render node. It exposes a node rendering slot. Please refer to the demo for rendering.   
* [demo / 示例/演示](https://codepen.io/phphe/pen/KRapQm)
* [ie11 example / ie11示例](https://github.com/phphe/vue-draggable-nested-tree/tree/master/ie11-example)
* [English Doc](https://github.com/phphe/vue-draggable-nested-tree/blob/master/README.md)
* [中文文档](https://github.com/phphe/vue-draggable-nested-tree/blob/master/README_CN.md)

# touch
已支持简单触摸(单点).   
Support touch(single point).
# Donation / 打赏
[Paypal](https://www.paypal.me/phphe) | [Alipay/支付宝](https://github.com/phphe/my-alipay-wechat-qr-code/blob/master/alipay.jpg) | [Wechat/微信](https://github.com/phphe/my-alipay-wechat-qr-code/blob/master/wechat.png)
# Indexes
* [vue-draggable-nested-tree](#vue_draggable_nested_tree)
* [安装](#install)
* [使用](#usage)
  * [import/引入](#import)
  * [data](#data)
  * [template](#template)
  * [旧浏览器(IE)模板写法](#template_for_old_browsers)
* [api](#api)
  * [Tree props](#tree_props)
     * [Noraml - Tree props](#noraml_tree_props)
     * [Hooks - Tree props/钩子](#hooks_tree_props)
     * [draggableHelperInfo: {event, options, store}](#draggable_helper_info)
  * [Tree properties/树的属性](#tree_properties)
  * [Tree events/树的事件](#tree_events)
  * [Tree methods/树的方法](#tree_methods)
  * [node properties/节点的属性](#node_properties)
   * [node deep properties example/节点的深层属性调用示例](#node_deep_properties_example)
* [其他](#other)
  * [示例css](#demo_css)
  * [例子](#examples)
  * [draggable & droppable/可拖拽与可放置](#draggable_&_droppable)
  * [Traverse tree/遍历树](#traverse_tree)
  * [draggable library/用来支持拖拽的库](#draggable_library)

<a name="install"></a>
# 安装
```sh
npm i vue-draggable-nested-tree
```
<a name="usage"></a>
# 使用
<a name="import"></a>
### import / 引入
```js
import {DraggableTree} from 'vue-draggable-nested-tree'
// vue-draggable-nested-tree contains Tree, TreeNode, DraggableTree, DraggableTreeNode
// import the component and register it as global or local component
```
<a name="data"></a>
### data / 数据
```js
data: [
  {text: 'node 1'},
  {text: 'node 2'},
  {text: 'node 3 undraggable', draggable: false},
  {text: 'node 4'},
  {text: 'node 4 undroppable', droppable: false},
  {text: 'node 5', children: [
    {text: 'node 1'},
    {text: 'node 2', children: [
      {text: 'node 3'},
      {text: 'node 4'},
    ]},
    {text: 'node 2 undroppable', droppable: false, children: [
      {text: 'node 3'},
      {text: 'node 4'},
    ]},
    {text: 'node 2', children: [
      {text: 'node 3'},
      {text: 'node 4 undroppable', droppable: false},
    ]},
    {text: 'node 3'},
    {text: 'node 4'},
    {text: 'node 3'},
    {text: 'node 4'},
    {text: 'node 3'},
    {text: 'node 4'},
    {text: 'node 3'},
    {text: 'node 4'},
  ]},
]
```
<a name="template"></a>
### template / 模板
```pug
Tree(:data="data" draggable crossTree)
  div(slot-scope="{data, store, vm}")
    //- data是节点数据
    //- store是树的实例
    //- vm是节点实例, vm.level是节点的层级
    template(v-if="!data.isDragPlaceHolder")
      b(v-if="data.children && data.children.length" @click="store.toggleOpen(data)") {{data.open ? '-' : '+'}}&nbsp;
      span {{data.text}}
```
<a name="template_for_old_browsers"></a>
### 旧浏览器(IE)模板写法
```pug
//- slot-scope="{data, store, vm}" 旧浏览器不支持解构赋值. 如果你直接在网页内联模板里这样写(不经过编译)就会出错.
Tree(:data="data" draggable crossTree)
  div(slot-scope="slot")
    //- data is node
    //- store is the tree
    //- vm is node Vue instance, you can get node level by vm.level
    template(v-if="!slot.data.isDragPlaceHolder")
      b(v-if="slot.data.children && slot.data.children.length" @click="slot.store.toggleOpen(slot.data)") {{slot.data.open ? '-' : '+'}}&nbsp;
      span {{slot.data.text}}
```
<a name="api"></a>
# api
**下文的'store'是树的vue实例(vm), nodeVm是节点的实例**
<a name="tree_props"></a>
### Tree props
<a name="noraml_tree_props"></a>
###### 基础props - Tree props
```js
// base tree
data: {}, // 数组类型
indent: {default: 16}, // 缩进
activatedClass: {default: 'active'},
openedClass: {default: 'open'},
space: {default: 10}, // 节点垂直方向的间距
// draggable tree
preventSelect: {default: true}, // 是否阻止拖拽时文字被选中, 不影响输入框(input, textarea)中文字的选择
getTriggerEl: {type: Function}, // 用来指定触发拖拽的元素, 默认是节点自己, 比如你可以指定其中的一个按钮来触发拖拽. 参数(nodeVm)
draggable: {}, // 树是否启用拖拽, 默认否
droppable: {default: true}, // 树是否可被拖进, 默认是. 如果否, 则该树的节点不能在其内移动位置,其他树的节点也不能拖入其中
crossTree: {}, // 是否启用跨树, 默认否. 该树的节点是否可拖拽到其他树, 其他树的节点是否可拖拽到该树
```
<a name="hooks_tree_props"></a>
###### 钩子 - Tree props
```js
ondragstart: {type: Function}, // 拖拽开始时执行, 返回false将阻止拖拽. 参数(node, draggableHelperInfo)
ondragend: {type: Function}, // 拖拽结束时执行(抬起鼠标或松手), 返回false将阻止拖动中的元素放到该位置. 参数(node, draggableHelperInfo)
```
<a name="draggable_helper_info"></a>
###### draggableHelperInfo
{event, options, store}  
我使用我的另一个库draggable-helper来实现底层拖拽, draggableHelperInfo是draggable-helper传回的原始数据
<a name="tree_properties"></a>
### Tree properties / 树的属性
```js
// base
rootData, // 根节点, 由树生成
// draggable
dplh, // 拖动时用来表示位置的节点, 全局唯一.
trees, // 数组, 所有树. 全局唯一.
```
<a name="tree_events"></a>
### Tree events / 树的事件
```js
// store is the tree vm
drag(node), // 拖动开始.
drop(node, targetTree, oldTree), // 拖动结束后.
change(node, targetTree, oldTree), // 拖动结束后并且有节点位置发生了改变
nodeOpenChanged(node) // 当节点被展开或折叠时
```
* targetTree: 目标树. oldTree: 旧树
* targetTree 和 oldTree 都是树的实例.
* oldTree仅当跨树拖拽时存在, 否则null.
* 如果跨树, targetTree 和 oldTree都会触发drop和change事件.

<a name="tree_methods"></a>
### Tree methods / 树的方法
```js

pure(node, withChildren, after)
/*
pure
获得干净数据(不含运行时的属性例如_id之类的), 下划线开头的属性会被删掉. withChildren为true的话则会把节点的子节点的数据也获取到.
withChildren: 可选. after: Function, 可选, after可以自定义返回数据
关于after的源码(t是干净的节点数据):
if (after) {
  return after(t, node) || t
}
return t
*/
getNodeById(id)
getActivated()
getOpened()
activeNode(node, inactiveOld)
toggleActive(node, inactiveOld)
openNode(node, closeOld)
toggleOpen(node, closeOld)
// 下面的方法很简单, 所以附上源码.
getPureData(after) { return this.pure(this.rootData, true, after).children } // 获取树的干净数据 after: Function, 可选
deleteNode(node) { return hp.arrayRemove(node.parent.children, node) } // 删除节点
// 增加节点, 像操作数组一样就可以了. 例子: node.children.push(newNodeData)
// 更新节点, 直接修改节点属性就可以了
isNodeDraggable(node) // 判断节点是否draggable
isNodeDroppable(node) // 判断节点是否droppable
```
<a name="node_properties"></a>
### node properties / 节点属性
```js
// base
_id // 生成的id
_vm // 节点的实例
parent // 父节点
children: [], // 子节点
open, // 是否打开
active: false,
style: {}, // 可以控制节点的style
class: '', // 可以控制节点的class
// inner是指节点里的.tree-node-inner, innerBack是指节点里的.tree-node-inner-back, 可以审查元素查看构成节点的html元素
innerStyle: {},
innerClass: '',
innerBackStyle: {},
innerBackClass: {},
// draggable
draggable // 是否可拖动, 默认是. 参考下面的 'draggable & droppable'
droppable // 是否可拖入, 默认是. 参考下面的 'draggable & droppable'
isDragPlaceHolder // 该节点是不是拖动占位节点
```
<a name="node_deep_properties_example"></a>
#### node deep properties example / 节点的深层属性调用示例
在一些回调函数和事件里的参数可能只有node, 而想访问更多(例如节点实例, 节点的爸爸, 节点所在树)怎么办? 其实可以直接通过node访问, 因为他们都嵌套在里面了
```js
node._vm // vm
node._vm.level // node level, readonly
node._vm.store // tree
node.parent._vm // parent node vm
node._vm.store
```
<a name="other"></a>
# other / 其他
<a name="demo_css"></a>
### 示例css
```css
.he-tree{
  border: 1px solid #ccc;
  padding: 20px;
  width: 300px;
}
.tree-node{
}
.tree-node-inner{
  padding: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.draggable-placeholder{
}
.draggable-placeholder-inner{
  border: 1px dashed #0088F8;
  box-sizing: border-box;
  background: rgba(0, 136, 249, 0.09);
  color: #0088f9;
  text-align: center;
  padding: 0;
  display: flex;
  align-items: center;
}
```
<a name="examples"></a>
### 例子
如果要本地运行这些例子:
```sh
npm install
npm run dev
```
* [基础](https://github.com/phphe/vue-draggable-nested-tree/blob/master/src/examples/Base.vue)
* [MaxLevel / 指定最大层级](https://github.com/phphe/vue-draggable-nested-tree/blob/master/src/examples/MaxLevel.vue)

<a name="draggable_&_droppable"></a>
### draggable & droppable / 关于可拖动和可拖入
一个节点默认可拖动和可拖入. 可以单独指定节点的该俩属性. 另一个方式是在drag事件中遍历树来为每一个节点指定该俩属性.
<a name="traverse_tree"></a>
### Traverse tree / 遍历树
推荐使用我的另一个库 [tree-helper](https://github.com/phphe/tree-helper). 两个遍历方法(只是普通遍历的话都可以): depthFirstSearch/深度优先, breadthFirstSearch/广度优先.
<a name="draggable_library"></a>
### draggable library / 用来支持拖拽的库
[draggable-helper](https://github.com/phphe/draggable-helper) 我的另一个关于拖拽底层的库. 如果你要开发关于拖拽的功能可以使用它.
