import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';
import bookmarks from './modules/bookmarks'
import {ENDPOINTS} from "../config/api";
import request from "../service/request";

Vue.use(Vuex);

const state = {
    count: 0,
};

const mutations =  {
    [types.INCREMENT] (state) {
        state.count++;
    },
};

const actions = {

};

export const store = new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        bookmarks
    }
});