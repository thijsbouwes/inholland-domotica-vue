import request from '../../service/request';
import * as types from '../mutation-types';
import { ENDPOINTS } from '../../config/api';

// initial state
const state = {
    all: [],
    active: [],
    loading: true,
    draggable_disabled: true,
    layoutChanged: false,
    column_types: ["A", "B", "C", "D"]
};

// getters
const getters = {
    widgets: state => state.all,
    user_widgets: state => state.active.sort((a, b) => a.column_index - b.column_index),

    column_a: state => state.active.filter(widget => widget.column === 'A').sort((a, b) => a.column_index - b.column_index),
    column_b: state => state.active.filter(widget => widget.column === 'B').sort((a, b) => a.column_index - b.column_index),
    column_c: state => state.active.filter(widget => widget.column === 'C').sort((a, b) => a.column_index - b.column_index),
    column_d: state => state.active.filter(widget => widget.column === 'D').sort((a, b) => a.column_index - b.column_index),
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

    saveLayout({ getters, commit }) {
        return request.put(ENDPOINTS.WIDGETS, getters.user_widgets)
            .then(response => {
                commit(types.LOADING_DONE);
                commit(types.EDIT_DONE);
                commit(types.SET_LAYOUT_CHANGED, false);
            });
    },

    toggleWidget({ getters, commit, dispatch }, widget) {
        // check if widget is all-ready active
        let user_widget = state.active.find(user_widget => user_widget.widget_id === widget.id);

        let columns = {
            A: getters.column_a.length,
            B: getters.column_b.length,
            C: getters.column_c.length,
            D: getters.column_d.length,
        };

        // find smallest column
        let smallest_column = Object.keys(columns).reduce((a, b) => columns[a] < columns[b] ? a : b);

        if (user_widget !== undefined) {
            // disable widget
            commit(types.DISABLE_WIDGET, { user_widget, widget });
        } else {
            // add widget when not active
            let new_widget = {
                column: smallest_column,
                widget_id: widget.id,
                column_index: columns[smallest_column] + 1
            };

            // add all data to widget
            new_widget = Object.assign(new_widget, widget);

            commit(types.ENABLE_WIDGET, { new_widget, widget });
        }

        dispatch('saveLayout');
    }
};

// mutations
const mutations = {
    [types.ENABLE_WIDGET] (state, { new_widget, widget }) {
        widget.enabled = true;

        // push widget to active
        state.active.push(new_widget);
    },

    [types.DISABLE_WIDGET] (state, { user_widget, widget }) {
        widget.enabled = false;

        // delete widget from
        let index = state.active.indexOf(user_widget);
        state.active.splice(index, 1);
    },

    [types.SET_WIDGETS] (state, { user_widgets, widgets }) {
        state.all = widgets.map(widget => {
            // set enabled property, based on if the widget is active
            widget.enabled = (user_widgets.filter(user_widget => user_widget.widget_id === widget.id).length > 0);

            return widget;
        });

        state.active = user_widgets.map(user_widget => {
            // find widget by id
           let widget = widgets.find(widget => widget.id === user_widget.widget_id);

           // merge widget data in to user widget
           return Object.assign(user_widget, widget);
        });
    },

    [types.LOADING_DONE] (state) {
        state.loading = false;
    },

    [types.SET_LAYOUT_CHANGED] (state, changed = true) {
        // toggle layout changed
        state.layoutChanged = changed;
    },

    [types.SET_LAYOUT] (state, { widgets, column }) {
        if (widgets == null) {
            return;
        }

        // Set column and column_index
        widgets.map((widget, index) => {
            widget.column = column;
            widget.column_index = index + 1;
        });
    },

    [types.TOGGLE_EDIT] (state) {
        state.draggable_disabled = !state.draggable_disabled;
    },

    [types.EDIT_DONE] (state) {
        state.draggable_disabled = true;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}