/* eslint-disable */
const pkg = require('../package.json');
let $vue = null;

function openWindow () {
  $vue.$ipc.sendSync('fishpi.global.command', {
    id: pkg.publisher + '.' + pkg.name,
    command: 'fishpi.open.bot',
  }).then(console.log).catch(console.error)
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function routerHook (to, from) {
  if (to.meta.name == 'chatroom' && from?.meta?.name != 'chatroom') {
    await sleep(100)
    const toolbar = document.querySelector('.chat-toolbar')
    if (toolbar && !toolbar.querySelector('.robot-btn')) {
      const button = toolbar.querySelector('button').cloneNode(true)
      button.classList.add('.robot-btn')
      button.title = '机器人消息'
      button.querySelector('i').className = 'ivu-icon fa fa-robot'
      button.onclick = openWindow
      toolbar.appendChild(button)
    }
  } else currentRouter = to.path
}

function activate (vueapp) {
  $vue = vueapp;
  if (!vueapp.$router.afterHooks.includes(routerHook)){
    routerHook(vueapp.$router.currentRoute, null)
    vueapp.$router.afterEach(routerHook)
  }
}

module.exports = { activate }