<script>
import * as hp from 'helper-js'
import * as th from 'tree-helper'
import TreeNode from '@/components/TreeNode'
import Tree from '@/components/Tree'

const DraggableNode = {
  extends: TreeNode,
  name: 'TreeNode',
}

export default {
  extends: Tree,
  components: {
    TreeNode: DraggableNode,
  },
  data() {
    return {}
  },
  // computed: {},
  // watch: {},
  // methods: {},
  // created() {},
  // mounted() {},
}
</script>

<style lang="scss">
.he-tree{

}
</style>
