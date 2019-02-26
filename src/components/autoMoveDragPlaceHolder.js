import * as hp from 'helper-js'
import * as th from 'tree-helper'
import Cache, {
  attachCache
} from '../plugins/Cache'
import * as vf from 'vue-functions'
import getTreeByPoint from './temporarily-fix-overlapping-tree-issue'

// actions for drag placeholder
// 对 drag placeholder进行的操作
const targets = {
  'nothing': info => {},
  'after': (info) => {
    insertDplhAfterTo(info.dplh, info.targetNode, info)
  },
  'before': (info) => {
    if (isNodeDroppable(info.targetNode.parent)) {
      th.insertBefore(info.dplh, info.targetNode)
    } else {
      insertDplhAfterTo(info.dplh, info.targetNode.parent, info)
    }
  },
  'append': (info) => {
    if (isNodeDroppable(info.targetNode)) {
      th.appendTo(info.dplh, info.targetNode)
      if (!info.targetNode.open) info.store.toggleOpen(info.targetNode)
    } else {
      insertDplhAfterTo(info.dplh, info.targetNode, info)
    }
  },
  'prepend': (info) => {
    if (isNodeDroppable(info.targetNode)) {
      th.prependTo(info.dplh, info.targetNode)
      if (!info.targetNode.open) info.store.toggleOpen(info.targetNode)
    } else {
      insertDplhAfterTo(info.dplh, info.targetNode, info)
    }
  },
  'after target parent': (info) => {
    insertDplhAfterTo(info.dplh, info.targetNode.parent, info)
  },
  // append to prev sibling
  'append prev': (info) => {
    if (isNodeDroppable(info.targetPrev)) {
      th.appendTo(info.dplh, info.targetPrev)
      if (!info.targetPrev.open) info.store.toggleOpen(info.targetPrev)
    } else {
      insertDplhAfterTo(info.dplh, info.targetPrev, info)
    }
  },
  // append to current tree
  'append current tree': (info) => {
    if (isNodeDroppable(info.currentTree.rootData)) {
      th.appendTo(info.dplh, info.currentTree.rootData)
    }
  },
}

function insertDplhAfterTo(dplh, targetNode, info) {
  if (!targetNode) {
    return false
  } else {
    const closest = findParent(targetNode, node => node.parent && isNodeDroppable(node.parent))
    if (closest) {
      th.insertAfter(dplh, closest)
    } else {
      return false
    }
  }
  return true
}

export function isNodeDraggable(node) {
  if (!draggableIds.hasOwnProperty(node._id)) {
    let r
    if (node.hasOwnProperty('draggable')) {
      r = node.draggable
    } else if (node.parent) {
      r = isNodeDraggable(node.parent)
    } else {
      r = true
    }
    draggableIds[node._id] = r
  }
  return draggableIds[node._id]
}

export function isNodeDroppable(node) {
  if (!droppableIds.hasOwnProperty(node._id)) {
    let r
    if (node.hasOwnProperty('droppable')) {
      r = node.droppable
    } else if (node.parent) {
      r = isNodeDroppable(node.parent)
    } else {
      r = true
    }
    droppableIds[node._id] = r
  }
  return droppableIds[node._id]
}

