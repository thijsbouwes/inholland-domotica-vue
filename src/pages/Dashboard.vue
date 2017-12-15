<template>
	<layout>
        <div class="row">
            <draggable v-model="column_a" @start="drag=true" @end="drag=false" class="drag col m12 s6 l3">
                <div class="card-panel item" v-for="module in column_a">
                    <span>{{ module.name }}</span>
                </div>
            </draggable>
            <draggable v-model="column_b" @start="drag=true" @end="drag=false" class="drag col m12 s6 l3">
                <div class="card-panel item" v-for="module in column_b">
                    <span>{{ module.name }}</span>
                </div>
            </draggable>
            <draggable v-model="column_c" @start="drag=true" @end="drag=false" class="drag col m12 s6 l3">
                <div class="card-panel item" v-for="module in column_c">
                    <span>{{ module.name }}</span>
                </div>
            </draggable>
            <draggable v-model="column_d" @start="drag=true" @end="drag=false" class="drag col m12 s6 l3">
                <div class="card-panel item" v-for="module in column_d">
                    <span>{{ module.name }}</span>
                </div>
            </draggable>
        </div>


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
    import {ENDPOINTS} from '../config/api';
    import draggable from 'vuedraggable'

    export default {
        components: { Lamps, Windows, ActionButton, Layout, Heater, TimeDate, Weather, draggable },

        data() {
            return {
                column_a: [],
                column_b: [],
                column_c: [],
                column_d: [],
                enabled_modules: [
                    {
                        name: "Window 1",
                        column: "B",
                        component_name: "windows",
                        enabled: true
                    },
                    {
                        name: "Lamp 1",
                        column: "A",
                        component_name: "lamps",
                        enabled: true
                    },
                    {
                        name: "Window 2",
                        column: "C",
                        component_name: "windows",
                        enabled: true
                    },
                    {
                        name: "Lamp 2",
                        column: "D",
                        component_name: "lamps",
                        enabled: true
                    }
                ]
            }
        },

        created() {
            // map columns
            this.column_a = this.enabled_modules.filter(module => module.column === "A");
            this.column_b =  this.enabled_modules.filter(module => module.column === "B");
            this.column_c = this.enabled_modules.filter(module => module.column === "C");
            this.column_d =  this.enabled_modules.filter(module => module.column === "D");

            Event.$on('enabled_modules_update', (data) => {
                //this.enabled_modules = data;
            });
        },
    }
</script>