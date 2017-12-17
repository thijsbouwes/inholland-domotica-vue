<template>
    <div class="row">
        <div class="col s6" v-for="bookmark in bookmarks">
            <a :href="bookmark" target="_blank" rel="nofollow">
                <div class="card-panel bookmark">
                    <img :src="getFavicon(bookmark)" :alt="`Favicon ${bookmark}`">
                    <span class="black-text">{{ bookmark }}</span>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
    import {ENDPOINTS} from "../config/api";

    export default {
        data() {
            return {
                loading: true,
                bookmarks: ['coolblue.nl', 'tweakers.net', 'nu.nl']
            }
        },

        created() {
            // axios.get(ENDPOINTS.LAMPS)
            //     .then(response => {
            //         this.lamps = response.data;
            //         this.loading = false;
            //     })
            //     .catch(error => console.log(error));
        },

        methods: {
            getFavicon(bookmark) {
                let favicon = `http://s2.googleusercontent.com/s2/favicons?domain_url=${bookmark}`;
                return favicon;
            }
        }
    }
</script>
