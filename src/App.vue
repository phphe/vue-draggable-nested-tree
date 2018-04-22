<!-- this is an example -->
<template lang="pug">
#app
  Tree(:data="data")
    div(slot-scope="{data, level, store}")
      b(v-if="data.children.length" @click="store.toggleOpen(data)") {{data.open ? '-' : '+'}}&nbsp;
      span {{data.text}}
</template>

<script>
import Tree from '@/components/Tree'
export default {
  components: {Tree},
  data() {
    return {
      data: [
        {text: 'node 1'},
        {text: 'node 2'},
        {text: 'node 3'},
        {text: 'node 4'},
        {text: 'node 5', children: [
          {text: 'node 1'},
          {text: 'node 2', children: [
            {text: 'node 3'},
            {text: 'node 4'},
          ]},
          {text: 'node 3'},
          {text: 'node 4'},
        ]},
      ],
    }
  },
  // computed: {},
  // watch: {},
  // methods: {},
  // created() {},
  // mounted() {},
}
</script>

<style lang="scss">
#app{}
</style>
