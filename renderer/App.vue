<template>
  <div id="app">
    <header>
      <span>
        <i class="fa fa-robot"></i>
        机器人消息
      </span>
      <a href="javascript:void(0)" @click="close" class="fa-solid fa-times" ></a>
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
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  -webkit-app-region: drag;
  a {
    -webkit-app-region: no-drag;
  }
}
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
