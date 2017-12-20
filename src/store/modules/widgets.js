import request from '../../service/request';
import * as types from '../mutation-types';
import { ENDPOINTS } from '../../config/api';

// initial state
const state = {
    all: [],
    active: [],
    loading: true,
    layoutChanged: false
};

// getters
const getters = {
    available_widgets: state => state.all,
    active_widgets: state => state.active,

    column_a: state => state.active.filter(widget => widget.column === 'A'),
    column_b: state => state.active.filter(widget => widget.column === 'B'),
    column_c: state => state.active.filter(widget => widget.column === 'C'),
    column_d: state => state.active.filter(widget => widget.column === 'D'),
};

// actions
const actions = {
    loadWidgets({ commit }) {

        return request.get(ENDPOINTS.WIDGETS)
            .then(response => {
                commit(types.SET_WIDGETS, response.data);
                commit(types.LOADING_DONE);
            });
    },

    updateWidgets({ getters }) {
        let data = { name: getters.user.name, background_id: getters.background.id };

        return request.put(ENDPOINTS.PROFILE, data)
    },

    saveLayout({ commit }) {
        // Do axios
        commit(types.LOADING_DONE);
        commit(types.SET_LAYOUT_CHANGED);
    }
};

// mutations
const mutations = {
    [types.ENABLE_WIDGET] (state, module) {
        let index = state.all.indexOf(module);

        // Toggle enabled
        state.all[index].enabled = !state.all[index].enabled;
    },

    [types.SET_WIDGETS] (state, { user_widgets, widgets }) {
        state.all = widgets;
        state.active = user_widgets;
    },

    [types.LOADING_DONE] (state) {
        state.loading = false;
    },

    [types.SET_LAYOUT_CHANGED] (state) {
        // toggle layout changed
        state.layoutChanged = !state.layoutChanged;
    },

    [types.SET_LAYOUT] (state, { widgets, column }) {
        if (widgets == null) {
            return;
        }

        // Set state
        widgets.map(widget => widget.column = column);

        // Reset columns
        widgets.forEach((widget, index) => {
            let module_index = state.all.indexOf(widget);
            state.all.splice(module_index, 1);
        });

        // Push columns back
        state.all = state.all.concat(widgets);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}