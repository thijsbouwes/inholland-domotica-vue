import request from '../../service/request';
import * as types from '../mutation-types';
import { ENDPOINTS } from '../../config/api';

// initial state
const state = {
    all: [],
};

// getters
const getters = {
    backgrounds: state => state.all,
};

// actions
const actions = {
    getAllBackgrounds ({ commit, state }) {
        if (state.all.length > 0) {
            console.log("allready have data");
            return;
        }

        return request.get(ENDPOINTS.BACKGROUND_ALL)
            .then(response => {
                commit(types.SET_BACKGROUNDS, response.data)
            });
    }
};

// mutations
const mutations = {
    [types.SET_BACKGROUNDS] (state, backgrounds) {
        state.all = backgrounds;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}