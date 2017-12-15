<template>
    <layout>
        <div class="row">
            <news-feed></news-feed>
        </div>

        <go-back-button></go-back-button>
    </layout>
</template>

<script>
    import Layout from '../layouts/main/Layout';
    import GoBackButton from '../components/GoBackButton';
    import NewsFeed from '../components/NewsFeed';
    import {ENDPOINTS} from '../config/api';

    export default {
        components: { Layout, NewsFeed, GoBackButton },
    }
</script>