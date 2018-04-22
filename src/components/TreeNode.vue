<template lang="pug">
.tree-node(:style="[style, data.style]" :class="[data.active ? store.activatedClass : '', data.open ? store.openedClass : '', data.class]")
  .tree-node-inner(v-if="!isRoot")
    slot(:data="data" :level="level" :store="store")
  .tree-node-children(v-if="childrenVisible")
    TreeNode(v-for="child in data.children" :key="child._id"
      :data="child" :level="childLevel" :store="store"
    )
      template(slot-scope="props")
        slot(:data="props.data" :level="props.level" :store="props.store")
</template>
<script>
export default {
  name: 'TreeNode',
  props: {
    data: {},
    level: {},
    store: {},
  },
  data() {
    return {
    }
  },
  computed: {
    isRoot() {return this.level === 0},
    childLevel() { return this.level + 1 },
    childrenVisible() {
      const {data} = this
      return this.isRoot || data.children && data.children.length && data.open
    },
    // marginLeft and paddingLeft are 2 styles. marginLeft suits for file tree. paddingLeft suits for vertical menu.
    // 这里使用 marginLeft 或 paddingLeft 会有两种风格. marginLeft 适合文件树. paddingLeft 适合垂直菜单.
    style() {
      const r = {}
      if (!this.isRoot) {
        r[`${this.store.indentType}Left`] = (this.level - 1) * this.store.indent + 'px'
      }
      return r
    },
  },
  // watch: {},
  // methods: {},
  // created() {},
  // mounted() {},
}
</script>
