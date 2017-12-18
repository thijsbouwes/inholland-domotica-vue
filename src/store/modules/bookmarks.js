import request from "../../service/request";
import * as types from "../mutation-types";
import {ENDPOINTS} from "../../config/api";
import M from 'materialize-css';

// initial state
const state = {
    all: [],
    bookmark_url: "",
};

// getters
const getters = {
    bookmarks: state => state.all,

    hostname: state => {
        let match = state.bookmark_url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);

        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            return match[2];
        }

        return '';
    },

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

    createNewBookmark(context) {
        if (context.getters.is_valid) {
            let data = { url: context.state.bookmark_url, name: context.getters.hostname };
            request.post(ENDPOINTS.BOOKMARKS, data)
                .then(response => {
                    context.commit(types.ADD_BOOKMARK, data);
                    context.commit(types.RESET_NEW_BOOKMARK);
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
    state,
    getters,
    actions,
    mutations
}