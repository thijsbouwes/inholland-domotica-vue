<template>
    <external-layout>
        <div class="banner full-height center-panel" :style="randomBackground">
            <div class="card-panel">

                <form role="form" method="POST">
                    <div class="input-field">
                        <i class="material-icons prefix">mail_outline</i>
                        <label for="email">Email</label>
                        <input id="email" type="email" class="form-control" name="email" length="255" maxlength="255" required autofocus>
                    </div>

                    <div class="input-field">
                        <i class="material-icons prefix">lock_outline</i>
                        <label for="password">Password</label>
                        <input id="password" type="password" class="form-control" name="password" length="255" maxlength="255" minlength="5" required>
                    </div>

                    <div class="input-field center-align">
                        <button class="btn waves-effect waves-light" type="submit" name="action">Login</button>
                    </div>
                </form>

            </div>
        </div>
    </external-layout>
</template>

<script>
    import ExternalLayout from '../layouts/external/Layout';
    import RandomBackground from '../mixins/RandomBackground';

    export default {
        components: { ExternalLayout },
        mixins: [RandomBackground]
    }
</script>