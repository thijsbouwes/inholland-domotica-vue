<template>
    <div class="row">
        <div class="col s6" v-for="bookmark in bookmarks">
            <a :href="bookmark.url" target="_blank" rel="nofollow">
                <div class="card-panel bookmark">
                    <img :src="`http://s2.googleusercontent.com/s2/favicons?domain_url=${bookmark.name}`" :alt="`Favicon ${bookmark.name}`">
                    <span class="black-text">{{ bookmark.name }}</span>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        computed: {
            ...mapGetters({
                bookmarks: 'bookmarks/bookmarks'
            })
        }
    }
</script>
