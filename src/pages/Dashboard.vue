<template>
	<layout>
        <div class="row">
            <div class="progress" v-show="loading">
                <div class="indeterminate"></div>
            </div>

            <draggable v-model="column_a" :options="{group:'people'}" @change="updateLayoutState()" class="drag col s12 m6 l6 xl3">
                <template v-for="module in column_a">
                    <component :is="module.component_name"
                               :key="module.id"
                               v-if="module.enabled"
                    ></component>
                </template>
            </draggable>

            <draggable v-model="column_b" :options="{group:'people'}" @change="updateLayoutState()" class="drag col s12 m6 l6 xl3">
                <template v-for="module in column_b">
                    <component :is="module.component_name"
                               v-if="module.enabled"
                    ></component>
                </template>
            </draggable>

            <draggable v-model="column_c" :options="{group:'people'}" @change="updateLayoutState()" class="drag col s12 m6 l6 xl3">
                <template v-for="module in column_c">
                    <component :is="module.component_name"
                               :key="module.id"
                               v-if="module.enabled"
                    ></component>
                </template>
            </draggable>

            <draggable v-model="column_d" :options="{group:'people'}" @change="updateLayoutState()" class="drag col s12 m6 l6 xl3">
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

        data() {
            return {
                layoutChanged: false,
                loading: false
            }
        },

        computed: {
            column_a: {
                get() {
                    return this.getColumn("A");
                },
                set(value) {
                    this.updateColumn(value, "A");
                }
            },
            column_b: {
                get() {
                    return this.getColumn("B");
                },
                set(value) {
                    this.updateColumn(value, "B");
                }
            },
            column_c: {
                get() {
                    return this.getColumn("C");
                },
                set(value) {
                    this.updateColumn(value, "C");
                }
            },
            column_d: {
                get() {
                    return this.getColumn("D");
                },
                set(value) {
                    this.updateColumn(value, "D");
                }
            },

            enabled_modules: {
                get() {
                    return this.$store.getters['profile/enabled_modules'];
                },
                set(value) {
                    this.$store.commit('profile/SET_ENABLED_MODULES', value);
                }
            }
        },

        methods: {
            updateColumn(columns, state) {
                if (columns == null) {
                    return;
                }

                // Set state
                columns.map(column => column.column = state);

                // Reset columns
                columns.forEach((column, index) => {
                   let module_index = this.enabled_modules.indexOf(column);
                   this.enabled_modules.splice(module_index, 1);
                });

                // Push columns back
                this.enabled_modules = this.enabled_modules.concat(columns);
            },

            getColumn(column) {
                // Find module by column name
                return this.enabled_modules.filter(module => module.column === column)
            },

            updateLayoutState() {
                this.layoutChanged = true;
            },

            saveLayout() {
                this.loading = true;
                // Do axios
                this.layoutChanged = false;
                this.loading = false;
            }
        }
    }
</script>