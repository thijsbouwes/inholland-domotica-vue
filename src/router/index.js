import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/pages/Dashboard';
import Admin from '@/pages/Admin';
import Register from '@/pages/Register';
import Login from '@/pages/Login';

Vue.use(Router);

export const router = new Router({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Dashboard',
            component: Dashboard
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
            path: '/admin',
            name: 'Admin',
            component: Admin,
            meta: { requiresAuth: true }
        }
    ]
});

router.beforeEach((to, from, next) => {
    document.title = 'Home Comfort | ' + to.name;
    next();
});