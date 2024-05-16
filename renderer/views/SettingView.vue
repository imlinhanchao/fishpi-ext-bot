<template>
  <div class="layout">
    <p>
      <label for="tooltip">机器人用户名</label>
      <textarea class="pretty" type="text" id="bot" v-model="setting.bot"></textarea>
    </p>
    <p>
      <label for="tooltip">机器人命令</label>
      <textarea class="pretty" type="text" id="cmd" v-model="setting.cmd"></textarea>
    </p>
    <p><button @click="save">设置</button></p>
    <p>{{error}}</p>
  </div>
</template>
<script>
export default {
  name: 'SettingView',
  components: {
    
  },
  data() {
    return {
      error: '',
      setting: {
        bot: 'b,xiaoIce,sevenSummer',
        cmd: '凌,小冰,鸽',
      },
    }
  },
  computed: {
  },
  async mounted() {
    let setting = await window.$ipc.invoke('fishpi.get.setting');
    if (setting) this.setting = setting;
  },
  methods: {
    save() {
      window.$ipc.send('fishpi.set.setting', this.setting);
      this.error = '设置成功';
      setTimeout(() => this.error = '', 2000);
    }
  }
}
</script>

<style lang="less" scoped>
.layout {
  padding: 10px;
  label {
    display: inline-block;
    text-align: right;
    padding-right: 10px;
  }
  textarea {
    width: 100%;
  }
  button {
    width: 100%;
    background: var(--global-active-color);
    border: none;
    padding: 10px;
    color: inherit;
    cursor: pointer;
  }
  .form-flex {
    display: flex;
  }
  .form-input {
      padding: 5px;
      height: 30px;
      flex: 1;
      line-height: 30px;
      margin-left: 5px;
      border: 1px solid var(--global-background-color);
      &:focus {
          outline: 0;
      }
  }
}
</style>