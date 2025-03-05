import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchAdmin } from '../services/api';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const token = ref(localStorage.getItem('token') || null);
    const loading = ref(false);
    const sessionChecked = ref(false); // ✅ Para saber si la sesión ya fue verificada

    const setSession = async (newToken) => {
        if (newToken) {
            token.value = newToken;
            localStorage.setItem('token', newToken);
        }

        if (!token.value) {
            sessionChecked.value = true; // ✅ No hay token, la sesión ya está "verificada"
            return;
        }

        try {
            loading.value = true;
            const response = await fetchAdmin(token.value);
            user.value = response.data;
        } catch (error) {
            console.error('Error al obtener sesión', error);
            deleteSession();
        } finally {
            loading.value = false;
            sessionChecked.value = true; // ✅ Marcar sesión como verificada después de la petición
        }
    };

    const deleteSession = () => {
        user.value = null;
        token.value = null;
        localStorage.removeItem('token');
        sessionChecked.value = true; // ✅ Asegurar que la sesión se marque como verificada al cerrar
    };

    return { user, token, loading, sessionChecked, setSession, deleteSession };
});
