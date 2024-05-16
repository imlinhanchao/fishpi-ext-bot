/* eslint-disable */
const path = require('path');
const createWindow = require('./window');

let apiKey = '';
let cxt = null;
let ipc = null;
function activate(context, electron) {
  cxt = context;
  const { BrowserWindow, globalShortcut, ipcMain, Notification } = electron;
  let win = createWindow(BrowserWindow);
  ipc = ipcMain;

  context.on('login', function(token) {
      apiKey = token;
      login(context);
  })

  context.on('logout', () => {
      apiKey = '';
      console.dir('user logout')
  })

  context.on('quit', () => {
      console.dir('app was quit')
  })

  context.on('command', async (command, args, callback) => {
    switch(command) {
      case 'fishpi.info.token':
      {
          callback(apiKey);
          break;
      }
      case 'fishpi.open.bot':
      {
        if (win.isDestroyed()) {
          win = createWindow(BrowserWindow);
        }
        win.isVisible() ? win.hide() : win.show();
        break;
      }
      case 'fishpi.bot.close':
      {
        win.hide()
      }
  }
  })
}

let isLogin = false;
function login(context) {
  if (isLogin) return;
  isLogin = true;
  context.setHookJs && context.setHookJs(path.join(__dirname, 'hook.js'));
}

const hooks = () => ({
  async messageEvent(msg){
    if (msg.type != 'msg') return msg;
    const bots = ['b', 'sevenSummer']
    if (!bots.includes(msg.data.userName)) return msg;
    win.webContents.send('fishpi.bot.msg', msg);
  },
})
module.exports = { activate, hooks }