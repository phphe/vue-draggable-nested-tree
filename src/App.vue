<!-- this is an example -->
<template lang="pug">
#app(style="height:10000px")
  Tree(:data="data" draggable crossTree :isNodeDroppable="isNodeDroppable" ref="tree1" @change="tree1Change")
    div(slot-scope="{data, store}")
      b(v-if="data.children && data.children.length" @click="store.toggleOpen(data)") {{data.open ? '-' : '+'}}&nbsp;
      span {{data.text}}-level:{{data.level}}
  Tree(:data="data2" draggable crossTree)
    div(slot-scope="{data, store}")
      b(v-if="data.children && data.children.length" @click="store.toggleOpen(data)") {{data.open ? '-' : '+'}}&nbsp;
      span {{data.text}}-level:{{data.level}}
</template>

<script>
import Tree from '@/components/DraggableTree'
export default {
  components: {Tree},
  data() {
    return {
      data: [
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
      data2: [
        {text: 'node 1'},
        {text: 'node 2'},
        {text: 'node 3'},
        {text: 'node 4'},
      ],
      data0: null,
    }
  },
  // computed: {},
  // watch: {},
  methods: {
    isNodeDroppable(node, nodeVm, store) {
      return node.level < 3
    },
    tree1Change(node, nodeVm, store) {
      this.data0 = store.pure(store.rootData, true).children
    },
  },
  // created() {},
  // mounted() {},
}
</script>

<style lang="scss">
#app{
}
.he-tree{
  border: 1px solid #ccc;
  padding: 20px;
  display: inline-block;
}
.tree-node{
}
.tree-node-inner{
  padding: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.draggable-placeholder{
}
.draggable-placeholder-inner{
  border: 1px dashed #0088F8;
  box-sizing: border-box;
  background: rgba(0, 136, 249, 0.09);
  color: #0088f9;
  text-align: center;
  padding: 0;
  display: flex;
  align-items: center;
}
</style>
