import * as hp from 'helper-js'
import * as th from 'tree-helper'
import Cache, {
  attachCache
} from '../plugins/Cache'
import * as ut from '../plugins/utils'

// actions for drag placeholder
// 对 drag placeholder进行的操作
const targets = {
  'nothing': input => {},
  'after': ({
    dplh,
    targetNode,
    currentTree
  }) => {
    // after targetNode or closest droppable parent
    let node = targetNode
    while (!node.parent._droppable) {
      node = node.parent
    }
    th.insertAfter(dplh, node)
  },
  'before': ({
    dplh,
    targetNode
  }) => {
    th.insertBefore(dplh, targetNode)
  },
  'append': ({
    dplh,
    targetNode
  }) => {
    th.appendTo(dplh, targetNode)
    targetNode.open = true
  },
  'prepend': (input) => {
    const {
      dplh,
      targetNode
    } = input
    th.prependTo(dplh, targetNode)
    targetNode.open = true
    // prepend may open a closed node which has children
    if (!targetNode.open) {
      targetNode.open = true
      resolveBranchDroppable(input, targetNode)
    }
  },
  'after target parent': ({
    dplh,
    targetNode
  }) => {
    th.insertAfter(dplh, targetNode.parent)
  },
  // append to prev sibling
  'append prev': ({
    dplh,
    targetNode,
    node,
    targetPrev
  }) => {
    th.appendTo(dplh, targetPrev)
    targetPrev.open = true
  },
}

function findChild(input, children, handler, reverse) {
  const len = children.length
  if (reverse) {
    for (let i = len - 1; i >= 0; i--) {
      const item = children[i]
      // excluding dragging node
      if (item !== input.node) {
        if (handler(item, i)) {
          return item
        }
      }
    }
  } else {
    for (let i = 0; i < len; i++) {
      const item = children[i]
      // excluding dragging node
      if (item !== input.node) {
        if (handler(item, i)) {
          return item
        }
      }
    }
  }
}
const rules = {
  // 另一节点存在
  'targetNode existed': input => input.targetNode,
  // 另一节点是拖动占位节点
  'targetNode is placeholder': input => input.targetNode.isDragPlaceHolder,
  // 另一节点父级是根节点
  'targetNode parent is root': input => input.targetNode.parent.isRoot,
  // 拖动点坐标在任一树中, 同时, 起始树要可拖出, 当前树要可拖入
  'currentTree existed': input => input.currentTree,
  // 占位节点存在
  'placeholder existed': input => input.dplhEl,
  // 占位节点在当前树中
  'placeholder in currentTree': input => input.dplhElInCurrentTree,
  // 占位节点在最上面
  'placeholder at top': input => input.dplhAtTop,
  // 另一节点是打开的
  'targetNode is open': input => input.targetNode.open,
  // 另一节点是根节点
  'targetNode is root': input => input.targetNode.isRoot,
  // 另一节点有子(不包括占位节点)
  'targetNode has children excluding placeholder': input => findChild(input, input.targetNode.children, v => v !== input.dplh),
  // 另一节点可放置
  'targetNode is droppable': input => input.targetNode._droppable,
  // 另一节点是第一个节点
  'targetNode is 1st child': input => findChild(input, input.targetNode.parent.children, v => v) === input.targetNode,
  // 另一节点是最后节点
  'targetNode is last child': input => findChild(input, input.targetNode.parent.children, v => v, true) === input.targetNode,
  // 另一节点上一个节点可放置
  'targetNode prev is droppable': input => input.targetPrev._droppable,
  // 当前位置在另一节点inner垂直中线上
  'on targetNode middle': input => input.offset.y <= input.tiMiddleY,
  // 当前位置在另一节点inner左边
  'at left': input => input.offset.x < input.tiOffset.x,
  // 当前位置在另一节点innner indent位置右边
  'at indent right': input => input.offset.x > input.tiOffset.x + input.currentTree.indent,
}
// convert rule output to Boolean
for (const key of Object.keys(rules)) {
  const old = rules[key]
  rules[key] = (...args) => Boolean(old(...args))
}

