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
                        <input id="password" v-model="user.password" type="password" class="validate" name="password" length="255" maxlength="255" minlength="6" required>
                    </div>

                    <div class="input-field center-align">
                        <button class="btn waves-effect waves-light" type="submit" name="action">Register</button>
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
                Auth.register(this.user.name, this.user.email, this.user.password)
                    .then(data => {
                        // Redirect
                        console.log(data);
                        this.$router.push('/');
                    })
                    .catch(error => {
                        // Show error
                        console.log("Error: " + error)
                    });
            }
        }
    }
</script>