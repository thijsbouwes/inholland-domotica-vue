<template>
    <ul id="slide-out" class="sidenav">
        <li>
            <div class="user-view">
                <div class="background">
                    <img v-if="userBackground.url" :src="userBackground.url" :title="userBackground.name" width="100%">
                </div>

                <a href="#!user"><img class="circle" src="/static/users/nobody.jpg"></a>
                <a href="#!name"><span class="white-text name" v-text="userName"></span></a>
                <a href="#!email"><span class="white-text email" v-text="userEmail"></span></a>
            </div>
        </li>

        <!--Page links-->
        <router-link tag="li" to="/" exact><a class="sidenav-close"><i class="material-icons">dashboard</i>Dashboard</a></router-link>
        <router-link tag="li" to="/news" exact><a class="sidenav-close"><i class="material-icons">import_contacts</i>News</a></router-link>

        <router-link v-if="user.is_admin" tag="li" to="/users" exact><a class="sidenav-close"><i class="material-icons">supervisor_account</i>Users</a></router-link>

        <li><div class="divider"></div></li>
        <li><a class="subheader">Settings</a></li>

        <!--Settings-->
        <li class="no-padding">
            <form method="post" class="form_user" @submit.prevent="doSubmit()" autocomplete="off">
                <ul class="collapsible">
                    <li>
                        <a class="collapsible-header"><i class="material-icons">face</i>User</a>
                        <div class="collapsible-body">
                            <div class="input-field">
                                <input id="name" type="text" class="validate" v-model="userName" required>
                                <label class="active" for="name">Naam</label>
                            </div>

                            <div class="input-field">
                                <input id="email" type="email" class="validate" :value="userEmail" required disabled>
                                <label class="active" for="email">Email</label>
                            </div>
                        </div>
                    </li>

                    <li>
                        <a class="collapsible-header"><i class="material-icons">widgets</i>Widgets</a>
                        <div class="collapsible-body">
                            <div class="switch icon-before" v-for="(module, index) in enabled_modules">
                                <span>{{ module.name }}</span>
                                <label class="right">
                                    <input type="checkbox" :checked="module.enabled" @change="updateModule(module)">
                                    <span class="lever"></span>
                                </label>
                            </div>
                        </div>
                    </li>

                    <li>
                        <a class="collapsible-header"><i class="material-icons">image</i>Background</a>
                        <div class="collapsible-body">
                            <div class="input-field">
                                <select class="icons" v-model="userBackground" required>
                                    <option value="" disabled selected>Choose your option</option>
                                    <option
                                            v-for="background in backgrounds"
                                            v-text="background.name"
                                            :value="background"
                                            :data-icon="background.url">
                                    </option>
                                </select>
                                <label>Selecteer background</label>
                            </div>
                        </div>
                    </li>

                    <li>
                        <a class="collapsible-header"><i class="material-icons">bookmark</i>Bookmarks</a>
                        <div class="collapsible-body">
                            <div class="chip" v-for="(bookmark, index) in bookmarks">
                                <img :src="`http://s2.googleusercontent.com/s2/favicons?domain_url=${bookmark.name}`" alt="Contact Person">
                                {{ bookmark.name }}
                                <i class="close material-icons" @click="deleteBookmark(bookmark)">close</i>
                            </div>
                            <div class="input-field">
                                <input id="bookmark" type="url" class="validate" v-model="bookmark_url" @keydown.enter.prevent="createNewBookmark()">
                                <label class="active" for="bookmark">Bookmark</label>
                                <span class="helper-text" data-error="Enter a full url" data-success="Url is correct">Enter a valid url https://example.nl</span>
                            </div>
                        </div>
                    </li>
                </ul>

                <div class="center-align">
                    <button class="btn waves-effect waves-light" type="submit" name="action">Save
                        <i class="material-icons right">save</i>
                    </button>
                </div>
            </form>
        </li>

        <!--Logout-->
        <li><div class="divider"></div></li>
        <li>
            <a class="waves-effect" href="#" @click="logout"><i class="material-icons">exit_to_app</i>Logout</a>
        </li>
    </ul>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    import { mapMutations } from 'vuex';
    import * as types from '../../store/mutation-types';
    import Auth from '../../service/auth-service';
    import { ENDPOINTS } from "../../config/api";

export default {
    computed: {
        bookmark_url: {
            get() {
                return this.$store.state.bookmarks.bookmark_url;
            },
            set(value) {
                this.$store.commit('bookmarks/SET_NEW_BOOKMARK', value)
            }
        },

        userName: {
            get() {
                return this.user.name;
            },
            set(value) {
                this.$store.commit('profile/SET_NAME', value)
            }
        },

        userEmail() {
            return this.user.email;
        },

        userBackground: {
            get() {
                return this.background;
            },
            set(value) {
                this.$store.commit('profile/SET_BACKGROUND', value)
            }
        },

        ...mapGetters({
            user: 'profile/user',
            background: 'profile/background',
            enabled_modules: 'profile/enabled_modules',
            bookmarks: 'bookmarks/bookmarks',
            backgrounds: 'backgrounds/backgrounds'
        })
    },

    created() {
        this.$store.dispatch('profile/loadProfile')
            .then(() => {
                // Update text fields
                M.updateTextFields();
            });

        this.$store.dispatch('backgrounds/getAllBackgrounds')
            .then(() => {
                // Create select
                let elem_select = document.querySelector('select');
                new this.$M.Select(elem_select);
            });

        this.$store.dispatch('bookmarks/getAllBookmarks');
    },

    mounted() {
        // Create sidenav
        let elem = document.querySelector('.sidenav');
        this.sidebar = new M.Sidenav(elem);

        // Create collaps
        let collapsibleElem = document.querySelector('.collapsible');
        this.collapsible = new M.Collapsible(collapsibleElem);
    },

    methods: {
        doSubmit() {
            this.$store.dispatch('profile/updateProfile')
                .then(() => {
                    M.toast({html: '<i class="material-icons">check_circle</i> saving profile', classes: 'green'});
                })
                .catch(() => {
                    M.toast({html: '<i class="material-icons">error</i> error saving profile', classes: 'red'});
                });

            this.sidebar.close();
        },

        logout() {
            this.sidebar.close();
            Auth.logout();
            this.$router.push('/login');
        },

        ...mapMutations({
            updateModule: 'profile/ENABLE_MODULE',
        }),

        ...mapActions({
            deleteBookmark: 'bookmarks/deleteBookmark',
            createNewBookmark: 'bookmarks/createNewBookmark'
        })
    },
}
</script>