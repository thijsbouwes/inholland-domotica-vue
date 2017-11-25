import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';

try {
    window.$ = window.jQuery = require('jquery');

    require('materialize-css');
    require('./theme-settings');
} catch (e) {}

Vue.config.productionTip = false;
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
});
