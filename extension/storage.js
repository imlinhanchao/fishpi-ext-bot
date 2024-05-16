const path = require('path');
const { LocalStorage } = require('node-localstorage');
let localstorage = new LocalStorage(path.resolve(__dirname, "local"));

let settings = localstorage.getItem('setting');
settings = settings ? JSON.parse(settings) : {
  bot: 'b,xiaoIce,sevenSummer',
  cmd: '凌,小冰,鸽',
};

module.exports = {
  get() {
    return settings
  },
  set(setting) {
    settings = setting
    localstorage.setItem('setting', JSON.stringify(settings));
    return settings;
  }
}