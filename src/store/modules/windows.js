import request from '../../service/request';
import * as types from '../mutation-types';
import { ENDPOINTS } from '../../config/api';

// initial state
const state = {
    all: [],
    loading: true
};

// getters
const getters = {
    windows: state => state.all,
};

// actions
const actions = {
    getAllWindows({ commit, getters }) {
        if (getters.windows.length > 0) {
            return;
        }

        return request.get(ENDPOINTS.WINDOWS)
            .then(response => {
                commit(types.SET_WINDOWS, response.data);
                commit(types.LOADING_DONE);
            });
    },

    updateStatusWindow({ commit }, window) {
        return request.put(ENDPOINTS.WINDOW_SWITCH + window.id)
            .then(response => {
                commit(types.SET_WINDOW, { window, new_window_state: response.data });
            });
    }
};

// mutations
const mutations = {
    [types.SET_WINDOWS] (state, windows) {
        state.all = windows;
    },

    [types.SET_WINDOW] (state, {window, new_window_state }) {
        let index = state.all.indexOf(window);
        state.all[index] = new_window_state;
    },

    [types.LOADING_DONE] (state) {
        state.loading = false;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}