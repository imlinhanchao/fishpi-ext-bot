<template>
  <div id="app">
    <header>
      <span>
        <i class="fa fa-robot"></i>
        机器人消息
      </span>
      <a href="javascript:void(0)" @click="close" class="fa-solid fa-times"></a>
    </header>
    <div class="layout" ref="msgsRef">
      <div class="msg-list">
        <div class="msg-item" v-for="(m, i) in messages" v-bind:key="i">
          <div class="msg-avatar-box">
            <img class="msg-avatar user-card" :data-user="m.data.userName" :src="m.data.userAvatarURL" />
          </div>
          <div class="msg-item-content" v-html="m.data.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {

  },
  data () {
    return {
      messages: [
      ],
      setting: {
        bot: 'b,xiaoIce,sevenSummer',
        cmd: '凌,小冰,鸽',
      },
    }
  },
  computed: {
  },
  async mounted () {
    window.$ipc.on('fishpi.bot.msg', (event, data) => {
      console.log('message', data)
      this.messages.push(data);
      this.$nextTick(() => {
        this.$refs.msgsRef.scrollTop = this.$refs.msgsRef.scrollHeight;
      })
    })
    window.$ipc.on('fishpi.set.setting', (event, data) => {
      console.log('message', data)
      this.setting = data;
    })
    window.$ipc.invoke('fishpi.info.token').then(console.log);
    this.setting = await window.$ipc.invoke('fishpi.get.setting');
  },
  methods: {
    close() {
      window.$ipc.send('fishpi.bot.close')
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
  opacity: .5;
  background-color: rgba(12, 13, 14, 0.5);
}

.layout {
  padding: 0 20px;
  height: 100%;
  overflow: auto;
}

.msg-list {
  display: flex;
  flex-direction: column;

  .msg-item {
    display: flex;
    flex-direction: row;
    margin: 5px 0;
  }

  .msg-item-content {
    display: inline-block;
    border-radius: 5px;
    margin: .5em .8em;
    padding: .8em;
    background: var(--main-chatroom-message-background-color);
    color: var(--main-chatroom-message-color);
    position: relative;

    &::before {
      font: normal normal 900 1.5em 'Font Awesome 6 Free';
      content: "\f0d9";
      color: var(--main-chatroom-message-background-color);
      position: absolute;
      left: -.3em;
      top: .5em;
    }
  }

  .msg-avatar-box {
    position: relative;

    .msg-avatar {
      width: 35px;
      height: 35px;
      border-radius: 35px;
      margin-top: 1.2em;
      cursor: pointer;
    }
  }
}
</style>
