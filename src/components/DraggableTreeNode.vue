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
            const draggableHelperInfo = {event: e, options: opt, store}
            if (this.store.ondragstart && this.store.ondragstart(this.data, draggableHelperInfo) === false) {
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
            this.store.$emit('drag', this.data)
            // console.log('drag start');
          },
          moving: (e, opt, store) => {
            const draggableHelperInfo = {event: e, options: opt, store}
            return autoMoveDragPlaceHolder.call(this, draggableHelperInfo)
          },
          drop: (e, opt, store) => {
            const draggableHelperInfo = {event: e, options: opt, store}
            if (this.store.ondragend && this.store.ondragend(this.data, draggableHelperInfo) === false) {
              hp.arrayRemove(dplh.parent.children, dplh)
              // can't drop, no change
            } else {
              const targetTree = dplh._vm.store
              const crossTree = targetTree !== this.store
              const oldTree = crossTree ? this.store : null
              th.insertAfter(this.data, dplh)
              hp.arrayRemove(dplh.parent.children, dplh)
              this.data.class = this.data.class.replace(/(^| )dragging( |$)/g, ' ')
              targetTree.$emit('drop', this.data, targetTree, oldTree)
              oldTree && oldTree.$emit('drop', this.data, targetTree, oldTree)
              // emit change event if changed
              const siblings = this.data.parent.children
              if (siblings === this.startPosition.siblings && siblings.indexOf(this.data) === this.startPosition.index) {
                // not moved
              } else {
                this.store.$emit('change', this.data, targetTree, oldTree)
                oldTree && oldTree.$emit('change', this.data, targetTree, oldTree)
              }
              this.startPosition = null
            }
            // console.log('drag end');
          },
        })
      } else {
        if (this._draggableDestroy) {
          this._draggableDestroy()
          this._draggableDestroy = null
        }
      }
    }, {immediate: true})
  },
}

function isNodeDraggable(node, nodeVm) {
  if (node.hasOwnProperty('draggable')) {
    return node.draggable
  } else {
    return true
  }
}

</script>
