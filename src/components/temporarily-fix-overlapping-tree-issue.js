import * as hp from 'helper-js'

// document.elementsFromPoint Polyfill
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

export default function getTreeByPoint(x, y, trees) {
  const els = document.elementsFromPoint(x, y)
  let treeEl
  let nodeEl
  const betweenEls = []
  for (const el of els) {
    if (!nodeEl) {
      if (hp.hasClass(el, 'tree-node')) {
        nodeEl = el
      }
    } else {
      // console.log(el);
      if (hp.hasClass(el, 'tree')) {
        treeEl = el
        break
      }
      betweenEls.push(el)
    }
  }
  if (treeEl) {
    // is target tree is another tree, and be covered by other element, like modal, popup
    let covered = false
    if (!isParent(nodeEl, treeEl)) {
      // cross tree
      for (const el of betweenEls) {
        if (!isParent(el, treeEl)) {
          covered = true
          break
        }
      }
    }
    //
    if (!covered) {
      return trees.find(v => v.$el === treeEl)
    }
  }
}

function isParent(child, parent) {
  let cur = child
  while (cur) {
    cur = cur.parentNode
    if (cur === parent) {
      return true
    }
  }
}
