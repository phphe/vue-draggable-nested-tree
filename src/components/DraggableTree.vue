<script>
import * as hp from 'helper-js'
import * as th from 'tree-helper'
import DraggableTreeNode from './DraggableTreeNode.vue'
import Tree from './Tree.vue'
import * as ut from '../plugins/utils'

const trees = [] // for multiple trees
// DragPlaceHolder, unique
const dplh = {
  _id: 'draggable_tree_drag_placeHolder',
  level: null,
  droppable: false,
  isDragPlaceHolder: true,
  class: 'draggable-placeholder',
  style: {},
  innerStyle: {},
  innerClass: 'draggable-placeholder-inner',
  innerBackStyle: {},
  innerBackClass: 'draggable-placeholder-inner-back',
  // children: [],
}

export default {
  extends: Tree,
  props: {
    getTriggerEl: {type: Function},
    draggable: {},
    droppable: {default: true},
    crossTree: {},
    ondragstart: {type: Function},
    ondragend: {type: Function},
    preventSelect: {default: true},
  },
  components: {
    TreeNode: DraggableTreeNode,
  },
  data() {
    return {
      // DragPlaceHolder
      dplh,
      trees,
    }
  },
  // computed: {},
  // watch: {},
  // methods: {},
  created() {
    trees.push(this)
  },
  mounted() {
  },
  beforeDestroy() {
    hp.arrayRemove(trees, this)
  },
}
</script>
