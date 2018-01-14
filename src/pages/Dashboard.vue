<template>
	<layout>
        <div class="banner full-height dashboard" :style="user_background">
            <div class="row">
                <div class="progress" v-show="loading">
                    <div class="indeterminate"></div>
                </div>

                <draggable v-model="column_a" :options="{ group:'people', disabled: draggableDisabled() }" @change="setLayoutChanged" class="drag col s12 m6 l6 xl3">
                    <template v-for="widget in column_a">
                        <component :is="widget.component_name"
                                   :key="widget.widget_id"
                        ></component>
                    </template>
                </draggable>

                <draggable v-model="column_b" :options="{ group:'people', disabled: draggableDisabled() }" @change="setLayoutChanged" class="drag col s12 m6 l6 xl3">
                    <template v-for="widget in column_b">
                        <component :is="widget.component_name"
                                   v-if="widget.widget_id"
                        ></component>
                    </template>
                </draggable>

                <draggable v-model="column_c" :options="{ group:'people', disabled: draggableDisabled() }" @change="setLayoutChanged" class="drag col s12 m6 l6 xl3">
                    <template v-for="widget in column_c">
                        <component :is="widget.component_name"
                                   :key="widget.widget_id"
                        ></component>
                    </template>
                </draggable>

                <draggable v-model="column_d" :options="{ group:'people', disabled: draggableDisabled()}" @change="setLayoutChanged" class="drag col s12 m6 l6 xl3">
                    <template v-for="widget in column_d">
                        <component :is="widget.component_name"
                                   :key="widget.widget_id"
                        ></component>
                    </template>
                </draggable>
            </div>

            <div class="fixed-action-btn-left">
                <a href="#!" class="waves-effect waves-light btn" v-show="layoutChanged" @click="saveLayout()">
                    <i class="material-icons left">save</i>layout opslaan
                </a>
            </div>
        </div>

        <!--action button-->
        <action-button></action-button>
	</layout>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapState } from 'vuex';
    import { mapMutations } from 'vuex';
    import { mapActions } from 'vuex';
    import Layout from '../layouts/main/Layout';
    import Lamps from '../components/Lamps';
    import Windows from '../components/Windows';
    import Heater from '../components/Heater';
    import ActionButton from '../components/ActionButton';
    import TimeDate from '../components/TimeDate';
    import Weather from '../components/Weather';
    import Scoreboard from '../components/Scoreboard';
    import NewsFeed from '../components/NewsFeed';
    import TicTacToe from '../components/TicTacToe'
    import Bookmarks from '../components/Bookmarks'
    import draggable from 'vuedraggable'

    export default {
        components: { Lamps, Windows, ActionButton, Layout, Heater, TimeDate, Weather, NewsFeed, draggable, Scoreboard, TicTacToe, Bookmarks },

        computed: {
            column_a: {
                get() {
                    return this.$store.getters['widgets/column_a'];
                },
                set(widgets) {
                    this.$store.commit('widgets/SET_LAYOUT', { widgets, column: "A" });
                }
            },

            column_b: {
                get() {
                    return this.$store.getters['widgets/column_b'];
                },
                set(widgets) {
                    this.$store.commit('widgets/SET_LAYOUT', { widgets, column: "B" });
                }
            },

            column_c: {
                get() {
                    return this.$store.getters['widgets/column_c'];
                },
                set(widgets) {
                    this.$store.commit('widgets/SET_LAYOUT', { widgets, column: "C" });
                }
            },

            column_d: {
                get() {
                    return this.$store.getters['widgets/column_d'];
                },
                set(widgets) {
                    this.$store.commit('widgets/SET_LAYOUT', { widgets, column: "D" });
                }
            },

            user_background() {
                if (this.background.url !== '') {
                    return `background-image: url(${ this.background.url });`;
                }

                return '';
            },

            ...mapGetters({
                background: 'profile/background'
            }),

            ...mapState('widgets', [
                'loading',
                'layoutChanged'
            ]),
        },

        created() {
            this.$store.dispatch('widgets/loadWidgets');
        },

        methods: {
            draggableDisabled() {
                return window.innerWidth < 760;
            },

            ...mapActions({
                saveLayout: 'widgets/saveLayout'
            }),

            ...mapMutations({
                setLayoutChanged: 'widgets/SET_LAYOUT_CHANGED'
            })
        }
    }
</script>