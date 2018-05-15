<script>
import * as hp from 'helper-js'
import * as th from 'tree-helper'
import draggableHelper from 'draggable-helper'
import TreeNode from './TreeNode.vue'
import autoMoveDragPlaceHolder from './autoMoveDragPlaceHolder'
import * as ut from '../plugins/utils'

export default {
  extends: TreeNode,
  name: 'TreeNode',
  mounted() {
    if (this.isRoot || this.data.isDragPlaceHolder) {
      return
    }
    const {dplh} = this.store
    this.$watch('store.draggable', (draggable) => {
      if (ut.isPropTrue(draggable)) {
        const triggerEl = this.store.getTriggerEl ? this.store.getTriggerEl(this) : this.$el.querySelector('.tree-node-inner')
        this._draggableDestroy = draggableHelper(triggerEl, {
          // trigger el
          getEl: () => this.$el,
          minTranslate: 10,
          drag: (e, opt, store) => {
            // this store is not tree
            if (this.store.ondragstart && this.store.ondragstart(this.data, this, e, opt, store) === false) {
              return false
            }
            if (!isNodeDraggable(this.data)) {
              return false
            }
            // record start positon
            const siblings = this.data.parent.children
            this.startPosition = {siblings, index: siblings.indexOf(this.data)}
            //
            dplh.innerStyle.height = store.el.offsetHeight + 'px'
            th.insertAfter(dplh, this.data)
            this.data.class += ' dragging'
            // console.log('drag start');
          },
          moving: (e, opt, store) => {
            return autoMoveDragPlaceHolder.call(this, e, opt, store, this.store.trees)
          },
          drop: (e, opt, store) => {
            if (this.store.ondragend && this.store.ondragend(this.data, this, e, opt, store) === false) {
              // can't drop, no change
            } else {
              th.insertAfter(this.data, dplh)
              hp.arrayRemove(dplh.parent.children, dplh)
              this.data.class = this.data.class.replace(/(^| )dragging( |$)/g, ' ')
              // emit change event if changed
              const siblings = this.data.parent.children
              if (siblings === this.startPosition.siblings && siblings.indexOf(this.data) === this.startPosition.index) {
                // not moved
              } else {
                this.store.$emit('change', this.data, this)
              }
              delete this.startPosition
            }
            this.store.$emit('drop', this.data, this)
            // console.log('drag end');
          },
        })
      } else {
        if (this._draggableDestroy) {
          this._draggableDestroy()
          delete this._draggableDestroy
        }
      }
    }, {immediate: true})
  },
}

function isNodeDraggable(node) {
  while (!node.hasOwnProperty('draggable') && node.parent) {
    node = node.parent
  }
  if (node.hasOwnProperty('draggable')) {
    return node.draggable
  } else {
    return true
  }
}
</script>
