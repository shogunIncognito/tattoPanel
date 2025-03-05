<script setup>
import { ref } from 'vue';
import { BiTrash } from 'vue-icons-plus/bi';
import BackButton from '../components/BackButton.vue';

const reviews = ref([
    {
        id: 1,
        user: {
            name: 'Juan Pérez',
            email: 'juan.perez@example.com',
        },
        comment: '¡Excelente trabajo! Muy profesional.',
        rating: 5,
    },
    {
        id: 2,
        user: {
            name: 'María López',
            email: 'maria.lopez@example.com',
        },
        comment: 'Me gustó mucho el diseño, pero tardó un poco.',
        rating: 4,
    },
]);

const deleteReview = (id) => {
    reviews.value = reviews.value.filter(review => review.id !== id);
};
</script>

<template>
    <div class="p-6 text-white min-h-screen">
        <BackButton />
        <h1 class="text-2xl font-bold mb-4">Gestión de Reseñas</h1>
        <div class="bg-gray-800 p-4 rounded-lg shadow-lg">
            <table class="w-full text-left">
                <thead>
                    <tr class="border-b border-gray-700">
                        <th class="p-2">Usuario</th>
                        <th class="p-2">Correo</th>
                        <th class="p-2">Comentario</th>
                        <th class="p-2">Calificación</th>
                        <th class="p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="review in reviews" :key="review.id" class="border-b border-gray-700">
                        <td class="p-2">{{ review.user.name }}</td>
                        <td class="p-2">{{ review.user.email }}</td>
                        <td class="p-2">{{ review.comment }}</td>
                        <td class="p-2">⭐ {{ review.rating }}</td>
                        <td class="p-2">
                            <button @click="deleteReview(review.id)" class="text-red-500 hover:text-red-700">
                                <BiTrash />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>