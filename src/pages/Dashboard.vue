<template>
	<layout>
        <div class="row">
            <draggable v-model="column_a" :options="{group:'people'}" class="drag col m12 s6 l3">
                <template v-for="module in column_a">
                    <component :is="module.component_name"
                               :key="module.id"
                               v-if="module.enabled"
                    ></component>
                </template>
            </draggable>

            <draggable v-model="column_b" :options="{group:'people'}" class="drag col m12 s6 l3">
                <template v-for="module in column_b">
                    <component :is="module.component_name"
                               v-if="module.enabled"
                    ></component>
                </template>
            </draggable>
        </div>

        <!--action button-->
        <action-button></action-button>
	</layout>
</template>

<script>
    import Layout from '../layouts/main/Layout';
    import Lamps from '../components/Lamps';
    import Windows from '../components/Windows';
    import Heater from '../components/Heater';
    import ActionButton from '../components/ActionButton';
    import TimeDate from '../components/TimeDate';
    import Weather from '../components/Weather';
    import NewsFeed from '../components/NewsFeed';
    import {ENDPOINTS} from '../config/api';
    import draggable from 'vuedraggable'

    export default {
        components: { Lamps, Windows, ActionButton, Layout, Heater, TimeDate, Weather, NewsFeed, draggable },

        data() {
            return {
                column_at: [],
                column_bt: [],
                enabled_modules:  [
                    {
                        id: 1,
                        name: "Window",
                        column: "B",
                        component_name: "windows",
                        enabled: true
                    },
                    {
                        id: 2,
                        name: "Lamp",
                        column: "A",
                        component_name: "lamps",
                        enabled: true
                    },
                    {
                        id: 3,
                        name: "Time & Date",
                        column: "A",
                        component_name: "time-date",
                        enabled: false
                    },
                    {
                        id: 4,
                        name: "Weather",
                        column: "B",
                        component_name: "weather",
                        enabled: true
                    }
                ],
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
        },

        created() {
            Event.$on('enabled_modules_update', (data) => {
                let module = this.enabled_modules.find(module => module.id === data.id);
                module.enabled = data.enabled;
            });
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
            }
        }
    }
</script>