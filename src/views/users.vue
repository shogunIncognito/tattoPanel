<script setup>
import { ref } from 'vue';
import { BiUserX } from 'vue-icons-plus/bi';
import BackButton from '../components/BackButton.vue';

const users = ref([
    {
        id: '1',
        name: 'Carlos Pérez',
        email: 'carlos@example.com',
        phone: '3001234567',
        isVerified: true
    },
    {
        id: '2',
        name: 'Andrea Gómez',
        email: 'andrea@example.com',
        phone: '3107654321',
        isVerified: false
    },
    {
        id: '3',
        name: 'Luis Ramírez',
        email: 'luis@example.com',
        phone: '3209876543',
        isVerified: true
    }
]);

const disableUser = (id) => {
    console.log(`User with ID ${id} has been disabled.`);
};
</script>

<template>
    <div class="p-6 text-white rounded-lg shadow-lg">
        <BackButton />
        <div class="bg-gray-900 p-2 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-4">Gestionar Usuarios</h2>
            <div class="overflow-x-auto">
                <table class="w-full border border-gray-700">
                    <thead class="bg-gray-800">
                        <tr>
                            <th class="p-3 text-left">Nombre</th>
                            <th class="p-3 text-left">Correo</th>
                            <th class="p-3 text-left">Teléfono</th>
                            <th class="p-3 text-left">Verificado</th>
                            <th class="p-3 text-center">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id" class="border-t border-gray-700">
                            <td class="p-3">{{ user.name }}</td>
                            <td class="p-3">{{ user.email }}</td>
                            <td class="p-3">{{ user.phone }}</td>
                            <td class="p-3">
                                <span :class="{ 'text-green-500': user.isVerified, 'text-red-500': !user.isVerified }">
                                    {{ user.isVerified ? 'Sí' : 'No' }}
                                </span>
                            </td>
                            <td class="p-3 text-center">
                                <button @click="disableUser(user.id)"
                                    class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2">
                                    <BiUserX /> Deshabilitar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    </div>
</template>
