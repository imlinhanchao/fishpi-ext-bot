<template>
  <div class="layout">
    
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
    
  },
  data() {
    return {

    }
  },
  computed: {
  },
  mounted() {
    // eslint-disable-next-line no-undef
    $ipc.on('message', (event, data) => {
      console.log('message', data)
    })
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.layout {

}
</style>

