/*!
 * vue-draggable-nested-tree v2.2.2
 * (c) 2018-present phphe <phphe@outlook.com>
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var th = require('tree-helper');
var hp = require('helper-js');
var draggableHelper = _interopDefault(require('draggable-helper'));

var TreeNode = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "tree-node",
      class: [_vm.data.active ? _vm.store.activatedClass : '', _vm.data.open ? _vm.store.openedClass : '', _vm.data.class],
      style: _vm.data.style,
      attrs: {
        "id": _vm.data._id
      }
    }, [!_vm.isRoot ? _c('div', {
      staticClass: "tree-node-inner-back",
      class: [_vm.data.innerBackClass],
      style: [_vm.innerBackStyle, _vm.data.innerBackStyle]
    }, [_c('div', {
      staticClass: "tree-node-inner",
      class: [_vm.data.innerClass],
      style: [_vm.data.innerStyle]
    }, [_vm._t("default", null, {
      data: _vm.data,
      store: _vm.store,
      vm: _vm.vm
    })], 2)]) : _vm._e(), _vm.childrenVisible ? _c('div', {
      staticClass: "tree-node-children"
    }, _vm._l(_vm.data.children, function (child) {
      return _c('TreeNode', {
        key: child._id,
        attrs: {
          "data": child,
          "store": _vm.store,
          "level": _vm.childrenLevel
        },
        scopedSlots: _vm._u([{
          key: "default",
          fn: function fn(props) {
            return [_vm._t("default", null, {
              data: props.data,
              store: props.store,
              vm: props.vm
            })];
          }
        }])
      });
    })) : _vm._e()]);
  },
  staticRenderFns: [],
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
      return this.data.isRoot;
    },
    childrenVisible: function childrenVisible() {
      var data = this.data;
      return this.isRoot || data.children && data.children.length && data.open;
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

var Tree = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "he-tree tree"
    }, [_c('TreeNode', {
      attrs: {
        "data": _vm.rootData,
        "store": _vm.store
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function fn(props) {
          return [_vm._t("default", null, {
            data: props.data,
            store: _vm.store,
            vm: props.vm
          })];
        }
      }])
    })], 1);
  },
  staticRenderFns: [],
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
    } // space between node, unit px

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
          _id: "tree_".concat(this._uid, "_node_root")
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

      var t = Object.assign({}, node);
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

      var _arr = Object.keys(t);

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
      var opened = this.opened;

      if (closeOld) {
        this.getOpened().forEach(function (node2) {
          node2.open = false;
        });
      }

      node.open = true;
    },
    toggleOpen: function toggleOpen(node, closeOld) {
      if (node.open) {
        node.open = false;
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
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
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
    Object.defineProperty(obj, key, {
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

function isPropTrue(v) {
  return v || v === '';
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
      info.targetNode.open = true;
    } else {
      insertDplhAfterTo(info.dplh, info.targetNode, info);
    }
  },
  'prepend': function prepend(info) {
    if (isNodeDroppable(info.targetNode)) {
      th.prependTo(info.dplh, info.targetNode);
      info.targetNode.open = true;
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
      info.targetPrev.open = true;
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

var _arr = Object.keys(rules);

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
    // tree
    currentTree: function currentTree() {
      var _this = this;

      var currentTree = trees.find(function (tree) {
        return hp.isOffsetInEl(_this.offset.x, _this.offset.y, tree.$el);
      });

      if (currentTree) {
        var dragStartTree = this.store;

        if (prevTree == null) {
          prevTree = dragStartTree;
        }

        if (prevTree !== currentTree) {
          if (!isPropTrue(dragStartTree.crossTree) || !isPropTrue(currentTree.crossTree)) {
            return;
          }

          prevTree = currentTree;
        }

        if (!isPropTrue(currentTree.droppable)) {
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
      var _this2 = this;

      return this.currentTree.rootData.children.slice(0, 3).filter(function (v) {
        return v !== _this2.node;
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
            if (exec('targetNode is last child') === false) {
              targets['nothing'](info);
            } else if (exec('targetNode is last child') === true) {
              if (exec('on targetNode middle') === false) {
                if (exec('at left') === true) {
                  targets['after target parent'](info);
                } else if (exec('at left') === false) {
                  targets['nothing'](info);
                }
              } else if (exec('on targetNode middle') === true) {
                if (exec('at left') === true) {
                  targets['after target parent'](info);
                } else if (exec('at left') === false) {
                  targets['nothing'](info);
                }
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
                  } else if (exec('at indent right') === false) {
                    targets['nothing'](info);
                  }
                }
              } else if (exec('on targetNode middle') === false) {
                if (exec('at left') === true) {
                  targets['after target parent'](info);
                } else if (exec('at left') === false) {
                  if (exec('at indent right') === true) {
                    targets['append prev'](info);
                  } else if (exec('at indent right') === false) {
                    targets['nothing'](info);
                  }
                }
              }
            } else if (exec('targetNode is last child') === false) {
              if (exec('on targetNode middle') === true) {
                if (exec('at left') === true) {
                  targets['nothing'](info);
                } else if (exec('at left') === false) {
                  if (exec('at indent right') === true) {
                    targets['append prev'](info);
                  } else if (exec('at indent right') === false) {
                    targets['nothing'](info);
                  }
                }
              } else if (exec('on targetNode middle') === false) {
                if (exec('at left') === true) {
                  targets['nothing'](info);
                } else if (exec('at left') === false) {
                  if (exec('at indent right') === true) {
                    targets['append prev'](info);
                  } else if (exec('at indent right') === false) {
                    targets['nothing'](info);
                  }
                }
              }
            }
          }
        } else if (exec('targetNode is the second child of root') === true) {
          if (exec('on targetNode middle') === true) {
            if (exec('at indent right') === true) {
              targets['append prev'](info);
            } else if (exec('at indent right') === false) {
              targets['nothing'](info);
            }
          } else if (exec('on targetNode middle') === false) {
            if (exec('at indent right') === true) {
              targets['append prev'](info);
            } else if (exec('at indent right') === false) {
              targets['nothing'](info);
            }
          }
        }
      } else if (exec('targetNode at bottom') === true) {
        if (exec('targetNode is 1st child') === true) {
          if (exec('on targetNode middle') === false) {
            if (exec('at left') === true) {
              targets['after target parent'](info);
            } else if (exec('at left') === false) {
              targets['nothing'](info);
            }
          } else if (exec('on targetNode middle') === true) {
            if (exec('at left') === false) {
              targets['nothing'](info);
            } else if (exec('at left') === true) {
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
              } else if (exec('at indent right') === false) {
                targets['nothing'](info);
              }
            }
          } else if (exec('on targetNode middle') === true) {
            if (exec('at left') === true) {
              targets['after target parent'](info);
            } else if (exec('at left') === false) {
              if (exec('at indent right') === true) {
                targets['append prev'](info);
              } else if (exec('at indent right') === false) {
                targets['nothing'](info);
              }
            }
          }
        }
      }
    }
  } else if (exec('currentTree existed') === false) {
    targets['nothing'](info);
  } // decision end =================================
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

var DraggableTreeNode = {
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
      if (isPropTrue(draggable)) {
        var triggerEl = _this.store.getTriggerEl ? _this.store.getTriggerEl(_this) : _this.$el.querySelector('.tree-node-inner');
        _this._draggableDestroy = draggableHelper(triggerEl, {
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

              if (siblings === _this.startPosition.siblings && siblings.indexOf(_this.data) === _this.startPosition.index) {// not moved
              } else {
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
var DraggableTree = {
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

exports.Tree = Tree;
exports.TreeNode = TreeNode;
exports.DraggableTree = DraggableTree;
exports.DraggableTreeNode = DraggableTreeNode;