// find child, excluding dragging node default
function findChild(info, children, handler, reverse) {
  const len = children.length
  if (reverse) {
    for (let i = len - 1; i >= 0; i--) {
      const item = children[i]
      // excluding dragging node
      if (item !== info.node) {
        if (handler(item, i)) {
          return item
        }
      }
    }
  } else {
    for (let i = 0; i < len; i++) {
      const item = children[i]
      // excluding dragging node
      if (item !== info.node) {
        if (handler(item, i)) {
          return item
        }
      }
    }
  }
}
// start from node self
function findParent(node, handle) {
  let current = node
  while (current) {
    if (handle(current)) {
      return current
    }
    current = current.parent
  }
}
const rules = {
  // 另一节点存在
  'targetNode existed': info => info.targetNode,
  // 另一节点是拖动占位节点
  'targetNode is placeholder': info => info.targetNode.isDragPlaceHolder,
  // 另一节点在最上面
  'targetNode at top': info => info.targetAtTop,
  // 另一节点在最下面
  'targetNode at bottom': info => info.targetAtBottom,
  // 另一节点是根节点第二个子
  'targetNode is the second child of root': info => info.currentTreeRootSecondChildExcludingDragging === info.targetNode,
  // 拖动点坐标在任一树中, 同时, 起始树要可拖出, 当前树要可拖入
  'currentTree existed': info => info.currentTree,
  // 当前树为空(不包括占位节点)
  'currentTree empty': info => !findChild(info, info.currentTree.rootData.children, v => v),
  // 占位节点存在
  'placeholder existed': info => info.dplhEl,
  // 占位节点在当前树中
  'placeholder in currentTree': info => info.dplhElInCurrentTree,
  // 占位节点在最上面
  'placeholder at top': info => info.dplhAtTop,
  // 另一节点是打开的
  'targetNode is open': info => info.targetNode.open,
  // 另一节点有子(不包括占位节点)
  'targetNode has children excluding placeholder': info => findChild(info, info.targetNode.children, v => v !== info.dplh),
  // 另一节点是第一个节点
  'targetNode is 1st child': info => findChild(info, info.targetNode.parent.children, v => v) === info.targetNode,
  // 另一节点是最后节点
  'targetNode is last child': info => findChild(info, info.targetNode.parent.children, v => v, true) === info.targetNode,
  // 当前位置在另一节点inner垂直中线上
  'on targetNode middle': info => info.offset.y <= info.tiMiddleY,
  // 当前位置在另一节点inner左边
  'at left': info => info.offset.x < info.tiOffset.x,
  // 当前位置在另一节点innner indent位置右边
  'at indent right': info => info.offset.x > info.tiOffset.x + info.currentTree.indent,
}

// convert rule output to Boolean
for (const key of Object.keys(rules)) {
  const old = rules[key]
  rules[key] = (...args) => Boolean(old(...args))
}

