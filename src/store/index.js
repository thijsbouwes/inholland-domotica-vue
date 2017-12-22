import Vue from 'vue';
import Vuex from 'vuex';
import bookmarks from './modules/bookmarks';
import backgrounds from './modules/backgrounds';
import lamps from './modules/lamps';
import windows from './modules/windows';
import heater from './modules/heater';
import remoteHouse from './modules/remoteHouse';
import profile from './modules/profile';
import widgets from './modules/widgets';

Vue.use(Vuex);

const state = {
    time_format: 'HH:mm:ss',
    date_format: 'DD-MM-YYYY',
    time_date_format: 'DD-MM-YYYY - HH:mm:ss',
    time_zone: 'nl',
};

export const store = new Vuex.Store({
    state,
    modules: {
        profile,
        bookmarks,
        backgrounds,
        lamps,
        windows,
        heater,
        remoteHouse,
        widgets
    }
});