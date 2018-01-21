import request from '../../service/request';
import * as types from '../mutation-types';
import { ENDPOINTS } from '../../config/api';
import M from 'materialize-css';

// initial state
const state = {
    all: [],
    bookmark_url: '',
};

// getters
const getters = {
    bookmarks: state => state.all,

    is_valid: state => {
        let pattern = new RegExp('^((?:https?\\:\\/\\/|www\\.)(?:[-a-z0-9]+\\.)*[-a-z0-9]+.*)$');

        return pattern.test(state.bookmark_url);
    }
};

// actions
const actions = {
    deleteBookmark({ commit }, bookmark) {
        request.delete(ENDPOINTS.BOOKMARKS + '/' + bookmark.id)
            .then(() => {
                commit(types.DELETE_BOOKMARK, bookmark)
            });
    },

    createNewBookmark({ commit, getters, state }) {
        if (getters.is_valid) {
            let data = { url: state.bookmark_url };

            request.post(ENDPOINTS.BOOKMARKS, data)
                .then(() => {
                    commit(types.ADD_BOOKMARK, data);
                    commit(types.RESET_NEW_BOOKMARK);
                });
        } else {
            M.toast({html: 'Enter a valid url', classes: 'red'});
        }
    },

    getAllBookmarks ({ commit }) {
        request.get(ENDPOINTS.BOOKMARKS)
            .then(response => {
                commit(types.SET_BOOKMARKS, response.data)
            });
    }
};

// mutations
const mutations = {
    [types.ADD_BOOKMARK] (state, bookmark) {
        state.all.push(bookmark);
    },

    [types.SET_BOOKMARKS] (state, bookmarks) {
        state.all = bookmarks;
    },

    [types.SET_BOOKMARKS] (state, bookmarks) {
        state.all = bookmarks;
    },

    [types.SET_NEW_BOOKMARK] (state, value) {
        state.bookmark_url = value;
    },

    [types.RESET_NEW_BOOKMARK] (state) {
        state.bookmark_url = '';
    },

    [types.DELETE_BOOKMARK] (state, bookmark) {
        let index = state.all.indexOf(bookmark);
        state.all.splice(index, 1);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}