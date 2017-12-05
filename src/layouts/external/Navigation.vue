<template>
    <div class="navbar-fixed">
        <nav>
            <div class="nav-wrapper">
                <a href="#!" class="brand-logo center"><img src="/static/home_comfort.png"> Comfort</a>
                <ul class="right hide-on-med-and-down">
                    <router-link tag="li" to="/login" exact><a>Login</a></router-link>
                    <router-link tag="li" to="/register" exact><a>Register</a></router-link>
                </ul>
            </div>
        </nav>
    </div>
</template>