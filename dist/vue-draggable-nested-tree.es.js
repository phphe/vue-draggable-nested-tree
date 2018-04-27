/*!
 * vue-draggable-nested-tree v1.0.0
 * (c) 2018-present phphe <phphe@outlook.com>
 * Released under the MIT License.
 */
import { strRand, arrayRemove, getOffset, isOffsetInEl, binarySearch, hasClass } from 'helper-js';
import { forIn, insertAfter, insertBefore, appendTo, prependTo, depthFirstSearch } from 'tree-helper';
import draggableHelper from 'draggable-helper';

var TreeNode = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "tree-node",
      class: [_vm.data.active ? _vm.store.activatedClass : '', _vm.data.open ? _vm.store.openedClass : '', _vm.data.class],
      attrs: {
        "id": _vm.data._id,
        "data-level": _vm.level
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
      level: _vm.level,
      store: _vm.store
    })], 2)]) : _vm._e(), _vm.childrenVisible ? _c('div', {
      staticClass: "tree-node-children"
    }, _vm._l(_vm.data.children, function (child) {
      return _c('TreeNode', {
        key: child._id,
        attrs: {
          "data": child,
          "level": _vm.childLevel,
          "store": _vm.store
        },
        scopedSlots: _vm._u([{
          key: "default",
          fn: function fn(props) {
            return [_vm._t("default", null, {
              data: props.data,
              level: props.level,
              store: props.store
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
    level: {},
    store: {}
  },
  data: function data() {
    return {};
  },
  computed: {
    isRoot: function isRoot() {
      return this.level === 0;
    },
    childLevel: function childLevel() {
      return this.level + 1;
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
        var indentType = this.store.indentType;
        r.paddingLeft = (this.level - 1) * this.store.indent + 'px';
      }

      return r;
    }
  } // watch: {},
  // methods: {},
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
        "level": 0,
        "store": _vm.store
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function fn(props) {
          return [_vm._t("default", null, {
            data: props.data,
            level: props.level,
            store: _vm.store
          })];
        }
      }])
    })], 1);
  },
  staticRenderFns: [],
  props: {
    data: {},
    idLength: {
      default: 5
    },
    indent: {
      default: 16
    },
    activatedClass: {
      default: 'active'
    },
    openedClass: {
      default: 'open'
    },
    space: {
      default: 10
    } // space between node, unit px

  },
  components: {
    TreeNode: TreeNode
  },
  data: function data() {
    return {
      store: this,
      rootData: null,
      activated: [],
      opened: [],
      idMapping: {}
    };
  },
  computed: {},
  watch: {
    data: {
      immediate: true,
      handler: function handler(data, old) {
        var _this = this;

        // make rootData always use a same object
        this.rootData = this.rootData || {
          isRoot: true,
          _id: "tree_".concat(this._uid, "_node_root")
        };
        this.rootData.children = data;
        var activated = [];
        var opened = [];
        var idMapping = {};
        forIn(data, function (item, k, parent) {
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
            if (!item.hasOwnProperty(key)) {
              _this.$set(item, key, compeletedData[key]);
            }
          }

          _this.$set(item, 'parent', parent || _this.rootData);

          if (!item.hasOwnProperty('_id')) {
            item._id = "tree_".concat(_this._uid, "_node_").concat(strRand(_this.idLength));
          }

          idMapping[item._id] = item;

          if (item.active) {
            activated.push(item);
          }

          if (item.open) {
            opened.push(item);
          }
        });
        this.activated = activated;
        this.opened = opened;
        this.idMapping = idMapping;
      }
    }
  },
  methods: {
    // pure node self
    pure: function pure(data, withChildren) {
      var _this2 = this;

      var t = Object.assign({}, data);
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

        if (key.startsWidth('_')) {
          delete t[key];
        }
      }

      if (withChildren && data.children) {
        t.children = data.children.slice();
        t.children.forEach(function (v, k) {
          t.children[k] = _this2.pure(v, withChildren);
        });
      }

      return t;
    },
    activeNode: function activeNode(node, inactiveOld) {
      if (inactiveOld) {
        this.activated.forEach(function (item) {
          item.active = false;
        });
        this.activated = [];
      }

      this.activated.push(node);
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
      if (closeOld) {
        this.opened.forEach(function (item) {
          item.open = false;
        });
        this.opened = [];
      }

      this.opened.push(node);
      node.open = true;
    },
    toggleOpen: function toggleOpen(node, closeOld) {
      if (node.open) {
        node.open = false;
      } else {
        this.openNode(node, closeOld);
      }
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
  'nothing': function nothing(input) {},
  'after': function after(_ref) {
    var dplh = _ref.dplh,
        targetNode = _ref.targetNode,
        currentTree = _ref.currentTree;
    // after targetNode or closest droppable parent
    var node = targetNode;

    while (!node.parent._droppable) {
      node = node.parent;
    }

    insertAfter(dplh, node);
  },
  'before': function before(_ref2) {
    var dplh = _ref2.dplh,
        targetNode = _ref2.targetNode;
    insertBefore(dplh, targetNode);
  },
  'append': function append(_ref3) {
    var dplh = _ref3.dplh,
        targetNode = _ref3.targetNode;
    appendTo(dplh, targetNode);
    targetNode.open = true;
  },
  'prepend': function prepend(input) {
    var dplh = input.dplh,
        targetNode = input.targetNode;
    prependTo(dplh, targetNode);
    targetNode.open = true; // prepend may open a closed node which has children

    if (!targetNode.open) {
      targetNode.open = true;
      resolveBranchDroppable(input, targetNode);
    }
  },
  'after target parent': function afterTargetParent(_ref4) {
    var dplh = _ref4.dplh,
        targetNode = _ref4.targetNode;
    insertAfter(dplh, targetNode.parent);
  },
  // append to prev sibling
  'append prev': function appendPrev(_ref5) {
    var dplh = _ref5.dplh,
        targetNode = _ref5.targetNode,
        node = _ref5.node,
        targetPrev = _ref5.targetPrev;
    appendTo(dplh, targetPrev);
    targetPrev.open = true;
  }
};

function findChild(input, children, handler, reverse) {
  var len = children.length;

  if (reverse) {
    for (var i = len - 1; i >= 0; i--) {
      var item = children[i]; // excluding dragging node

      if (item !== input.node) {
        if (handler(item, i)) {
          return item;
        }
      }
    }
  } else {
    for (var _i = 0; _i < len; _i++) {
      var _item = children[_i]; // excluding dragging node

      if (_item !== input.node) {
        if (handler(_item, _i)) {
          return _item;
        }
      }
    }
  }
}

var rules = {
  // 另一节点存在
  'targetNode existed': function targetNodeExisted(input) {
    return input.targetNode;
  },
  // 另一节点是拖动占位节点
  'targetNode is placeholder': function targetNodeIsPlaceholder(input) {
    return input.targetNode.isDragPlaceHolder;
  },
  // 另一节点父级是根节点
  'targetNode parent is root': function targetNodeParentIsRoot(input) {
    return input.targetNode.parent.isRoot;
  },
  // 拖动点坐标在任一树中, 同时, 起始树要可拖出, 当前树要可拖入
  'currentTree existed': function currentTreeExisted(input) {
    return input.currentTree;
  },
  // 占位节点存在
  'placeholder existed': function placeholderExisted(input) {
    return input.dplhEl;
  },
  // 占位节点在当前树中
  'placeholder in currentTree': function placeholderInCurrentTree(input) {
    return input.dplhElInCurrentTree;
  },
  // 占位节点在最上面
  'placeholder at top': function placeholderAtTop(input) {
    return input.dplhAtTop;
  },
  // 另一节点是打开的
  'targetNode is open': function targetNodeIsOpen(input) {
    return input.targetNode.open;
  },
  // 另一节点是根节点
  'targetNode is root': function targetNodeIsRoot(input) {
    return input.targetNode.isRoot;
  },
  // 另一节点有子(不包括占位节点)
  'targetNode has children excluding placeholder': function targetNodeHasChildrenExcludingPlaceholder(input) {
    return findChild(input, input.targetNode.children, function (v) {
      return v !== input.dplh;
    });
  },
  // 另一节点可放置
  'targetNode is droppable': function targetNodeIsDroppable(input) {
    return input.targetNode._droppable;
  },
  // 另一节点是第一个节点
  'targetNode is 1st child': function targetNodeIs1stChild(input) {
    return findChild(input, input.targetNode.parent.children, function (v) {
      return v;
    }) === input.targetNode;
  },
  // 另一节点是最后节点
  'targetNode is last child': function targetNodeIsLastChild(input) {
    return findChild(input, input.targetNode.parent.children, function (v) {
      return v;
    }, true) === input.targetNode;
  },
  // 另一节点上一个节点可放置
  'targetNode prev is droppable': function targetNodePrevIsDroppable(input) {
    return input.targetPrev._droppable;
  },
  // 当前位置在另一节点inner垂直中线上
  'on targetNode middle': function onTargetNodeMiddle(input) {
    return input.offset.y <= input.tiMiddleY;
  },
  // 当前位置在另一节点inner左边
  'at left': function atLeft(input) {
    return input.offset.x < input.tiOffset.x;
  },
  // 当前位置在另一节点innner indent位置右边
  'at indent right': function atIndentRight(input) {
    return input.offset.x > input.tiOffset.x + input.currentTree.indent;
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

var prevTree; // context is vm
// dhStore: draggable helper store

function autoMoveDragPlaceHolder (e, opt, dhStore, trees) {
  // make input // todo change input to info
  var input = {
    event: e,
    el: dhStore.el,
    vm: this,
    node: this.data,
    store: this.store,
    dplh: this.store.dplh,
    draggableHelperData: {
      opt: opt,
      store: dhStore
    } //

  };
  attachCache(input, new Cache(), {
    // dragging node coordinate
    // 拖动中的节点相关坐标
    nodeInnerEl: function nodeInnerEl() {
      return this.el.querySelector('.tree-node-inner');
    },
    offset: function offset() {
      return getOffset(this.nodeInnerEl);
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
        return isOffsetInEl(_this.offset.x, _this.offset.y, tree.$el);
      });

      if (currentTree) {
        var dragStartTree = this.store;
        var treeChanged;

        if (dhStore.movedCount === 0) {
          prevTree = dragStartTree;
          treeChanged = true;
        }

        if (prevTree !== currentTree) {
          if (!isPropTrue(dragStartTree.crossTree) || !isPropTrue(currentTree.crossTree)) {
            return;
          }

          prevTree = currentTree;
          treeChanged = true;
        }

        if (!isPropTrue(currentTree.droppable)) {
          return;
        }

        if (treeChanged) {
          // when move start or drag move into another tree
          // resolve _droppable
          resolveBranchDroppable(input, currentTree.rootData);
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
      return Math.abs(dplhOf4.y - this.currentTreeRootOf4.y) < 5;
    },
    dplhAtBottom: function dplhAtBottom() {
      return Math.abs(dplhOf4.y2 - this.currentTreeRootOf4.y2) < 5;
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

        var t = binarySearch(children, function (node) {
          var el = document.getElementById(node._id);
          var ty = getOffset(el).y;
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
      return getOffset(this.tiInnerEl);
    },
    tiMiddleY: function tiMiddleY() {
      return this.tiOffset.y + this.tiInnerEl.offsetHeight / 2;
    },
    //
    targetPrevEl: function targetPrevEl() {
      // tree node 之间不要有其他元素, 否则这里会获取到错误的元素
      var r = this.targetNodeEl.previousSibling;

      if (hasClass(r, 'dragging')) {
        r = r.previousSibling;
      }

      return r;
    },
    targetPrev: function targetPrev() {
      var id = this.targetPrevEl.getAttribute('id');
      return this.currentTree.idMapping[id];
    }
  }); // attachCache end
  // decision start =================================

  var executedRuleCache = {}; // exec rule

  var exec = function exec(ruleId) {
    if (!executedRuleCache.hasOwnProperty(ruleId)) {
      var r;

      try {
        r = rules[ruleId](input);
      } catch (e) {
        r = e;
        console.warn("failed to execute rule '".concat(ruleId, "'"), e);
      }

      executedRuleCache[ruleId] = r;
    }

    return executedRuleCache[ruleId];
  };

  if (exec('currentTree existed') === true) {
    if (exec('targetNode is placeholder') === false) {
      if (exec('placeholder existed') === true) {
        if (exec('placeholder in currentTree') === true) {
          if (exec('targetNode parent is root') === false) {
            if (exec('targetNode is open') === true) {
              if (exec('targetNode has children excluding placeholder') === false) {
                if (exec('targetNode is droppable') === true) {
                  if (exec('at left') === false) {
                    if (exec('targetNode is 1st child') === true) {
                      if (exec('at indent right') === true) {
                        targets['append'](input);
                      } else if (exec('at indent right') === false) {
                        targets['after'](input);
                      }
                    } else if (exec('targetNode is 1st child') === false) {
                      targets['append'](input);
                    }
                  } else if (exec('at left') === true) {
                    targets['after'](input);
                  }
                } else if (exec('targetNode is droppable') === false) {
                  targets['after'](input);
                }
              } else if (exec('targetNode has children excluding placeholder') === true) {
                if (exec('targetNode is droppable') === true) {
                  targets['prepend'](input);
                } else if (exec('targetNode is droppable') === false) {
                  targets['after'](input);
                }
              }
            } else if (exec('targetNode is open') === false) {
              if (exec('targetNode is droppable') === true) {
                if (exec('at indent right') === false) {
                  targets['after'](input);
                } else if (exec('at indent right') === true) {
                  targets['prepend'](input);
                }
              } else if (exec('targetNode is droppable') === false) {
                targets['after'](input);
              }
            }
          } else if (exec('targetNode parent is root') === true) {
            if (exec('targetNode is open') === true) {
              if (exec('targetNode has children excluding placeholder') === false) {
                if (exec('targetNode is droppable') === true) {
                  if (exec('targetNode is 1st child') === false) {
                    if (exec('targetNode prev is droppable') === false) {
                      targets['append'](input);
                    } else if (exec('targetNode prev is droppable') === true) {
                      if (exec('on targetNode middle') === false) {
                        if (exec('at indent right') === false) {
                          targets['after'](input);
                        } else if (exec('at indent right') === true) {
                          targets['append'](input);
                        }
                      } else if (exec('on targetNode middle') === true) {
                        targets['append'](input);
                      }
                    }
                  } else if (exec('targetNode is 1st child') === true) {
                    if (exec('on targetNode middle') === true) {
                      targets['before'](input);
                    } else if (exec('on targetNode middle') === false) {
                      if (exec('at indent right') === true) {
                        targets['append'](input);
                      } else if (exec('at indent right') === false) {
                        targets['after'](input);
                      }
                    }
                  }
                } else if (exec('targetNode is droppable') === false) {
                  if (exec('targetNode is 1st child') === false) {
                    targets['after'](input);
                  } else if (exec('targetNode is 1st child') === true) {
                    if (exec('on targetNode middle') === true) {
                      targets['before'](input);
                    } else if (exec('on targetNode middle') === false) {
                      targets['after'](input);
                    }
                  }
                }
              } else if (exec('targetNode has children excluding placeholder') === true) {
                if (exec('targetNode is 1st child') === false) {
                  targets['prepend'](input);
                } else if (exec('targetNode is 1st child') === true) {
                  if (exec('on targetNode middle') === true) {
                    targets['before'](input);
                  } else if (exec('on targetNode middle') === false) {
                    targets['prepend'](input);
                  }
                }
              }
            } else if (exec('targetNode is open') === false) {
              if (exec('targetNode is 1st child') === true) {
                if (exec('on targetNode middle') === false) {
                  if (exec('at indent right') === false) {
                    targets['after'](input);
                  } else if (exec('at indent right') === true) {
                    targets['prepend'](input);
                  }
                } else if (exec('on targetNode middle') === true) {
                  targets['before'](input);
                }
              } else if (exec('targetNode is 1st child') === false) {
                if (exec('at indent right') === true) {
                  targets['prepend'](input);
                } else if (exec('at indent right') === false) {
                  targets['after'](input);
                }
              }
            }
          }
        } else if (exec('placeholder in currentTree') === false) {
          targets['append'](input);
        }
      } else if (exec('placeholder existed') === false) {
        targets['nothing'](input);
      }
    } else if (exec('targetNode is placeholder') === true) {
      if (exec('targetNode parent is root') === false) {
        if (exec('targetNode is 1st child') === true) {
          if (exec('targetNode is last child') === true) {
            if (exec('at left') === false) {
              targets['nothing'](input);
            } else if (exec('at left') === true) {
              targets['after target parent'](input);
            }
          } else if (exec('targetNode is last child') === false) {
            targets['nothing'](input);
          }
        } else if (exec('targetNode is 1st child') === false) {
          if (exec('targetNode is last child') === true) {
            if (exec('targetNode prev is droppable') === true) {
              if (exec('at left') === true) {
                targets['after target parent'](input);
              } else if (exec('at left') === false) {
                if (exec('at indent right') === true) {
                  targets['append prev'](input);
                } else if (exec('at indent right') === false) {
                  targets['nothing'](input);
                }
              }
            } else if (exec('targetNode prev is droppable') === false) {
              if (exec('at left') === false) {
                targets['nothing'](input);
              } else if (exec('at left') === true) {
                targets['after target parent'](input);
              }
            }
          } else if (exec('targetNode is last child') === false) {
            if (exec('targetNode prev is droppable') === true) {
              if (exec('at left') === true) {
                targets['nothing'](input);
              } else if (exec('at left') === false) {
                if (exec('at indent right') === true) {
                  targets['append prev'](input);
                } else if (exec('at indent right') === false) {
                  targets['nothing'](input);
                }
              }
            } else if (exec('targetNode prev is droppable') === false) {
              targets['nothing'](input);
            }
          }
        }
      } else if (exec('targetNode parent is root') === true) {
        if (exec('targetNode is 1st child') === false) {
          if (exec('targetNode prev is droppable') === true) {
            if (exec('at left') === true) {
              targets['nothing'](input);
            } else if (exec('at left') === false) {
              if (exec('at indent right') === true) {
                targets['append prev'](input);
              } else if (exec('at indent right') === false) {
                targets['nothing'](input);
              }
            }
          } else if (exec('targetNode prev is droppable') === false) {
            targets['nothing'](input);
          }
        } else if (exec('targetNode is 1st child') === true) {
          targets['nothing'](input);
        }
      }
    }
  } else if (exec('currentTree existed') === false) {
    targets['nothing'](input);
  } // decision end =================================

}

function getOf4(el, space) {
  var r = getOffset(el);
  r.x2 = r.x + el.offsetWidth;
  r.y2 = r.y + el.offsetHeight + space;
  return r;
} // branch is a node


function resolveBranchDroppable(input, branch) {
  if (branch.hasOwnProperty('droppable')) {
    branch._droppable = branch.droppable;
  } else if (!branch.hasOwnProperty('_droppable')) {
    branch._droppable = true;
  }

  depthFirstSearch(branch, function (item, i, parent) {
    if (item === branch) {
      return;
    }

    if (item.isDragPlaceHolder || item === input.node) {
      return 'skip children';
    }

    item._droppable = item.hasOwnProperty('droppable') ? item.droppable : parent._droppable;

    if (!item.open) {
      return 'skip children';
    }
  });
}

window.dh = draggableHelper;
var trees = []; // for multiple trees
// DragPlaceHolder, unique

var dplh = {
  _id: 'draggable_tree_drag_placeHolder',
  droppable: false,
  isDragPlaceHolder: true,
  class: 'draggable-placeholder',
  style: {},
  innerStyle: {},
  innerClass: 'draggable-placeholder-inner',
  innerBackStyle: {},
  innerBackClass: 'draggable-placeholder-inner-back' // children: [],

};
var DraggableNode = {
  extends: TreeNode,
  name: 'TreeNode',
  mounted: function mounted() {
    var _this = this;

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
            // this store is not tree
            if (_this.store.ondragstart && _this.store.ondragstart(_this.data, _this, e, opt, store) === false) {
              return false;
            }

            dplh.innerStyle.height = store.el.offsetHeight + 'px';
            insertAfter(dplh, _this.data);
            _this.data.class += ' dragging';
            console.log('drag start');
          },
          moving: function moving(e, opt, store) {
            return autoMoveDragPlaceHolder.call(_this, e, opt, store, trees);
          },
          drop: function drop(e, opt, store) {
            if (_this.store.ondragend && _this.store.ondragend(_this.data, _this, e, opt, store) === false) {// can't drop
            } else {
              insertAfter(_this.data, dplh);
            }

            arrayRemove(dplh.parent.children, dplh);
            _this.data.class = _this.data.class.replace(/(^| )dragging( |$)/g, ' ');
            console.log('drag end');
          }
        });
      } else {
        if (_this._draggableDestroy) {
          _this._draggableDestroy();

          delete _this._draggableDestroy;
        }
      }
    }, {
      immediate: true
    });
  }
};
var DraggableTree = {
  extends: Tree,
  props: {
    getTriggerEl: {},
    draggable: {},
    droppable: {
      default: true
    },
    crossTree: {},
    isNodeDroppable: {
      type: Function
    } // todo hooks

  },
  components: {
    TreeNode: DraggableNode
  },
  data: function data() {
    return {
      // DragPlaceHolder
      dplh: dplh
    };
  },
  // computed: {},
  watch: {
    idMapping: {
      immediate: true,
      handler: function handler(idMapping) {
        idMapping[this.dplh._id] = this.dplh;
      }
    }
  },
  // methods: {},
  created: function created() {
    trees.push(this);
  },
  mounted: function mounted() {},
  beforeDestroy: function beforeDestroy() {
    arrayRemove(trees, this);
  }
};

export { Tree, TreeNode, DraggableTree };
