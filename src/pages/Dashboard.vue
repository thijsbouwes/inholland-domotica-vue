<template>
	<layout>
        <div class="row">
            <div class="progress" v-show="loading">
                <div class="indeterminate"></div>
            </div>

            <draggable v-model="column_a" :options="{group:'people'}" @change="setLayoutChanged" class="drag col s12 m6 l6 xl3">
                <template v-for="module in column_a">
                    <component :is="module.component_name"
                               :key="module.id"
                               v-if="module.enabled"
                    ></component>
                </template>
            </draggable>

            <draggable v-model="column_b" :options="{group:'people'}" @change="setLayoutChanged" class="drag col s12 m6 l6 xl3">
                <template v-for="module in column_b">
                    <component :is="module.component_name"
                               v-if="module.enabled"
                    ></component>
                </template>
            </draggable>

            <draggable v-model="column_c" :options="{group:'people'}" @change="setLayoutChanged" class="drag col s12 m6 l6 xl3">
                <template v-for="module in column_c">
                    <component :is="module.component_name"
                               :key="module.id"
                               v-if="module.enabled"
                    ></component>
                </template>
            </draggable>

            <draggable v-model="column_d" :options="{group:'people'}" @change="setLayoutChanged" class="drag col s12 m6 l6 xl3">
                <template v-for="module in column_d">
                    <component :is="module.component_name"
                               v-if="module.enabled"
                    ></component>
                </template>
            </draggable>
        </div>

        <div class="fixed-action-btn-left"><a href="#!" class="waves-effect waves-light btn" v-show="layoutChanged" @click="saveLayout()"><i class="material-icons left">save</i>layout opslaan</a></div>

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
                    return this.column_a;
                },
                set(widgets) {
                    this.$store.commit('setLayout', { widgets, column: "A" });
                }
            },
            column_b: {
                get() {
                    return this.column_b;
                },
                set(widgets) {
                    this.$store.commit('setLayout', { widgets, column: "B" });
                }
            },
            column_c: {
                get() {
                    return this.column_c;
                },
                set(widgets) {
                    this.$store.commit('setLayout', { widgets, column: "C" });
                }
            },
            column_d: {
                get() {
                    return this.column_d;
                },
                set(widgets) {
                    this.$store.commit('setLayout', { widgets, column: "D" });
                }
            },

            widgets: {
                get() {
                    return this.$store.getters['widgets/active_widgets'];
                },
                set(value) {
                    this.$store.commit('widgets/ENABLE_WIDGET', value);
                }
            },

            ...mapGetters('widgets', [
                'column_a',
                'column_b',
                'column_c',
                'column_d'
            ]),

            ...mapState('widgets', [
                'loading',
                'layoutChanged'
            ])
        },

        created() {
            this.$store.dispatch('widgets/loadWidgets');
        },

        methods: {
            ...mapActions({
                saveLayout: 'widgets/saveLayout'
            }),

            ...mapMutations({
                setLayoutChanged: 'widgets/SET_LAYOUT_CHANGED',
                setLayout: 'widgets/SET_LAYOUT'
            })
        }
    }
</script>