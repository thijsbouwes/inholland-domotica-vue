import request from '../../service/request';
import * as types from '../mutation-types';
import { ENDPOINTS } from '../../config/api';

// initial state
const state = {
    all: {
        user: {
            name: '',
            email: '',
            is_admin: false
        },
        background: {
            url: '',
            name: ''
        },
    },
    loading: true
};

// getters
const getters = {
    user: state => state.all.user,
    is_admin: state => state.all.user.is_admin,
    background: state => state.all.background
};

// actions
const actions = {
    loadProfile({ commit }) {

        return request.get(ENDPOINTS.PROFILE_SETTINGS)
            .then(response => {
                commit(types.SET_PROFILE, response.data);
                commit(types.LOADING_DONE);
            });
    },

    updateProfile({ getters }) {
        let data = { name: getters.user.name, background_id: getters.background.id };

        return request.put(ENDPOINTS.PROFILE, data)
    }
};

// mutations
const mutations = {
    [types.SET_PROFILE] (state, { user, background }) {
        state.all.user = user;
        state.all.background = background;
    },

    [types.SET_NAME] (state, name) {
        state.all.user.name = name;
    },

    [types.SET_BACKGROUND] (state, background) {
        state.all.background = background;
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