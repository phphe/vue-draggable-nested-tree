<!-- this is an example -->
<!-- the collapsing animation will cause bug -->
<template lang="pug">
div
  h2 Collapse Animation
  Tree(:data="originalData" draggable crossTree ref="tree1" @change="tree1Change" @drag="ondrag" @drop="ondrop")
    div(slot-scope="{data, store}")
      b(v-if="data.children && data.children.length" @click="store.toggleOpen(data)") {{data.open ? '-' : '+'}}&nbsp;
      span {{data.text}}
</template>

<script>
import Tree0 from '@/components/DraggableTree'
import CustomTreeNode from './CustomTreeNode.vue'

const Tree = {
  extends: Tree0,
  components: {
    TreeNode: CustomTreeNode,
  },
  data() {
    return {
      nodesTransition: 'fade',
    }
  },
}

export default {
  components: {Tree},
  data() {
    return {
      originalData: [
        {text: 'node 1'},
        {text: 'node 2'},
        {text: 'node 3'},
        {text: 'node 4'},
        {text: 'node 4 undroppable', droppable: false},
        {text: 'node 5', children: [
          {text: 'node 1'},
          {text: 'node 2', children: [
            {text: 'node 3'},
            {text: 'node 4'},
          ]},
          {text: 'node 2 undroppable', droppable: false, children: [
            {text: 'node 3'},
            {text: 'node 4'},
          ]},
          {text: 'node 2', children: [
            {text: 'node 3'},
            {text: 'node 4 undroppable', droppable: false},
          ]},
          {text: 'node 3'},
          {text: 'node 4'},
          {text: 'node 3'},
          {text: 'node 4'},
          {text: 'node 3'},
          {text: 'node 4'},
          {text: 'node 3'},
          {text: 'node 4'},
        ]},
      ],
      data: null,
    }
  },
  // computed: {},
  // watch: {},
  methods: {
    tree1Change(node, targetTree) {
      this.data = targetTree.getPureData()
    },
    ondrag() {
      const tree = this.$refs.tree1
      tree.nodesTransition = null
    },
    ondrop() {
      const tree = this.$refs.tree1
      tree.nodesTransition = 'fade'
    },
  },
  // created() {},
  // mounted() {},
}
</script>

<style>
</style>
