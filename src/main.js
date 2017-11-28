import Vue from 'vue';
import App from './App';
import { router } from './router';
import axios from 'axios';

try {
    window.$ = window.jQuery = require('jquery');

    require('materialize-css');
    require('./theme-settings');
} catch (e) {}

Vue.config.productionTip = false;

Vue.prototype.$http = axios.create({
	baseURL: 'https://api.inholland.it/v1/',
	header: {
		'X-Requested-With': 'XMLHttpRequest'
	}
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
