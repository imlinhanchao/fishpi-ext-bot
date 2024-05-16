/* eslint-disable */
const path = require('path');
const createWindow = require('./window');
const storage = require('./storage')

let apiKey = '';
let cxt = null;
let ipc = null;
let win = null;
let setting = storage.get();
function activate(context, electron) {
  cxt = context;
  const { BrowserWindow, globalShortcut, ipcMain, Notification } = electron;
  win = createWindow(BrowserWindow);
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
      case 'fishpi.get.setting':
      {
          callback(storage.get());
          break;
      }
      case 'fishpi.set.setting':
      {
          storage.set(args);
          win.webContents.send(`fishpi.set.setting`, args);
          setting = args;
          break;
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

function filter(msg) {
  if (!setting.enable) return true;
  if (msg.type != 'msg') return true;
  const bots = setting.bot.split(',');
  if (bots.includes(msg.data.userName)) return false;
  const cmds = setting.cmd.split(',');
  if (cmds.some(c => msg.data.content.startsWith(c + ' '))) return false;
  return true;
}

const hooks = () => ({
  async messageEvent(msg){
    if (filter(msg)) return msg;
    win.webContents.send('fishpi.bot.msg', msg);
  },
})

function getSettingUrl() {
  let Url = process.env.EXT_ENV == 'development' ? 
      "http://127.0.0.1:8080/#/setting" :
      path.join(__dirname, "..", "dist", "index.html#/setting");
  Url = "http://127.0.0.1:8080/#/setting"
  return Url;
}
module.exports = { activate, hooks, getSettingUrl }