/*!
 * vue-draggable-nested-tree v2.2.17
 * (c) 2018-present phphe <phphe@outlook.com>
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var keys = _interopDefault(require('core-js/library/fn/object/keys'));
var assign = _interopDefault(require('core-js/library/fn/object/assign'));
var th = require('tree-helper');
require('core-js/modules/web.dom.iterable');
require('core-js/modules/es6.number.constructor');
var hp = require('helper-js');
var defineProperty = _interopDefault(require('core-js/library/fn/object/define-property'));
require('core-js/modules/es6.function.name');
var getIterator = _interopDefault(require('core-js/library/fn/get-iterator'));
require('core-js/modules/es6.array.find');
var vf = require('vue-functions');
require('core-js/modules/es6.regexp.replace');
var draggableHelper = _interopDefault(require('draggable-helper'));

var keys$1 = keys;

var assign$1 = assign;

//
var script = {
  name: 'TreeNode',
  props: {
    data: {},
    store: {},
    level: {
      default: 0
    } // readonly

  },
  data: function data() {
    return {
      vm: this
    };
  },
  computed: {
    childrenLevel: function childrenLevel() {
      return this.level + 1;
    },
    isRoot: function isRoot() {
      return this.data && this.data.isRoot;
    },
    childrenVisible: function childrenVisible() {
      var data = this.data;
      return this.isRoot || data && data.children && data.children.length && data.open;
    },
    innerBackStyle: function innerBackStyle() {
      var r = {
        marginBottom: this.store.space + 'px'
      };

      if (!this.isRoot && this.level > 1) {
        r.paddingLeft = (this.level - 1) * this.store.indent + 'px';
      }

      return r;
    }
  },
  watch: {
    data: {
      immediate: true,
      handler: function handler(data) {
        if (data) {
          data._vm = this;

          if (!data._treeNodePropertiesCompleted && !data.isRoot) {
            this.store.compeleteNode(data, this.$parent.data);
          }
        }
      }
    }
  } // methods: {},
  // created() {},
  // mounted() {},

};

/* script */
            const __vue_script__ = script;
            
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tree-node",class:[_vm.data.active ? _vm.store.activatedClass : '', _vm.data.open ? _vm.store.openedClass : '', _vm.data.class],style:(_vm.data.style),attrs:{"id":_vm.data._id}},[(!_vm.isRoot)?_vm._t("node-inner-back",[_c('div',{staticClass:"tree-node-inner-back",class:[_vm.data.innerBackClass],style:([_vm.innerBackStyle, _vm.data.innerBackStyle])},[_c('div',{staticClass:"tree-node-inner",class:[_vm.data.innerClass],style:([_vm.data.innerStyle])},[_vm._t("default",null,{data:_vm.data,store:_vm.store,vm:_vm.vm})],2)])],{styleObj:_vm.innerBackStyle,data:_vm.data,store:_vm.store,vm:_vm.vm}):_vm._e(),_c('transition',{attrs:{"name":_vm.store.childrenTransitionName}},[(_vm.childrenVisible)?_c('div',{staticClass:"tree-node-children"},_vm._l((_vm.data.children),function(child){return _c('TreeNode',{key:child._id,attrs:{"data":child,"store":_vm.store,"level":_vm.childrenLevel},scopedSlots:_vm._u([{key:"default",fn:function(props){return [_vm._t("default",null,{data:props.data,store:props.store,vm:props.vm})]}},{key:"node-inner-back",fn:function(props){return (_vm.store.customInnerBack)?[_vm._t("node-inner-back",null,{styleObj:props.styleObj,data:props.data,store:props.store,vm:props.vm})]:undefined}}])})}),1):_vm._e()])],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "TreeNode.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var TreeNode = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var script$1 = {
  props: {
    data: {},
    idLength: {
      type: Number,
      default: 5
    },
    indent: {
      type: Number,
      default: 16
    },
    activatedClass: {
      default: 'active'
    },
    openedClass: {
      default: 'open'
    },
    space: {
      type: Number,
      default: 10
    },
    // space between node, unit px
    childrenTransitionName: {},
    // there are issues under draggable tree
    customInnerBack: {}
  },
  components: {
    TreeNode: TreeNode
  },
  data: function data() {
    return {
      store: this,
      rootData: null
    };
  },
  // computed: {},
  watch: {
    data: {
      immediate: true,
      handler: function handler(data, old) {
        var _this = this;

        if (data === old) {
          return;
        } // make rootData always use a same object


        this.rootData = this.rootData || {
          isRoot: true,
          _id: "tree_".concat(this._uid, "_node_root"),
          children: []
        };
        th.breadthFirstSearch(data, function (node, k, parent) {
          _this.compeleteNode(node, parent);
        });
        this.rootData.children = data;
      }
    }
  },
  methods: {
    compeleteNode: function compeleteNode(node, parent) {
      var compeletedData = {
        open: true,
        children: [],
        active: false,
        style: {},
        class: '',
        innerStyle: {},
        innerClass: '',
        innerBackStyle: {},
        innerBackClass: {}
      };

      for (var key in compeletedData) {
        if (!node.hasOwnProperty(key)) {
          this.$set(node, key, compeletedData[key]);
        }
      }

      this.$set(node, 'parent', parent || this.rootData);

      if (!node.hasOwnProperty('_id')) {
        node._id = "tree_".concat(this._uid, "_node_").concat(hp.strRand(this.idLength));
      }

      node._treeNodePropertiesCompleted = true;
    },
    // pure node self
    pure: function pure(node, withChildren, after) {
      var _this2 = this;

      var t = assign$1({}, node);

      delete t._id;
      delete t.parent;
      delete t.children;
      delete t.open;
      delete t.active;
      delete t.style;
      delete t.class;
      delete t.innerStyle;
      delete t.innerClass;
      delete t.innerBackStyle;
      delete t.innerBackClass;

      var _arr = keys$1(t);

      for (var _i = 0; _i < _arr.length; _i++) {
        var key = _arr[_i];

        if (key[0] === '_') {
          delete t[key];
        }
      }

      if (withChildren && node.children) {
        t.children = node.children.slice();
        t.children.forEach(function (v, k) {
          t.children[k] = _this2.pure(v, withChildren);
        });
      }

      if (after) {
        return after(t, node) || t;
      }

      return t;
    },
    getNodeById: function getNodeById(id) {
      var r;
      th.breadthFirstSearch(this.rootData.children, function (node) {
        if (node._id === id) {
          r = node;
          return false;
        }
      });
      return r;
    },
    getActivated: function getActivated() {
      var r = [];
      th.breadthFirstSearch(this.rootData.children, function (node) {
        if (node.active) {
          r.push(node);
        }
      });
      return r;
    },
    getOpened: function getOpened() {
      var r = [];
      th.breadthFirstSearch(this.rootData.children, function (node) {
        if (node.open) {
          r.push(node);
        }
      });
      return r;
    },
    activeNode: function activeNode(node, inactiveOld) {
      var activated = this.activated;

      if (inactiveOld) {
        this.getActivated().forEach(function (node2) {
          node2.active = false;
        });
      }

      node.active = true;
    },
    toggleActive: function toggleActive(node, inactiveOld) {
      if (node.active) {
        node.active = false;
      } else {
        this.activeNode(node, inactiveOld);
      }
    },
    openNode: function openNode(node, closeOld) {
      var _this3 = this;

      var opened = this.opened;

      if (closeOld) {
        this.getOpened().forEach(function (node2) {
          node2.open = false;

          _this3.$emit('nodeOpenChanged', node2);
        });
      }

      node.open = true;
      this.$emit('nodeOpenChanged', node);
    },
    toggleOpen: function toggleOpen(node, closeOld) {
      if (node.open) {
        node.open = false;
        this.$emit('nodeOpenChanged', node);
      } else {
        this.openNode(node, closeOld);
      }
    },
    getPureData: function getPureData(after) {
      return this.pure(this.rootData, true, after).children;
    },
    deleteNode: function deleteNode(node) {
      return hp.arrayRemove(node.parent.children, node);
    }
  } // created() {},
  // mounted() {},

};

