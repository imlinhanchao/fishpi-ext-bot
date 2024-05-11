/* eslint-disable */
const path = require('path');
const createWindow = require('./window');

let apiKey = '';
function activate(context, electron) {
  const { BrowserWindow, globalShortcut, ipcMain, Notification } = electron;
  let win = createWindow(BrowserWindow);

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
    
  },
  async sendMsgEvent(text){

  },
  async liveness(data){

  },
})
module.exports = { activate, hooks }