<script>
import * as hp from 'helper-js'
import * as th from 'tree-helper'
import draggableHelper from 'draggable-helper'
import TreeNode from './TreeNode'
import Tree from './Tree'
import autoMoveDragPlaceHolder from './autoMoveDragPlaceHolderDev'

const trees = [] // for multiple trees
// DragPlaceHolder, unique
const dplh = {
  _id: 'DragPlaceHolder',
  isDragPlaceHolder: true,
  class: 'draggable-placeholder',
  style: {},
  innerStyle: {},
  innerClass: 'draggable-placeholder-inner',
  // children: [],
}

const DraggableNode = {
  extends: TreeNode,
  name: 'TreeNode',
  mounted() {
    if (this.isRoot || this.data.isDragPlaceHolder) {
      return
    }
    const {dplh} = this.store
    this.$watch('store.draggable', (draggable) => {
      if (draggable) {
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
            dplh.innerStyle.height = store.el.offsetHeight + 'px'
            th.insertAfter(dplh, this.data)
            this.data.class += ' dragging'
            console.log('drag start');
          },
          moving: (e, opt, store) => {
            return autoMoveDragPlaceHolder.call(this, e, opt, store, trees)
          },
          drop: (e, opt, store) => {
            if (this.store.ondragend && this.store.ondragend(this.data, this, e, opt, store) === false) {
              // can't drop
            } else {
              th.insertAfter(this.data, dplh)
            }
            hp.arrayRemove(dplh.parent.children, dplh)
            this.data.class = this.data.class.replace(/(^| )dragging( |$)/g, ' ')
            console.log('drag end');
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

export default {
  extends: Tree,
  props: {
    getTriggerEl: {},
    draggable: {default: true},
    crossTree: {},
    isNodeDroppable: {type: Function},
    // todo hooks
  },
  components: {
    TreeNode: DraggableNode,
  },
  data() {
    return {
      // DragPlaceHolder
      dplh,
    }
  },
  // computed: {},
  // watch: {},
  // methods: {},
  // created() {},
  mounted() {
    trees.push(this)
  },
  beforeDestroy() {
    hp.arrayRemove(trees, this)
  },
}
</script>

<style lang="scss">
.he-tree{

}
</style>
