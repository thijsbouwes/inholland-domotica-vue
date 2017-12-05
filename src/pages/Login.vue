<template>
    <external-layout>
        <div class="banner full-height center-panel" :style="randomBackground">
            <div class="card-panel">

                <form role="form" method="POST" @submit.prevent="doSubmit()">
                    <div class="input-field">
                        <i class="material-icons prefix">mail_outline</i>
                        <label for="email">Email</label>
                        <input id="email" v-model="user.email" type="email" class="form-control" name="email" length="255" maxlength="255" required autofocus>
                    </div>

                    <div class="input-field">
                        <i class="material-icons prefix">lock_outline</i>
                        <label for="password">Password</label>
                        <input id="password" v-model="user.password" type="password" class="form-control" name="password" length="255" maxlength="255" minlength="5" required>
                    </div>

                    <div class="input-field center-align">
                        <button class="btn waves-effect waves-light" type="submit" name="action">Login</button>
                    </div>

                    <div class="center-align hide-on-large-only">
                        <router-link tag="span" to="/register" exact><a>Register</a></router-link>
                    </div>
                </form>

            </div>
        </div>
    </external-layout>
</template>

<script>
    import ExternalLayout from '../layouts/external/Layout';
    import RandomBackground from '../mixins/RandomBackground';
    import Auth from '../service/auth-service';

    export default {
        components: { ExternalLayout },
        mixins: [RandomBackground],

        data() {
            return {
                user: {}
            }
        },

        methods: {
            doSubmit() {
                Auth.login(this.user.email, this.user.password)
                    .then(data => {
                        // Redirect
                        this.$router.push('/');
                        M.toast({ html: "Welcome  👋🏼", classes: "green" });
                    })
                    .catch(error => {
                        // Show error
                        M.toast({ html: "Error: " + error.response.status + ", " + error.response.data, classes: "red" });
                    });
            }
        }
    }
</script>