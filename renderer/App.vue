<template>
  <div id="app">
    <header>
      <a href="javascript:void(0)" @click="close" class="fa fa-close" ></a>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  async mounted() {
  },
  data() {
    return {
    }
  },
  methods: {
    close() {
      // eslint-disable-next-line no-undef
      $ipc.send('fishpi.bot.close')
    }
  }
}
</script>

<style lang="less" scoped>
header {
  text-align: right;
  padding: 10px;
  -webkit-app-region: drag;
  a {
    -webkit-app-region: no-drag;
  }
}
</style>
