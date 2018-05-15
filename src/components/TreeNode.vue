<template lang="pug">
.tree-node(
  :class="[data.active ? store.activatedClass : '', data.open ? store.openedClass : '', data.class]"
  :id="data._id" :data-level="data.level"
)
  .tree-node-inner-back(v-if="!isRoot" :style="[innerBackStyle, data.innerBackStyle]" :class="[data.innerBackClass]")
    .tree-node-inner(:style="[data.innerStyle]" :class="[data.innerClass]")
      slot(:data="data" :store="store")
  .tree-node-children(v-if="childrenVisible")
    TreeNode(v-for="child in data.children" :key="child._id"
      :data="child" :store="store"
    )
      template(slot-scope="props")
        slot(:data="props.data" :store="props.store")
</template>
<script>
export default {
  name: 'TreeNode',
  props: {
    data: {},
    store: {},
  },
  data() {
    return {
    }
  },
  computed: {
    isRoot() {return this.data.level === 0},
    childrenVisible() {
      const {data} = this
      return this.isRoot || data.children && data.children.length && data.open
    },
    innerBackStyle() {
      const r = {
        marginBottom: this.store.space + 'px'
      }
      if (!this.isRoot && this.data.level > 1) {
        const {indentType} = this.store
        r.paddingLeft = (this.data.level - 1) * this.store.indent + 'px'
      }
      return r
    },
  },
  watch: {
    'data.parent': {
      immediate: true,
      handler(parent, old) {
        if (parent !== old) {
          this.store.updateBranchLevel(this.data)
        }
      }
    }
  },
  // methods: {},
  // created() {},
  // mounted() {},
}
</script>
