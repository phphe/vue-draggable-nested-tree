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
  const treeEL = els.find(el => hp.hasClass(el, 'tree'))
  if (treeEL) {
    return trees.find(v => v.$el === treeEL)
  }
}
