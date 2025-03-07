<script setup>
import { ref } from 'vue';
import BackButton from '../components/BackButton.vue';
import { createAdmin } from '../services/api';
import { toast } from 'vue3-toastify';
import { getApiErrorMessage } from '../utils/functions';

const user = ref('');
const password = ref('');

const addAdmin = () => {
    createAdmin({ user: user.value, password: password.value })
        .then(() => {
            toast.success('Administrador añadido correctamente.');
        })
        .catch((error) => {
            console.error('Error adding admin:', error);
            toast.error(getApiErrorMessage(error.response.data.message) || 'Error al añadir administrador.');
        });
};

</script>

<template>
    <div>
        <BackButton />
        <div class="flex items-center min-h-[70dvh] justify-center text-white">
            <div class="bg-gray-800 p-6 rounded-lg shadow-lg ring-neon w-96">
                <h2 class="text-2xl font-bold mb-4 text-center">Añadir Administrador</h2>
                <form @submit.prevent="addAdmin" class="space-y-4">
                    <div>
                        <label for="user" class="block text-sm font-medium">Usuario</label>
                        <input id="user" v-model="user" type="text" required
                            class="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-green-500 focus:outline-none">
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium">Contraseña</label>
                        <input id="password" v-model="password" type="password" required
                            class="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-green-500 focus:outline-none">
                    </div>
                    <button type="submit"
                        class="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">Añadir</button>
                </form>
            </div>
        </div>

    </div>
</template>
