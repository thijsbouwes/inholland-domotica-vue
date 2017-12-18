<template>
    <div class="row">
        <div class="col s6" v-for="bookmark in bookmarks">
            <a :href="`http://${bookmark.url}`" target="_blank" rel="nofollow">
                <div class="card-panel bookmark">
                    <img :src="`http://s2.googleusercontent.com/s2/favicons?domain_url=${bookmark.name}`" :alt="`Favicon ${bookmark.name}`">
                    <span class="black-text">{{ bookmark.name }}</span>
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
                bookmarks: []
            }
        },

        created() {
            console.log("hello from com");
            Event.$on('bookmarks_updated', (data) => {
                this.bookmarks = data;
            });
        }
    }
</script>
