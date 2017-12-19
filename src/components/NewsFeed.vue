<template>
    <div>
        <article class="col s12 m6 l6 xl3" v-for="news in news_feed">
            <div class="card medium">
                <div class="card-image">
                    <img :src="news.image">
                    <span class="card-title">{{ news.title }}</span>
                </div>
                <div class="card-content">
                    <p v-html="news.description"></p>
                </div>
                <div class="card-action">
                    <a target="_blank" rel="nofollow" :href="news.link">Lees meer..</a>
                </div>
            </div>
        </article>

        <div class="progress" v-show="loading">
            <div class="indeterminate"></div>
        </div>
    </div>
</template>

<script>
    import {ENDPOINTS} from "../config/api";

    export default {
        data() {
            return {
                loading: true,
                news_feed: []
            }
        },

        created() {
            this.$http.get(ENDPOINTS.NEWS)
                .then(response => {
                    this.news_feed = response.data;
                    this.loading = false;
                })
                .catch(error => console.log(error));
        }
    }
</script>