let prevTree
// context is vm
// dhStore: draggable helper store
export default function(e, opt, dhStore, trees) {
  // make input // todo change input to info
  const input = {
    event: e,
    el: dhStore.el,
    vm: this,
    node: this.data,
    store: this.store,
    dplh: this.store.dplh,
    draggableHelperData: {
      opt,
      store: dhStore
    }
  }
  //
  attachCache(input, new Cache(), {
    // dragging node coordinate
    // 拖动中的节点相关坐标
    nodeInnerEl() {
      return this.el.querySelector('.tree-node-inner')
    },
    offset() {
      return hp.getOffset(this.nodeInnerEl)
    }, // left top point
    offset2() {
      return {
        x: this.offset.x + this.nodeInnerEl.offsetWidth,
        y: this.offset.y + this.nodeInnerEl.offsetHeight
      }
    }, // right bottom point
    // tree
    currentTree() {
      const currentTree = trees.find(tree => hp.isOffsetInEl(this.offset.x, this.offset.y, tree.$el))
      if (currentTree) {
        const dragStartTree = this.store
        let treeChanged
        if (dhStore.movedCount === 0) {
          prevTree = dragStartTree
          treeChanged = true
        }
        if (prevTree !== currentTree) {
          if (!ut.isPropTrue(dragStartTree.crossTree) || !ut.isPropTrue(currentTree.crossTree)) {
            return
          }
          prevTree = currentTree
          treeChanged = true
        }
        if (!ut.isPropTrue(currentTree.droppable)) {
          return
        }
        if (treeChanged) {
          // when move start or drag move into another tree
          // resolve _droppable
          resolveBranchDroppable(input, currentTree.rootData)
        }
        return currentTree
      }
    },
    currentTreeRootEl() {
      return document.getElementById(this.currentTree.rootData._id)
    },
    currentTreeRootOf4() {
      return getOf4(this.currentTreeRootEl, this.currentTree.space)
    },
    // placeholder
    dplhEl() {
      return document.getElementById(this.dplh._id)
    },
    dplhElInCurrentTree() {
      return Boolean(this.currentTree.$el.querySelector(`#${this.dplh._id}`))
    },
    dplhOf4() {
      return getOf4(this.dplhEl, this.currentTree.space)
    },
    dplhAtTop() {
      return Math.abs(dplhOf4.y - this.currentTreeRootOf4.y) < 5
    },
    dplhAtBottom() {
      return Math.abs(dplhOf4.y2 - this.currentTreeRootOf4.y2) < 5
    },
    // most related node
    // 最相关的另一个节点
    targetNode() {
      const {
        currentTree
      } = this
      if (!currentTree) {
        throw 'no currentTree'
      }
      //
      const {
        x,
        y
      } = this.offset
      let currentNode = currentTree.rootData
      while (true) {
        let children = currentNode.children
        if (!children) {
          break
        }
        if (this.node.parent === currentNode) {
          // dragging node is in currentNode children, remove it first
          children = children.slice()
          children.splice(children.indexOf(this.node), 1)
        }
        if (children.length === 0) {
          break
        }
        const t = hp.binarySearch(children, (node) => {
          const el = document.getElementById(node._id)
          const ty = hp.getOffset(el).y
          const ty2 = ty + el.offsetHeight + currentTree.space
          if (ty2 < y) {
            return -1
          } else if (ty <= y) {
            return 0
          } else {
            return 1
          }
        }, null, null, true)
        if (t.hit) {
          currentNode = t.value
        } else {
          if (t.bigger) {
            currentNode = children[t.index - 1]
          } else {
            currentNode = t.value
          }
        }
        if (!currentNode) {
          currentNode = children[0]
        }
        if (!currentNode) {
          break
        }
        const innerEl = document.getElementById(currentNode._id).querySelector('.tree-node-inner')
        const of = getOf4(innerEl, currentTree.space)
        if ( of .y <= y && y <= of .y2) {
          break
        }
      }
      return currentNode
    },
    targetNodeEl() {
      return document.getElementById(this.targetNode._id)
    },
    // targetNodeInnerElOffset
    tiInnerEl() {
      return this.targetNodeEl.querySelector('.tree-node-inner')
    },
    tiOffset() {
      return hp.getOffset(this.tiInnerEl)
    },
    tiMiddleY() {
      return this.tiOffset.y + this.tiInnerEl.offsetHeight / 2
    },
    //
    targetPrevEl() {
      // tree node 之间不要有其他元素, 否则这里会获取到错误的元素
      let r = this.targetNodeEl.previousSibling
      if (hp.hasClass(r, 'dragging')) {
        r = r.previousSibling
      }
      return r
    },
    targetPrev() {
      const id = this.targetPrevEl.getAttribute('id')
      return this.currentTree.idMapping[id]
    },
  })
  // attachCache end

  // decision start =================================
  const executedRuleCache = {}
  // exec rule
  const exec = (ruleId) => {
    if (!executedRuleCache.hasOwnProperty(ruleId)) {
      let r
      try {
        r = rules[ruleId](input)
      } catch (e) {
        r = e
        console.warn(`failed to execute rule '${ruleId}'`, e);
      }
      executedRuleCache[ruleId] = r
    }
    return executedRuleCache[ruleId]
  }
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
                        targets['append'](input)
                      } else if (exec('at indent right') === false) {
                        targets['after'](input)
                      }
                    } else if (exec('targetNode is 1st child') === false) {
                      targets['append'](input)
                    }
                  } else if (exec('at left') === true) {
                    targets['after'](input)
                  }
                } else if (exec('targetNode is droppable') === false) {
                  targets['after'](input)
                }
              } else if (exec('targetNode has children excluding placeholder') === true) {
                if (exec('targetNode is droppable') === true) {
                  targets['prepend'](input)
                } else if (exec('targetNode is droppable') === false) {
                  targets['after'](input)
                }
              }
            } else if (exec('targetNode is open') === false) {
              if (exec('targetNode is droppable') === true) {
                if (exec('at indent right') === false) {
                  targets['after'](input)
                } else if (exec('at indent right') === true) {
                  targets['prepend'](input)
                }
              } else if (exec('targetNode is droppable') === false) {
                targets['after'](input)
              }
            }
          } else if (exec('targetNode parent is root') === true) {
            if (exec('targetNode is open') === true) {
              if (exec('targetNode has children excluding placeholder') === false) {
                if (exec('targetNode is droppable') === true) {
                  if (exec('targetNode is 1st child') === false) {
                    if (exec('targetNode prev is droppable') === false) {
                      targets['append'](input)
                    } else if (exec('targetNode prev is droppable') === true) {
                      if (exec('on targetNode middle') === false) {
                        if (exec('at indent right') === false) {
                          targets['after'](input)
                        } else if (exec('at indent right') === true) {
                          targets['append'](input)
                        }
                      } else if (exec('on targetNode middle') === true) {
                        targets['append'](input)
                      }
                    }
                  } else if (exec('targetNode is 1st child') === true) {
                    if (exec('on targetNode middle') === true) {
                      targets['before'](input)
                    } else if (exec('on targetNode middle') === false) {
                      if (exec('at indent right') === true) {
                        targets['append'](input)
                      } else if (exec('at indent right') === false) {
                        targets['after'](input)
                      }
                    }
                  }
                } else if (exec('targetNode is droppable') === false) {
                  if (exec('targetNode is 1st child') === false) {
                    targets['after'](input)
                  } else if (exec('targetNode is 1st child') === true) {
                    if (exec('on targetNode middle') === true) {
                      targets['before'](input)
                    } else if (exec('on targetNode middle') === false) {
                      targets['after'](input)
                    }
                  }
                }
              } else if (exec('targetNode has children excluding placeholder') === true) {
                if (exec('targetNode is 1st child') === false) {
                  targets['prepend'](input)
                } else if (exec('targetNode is 1st child') === true) {
                  if (exec('on targetNode middle') === true) {
                    targets['before'](input)
                  } else if (exec('on targetNode middle') === false) {
                    targets['prepend'](input)
                  }
                }
              }
            } else if (exec('targetNode is open') === false) {
              if (exec('targetNode is 1st child') === true) {
                if (exec('on targetNode middle') === false) {
                  if (exec('at indent right') === false) {
                    targets['after'](input)
                  } else if (exec('at indent right') === true) {
                    targets['prepend'](input)
                  }
                } else if (exec('on targetNode middle') === true) {
                  targets['before'](input)
                }
              } else if (exec('targetNode is 1st child') === false) {
                if (exec('at indent right') === true) {
                  targets['prepend'](input)
                } else if (exec('at indent right') === false) {
                  targets['after'](input)
                }
              }
            }
          }
        } else if (exec('placeholder in currentTree') === false) {
          targets['append'](input)
        }
      } else if (exec('placeholder existed') === false) {
        targets['nothing'](input)
      }
    } else if (exec('targetNode is placeholder') === true) {
      if (exec('targetNode parent is root') === false) {
        if (exec('targetNode is 1st child') === true) {
          if (exec('targetNode is last child') === true) {
            if (exec('at left') === false) {
              targets['nothing'](input)
            } else if (exec('at left') === true) {
              targets['after target parent'](input)
            }
          } else if (exec('targetNode is last child') === false) {
            targets['nothing'](input)
          }
        } else if (exec('targetNode is 1st child') === false) {
          if (exec('targetNode is last child') === true) {
            if (exec('targetNode prev is droppable') === true) {
              if (exec('at left') === true) {
                targets['after target parent'](input)
              } else if (exec('at left') === false) {
                if (exec('at indent right') === true) {
                  targets['append prev'](input)
                } else if (exec('at indent right') === false) {
                  targets['nothing'](input)
                }
              }
            } else if (exec('targetNode prev is droppable') === false) {
              if (exec('at left') === false) {
                targets['nothing'](input)
              } else if (exec('at left') === true) {
                targets['after target parent'](input)
              }
            }
          } else if (exec('targetNode is last child') === false) {
            if (exec('targetNode prev is droppable') === true) {
              if (exec('at left') === true) {
                targets['nothing'](input)
              } else if (exec('at left') === false) {
                if (exec('at indent right') === true) {
                  targets['append prev'](input)
                } else if (exec('at indent right') === false) {
                  targets['nothing'](input)
                }
              }
            } else if (exec('targetNode prev is droppable') === false) {
              targets['nothing'](input)
            }
          }
        }
      } else if (exec('targetNode parent is root') === true) {
        if (exec('targetNode is 1st child') === false) {
          if (exec('targetNode prev is droppable') === true) {
            if (exec('at left') === true) {
              targets['nothing'](input)
            } else if (exec('at left') === false) {
              if (exec('at indent right') === true) {
                targets['append prev'](input)
              } else if (exec('at indent right') === false) {
                targets['nothing'](input)
              }
            }
          } else if (exec('targetNode prev is droppable') === false) {
            targets['nothing'](input)
          }
        } else if (exec('targetNode is 1st child') === true) {
          targets['nothing'](input)
        }
      }
    }
  } else if (exec('currentTree existed') === false) {
    targets['nothing'](input)
  }
  // decision end =================================

}

function getOf4(el, space) {
  const r = hp.getOffset(el)
  r.x2 = r.x + el.offsetWidth
  r.y2 = r.y + el.offsetHeight + space
  return r
}

// branch is a node
function resolveBranchDroppable(input, branch) {
  if (branch.hasOwnProperty('droppable')) {
    branch._droppable = branch.droppable
  } else if (!branch.hasOwnProperty('_droppable')) {
    branch._droppable = true
  }
  th.depthFirstSearch(branch, (item, i, parent) => {
    if (item === branch) {
      return
    }
    if (item.isDragPlaceHolder || item === input.node) {
      return 'skip children'
    }
    item._droppable = item.hasOwnProperty('droppable') ? item.droppable : parent._droppable
    if (!item.open) {
      return 'skip children'
    }
  })
}