/* script */
            const __vue_script__$1 = script$1;
            
/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"he-tree tree"},[_c('TreeNode',{attrs:{"data":_vm.rootData,"store":_vm.store},scopedSlots:_vm._u([{key:"default",fn:function(props){return [_vm._t("default",null,{data:props.data,store:_vm.store,vm:props.vm})]}},{key:"node-inner-back",fn:function(props){return (_vm.customInnerBack)?[_vm._t("node-inner-back",null,{styleObj:props.styleObj,data:props.data,store:props.store,vm:props.vm})]:undefined}}])})],1)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Tree.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Tree = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

var defineProperty$1 = defineProperty;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    defineProperty$1(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    defineProperty$1(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var Cache =
/*#__PURE__*/
function () {
  function Cache() {
    _classCallCheck(this, Cache);

    _defineProperty(this, "store", {});
  }

  _createClass(Cache, [{
    key: "has",
    value: function has(name) {
      return this.store.hasOwnProperty(name);
    }
  }, {
    key: "remember",
    value: function remember(name, getter) {
      if (!this.has(name)) {
        this.store[name] = {
          value: getter()
        };
      }

      return this.store[name].value;
    }
  }, {
    key: "forget",
    value: function forget(name) {
      if (name) {
        if (this.has(name)) {
          delete this.store[name];
        }
      } else {
        this.store = {};
      }
    }
  }]);

  return Cache;
}();
function attachCache(obj, cache, toCache) {
  var _loop = function _loop(key) {
    defineProperty$1(obj, key, {
      get: function get() {
        var _this = this;

        return cache.remember(key, function () {
          return toCache[key].call(_this);
        });
      }
    });
  };

  for (var key in toCache) {
    _loop(key);
  }
}

var getIterator$1 = getIterator;

// from https://gist.github.com/iddan/54d5d9e58311b0495a91bf06de661380

if (!document.elementsFromPoint) {
  document.elementsFromPoint = elementsFromPoint;
}

function elementsFromPoint(x, y) {
  var parents = [];
  var parent = void 0;

  do {
    if (parent !== document.elementFromPoint(x, y)) {
      parent = document.elementFromPoint(x, y);
      parents.push(parent);
      parent.style.pointerEvents = 'none';
    } else {
      parent = false;
    }
  } while (parent);

  parents.forEach(function (parent) {
    return parent.style.pointerEvents = 'all';
  });
  return parents;
}

function getTreeByPoint(x, y, trees) {
  var els = document.elementsFromPoint(x, y);
  var treeEl;
  var nodeEl;
  var betweenEls = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = getIterator$1(els), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _el = _step.value;

      if (!nodeEl) {
        if (hp.hasClass(_el, 'tree-node')) {
          nodeEl = _el;
        }
      } else {
        // console.log(el);
        if (hp.hasClass(_el, 'tree')) {
          treeEl = _el;
          break;
        }

        betweenEls.push(_el);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (treeEl) {
    // is target tree is another tree, and be covered by other element, like modal, popup
    var covered = false;

    if (!isParent(nodeEl, treeEl)) {
      // cross tree
      for (var _i = 0; _i < betweenEls.length; _i++) {
        var el = betweenEls[_i];

        if (!isParent(el, treeEl)) {
          covered = true;
          break;
        }
      }
    } //


    if (!covered) {
      return trees.find(function (v) {
        return v.$el === treeEl;
      });
    }
  }
}

function isParent(child, parent) {
  var cur = child;

  while (cur) {
    cur = cur.parentNode;

    if (cur === parent) {
      return true;
    }
  }
}

// 对 drag placeholder进行的操作

var targets = {
  'nothing': function nothing(info) {},
  'after': function after(info) {
    insertDplhAfterTo(info.dplh, info.targetNode, info);
  },
  'before': function before(info) {
    if (isNodeDroppable(info.targetNode.parent)) {
      th.insertBefore(info.dplh, info.targetNode);
    } else {
      insertDplhAfterTo(info.dplh, info.targetNode.parent, info);
    }
  },
  'append': function append(info) {
    if (isNodeDroppable(info.targetNode)) {
      th.appendTo(info.dplh, info.targetNode);
      if (!info.targetNode.open) info.store.toggleOpen(info.targetNode);
    } else {
      insertDplhAfterTo(info.dplh, info.targetNode, info);
    }
  },
  'prepend': function prepend(info) {
    if (isNodeDroppable(info.targetNode)) {
      th.prependTo(info.dplh, info.targetNode);
      if (!info.targetNode.open) info.store.toggleOpen(info.targetNode);
    } else {
      insertDplhAfterTo(info.dplh, info.targetNode, info);
    }
  },
  'after target parent': function afterTargetParent(info) {
    insertDplhAfterTo(info.dplh, info.targetNode.parent, info);
  },
  // append to prev sibling
  'append prev': function appendPrev(info) {
    if (isNodeDroppable(info.targetPrev)) {
      th.appendTo(info.dplh, info.targetPrev);
      if (!info.targetPrev.open) info.store.toggleOpen(info.targetPrev);
    } else {
      insertDplhAfterTo(info.dplh, info.targetPrev, info);
    }
  },
  // append to current tree
  'append current tree': function appendCurrentTree(info) {
    if (isNodeDroppable(info.currentTree.rootData)) {
      th.appendTo(info.dplh, info.currentTree.rootData);
    }
  }
};

function insertDplhAfterTo(dplh, targetNode, info) {
  if (!targetNode) {
    return false;
  } else {
    var closest = findParent(targetNode, function (node) {
      return node.parent && isNodeDroppable(node.parent);
    });

    if (closest) {
      th.insertAfter(dplh, closest);
    } else {
      return false;
    }
  }

  return true;
}

function isNodeDraggable(node) {
  if (!draggableIds.hasOwnProperty(node._id)) {
    var r;

    if (node.hasOwnProperty('draggable')) {
      r = node.draggable;
    } else if (node.parent) {
      r = isNodeDraggable(node.parent);
    } else {
      r = true;
    }

    draggableIds[node._id] = r;
  }

  return draggableIds[node._id];
}
function isNodeDroppable(node) {
  if (!droppableIds.hasOwnProperty(node._id)) {
    var r;

    if (node.hasOwnProperty('droppable')) {
      r = node.droppable;
    } else if (node.parent) {
      r = isNodeDroppable(node.parent);
    } else {
      r = true;
    }

    droppableIds[node._id] = r;
  }

  return droppableIds[node._id];
} // find child, excluding dragging node default

function findChild(info, children, handler, reverse) {
  var len = children.length;

  if (reverse) {
    for (var i = len - 1; i >= 0; i--) {
      var item = children[i]; // excluding dragging node

      if (item !== info.node) {
        if (handler(item, i)) {
          return item;
        }
      }
    }
  } else {
    for (var _i = 0; _i < len; _i++) {
      var _item = children[_i]; // excluding dragging node

      if (_item !== info.node) {
        if (handler(_item, _i)) {
          return _item;
        }
      }
    }
  }
} // start from node self


function findParent(node, handle) {
  var current = node;

  while (current) {
    if (handle(current)) {
      return current;
    }

    current = current.parent;
  }
}

var rules = {
  // 另一节点存在
  'targetNode existed': function targetNodeExisted(info) {
    return info.targetNode;
  },
  // 另一节点是拖动占位节点
  'targetNode is placeholder': function targetNodeIsPlaceholder(info) {
    return info.targetNode.isDragPlaceHolder;
  },
  // 另一节点在最上面
  'targetNode at top': function targetNodeAtTop(info) {
    return info.targetAtTop;
  },
  // 另一节点在最下面
  'targetNode at bottom': function targetNodeAtBottom(info) {
    return info.targetAtBottom;
  },
  // 另一节点是根节点第二个子
  'targetNode is the second child of root': function targetNodeIsTheSecondChildOfRoot(info) {
    return info.currentTreeRootSecondChildExcludingDragging === info.targetNode;
  },
  // 拖动点坐标在任一树中, 同时, 起始树要可拖出, 当前树要可拖入
  'currentTree existed': function currentTreeExisted(info) {
    return info.currentTree;
  },
  // 当前树为空(不包括占位节点)
  'currentTree empty': function currentTreeEmpty(info) {
    return !findChild(info, info.currentTree.rootData.children, function (v) {
      return v;
    });
  },
  // 占位节点存在
  'placeholder existed': function placeholderExisted(info) {
    return info.dplhEl;
  },
  // 占位节点在当前树中
  'placeholder in currentTree': function placeholderInCurrentTree(info) {
    return info.dplhElInCurrentTree;
  },
  // 占位节点在最上面
  'placeholder at top': function placeholderAtTop(info) {
    return info.dplhAtTop;
  },
  // 另一节点是打开的
  'targetNode is open': function targetNodeIsOpen(info) {
    return info.targetNode.open;
  },
  // 另一节点有子(不包括占位节点)
  'targetNode has children excluding placeholder': function targetNodeHasChildrenExcludingPlaceholder(info) {
    return findChild(info, info.targetNode.children, function (v) {
      return v !== info.dplh;
    });
  },
  // 另一节点是第一个节点
  'targetNode is 1st child': function targetNodeIs1stChild(info) {
    return findChild(info, info.targetNode.parent.children, function (v) {
      return v;
    }) === info.targetNode;
  },
  // 另一节点是最后节点
  'targetNode is last child': function targetNodeIsLastChild(info) {
    return findChild(info, info.targetNode.parent.children, function (v) {
      return v;
    }, true) === info.targetNode;
  },
  // 当前位置在另一节点inner垂直中线上
  'on targetNode middle': function onTargetNodeMiddle(info) {
    return info.offset.y <= info.tiMiddleY;
  },
  // 当前位置在另一节点inner左边
  'at left': function atLeft(info) {
    return info.offset.x < info.tiOffset.x;
  },
  // 当前位置在另一节点innner indent位置右边
  'at indent right': function atIndentRight(info) {
    return info.offset.x > info.tiOffset.x + info.currentTree.indent;
  } // convert rule output to Boolean

};

var _arr = keys$1(rules);

var _loop = function _loop() {
  var key = _arr[_i2];
  var old = rules[key];

  rules[key] = function () {
    return Boolean(old.apply(void 0, arguments));
  };
};

for (var _i2 = 0; _i2 < _arr.length; _i2++) {
  _loop();
}

var prevTree;
var droppableIds = {};
var draggableIds = {}; // context is vm

function autoMoveDragPlaceHolder(draggableHelperInfo) {
  var trees = this.store.trees;
  var dhStore = draggableHelperInfo.store; // make info

  var info = {
    event: draggableHelperInfo.event,
    el: dhStore.el,
    vm: this,
    node: this.data,
    store: this.store,
    dplh: this.store.dplh,
    draggableHelperData: {
      opt: draggableHelperInfo.options,
      store: dhStore
    } //

  };
  attachCache(info, new Cache(), {
    // dragging node coordinate
    // 拖动中的节点相关坐标
    nodeInnerEl: function nodeInnerEl() {
      return this.el.querySelector('.tree-node-inner');
    },
    offset: function offset() {
      return hp.getOffset(this.nodeInnerEl);
    },
    // left top point
    offset2: function offset2() {
      return {
        x: this.offset.x + this.nodeInnerEl.offsetWidth,
        y: this.offset.y + this.nodeInnerEl.offsetHeight
      };
    },
    // right bottom point
    offsetToViewPort: function offsetToViewPort() {
      var r = this.nodeInnerEl.getBoundingClientRect();
      r.x = r.left;
      r.y = r.top;
      return r;
    },
    // tree
    currentTree: function currentTree() {
      // const currentTree = trees.find(tree => hp.isOffsetInEl(this.offset.x, this.offset.y, tree.$el))
      var currentTree = getTreeByPoint(this.offsetToViewPort.x, this.offsetToViewPort.y, trees);

      if (currentTree) {
        var dragStartTree = this.store;

        if (prevTree == null) {
          prevTree = dragStartTree;
        }

        if (prevTree !== currentTree) {
          if (!vf.isPropTrue(dragStartTree.crossTree) || !vf.isPropTrue(currentTree.crossTree)) {
            return;
          }

          prevTree = currentTree;
        }

        if (!vf.isPropTrue(currentTree.droppable)) {
          return;
        }

        return currentTree;
      }
    },
    currentTreeRootEl: function currentTreeRootEl() {
      return document.getElementById(this.currentTree.rootData._id);
    },
    currentTreeRootOf4: function currentTreeRootOf4() {
      return getOf4(this.currentTreeRootEl, this.currentTree.space);
    },
    // the second child of currentTree root, excluding dragging node
    currentTreeRootSecondChildExcludingDragging: function currentTreeRootSecondChildExcludingDragging() {
      var _this = this;

      return this.currentTree.rootData.children.slice(0, 3).filter(function (v) {
        return v !== _this.node;
      })[1];
    },
    // placeholder
    dplhEl: function dplhEl() {
      return document.getElementById(this.dplh._id);
    },
    dplhElInCurrentTree: function dplhElInCurrentTree() {
      return Boolean(this.currentTree.$el.querySelector("#".concat(this.dplh._id)));
    },
    dplhOf4: function dplhOf4() {
      return getOf4(this.dplhEl, this.currentTree.space);
    },
    dplhAtTop: function dplhAtTop() {
      return Math.abs(this.dplhOf4.y - this.currentTreeRootOf4.y) < 5;
    },
    targetAtTop: function targetAtTop() {
      return Math.abs(this.tiOf4.y - this.currentTreeRootOf4.y) < 5;
    },
    targetAtBottom: function targetAtBottom() {
      return Math.abs(this.tiOf4.y2 - this.currentTreeRootOf4.y2) < 5;
    },
    // most related node
    // 最相关的另一个节点
    targetNode: function targetNode() {
      var currentTree = this.currentTree;

      if (!currentTree) {
        throw 'no currentTree';
      } //


      var _this$offset = this.offset,
          x = _this$offset.x,
          y = _this$offset.y;
      var currentNode = currentTree.rootData;

      while (true) {
        var children = currentNode.children;

        if (!children) {
          break;
        }

        if (this.node.parent === currentNode) {
          // dragging node is in currentNode children, remove it first
          children = children.slice();
          children.splice(children.indexOf(this.node), 1);
        }

        if (children.length === 0) {
          break;
        }

        var t = hp.binarySearch(children, function (node) {
          var el = document.getElementById(node._id);
          var ty = hp.getOffset(el).y;
          var ty2 = ty + el.offsetHeight + currentTree.space;

          if (ty2 < y) {
            return -1;
          } else if (ty <= y) {
            return 0;
          } else {
            return 1;
          }
        }, null, null, true);

        if (t.hit) {
          currentNode = t.value;
        } else {
          if (t.bigger) {
            currentNode = children[t.index - 1];
          } else {
            currentNode = t.value;
          }
        }

        if (!currentNode) {
          currentNode = children[0];
          break;
        }

        if (!currentNode) {
          break;
        }

        var innerEl = document.getElementById(currentNode._id).querySelector('.tree-node-inner');
        var of = getOf4(innerEl, currentTree.space);

        if (of.y <= y && y <= of.y2) {
          break;
        }
      }

      return currentNode;
    },
    targetNodeEl: function targetNodeEl() {
      return document.getElementById(this.targetNode._id);
    },
    // targetNodeInnerElOffset
    tiInnerEl: function tiInnerEl() {
      return this.targetNodeEl.querySelector('.tree-node-inner');
    },
    tiOffset: function tiOffset() {
      return hp.getOffset(this.tiInnerEl);
    },
    tiOf4: function tiOf4() {
      return getOf4(this.tiInnerEl, this.currentTree.space);
    },
    tiMiddleY: function tiMiddleY() {
      return this.tiOffset.y + this.tiInnerEl.offsetHeight / 2;
    },
    //
    targetPrevEl: function targetPrevEl() {
      // tree node 之间不要有其他元素, 否则这里会获取到错误的元素
      var r = this.targetNodeEl.previousSibling;

      if (hp.hasClass(r, 'dragging')) {
        r = r.previousSibling;
      }

      return r;
    },
    targetPrev: function targetPrev() {
      var id = this.targetPrevEl.getAttribute('id');
      return this.currentTree.getNodeById(id);
    }
  }); // attachCache end
  // decision start =================================

  var executedRuleCache = {}; // exec rule

  var exec = function exec(ruleId) {
    if (!executedRuleCache.hasOwnProperty(ruleId)) {
      var r;

      try {
        r = rules[ruleId](info);
      } catch (e) {
        r = e;

        try {
          if (process.env.DEVELOPE_SELF) {
            // only visible when develop its self
            console.warn("failed to execute rule '".concat(ruleId, "'"), e);
          }
        } catch (e2) {}
      }

      executedRuleCache[ruleId] = r;
    }

    return executedRuleCache[ruleId];
  };

  if (exec('currentTree existed') === true) {
    if (exec('targetNode is placeholder') === false) {
      if (exec('targetNode is the second child of root') === true) {
        if (exec('targetNode has children excluding placeholder') === false) {
          if (exec('on targetNode middle') === true) {
            targets['before'](info);
          } else if (exec('on targetNode middle') === false) {
            if (exec('at indent right') === true) {
              targets['append'](info);
            } else if (exec('at indent right') === false) {
              targets['after'](info);
            }
          }
        } else if (exec('targetNode has children excluding placeholder') === true) {
          targets['prepend'](info);
        }
      } else if (exec('targetNode is the second child of root') === false) {
        if (exec('currentTree empty') === false) {
          if (exec('targetNode at top') === true) {
            if (exec('placeholder in currentTree') === true) {
              if (exec('targetNode has children excluding placeholder') === false) {
                if (exec('on targetNode middle') === false) {
                  if (exec('at indent right') === false) {
                    targets['after'](info);
                  } else if (exec('at indent right') === true) {
                    targets['append'](info);
                  }
                } else if (exec('on targetNode middle') === true) {
                  targets['before'](info);
                }
              } else if (exec('targetNode has children excluding placeholder') === true) {
                if (exec('on targetNode middle') === false) {
                  targets['prepend'](info);
                } else if (exec('on targetNode middle') === true) {
                  targets['before'](info);
                }
              }
            } else if (exec('placeholder in currentTree') === false) {
              targets['before'](info);
            }
          } else if (exec('targetNode at top') === false) {
            if (exec('targetNode at bottom') === false) {
              if (exec('placeholder at top') === true) {
                targets['prepend'](info);
              } else if (exec('placeholder at top') === false) {
                if (exec('targetNode has children excluding placeholder') === true) {
                  targets['prepend'](info);
                } else if (exec('targetNode has children excluding placeholder') === false) {
                  if (exec('targetNode is 1st child') === false) {
                    if (exec('targetNode is last child') === false) {
                      if (exec('on targetNode middle') === true) {
                        if (exec('at indent right') === true) {
                          targets['append'](info);
                        } else if (exec('at indent right') === false) {
                          targets['after'](info);
                        }
                      } else if (exec('on targetNode middle') === false) {
                        if (exec('at indent right') === true) {
                          targets['append'](info);
                        } else if (exec('at indent right') === false) {
                          targets['after'](info);
                        }
                      }
                    } else if (exec('targetNode is last child') === true) {
                      if (exec('at indent right') === true) {
                        targets['append'](info);
                      } else if (exec('at indent right') === false) {
                        targets['after'](info);
                      }
                    }
                  } else if (exec('targetNode is 1st child') === true) {
                    if (exec('targetNode is last child') === true) {
                      targets['append'](info);
                    } else if (exec('targetNode is last child') === false) {
                      if (exec('on targetNode middle') === false) {
                        if (exec('at indent right') === false) {
                          targets['after'](info);
                        } else if (exec('at indent right') === true) {
                          targets['append'](info);
                        }
                      } else if (exec('on targetNode middle') === true) {
                        if (exec('at indent right') === false) {
                          targets['after'](info);
                        } else if (exec('at indent right') === true) {
                          targets['append'](info);
                        }
                      }
                    }
                  }
                }
              }
            } else if (exec('targetNode at bottom') === true) {
              if (exec('placeholder in currentTree') === true) {
                if (exec('on targetNode middle') === false) {
                  if (exec('at indent right') === true) {
                    targets['append'](info);
                  } else if (exec('at indent right') === false) {
                    targets['after'](info);
                  }
                } else if (exec('on targetNode middle') === true) {
                  targets['append'](info);
                }
              } else if (exec('placeholder in currentTree') === false) {
                targets['append'](info);
              }
            }
          }
        } else if (exec('currentTree empty') === true) {
          targets['append current tree'](info);
        }
      }
    } else if (exec('targetNode is placeholder') === true) {
      if (exec('targetNode at bottom') === false) {
        if (exec('targetNode is the second child of root') === false) {
          if (exec('targetNode is 1st child') === true) {
            if (exec('targetNode is last child') === false) ; else if (exec('targetNode is last child') === true) {
              if (exec('on targetNode middle') === false) {
                if (exec('at left') === true) {
                  targets['after target parent'](info);
                } else if (exec('at left') === false) ;
              } else if (exec('on targetNode middle') === true) {
                if (exec('at left') === true) {
                  targets['after target parent'](info);
                } else if (exec('at left') === false) ;
              }
            }
          } else if (exec('targetNode is 1st child') === false) {
            if (exec('targetNode is last child') === true) {
              if (exec('on targetNode middle') === true) {
                if (exec('at left') === true) {
                  targets['after target parent'](info);
                } else if (exec('at left') === false) {
                  if (exec('at indent right') === true) {
                    targets['append prev'](info);
                  } else if (exec('at indent right') === false) ;
                }
              } else if (exec('on targetNode middle') === false) {
                if (exec('at left') === true) {
                  targets['after target parent'](info);
                } else if (exec('at left') === false) {
                  if (exec('at indent right') === true) {
                    targets['append prev'](info);
                  } else if (exec('at indent right') === false) ;
                }
              }
            } else if (exec('targetNode is last child') === false) {
              if (exec('on targetNode middle') === true) {
                if (exec('at left') === true) ; else if (exec('at left') === false) {
                  if (exec('at indent right') === true) {
                    targets['append prev'](info);
                  } else if (exec('at indent right') === false) ;
                }
              } else if (exec('on targetNode middle') === false) {
                if (exec('at left') === true) ; else if (exec('at left') === false) {
                  if (exec('at indent right') === true) {
                    targets['append prev'](info);
                  } else if (exec('at indent right') === false) ;
                }
              }
            }
          }
        } else if (exec('targetNode is the second child of root') === true) {
          if (exec('on targetNode middle') === true) {
            if (exec('at indent right') === true) {
              targets['append prev'](info);
            } else if (exec('at indent right') === false) ;
          } else if (exec('on targetNode middle') === false) {
            if (exec('at indent right') === true) {
              targets['append prev'](info);
            } else if (exec('at indent right') === false) ;
          }
        }
      } else if (exec('targetNode at bottom') === true) {
        if (exec('targetNode is 1st child') === true) {
          if (exec('on targetNode middle') === false) {
            if (exec('at left') === true) {
              targets['after target parent'](info);
            } else if (exec('at left') === false) ;
          } else if (exec('on targetNode middle') === true) {
            if (exec('at left') === false) ; else if (exec('at left') === true) {
              targets['after target parent'](info);
            }
          }
        } else if (exec('targetNode is 1st child') === false) {
          if (exec('on targetNode middle') === false) {
            if (exec('at left') === true) {
              targets['after target parent'](info);
            } else if (exec('at left') === false) {
              if (exec('at indent right') === true) {
                targets['append prev'](info);
              } else if (exec('at indent right') === false) ;
            }
          } else if (exec('on targetNode middle') === true) {
            if (exec('at left') === true) {
              targets['after target parent'](info);
            } else if (exec('at left') === false) {
              if (exec('at indent right') === true) {
                targets['append prev'](info);
              } else if (exec('at indent right') === false) ;
            }
          }
        }
      }
    }
  } else if (exec('currentTree existed') === false) ; // decision end =================================
  //

}

function getOf4(el, space) {
  var r = hp.getOffset(el);
  r.x2 = r.x + el.offsetWidth;
  r.y2 = r.y + el.offsetHeight + space;
  return r;
}

autoMoveDragPlaceHolder.dragStart = function dragStart() {};

autoMoveDragPlaceHolder.dragEnd = function dragEnd() {
  prevTree = null;
  droppableIds = {};
  draggableIds = {};
};

var script$2 = {
  extends: TreeNode,
  name: 'TreeNode',
  mounted: function mounted() {
    var _this = this;

    this.store.isNodeDraggable = isNodeDraggable;
    this.store.isNodeDroppable = isNodeDroppable;

    if (this.isRoot || this.data.isDragPlaceHolder) {
      return;
    }

    var dplh = this.store.dplh;
    this.$watch('store.draggable', function (draggable) {
      if (vf.isPropTrue(draggable)) {
        var triggerEl = _this.store.getTriggerEl ? _this.store.getTriggerEl(_this) : _this.$el.querySelector('.tree-node-inner');
        _this._draggableDestroy = draggableHelper(triggerEl, {
          preventSelect: vf.isPropTrue(_this.store.preventSelect),
          // trigger el
          getEl: function getEl() {
            return _this.$el;
          },
          minTranslate: 10,
          drag: function drag(e, opt, store) {
            autoMoveDragPlaceHolder.dragStart(); // this store is not tree

            var draggableHelperInfo = {
              event: e,
              options: opt,
              store: store
            };

            if (_this.store.ondragstart && _this.store.ondragstart(_this.data, draggableHelperInfo) === false) {
              return false;
            }

            if (!isNodeDraggable(_this.data)) {
              return false;
            }

            _this.store.$emit('drag', _this.data); // record start positon


            var siblings = _this.data.parent.children;
            _this.startPosition = {
              siblings: siblings,
              index: siblings.indexOf(_this.data) //

            };
            dplh.innerStyle.height = store.el.offsetHeight + 'px';
            th.insertAfter(dplh, _this.data);
            _this.data.class += ' dragging'; // console.log('drag start');
          },
          moving: function moving(e, opt, store) {
            if (store.movedCount === 0) {
              return;
            }

            var draggableHelperInfo = {
              event: e,
              options: opt,
              store: store
            };
            return autoMoveDragPlaceHolder.call(_this, draggableHelperInfo);
          },
          drop: function drop(e, opt, store) {
            autoMoveDragPlaceHolder.dragEnd();
            var draggableHelperInfo = {
              event: e,
              options: opt,
              store: store
            };

            if (_this.store.ondragend && _this.store.ondragend(_this.data, draggableHelperInfo) === false) {
              hp.arrayRemove(dplh.parent.children, dplh); // can't drop, no change
            } else {
              var targetTree = dplh._vm.store;
              var crossTree = targetTree !== _this.store;
              var oldTree = crossTree ? _this.store : null;
              th.insertAfter(_this.data, dplh);
              hp.arrayRemove(dplh.parent.children, dplh);
              _this.data.class = _this.data.class.replace(/(^| )dragging( |$)/g, ' ');
              targetTree.$emit('drop', _this.data, targetTree, oldTree);
              oldTree && oldTree.$emit('drop', _this.data, targetTree, oldTree); // emit change event if changed

              var siblings = _this.data.parent.children;

              if (siblings === _this.startPosition.siblings && siblings.indexOf(_this.data) === _this.startPosition.index) ; else {
                _this.store.$emit('change', _this.data, targetTree, oldTree);

                oldTree && oldTree.$emit('change', _this.data, targetTree, oldTree);
              }

              _this.startPosition = null;
            } // console.log('drag end');

          }
        });
      } else {
        if (_this._draggableDestroy) {
          _this._draggableDestroy();

          _this._draggableDestroy = null;
        }
      }
    }, {
      immediate: true
    });
  }
};

/* script */
            const __vue_script__$2 = script$2;
            
/* template */

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = undefined;
  /* component normalizer */
  function __vue_normalize__$2(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DraggableTreeNode.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var DraggableTreeNode = __vue_normalize__$2(
    {},
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

var trees = []; // for multiple trees
// DragPlaceHolder, unique

var dplh = {
  _id: 'draggable_tree_drag_placeHolder',
  level: null,
  droppable: false,
  isDragPlaceHolder: true,
  class: 'draggable-placeholder',
  style: {},
  innerStyle: {},
  innerClass: 'draggable-placeholder-inner',
  innerBackStyle: {},
  innerBackClass: 'draggable-placeholder-inner-back' // children: [],

};
var script$3 = {
  extends: Tree,
  props: {
    getTriggerEl: {
      type: Function
    },
    draggable: {},
    droppable: {
      default: true
    },
    crossTree: {},
    ondragstart: {
      type: Function
    },
    ondragend: {
      type: Function
    },
    preventSelect: {
      default: true
    }
  },
  components: {
    TreeNode: DraggableTreeNode
  },
  data: function data() {
    return {
      // DragPlaceHolder
      dplh: dplh,
      trees: trees
    };
  },
  // computed: {},
  // watch: {},
  // methods: {},
  created: function created() {
    trees.push(this);
  },
  mounted: function mounted() {},
  beforeDestroy: function beforeDestroy() {
    hp.arrayRemove(trees, this);
  }
};

/* script */
            const __vue_script__$3 = script$3;
            
/* template */

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = undefined;
  /* component normalizer */
  function __vue_normalize__$3(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DraggableTree.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var DraggableTree = __vue_normalize__$3(
    {},
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );

exports.Tree = Tree;
exports.TreeNode = TreeNode;
exports.DraggableTree = DraggableTree;
exports.DraggableTreeNode = DraggableTreeNode;
