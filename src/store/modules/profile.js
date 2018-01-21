import request from '../../service/request';
import socket from '../../service/socket';
import { Event } from '../../service/event';
import * as types from '../mutation-types';
import { ENDPOINTS } from '../../config/api';
import { CHANNELS } from "../../config/game";

// initial state
const state = {
    all: {
        user_image: '/static/users/nobody.jpg',
        user: {
            name: '',
            email: '',
            is_admin: false,
            image: null,
        },
        background: {
            url: '',
            name: ''
        },
    },
    socket: {},
    changed: false,
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
    loadProfile({ commit, dispatch }) {

        return request.get(ENDPOINTS.PROFILE_SETTINGS)
            .then(response => {
                commit(types.SET_PROFILE, response.data);
                commit(types.LOADING_DONE);
                commit(types.SETUP_SOCKET);

                Event.$emit('PROFILE_LOADED');

                dispatch('loadProfileImage');
            });
    },

    loadProfileImage({ commit, state }) {
        // Check if user got image, otherwise default
        if (state.all.user.image === null) {
            return;
        }

        request.get(ENDPOINTS.PROFILE_IMAGE, { responseType: 'arraybuffer' })
            .then(response => {
                let buffer = new Buffer(response.data, 'binary').toString('base64');

                commit(types.SET_IMAGE, 'data:' + response.headers['content-type'] + ';base64,' + buffer);
            })
    },

    updateProfile({ getters, commit }) {
        let data = { name: getters.user.name, background_id: getters.background.id };

        commit(types.DATA_SAVED);

        return request.put(ENDPOINTS.PROFILE, data)
    },

    saveImage({ getters, commit }, file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);

        // Set img on page
        reader.onload = () => {
            commit(types.SET_IMAGE, reader.result);
        };

        // Send formdata
        let formData = new FormData();
        formData.append('file', file);

        return request.post(ENDPOINTS.PROFILE_IMAGE, formData);
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

    [types.SET_IMAGE] (state, base64_image) {
        state.all.user_image = base64_image;
    },

    [types.LOADING_DONE] (state) {
        state.loading = false;
    },

    [types.DATA_SAVED] (state) {
        state.changed = false;
    },

    [types.DATA_CHANGED] (state) {
        state.changed = true;
    },

    [types.SETUP_SOCKET] () {
        state.socket = socket.subscribe(CHANNELS.PRIVATE_USER_CHANNELNAME + state.all.user.id);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}