<template>
    <div class="row">
        <div class="col s6" v-for="bookmark in bookmarks">
            <a :href="bookmark.url" target="_blank" rel="nofollow">
                <div class="card-panel bookmark">
                    <img :src="`https://s2.googleusercontent.com/s2/favicons?domain_url=${ hostname(bookmark.url) }`" :alt="`Favicon ${ hostname(bookmark.url) }`">
                    <span class="black-text">{{ hostname(bookmark.url) }}</span>
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
        },

        methods: {
            hostname(url) {
                let match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);

                if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
                    return match[2];
                }

                return '';
            }
        }
    }
</script>
