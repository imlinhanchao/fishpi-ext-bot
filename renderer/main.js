import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './theme/index.less';
import messageService from 'vue-update-message';

Vue.config.productionTip = false
Vue.use(messageService);

new Vue({
  router,
  store,
  data: {
  },
  mounted() {

  },
  render: h => h(App)
}).$mount('#app')