let prevTree
let droppableIds = {}
let draggableIds = {}
// context is vm
export default function autoMoveDragPlaceHolder(draggableHelperInfo) {
  const trees = this.store.trees
  const dhStore = draggableHelperInfo.store
  // make info
  const info = {
    event: draggableHelperInfo.event,
    el: dhStore.el,
    vm: this,
    node: this.data,
    store: this.store,
    dplh: this.store.dplh,
    draggableHelperData: {
      opt: draggableHelperInfo.options,
      store: dhStore,
    },
  }
  //
  attachCache(info, new Cache(), {
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
    offsetToViewPort() {
      const r = this.nodeInnerEl.getBoundingClientRect()
      r.x = r.left
      r.y = r.top
      return r
    },
    // tree
    currentTree() {
      // const currentTree = trees.find(tree => hp.isOffsetInEl(this.offset.x, this.offset.y, tree.$el))
      const currentTree = getTreeByPoint(this.offsetToViewPort.x, this.offsetToViewPort.y, trees)
      if (currentTree) {
        const dragStartTree = this.store
        let treeChanged
        if (prevTree == null) {
          prevTree = dragStartTree
          treeChanged = true
        }
        if (prevTree !== currentTree) {
          if (!vf.isPropTrue(dragStartTree.crossTree) || !vf.isPropTrue(currentTree.crossTree)) {
            return
          }
          prevTree = currentTree
          treeChanged = true
        }
        if (!vf.isPropTrue(currentTree.droppable)) {
          return
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
    // the second child of currentTree root, excluding dragging node
    currentTreeRootSecondChildExcludingDragging() {
      return this.currentTree.rootData.children.slice(0, 3).filter(v => v !== this.node)[1]
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
      return Math.abs(this.dplhOf4.y - this.currentTreeRootOf4.y) < 5
    },
    targetAtTop() {
      return Math.abs(this.tiOf4.y - this.currentTreeRootOf4.y) < 5
    },
    targetAtBottom() {
      return Math.abs(this.tiOf4.y2 - this.currentTreeRootOf4.y2) < 5
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
          break
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
    tiOf4() {
      return getOf4(this.tiInnerEl, this.currentTree.space)
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
      return this.currentTree.getNodeById(id)
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
      r = rules[ruleId](info)
    } catch (e) {
      r = e
      try {
        if (process.env.DEVELOPE_SELF) {
          // only visible when develop its self
          console.warn(`failed to execute rule '${ruleId}'`, e);
        }
      } catch (e2) {}
    }
    executedRuleCache[ruleId] = r
  }
  return executedRuleCache[ruleId]
  }
  if (exec('currentTree existed') === true){
    if (exec('targetNode is placeholder') === false){
      if (exec('targetNode is the second child of root') === true){
        if (exec('targetNode has children excluding placeholder') === false){
          if (exec('on targetNode middle') === true){
            targets['before'](info)
          }
          else if (exec('on targetNode middle') === false){
            if (exec('at indent right') === true){
              targets['append'](info)
            }
            else if (exec('at indent right') === false){
              targets['after'](info)
            }
          }
        }
        else if (exec('targetNode has children excluding placeholder') === true){
          targets['prepend'](info)
        }
      }
      else if (exec('targetNode is the second child of root') === false){
        if (exec('currentTree empty') === false){
          if (exec('targetNode at top') === true){
            if (exec('placeholder in currentTree') === true){
              if (exec('targetNode has children excluding placeholder') === false){
                if (exec('on targetNode middle') === false){
                  if (exec('at indent right') === false){
                    targets['after'](info)
                  }
                  else if (exec('at indent right') === true){
                    targets['append'](info)
                  }
                }
                else if (exec('on targetNode middle') === true){
                  targets['before'](info)
                }
              }
              else if (exec('targetNode has children excluding placeholder') === true){
                if (exec('on targetNode middle') === false){
                  targets['prepend'](info)
                }
                else if (exec('on targetNode middle') === true){
                  targets['before'](info)
                }
              }
            }
            else if (exec('placeholder in currentTree') === false){
              targets['before'](info)
            }
          }
          else if (exec('targetNode at top') === false){
            if (exec('targetNode at bottom') === false){
              if (exec('placeholder at top') === true){
                targets['prepend'](info)
              }
              else if (exec('placeholder at top') === false){
                if (exec('targetNode has children excluding placeholder') === true){
                  targets['prepend'](info)
                }
                else if (exec('targetNode has children excluding placeholder') === false){
                  if (exec('targetNode is 1st child') === false){
                    if (exec('targetNode is last child') === false){
                      if (exec('on targetNode middle') === true){
                        if (exec('at indent right') === true){
                          targets['append'](info)
                        }
                        else if (exec('at indent right') === false){
                          targets['after'](info)
                        }
                      }
                      else if (exec('on targetNode middle') === false){
                        if (exec('at indent right') === true){
                          targets['append'](info)
                        }
                        else if (exec('at indent right') === false){
                          targets['after'](info)
                        }
                      }
                    }
                    else if (exec('targetNode is last child') === true){
                      if (exec('at indent right') === true){
                        targets['append'](info)
                      }
                      else if (exec('at indent right') === false){
                        targets['after'](info)
                      }
                    }
                  }
                  else if (exec('targetNode is 1st child') === true){
                    if (exec('targetNode is last child') === true){
                      targets['append'](info)
                    }
                    else if (exec('targetNode is last child') === false){
                      if (exec('on targetNode middle') === false){
                        if (exec('at indent right') === false){
                          targets['after'](info)
                        }
                        else if (exec('at indent right') === true){
                          targets['append'](info)
                        }
                      }
                      else if (exec('on targetNode middle') === true){
                        if (exec('at indent right') === false){
                          targets['after'](info)
                        }
                        else if (exec('at indent right') === true){
                          targets['append'](info)
                        }
                      }
                    }
                  }
                }
              }
            }
            else if (exec('targetNode at bottom') === true){
              if (exec('placeholder in currentTree') === true){
                if (exec('on targetNode middle') === false){
                  if (exec('at indent right') === true){
                    targets['append'](info)
                  }
                  else if (exec('at indent right') === false){
                    targets['after'](info)
                  }
                }
                else if (exec('on targetNode middle') === true){
                  targets['append'](info)
                }
              }
              else if (exec('placeholder in currentTree') === false){
                targets['append'](info)
              }
            }
          }
        }
        else if (exec('currentTree empty') === true){
          targets['append current tree'](info)
        }
      }
    }
    else if (exec('targetNode is placeholder') === true){
      if (exec('targetNode at bottom') === false){
        if (exec('targetNode is the second child of root') === false){
          if (exec('targetNode is 1st child') === true){
            if (exec('targetNode is last child') === false){
              targets['nothing'](info)
            }
            else if (exec('targetNode is last child') === true){
              if (exec('on targetNode middle') === false){
                if (exec('at left') === true){
                  targets['after target parent'](info)
                }
                else if (exec('at left') === false){
                  targets['nothing'](info)
                }
              }
              else if (exec('on targetNode middle') === true){
                if (exec('at left') === true){
                  targets['after target parent'](info)
                }
                else if (exec('at left') === false){
                  targets['nothing'](info)
                }
              }
            }
          }
          else if (exec('targetNode is 1st child') === false){
            if (exec('targetNode is last child') === true){
              if (exec('on targetNode middle') === true){
                if (exec('at left') === true){
                  targets['after target parent'](info)
                }
                else if (exec('at left') === false){
                  if (exec('at indent right') === true){
                    targets['append prev'](info)
                  }
                  else if (exec('at indent right') === false){
                    targets['nothing'](info)
                  }
                }
              }
              else if (exec('on targetNode middle') === false){
                if (exec('at left') === true){
                  targets['after target parent'](info)
                }
                else if (exec('at left') === false){
                  if (exec('at indent right') === true){
                    targets['append prev'](info)
                  }
                  else if (exec('at indent right') === false){
                    targets['nothing'](info)
                  }
                }
              }
            }
            else if (exec('targetNode is last child') === false){
              if (exec('on targetNode middle') === true){
                if (exec('at left') === true){
                  targets['nothing'](info)
                }
                else if (exec('at left') === false){
                  if (exec('at indent right') === true){
                    targets['append prev'](info)
                  }
                  else if (exec('at indent right') === false){
                    targets['nothing'](info)
                  }
                }
              }
              else if (exec('on targetNode middle') === false){
                if (exec('at left') === true){
                  targets['nothing'](info)
                }
                else if (exec('at left') === false){
                  if (exec('at indent right') === true){
                    targets['append prev'](info)
                  }
                  else if (exec('at indent right') === false){
                    targets['nothing'](info)
                  }
                }
              }
            }
          }
        }
        else if (exec('targetNode is the second child of root') === true){
          if (exec('on targetNode middle') === true){
            if (exec('at indent right') === true){
              targets['append prev'](info)
            }
            else if (exec('at indent right') === false){
              targets['nothing'](info)
            }
          }
          else if (exec('on targetNode middle') === false){
            if (exec('at indent right') === true){
              targets['append prev'](info)
            }
            else if (exec('at indent right') === false){
              targets['nothing'](info)
            }
          }
        }
      }
      else if (exec('targetNode at bottom') === true){
        if (exec('targetNode is 1st child') === true){
          if (exec('on targetNode middle') === false){
            if (exec('at left') === true){
              targets['after target parent'](info)
            }
            else if (exec('at left') === false){
              targets['nothing'](info)
            }
          }
          else if (exec('on targetNode middle') === true){
            if (exec('at left') === false){
              targets['nothing'](info)
            }
            else if (exec('at left') === true){
              targets['after target parent'](info)
            }
          }
        }
        else if (exec('targetNode is 1st child') === false){
          if (exec('on targetNode middle') === false){
            if (exec('at left') === true){
              targets['after target parent'](info)
            }
            else if (exec('at left') === false){
              if (exec('at indent right') === true){
                targets['append prev'](info)
              }
              else if (exec('at indent right') === false){
                targets['nothing'](info)
              }
            }
          }
          else if (exec('on targetNode middle') === true){
            if (exec('at left') === true){
              targets['after target parent'](info)
            }
            else if (exec('at left') === false){
              if (exec('at indent right') === true){
                targets['append prev'](info)
              }
              else if (exec('at indent right') === false){
                targets['nothing'](info)
              }
            }
          }
        }
      }
    }
  }
  else if (exec('currentTree existed') === false){
    targets['nothing'](info)
  }
  // decision end =================================

  //
}

function getOf4(el, space) {
  const r = hp.getOffset(el)
  r.x2 = r.x + el.offsetWidth
  r.y2 = r.y + el.offsetHeight + space
  return r
}

autoMoveDragPlaceHolder.dragStart = function dragStart() {}
autoMoveDragPlaceHolder.dragEnd = function dragEnd() {
  prevTree = null
  droppableIds = {}
  draggableIds = {}
}
