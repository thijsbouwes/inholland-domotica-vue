<template>
    <layout>
        <div class="container">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">Gebruikers</span>
                    <table class="striped">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Item Name</th>
                            <th>Item Price</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td>Alvin</td>
                            <td>Eclair</td>
                            <td>$0.87</td>
                        </tr>
                        <tr>
                            <td>Alan</td>
                            <td>Jellybean</td>
                            <td>$3.76</td>
                        </tr>
                        <tr>
                            <td>Jonathan</td>
                            <td>Lollipop</td>
                            <td>$7.00</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
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