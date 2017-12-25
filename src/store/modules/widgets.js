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
                commit(types.SET_LAYOUT_CHANGED, false);
            });
    }
};

// mutations
const mutations = {
    [types.TOGGLE_WIDGET] (state, widget) {
        // delete widget when all-ready active
        let active_widget = state.active.find(user_widget => user_widget.widget_id === widget.id);

        if (active_widget !== undefined) {
            // disable widget
            widget.enabled = false;

            // delete widget from
            let index = state.active.indexOf(active_widget);
            state.active.splice(index, 1);
        } else {
            // add widget when not active
            let new_widget = {
                column: 'A',
                widget_id: widget.id,
                column_index: state.active.filter(widget => widget.column === 'A').length + 1
            };

            // add all data to widget
            new_widget = Object.assign(new_widget, widget);

            widget.enabled = true;

            // push widget to active
            state.active.push(new_widget);
        }
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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}