<template lang="pug">
.he-tree.tree
  TreeNode(:data="rootData" :level="0" :store="store")
    template(slot-scope="props")
      slot(:data="props.data" :level="props.level" :store="store")
</template>

<script>
import * as hp from 'helper-js'
import * as th from 'tree-helper'
import TreeNode from '@/components/TreeNode'
export default {
  props: {
    data: {},
    idLength: {default: 5},
    indent: {default: 16},
    indentType: {default: 'margin'}, // margin/padding
    activatedClass: {default: 'active'},
    openedClass: {default: 'open'},
  },
  components: {TreeNode},
  data() {
    return {
      store: this,
      rootData: null,
      activated: [],
      opened: [],
    }
  },
  computed: {
  },
  watch: {
    data: {
      immediate: true,
      handler(data) {
        const activated = []
        const opened = []
        th.forIn(data, (item, k, parent) => {
          const compeletedData = {
            open: false,
            children: [],
            active: false,
            style: {},
            class: '',
          }
          for (const key in compeletedData) {
            if (!item.hasOwnProperty(key)) {
              this.$set(item, key, compeletedData[key])
            }
          }
          this.$set(data, 'parent', parent)
          if (!item.hasOwnProperty('_id')) {
            item._id = 'TreeNodeId_' + hp.strRand(this.idLength)
          }
          if (item.active) {
            activated.push(item)
          }
          if (item.open) {
            opened.push(item)
          }
        })
        this.rootData = {children: data}
        this.activated = activated
        this.opened = opened
      }
    }
  },
  methods: {
    // pure node self
    pure(data, withChildren) {
      const t = Object.assign({}, data)
      delete t._id
      delete t.parent
      delete t.children
      delete t.open
      delete t.active
      delete t.style
      delete t.class
      if (withChildren && data.children) {
        t.children = data.children.slice()
        t.children.forEach((v, k) => {
          t.children[k] = this.pure(v, withChildren)
        })
      }
      return t
    },
    activeNode(node, inactiveOld) {
      if (inactiveOld) {
        this.activated.forEach(item => {
          item.active = false
        })
        this.activated = []
      }
      this.activated.push(node)
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
      if (closeOld) {
        this.opened.forEach(item => {
          item.open = false
        })
        this.opened = []
      }
      this.opened.push(node)
      node.open = true
    },
    toggleOpen(node, closeOld) {
      if (node.open) {
        node.open = false
      } else {
        this.openNode(node, closeOld)
      }
    },
  },
  // created() {},
  // mounted() {},
}
</script>
