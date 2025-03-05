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
        path: '/dashboard/tattooists',
        name: 'dashboardTattooists',
        component: () => import('../views/tattooists.vue'),
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
