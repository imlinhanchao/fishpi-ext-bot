<template>
  <div class="layout">
    <div class="msg-list">
      <div class="msg-item" v-for="(m, i) in messages" v-bind:key="i">
        <div class="msg-avatar-box">
            <img class="msg-avatar user-card" :data-user="m.data.userName" :src="m.data.userAvatarURL" />
        </div>
        <div class="msg-item-content" v-html="m.data.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
    
  },
  data() {
    return {
      messages: [
      {
    "type": "msg",
    "data": {
        "userOId": 1685085837090,
        "oId": "1715839194049",
        "time": "2024-05-16 13:59:54",
        "userName": "b",
        "userNickname": "鸽",
        "userAvatarURL": "https://file.fishpi.cn/2023/05/blob-29859f13.png",
        "content": "<p>好的 imlinhanchao，听好了，题目是：<br><img src=\"https://d.iwpz.net/image.png?time=1715839193831\" alt=\"image.png\">本题出现次数:13<br></p>",
        "md": "好的 imlinhanchao，听好了，题目是：<br />![image.png](https://d.iwpz.net/image.png?time=1715839193831)本题出现次数:13<br />",
        "client": "Bird/鸽",
        "via": {
            "client": "Bird",
            "version": "鸽"
        }
    }
}
      ]
    }
  },
  computed: {
  },
  mounted() {
    window.$ipc.on('fishpi.bot.msg', (event, data) => {
      console.log('message', data)
      this.messages.push(data)
    })
    window.$ipc.invoke('fishpi.info.token').then(console.log);
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.layout {
  padding: 0 20px;
  height: 100%;
  overflow: auto;
}
.msg-list {
  display: flex;
  flex-direction: column;
  .msg-item{
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

