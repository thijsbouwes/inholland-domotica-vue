<template>
    <external-layout>
        <div class="banner full-height center-panel" :style="randomBackground">
            <div class="card-panel">

                <form role="form" method="POST" @submit.prevent="doSubmit()">
                    <div class="input-field">
                        <i class="material-icons prefix">face</i>
                        <label for="name">Name</label>
                        <input id="name" v-model="user.name" type="text" class="validate" name="name" length="255" maxlength="255" required>
                    </div>

                    <div class="input-field">
                        <i class="material-icons prefix">mail_outline</i>
                        <label for="email">Email</label>
                        <input id="email" v-model="user.email" type="email" class="validate" name="email" length="255" maxlength="255" required>
                    </div>

                    <div class="input-field">
                        <i class="material-icons prefix">lock_outline</i>
                        <label for="password">Password</label>
                        <input id="password" v-model="user.password" type="password" class="validate" name="password" length="255" maxlength="255" minlength="8" required>
                    </div>

                    <div class="input-field center-align">
                        <button class="btn waves-effect waves-light" type="submit" name="action">Register</button>
                    </div>

                    <div class="center-align hide-on-large-only">
                        <router-link tag="span" to="/login" exact><a>Login</a></router-link>
                    </div>
                </form>

            </div>
        </div>
    </external-layout>
</template>

<script>
    import ExternalLayout from '../layouts/external/Layout';
    import RandomBackground from '../mixins/randomBackground';
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
                Auth.register(this.user.name, this.user.email, this.user.password)
                    .then(response => {
                        // Login and redirect
                        Auth.login(this.user.email, this.user.password)
                            .then(response => {
                                this.$router.push('/')
                            })
                            .catch(error => {
                                Console.log("Error: " + error);
                            })
                            
                    })
                    .catch(error => {
                        // Show error
                        this.$M.toast({ html: "Error: " + error.response.status + ", " + error.response.data, classes: "red" });
                    });
            }
        }
    }
</script>