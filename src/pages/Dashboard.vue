<template>
	<layout>
        <div class="row">
            <draggable v-model="list_a" :options="{group:'module'}" @start="drag=true" @end="drag=false" class="drag col m12 s12 l4 x4">
                <div class="card-panel item" v-for="module in list_a">
                    <span>{{ module.name }}</span>
                </div>
            </draggable>
            <draggable v-model="list_b" :options="{group:'module'}" @start="drag=true" @end="drag=false" class="drag col m12 s12 l4 x4">
                <div class="card-panel item" v-for="module in list_b">
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
                enabled_modules: [
                    {
                        name: "Lamp",
                        position: "A",
                        component_name: "lamps",
                        enabled: true
                    },
                    {
                        name: "Window 1",
                        position: "B",
                        component_name: "windows",
                        enabled: true
                    }
                ]
            }
        },

        computed: {
            list_a() {
                return this.enabled_modules.filter(module => module.position === "A");
            },
            list_b() {
                return this.enabled_modules.filter(module => module.position === "B");
            }
        },

        created() {
            Event.$on('enabled_modules_update', (data) => {
                //this.enabled_modules = data;
            });
        },

        methods: {
            positionToGridAreaNotation(position) {
                const [from, to = null] = position.toLowerCase().split(':');

                if (from.length !== 2 || (to && to.length !== 2)) {
                    return ;
                }

                const areaFrom = `${from[1]} / ${this.indexInAlphabet(from[0])}`;
                const area = to ? `${areaFrom} / ${Number(to[1]) + 1} / ${this.indexInAlphabet(to[0]) + 1}` : areaFrom;

                return `grid-area: ${area}`;
            },

            indexInAlphabet(character) {
                const index = character.toLowerCase().charCodeAt(0) - 96;
                return index < 1 ? 1 : index;
            }

        }
    }
</script>