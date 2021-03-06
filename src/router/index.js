import Vue from 'vue';
import { store } from '../store';
import Router from 'vue-router';
import Dashboard from '../pages/Dashboard';
import News from '../pages/News';
import Users from '../pages/Users';
import Register from '../pages/Register';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Auth from '../service/auth-service';

Vue.use(Router);

export const router = new Router({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Dashboard',
            component: Dashboard,
            meta: { requiresAuth: true }
        },
        {
            path: '/news',
            name: 'News',
            component: News,
            meta: { requiresAuth: true }
        },
        {
            path: '/users',
            name: 'Users',
            component: Users,
            meta: { requiresAuth: true, requiresAdmin: true }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '*',
            name: 'Not found',
            component: NotFound,
        }
    ]
});

// Set meta title
router.beforeEach((to, from, next) => {
    document.title = 'Home Comfort | ' + to.name;
    next();
});

// Check auth
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && Auth.isLoggedIn() === false) {
        next('/login');
    }
    next();
});

// Check admin
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAdmin && store.getters['profile/is_admin'] === false) {
        next('/');
    }
    next();
});