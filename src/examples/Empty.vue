<!-- this is an example -->
<template lang="pug">
div
  h2 Empty
  Tree(:data="originalData" draggable crossTree ref="tree1")
    div(slot-scope="{data, store}")
      b(v-if="data.children && data.children.length" @click="store.toggleOpen(data)") {{data.open ? '-' : '+'}}&nbsp;
      span {{data.text}}
</template>

<script>
import Tree from '@/components/DraggableTree'
export default {
  components: {Tree},
  data() {
    return {
      originalData: [],
    }
  },
  // computed: {},
  // watch: {},
  // methods: {},
  // created() {},
  // mounted() {},
}
</script>

<style>
</style>
