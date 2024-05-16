/* eslint-disable no-unused-vars */
const path = require('path');
const { LocalStorage } = require('node-localstorage');
let localstorage = new LocalStorage(path.resolve(__dirname, "local"));

let win = null;
let pos = localstorage.getItem('pos');
pos = pos ? JSON.parse(pos) : null;
let size = localstorage.getItem('size');
size = size ? JSON.parse(size) : null;
module.exports = function createWindow(BrowserWindow) {
    if (win) return win;
    win = new BrowserWindow({
        minWidth: 200,
        minHeight: 65,
        width: 500,
        height: 600,
        transparent: true,
        show: false,
        frame: false,
        resizable:true,
        webPreferences: {
            webviewTag: true,
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: false,
            preload: path.join(__dirname, 'webview.js'),
        },
    })
    let Url = process.env.EXT_ENV == 'development' ? 
        "http://127.0.0.1:8080/#/" :
        path.join(__dirname, "..", "dist", "index.html") + '#/';

    win.loadURL(Url);
    if (pos) win.setPosition(pos[0], pos[1]);
    if (size) win.setSize(size[0], size[1]);
    win.on('closed', (event) => {
        win = null;
    })
    win.on('moved', (event) => {
      let pos = win.getPosition();
      localstorage.setItem('pos', JSON.stringify(pos));
    })
    win.on('resize', (event) => {
      let size = win.getSize();
      localstorage.setItem('size', JSON.stringify(size));
    })
    if(process.env.EXT_ENV == 'development') 
      win.openDevTools();
    return win;
}