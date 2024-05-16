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
    window.$ipc.on('fishpi.bot.msg', (event, data) => {
      console.log('message', data)
    })
    window.$ipc.invoke('fishpi.info.token').then(console.log);
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.layout {

}
</style>

