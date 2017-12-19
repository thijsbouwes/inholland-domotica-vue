import request from '../../service/request';
import * as types from '../mutation-types';
import { ENDPOINTS } from '../../config/api';

// initial state
const state = {
    all: {
        user: {
            name: '',
            email: '',
        },
        background: {
            url: '',
            name: ''
        },
        enabled_modules: [
            {
                id: 1,
                name: "Window",
                column: "B",
                component_name: "windows",
                enabled: true
            },
            {
                id: 2,
                name: "Lamp",
                column: "A",
                component_name: "lamps",
                enabled: true
            },
            {
                id: 3,
                name: "Time & Date",
                column: "A",
                component_name: "time-date",
                enabled: false
            },
            {
                id: 4,
                name: "Weather",
                component_name: "weather",
                column: "B",
                enabled: true
            },
            {
                id: 5,
                name: "Heater",
                column: "A",
                component_name: "heater",
                enabled: true
            },
            {
                id: 6,
                name: "Scoreboard",
                column: "D",
                component_name: "scoreboard",
                enabled: true
            },
            {
                id: 7,
                name: "Tic Tac Toe",
                column: "B",
                component_name: "tic-tac-toe",
                enabled: true
            },
            {
                id: 8,
                name: "Bookmarks",
                column: "B",
                component_name: "bookmarks",
                enabled: true
            }
        ]
    },
    loading: true
};

// getters
const getters = {
    user: state => state.all.user,
    background: state => state.all.background,
    enabled_modules: state => state.all.enabled_modules,
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

    [types.ENABLE_MODULE] (state, module) {
        let index = state.all.enabled_modules.indexOf(module);

        // Toggle enabled
        state.all.enabled_modules[index].enabled = !state.all.enabled_modules[index].enabled;
    },

    [types.SET_ENABLED_MODULES] (state, modules) {
        state.all.enabled_modules = modules;
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