import Vue from 'vue'
import App from './App'
import router from './router'

require('materialize-css');
require('../node_modules/materialize-css/dist/css/materialize.css');

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
