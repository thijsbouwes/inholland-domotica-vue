import Vue from 'vue';
import Vuex from 'vuex';
import bookmarks from './modules/bookmarks'
import backgrounds from './modules/backgrounds'
import lamps from './modules/lamps'


Vue.use(Vuex);

const state = {

};

const mutations =  {

};

const actions = {

};

export const store = new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        bookmarks,
        backgrounds,
        lamps
    }
});