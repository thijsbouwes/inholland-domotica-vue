import Vue from 'vue';
import Vuex from 'vuex';
import bookmarks from './modules/bookmarks'
import backgrounds from './modules/backgrounds'
import lamps from './modules/lamps'
import windows from './modules/windows'
import heater from './modules/heater'
import remoteHouse from './modules/remoteHouse'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        bookmarks,
        backgrounds,
        lamps,
        windows,
        heater,
        remoteHouse
    }
});