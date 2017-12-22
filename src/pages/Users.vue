<template>
    <layout>
        <div class="container">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">Users</span>

                    <table class="striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Admin</th>
                                <th>Email</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users">
                                <td v-text="user.name"></td>
                                <td v-html="isAdmin(user)"></td>
                                <td v-text="user.email"></td>
                                <td>{{ user.created_at | formatDate }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="progress" v-show="loading">
                        <div class="indeterminate"></div>
                    </div>
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
        components: { Layout, GoBackButton },

        data() {
            return {
                loading: true,
                users: []
            }
        },

        methods: {
            isAdmin(user) {
                if (user.is_admin) {
                    return '<i class="material-icons">check</i>'
                }

                return '<i class="material-icons">clear</i>'
            }
        },

        created() {
            this.$http.get(ENDPOINTS.USERS)
                .then(response => {
                    this.users = response.data.result;
                    this.loading = false;
                })
                .catch(error => console.log(error));
        }
    }
</script>