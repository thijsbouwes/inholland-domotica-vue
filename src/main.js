import Vue from 'vue';
import store from './store';
import App from './App';
import { router } from './router';
import request from './service/request';
import M from 'materialize-css';

try {
    require('materialize-css/extras/noUiSlider/nouislider.css');
} catch (e) {}

// Register event buss
window.Event = new Vue();
Vue.config.productionTip = false;

Vue.filter('capitalize', value => {
    if (!value) return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.prototype.$http = request;
Vue.prototype.$M = M;

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
