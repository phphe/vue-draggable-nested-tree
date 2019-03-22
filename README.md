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
* [install](#install)
* [usage](#usage)
  * [import](#import)
  * [data](#data)
  * [template](#template)
  * [template for old browsers(eg: IE)](#template_for_old_browsers)
* [api](#api)
  * [Tree props](#tree_props)
     * [Noraml - Tree props](#noraml_tree_props)
     * [Hooks - Tree props](#hooks_tree_props)
     * [draggableHelperInfo: {event, options, store}](#draggable_helper_info)
  * [Tree properties](#tree_properties)
  * [Tree events](#tree_events)
  * [Tree methods](#tree_methods)
  * [node properties](#node_properties)
   * [node deep properties example](#node_deep_properties_example)
* [other](#other)
  * [demo css](#demo_css)
  * [examples](#examples)
  * [draggable & droppable](#draggable_&_droppable)
  * [Traverse tree](#traverse_tree)
  * [draggable library](#draggable_library)

<a name="install"></a>
# install
```sh
npm i vue-draggable-nested-tree
```
<a name="usage"></a>
# usage
<a name="import"></a>
### import
```js
import {DraggableTree} from 'vue-draggable-nested-tree'
// vue-draggable-nested-tree contains Tree, TreeNode, DraggableTree, DraggableTreeNode
// import the component and register it as global or local component
```
<a name="data"></a>
### data
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
### template
```pug
Tree(:data="data" draggable crossTree)
  div(slot-scope="{data, store, vm}")
    //- data is node
    //- store is the tree
    //- vm is node Vue instance, you can get node level by vm.level
    template(v-if="!data.isDragPlaceHolder")
      b(v-if="data.children && data.children.length" @click="store.toggleOpen(data)") {{data.open ? '-' : '+'}}&nbsp;
      span {{data.text}}
```
<a name="template_for_old_browsers"></a>
### template for old browsers(eg: IE)
```pug
//- slot-scope="{data, store, vm}" may not work in old browsers, replace with slot-scope="slot"
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
**The 'store' is the tree vm**
<a name="tree_props"></a>
### Tree props
<a name="noraml_tree_props"></a>
###### Noraml - Tree props
```js
// base tree
data: {}, // type Array
indent: {default: 16},
activatedClass: {default: 'active'},
openedClass: {default: 'open'},
space: {default: 10}, // space between node, unit px
// draggable tree
preventSelect: {default: true}, // if to prevent drag handler text be selected when drag, excluding input and textarea
getTriggerEl: {type: Function}, // get the el trigger drag, default is node self. arguments(nodeVm)
draggable: {}, // is the tree draggable, default false
droppable: {default: true}, // is the tree droppable, default true
crossTree: {}, // can a node of the tree be dragged into other tree, or receive other tree node
```
<a name="hooks_tree_props"></a>
###### Hooks - Tree props
```js
ondragstart: {type: Function}, // hook. return false to prevent drag. arguments(node, draggableHelperInfo)
ondragend: {type: Function}, // hook. return false to prevent drop. arguments(node, draggableHelperInfo)
```
<a name="draggable_helper_info"></a>
###### draggableHelperInfo
{event, options, store}
<a name="tree_properties"></a>
### Tree properties
```js
// base
rootData, // generated by tree
// draggable
dplh, // drag placeholder. globally unique.
trees, // array, all trees in the app. globally unique.
```
<a name="tree_events"></a>
### Tree events
```js
// store is the tree vm
drag(node), // on drag start.
drop(node, targetTree, oldTree), // after drop.
change(node, targetTree, oldTree), // after drop, only when the node position changed
nodeOpenChanged(node) // on a node is closed or open
```
* targetTree and oldTree are tree vm.
* oldTree is available only when cross tree. Otherwise null.
* if cross tree, both targetTree and oldTree will emit drop and change.

<a name="tree_methods"></a>
### Tree methods
```js
pure(node, withChildren, after)
/*
pure
return a node data without runtime properties.(!: property which starts with '_' will be removed)
withChildren: optional. after: Function, optional
the code about after(t is computed node data):
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
// follow methods are easy, so I paste their soure code
getPureData(after) { return this.pure(this.rootData, true, after).children } // after: Function, optional
deleteNode(node) { return hp.arrayRemove(node.parent.children, node) }
// add node: like array. eg: node.children.push(newNodeData)
// update node: just assign to the node properties directly
isNodeDraggable(node)
isNodeDroppable(node)
```
<a name="node_properties"></a>
### node properties
```js
// base
_id
_vm
parent
children: [],
open,
active: false,
style: {},
class: '',
innerStyle: {},
innerClass: '',
innerBackStyle: {},
innerBackClass: {},
// draggable
draggable // default true. Please check 'draggable & droppable' below
droppable // default true. Please check 'draggable & droppable' below
isDragPlaceHolder
```
<a name="node_deep_properties_example"></a>
#### node deep properties example
```js
node._vm // vm
node._vm.level // 节点层级, 只读
node._vm.store // tree
node.parent._vm // parent node vm
node._vm.store
```
<a name="other"></a>
# other
<a name="demo_css"></a>
### demo css
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
### examples
clone the package, and
```sh
npm install
npm run dev
```
* [Base](https://github.com/phphe/vue-draggable-nested-tree/blob/master/src/examples/Base.vue)
* [MaxLevel](https://github.com/phphe/vue-draggable-nested-tree/blob/master/src/examples/MaxLevel.vue)

<a name="draggable_&_droppable"></a>
### draggable & droppable
A node is default draggable and droppable. You can set draggable and droppable property of a node. The another way is listen event 'drag', traverse all data to set draggable or droppable property.
<a name="traverse_tree"></a>
### Traverse tree
Recommend to use my other library [tree-helper](https://github.com/phphe/tree-helper). It has 2 traverse methods: depthFirstSearch, breadthFirstSearch.
<a name="draggable_library"></a>
### draggable library
[draggable-helper](https://github.com/phphe/draggable-helper) is my another library for drag. And it also is using by this component. You can use it to help you drag functions.
