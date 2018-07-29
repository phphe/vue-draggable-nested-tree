<!-- this is an example -->
<template lang="pug">
div
  h2 Max Level 2
  Tree(:data="originalData" draggable crossTree ref="tree1" @drag="ondrag")
    div(slot-scope="{data, store}")
      b(v-if="data.children && data.children.length" @click="store.toggleOpen(data)") {{data.open ? '-' : '+'}}&nbsp;
      span {{data.text}}-level:{{data.level}}-droppable:{{data.droppable}}
</template>

<script>
import Tree from '@/components/DraggableTree'
import * as th from 'tree-helper'

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
    ondrag(node) {
      const maxLevel = 2
      let nodeLevels = 1
      th.depthFirstSearch(node, (childNode) => {
        if (childNode.level > nodeLevels) {
          nodeLevels = childNode.level
        }
      })
      nodeLevels = nodeLevels - node.level + 1
      const childNodeMaxLevel = maxLevel - nodeLevels
      //
      th.depthFirstSearch(this.originalData, (childNode) => {
        if (childNode === node) {
          return 'skip children'
        }
        this.$set(childNode, 'droppable', childNode.level <= childNodeMaxLevel)
      })
    },
  },
  // created() {},
  // mounted() {},
}
</script>

<style lang="scss">
</style>
