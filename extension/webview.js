const { ipcRenderer } = require('electron')
const pkg = require('../package.json');

const extId = pkg.publisher + '.' + pkg.name
const listener = {};
ipcRenderer.on('fishpi.global.listener', ({ data: rsp }) => {
  if (rsp.id != extId) return;
  if (!listener[rsp.command]) return;
  listener[rsp.command].forEach(fn => fn(rsp.data))
})
window.$ipc = {
  send (event, data, fn) {
    let callback = fn ? parseInt(Math.random() * 10000).toString() : undefined
    if (fn) ipcRenderer.on(`fishpi.global.command-callback-${callback}`, fn)
    ipcRenderer.send('fishpi.global.command', { id: extId, command: event, data, callback })
  },
  invoke (event, argv) {
    return new Promise((resolve, reject) => {
      try {
        this.send(event, argv, (event, data) => {
          resolve(data)
        })
      } catch (error) {
        reject(error)
      }
    })
  },
  on (event, fn) {
    ipcRenderer.on(event, fn)
  },
  off (event, fn) {
    ipcRenderer.off(event, fn)
  }
}
console.dir(window.$ipc)
