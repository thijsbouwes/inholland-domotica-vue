import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';

require('materialize-css');
require('./theme');
require('materialize-css/dist/css/materialize.css');

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
	baseURL: 'https://localhost:44305/api/',
	header: {
		'X-Requested-With': 'XMLHttpRequest'
	}
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
