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
    lamps: state => state.all,
};

// actions
const actions = {
    getAllLamps({ commit, getters }) {
        if (getters.lamps.length > 0) {
            return;
        }

        return request.get(ENDPOINTS.LAMPS)
            .then(response => {
                commit(types.SET_LAMPS, response.data);
                commit(types.LOADING_DONE);
            });
    },

    updateStatusLamp({ commit }, lamp) {
        return request.put(ENDPOINTS.LAMP_SWITCH + lamp.id)
            .then(response => {
                commit(types.SET_LAMP, { lamp, new_lamp_state: response.data });
            });
    }
};

// mutations
const mutations = {
    [types.SET_LAMPS] (state, lamps) {
        state.all = lamps;
    },

    [types.SET_LAMP] (state, {lamp, new_lamp_state }) {
        let index = state.all.indexOf(lamp);
        state.all[index] = new_lamp_state;
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