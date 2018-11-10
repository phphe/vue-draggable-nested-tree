<template lang="pug">
.tree-node(
  :class="[data.active ? store.activatedClass : '', data.open ? store.openedClass : '', data.class]"
  :id="data._id" :data-level="data.level"
)
  .tree-node-inner-back(v-if="!isRoot" :style="[innerBackStyle, data.innerBackStyle]" :class="[data.innerBackClass]")
    .tree-node-inner(:style="[data.innerStyle]" :class="[data.innerClass]")
      slot(:data="data" :store="store")
  transition(:name="store.nodesTransition")
    .tree-node-children(v-if="childrenVisible")
      TreeNode(v-for="child in data.children" :key="child._id"
        :data="child" :store="store"
      )
        template(slot-scope="props")
          slot(:data="props.data" :store="props.store")
</template>

<script>
import DraggableTreeNode from '@/components/DraggableTreeNode'

export default {
  name: 'TreeNode',
  extends: DraggableTreeNode,
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
