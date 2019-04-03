<template lang="pug">
.he-tree.tree
  TreeNode(:data="rootData" :store="store")
    template(slot-scope="props")
      slot(:data="props.data" :store="store" :vm="props.vm")
    template(v-if="customInnerBack" slot="node-inner-back" slot-scope="props")
      slot(name="node-inner-back" :styleObj="props.styleObj" :data="props.data" :store="props.store" :vm="props.vm")
</template>

<script>
import * as hp from 'helper-js'
import * as th from 'tree-helper'
import TreeNode from './TreeNode.vue'

export default {
  props: {
    data: {},
    idLength: {type: Number, default: 5},
    indent: {type: Number, default: 16},
    activatedClass: {default: 'active'},
    openedClass: {default: 'open'},
    space: {type: Number, default: 10}, // space between node, unit px
    childrenTransitionName: {}, // there are issues under draggable tree
    customInnerBack: {},
  },
  components: {TreeNode},
  data() {
    return {
      store: this,
      rootData: null,
    }
  },
  // computed: {},
  watch: {
    data: {
      immediate: true,
      handler(data, old) {
        if (data === old) {
          return
        }
        // make rootData always use a same object
        this.rootData = this.rootData || {isRoot: true, _id: `tree_${this._uid}_node_root`, children: []}
        th.breadthFirstSearch(data, (node, k, parent) => {
          this.compeleteNode(node, parent)
        })
        this.rootData.children = data
      }
    }
  },
  methods: {
    compeleteNode(node, parent) {
      const compeletedData = {
        open: true,
        children: [],
        active: false,
        style: {},
        class: '',
        innerStyle: {},
        innerClass: '',
        innerBackStyle: {},
        innerBackClass: {},
      }
      for (const key in compeletedData) {
        if (!node.hasOwnProperty(key)) {
          this.$set(node, key, compeletedData[key])
        }
      }
      this.$set(node, 'parent', parent || this.rootData)
      if (!node.hasOwnProperty('_id')) {
        node._id = `tree_${this._uid}_node_${hp.strRand(this.idLength)}`
      }
      node._treeNodePropertiesCompleted = true
    },
    // pure node self
    pure(node, withChildren, after) {
      const t = Object.assign({}, node)
      delete t._id
      delete t.parent
      delete t.children
      delete t.open
      delete t.active
      delete t.style
      delete t.class
      delete t.innerStyle
      delete t.innerClass
      delete t.innerBackStyle
      delete t.innerBackClass
      for (const key of Object.keys(t)) {
        if (key[0] === '_') {
          delete t[key]
        }
      }
      if (withChildren && node.children) {
        t.children = node.children.slice()
        t.children.forEach((v, k) => {
          t.children[k] = this.pure(v, withChildren)
        })
      }
      if (after) {
        return after(t, node) || t
      }
      return t
    },
    getNodeById(id) {
      let r
      th.breadthFirstSearch(this.rootData.children, (node) => {
        if (node._id === id) {
          r = node
          return false
        }
      })
      return r
    },
    getActivated() {
      const r = []
      th.breadthFirstSearch(this.rootData.children, (node) => {
        if (node.active) {
          r.push(node)
        }
      })
      return r
    },
    getOpened() {
      const r = []
      th.breadthFirstSearch(this.rootData.children, (node) => {
        if (node.open) {
          r.push(node)
        }
      })
      return r
    },
    activeNode(node, inactiveOld) {
      let {activated} = this
      if (inactiveOld) {
        this.getActivated().forEach(node2 => {
          node2.active = false
        })
      }
      node.active = true
    },
    toggleActive(node, inactiveOld) {
      if (node.active) {
        node.active = false
      } else {
        this.activeNode(node, inactiveOld)
      }
    },
    openNode(node, closeOld) {
      let {opened} = this
      if (closeOld) {
        this.getOpened().forEach(node2 => {
          node2.open = false
          this.$emit('nodeOpenChanged', node2)
        })
      }
      node.open = true
      this.$emit('nodeOpenChanged', node)
    },
    toggleOpen(node, closeOld) {
      if (node.open) {
        node.open = false
        this.$emit('nodeOpenChanged', node)
      } else {
        this.openNode(node, closeOld)
      }
    },
    getPureData(after) {
      return this.pure(this.rootData, true, after).children
    },
    deleteNode(node) {
      return hp.arrayRemove(node.parent.children, node)
    },
  },
  // created() {},
  // mounted() {},
}
</script>
