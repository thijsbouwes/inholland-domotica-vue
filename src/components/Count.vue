<template>
    <div>
        <div class="card-panel">
            <h3 v-text="count"></h3>
            <button class="btn" @click="increment()">+1</button>
        </div>
        <div class="card-panel">
            <h3>Backgrounds</h3>
            <button class="btn" @click="getAllBackgrounds()">Fetch</button>
            <ul class="collection">
                <li class="collection-item avatar" v-for="background in backgrounds">
                    <img :src="background.url" alt="" class="circle">
                    <span class="title" v-text="background.name"></span>
                    <p>First Line <br>
                        Second Line
                    </p>
                    <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapMutations } from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        computed: {
            ...mapState([
                'count',
                'backgrounds'
            ])
        },

        methods: {
            ...mapMutations([
                'increment',
            ]),

            ...mapActions([
                'getAllBackgrounds'
            ])
        }
    }
</script>