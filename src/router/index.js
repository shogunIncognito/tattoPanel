import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/useAuthStore';

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: () => import('../views/index.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/auth',
        name: 'dashboardLogin',
        component: () => import('../views/auth/login.vue'),
    },
    {
        path: '/tattooists',
        name: 'dashboardTattooists',
        component: () => import('../views/tattooists.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/tattoos',
        name: 'dashboardTattoos',
        component: () => import('../views/tattoos.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/users',
        name: 'dashboardUsers',
        component: () => import('../views/users.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/reviews',
        name: 'dashboardReviews',
        component: () => import('../views/reviews.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/users/:id',
        name: 'dashboardUser',
        component: () => import('../views/profileUser.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/tattooists/:id',
        name: 'dashboardTattooist',
        component: () => import('../views/profileTattooist.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/tattooists/pending',
        name: 'dashboardTattooistsPending',
        component: () => import('../views/tattooistsPending.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admins/create',
        name: 'dashboardCreateAdmin',
        component: () => import('../views/createAdmin.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admins',
        name: 'dashboardAdmins',
        component: () => import('../views/admins.vue'),
        meta: { requiresAuth: true }
    }
];

// Crear el enrutador
const router = createRouter({
    history: createWebHistory(), // Usa process.env.BASE_URL para Vue CLI
    routes,
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()

    if (!authStore.sessionChecked) {
        await authStore.setSession()
    }

    if (to.meta.requiresAuth && !authStore.token) {
        next('/auth')
    } else if (['/auth'].includes(to.path) && authStore.token) {
        next('/')
    } else {
        next()
    }
})

export default router;
