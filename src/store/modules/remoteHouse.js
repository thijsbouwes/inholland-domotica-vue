import request from '../../service/request';
import * as types from '../mutation-types';
import { ENDPOINTS } from '../../config/api';

// initial state
const state = {
    all: {
        updated_at: '',
        image: ''
    },
    loading: true
};

// getters
const getters = {
    house: state => state.all,
    houseImage: state => {
        if (state.all.image === '') {
            return false;
        }

        return `data:image/png;base64,${state.all.image}`;
    }
};

// actions
const actions = {
    getRemoteHouse({ commit }) {
        request.get(ENDPOINTS.HOUSE_REMOTE)
            .then(response => {
                commit(types.SET_REMOTE_HOUSE, response.data);
                commit(types.LOADING_DONE);
            });
    }
};

// mutations
const mutations = {
    [types.SET_REMOTE_HOUSE] (state, house) {
        state.all = house;
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