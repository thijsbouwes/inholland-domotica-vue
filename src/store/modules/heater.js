import request from '../../service/request';
import * as types from '../mutation-types';
import { ENDPOINTS } from '../../config/api';

// initial state
const state = {
    all: {},
    loading: true
};

// getters
const getters = {
    heater: state => state.all,
};

// actions
const actions = {
    getHeater({ commit, getters }) {
        if (Object.keys(getters.heater).length > 0) {
            return;
        }

        return request.get(ENDPOINTS.HEATER)
            .then(response => {
                commit(types.SET_HEATER, response.data);
                commit(types.LOADING_DONE);
            });
    },

    updateHeater({ commit }, temperature) {
        return request.put(ENDPOINTS.HEATER_TEMPERATURE, { temperature })
            .then(response => {
                commit(types.SET_HEATER, response.data);
            });
    }
};

// mutations
const mutations = {
    [types.SET_HEATER] (state, heater) {
        state.all = heater;
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