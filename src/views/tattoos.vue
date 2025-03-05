<script setup>
import { ref } from 'vue';
import { BiCheckCircle, BiXCircle } from 'vue-icons-plus/bi';
import { placeholderUserImage } from '../utils/consts';
import BackButton from '../components/BackButton.vue'

const tattoos = ref([
    {
        id: 1,
        name: 'Black Dragon',
        artist: 'John Doe',
        image: 'https://via.placeholder.com/100',
        isDisabled: false
    },
    {
        id: 2,
        name: 'Rose Ink',
        artist: 'Jane Smith',
        image: 'https://via.placeholder.com/100',
        isDisabled: true
    }
]);

const toggleDisable = (tattoo) => {
    tattoo.isDisabled = !tattoo.isDisabled;
};
</script>

<template>
    <div class="p-6">
        <BackButton />
        <h2 class="text-2xl font-bold text-white mb-4">Gestionar Tatuajes</h2>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
                <thead>
                    <tr class="bg-gray-700">
                        <th class="px-4 py-2 text-left">Imagen</th>
                        <th class="px-4 py-2 text-left">Nombre</th>
                        <th class="px-4 py-2 text-left">Tatuador</th>
                        <th class="px-4 py-2 text-center">Estado</th>
                        <th class="px-4 py-2 text-center">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="tattoo in tattoos" :key="tattoo.id" class="border-b border-gray-600">
                        <td class="px-4 py-2">
                            <img :src="placeholderUserImage" alt="Tattoo" class="w-16 h-16 rounded-lg object-cover" />
                        </td>
                        <td class="px-4 py-2">{{ tattoo.name }}</td>
                        <td class="px-4 py-2">{{ tattoo.artist }}</td>
                        <td class="px-4 py-2 text-center">
                            <span :class="tattoo.isDisabled ? 'text-red-500' : 'text-green-500'">
                                <component :is="tattoo.isDisabled ? BiXCircle : BiCheckCircle" class="text-xl" />
                            </span>
                        </td>
                        <td class="px-4 py-2 text-center">
                            <button @click="toggleDisable(tattoo)" class="px-4 py-1 text-white rounded-md"
                                :class="tattoo.isDisabled ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'">
                                {{ tattoo.isDisabled ? 'Habilitar' : 'Deshabilitar' }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
th,
td {
    text-align: left;
}
</style>