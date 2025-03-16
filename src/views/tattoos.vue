<script setup>
import { ref, onMounted } from 'vue';
import { deleteTattooPost, getTattooPosts } from '../services/api';
import { placeholderUserImage } from '../utils/consts'
import BackButton from '../components/BackButton.vue';
import Spinner from '../components/Spinner.vue';
import { AiFillDelete } from 'vue-icons-plus/ai';
import { toast } from 'vue3-toastify';

const tattoos = ref([]);
const loading = ref(true);

const deleteTattoo = (tattoPostId) => {
    deleteTattooPost(tattoPostId)
        .then(() => {
            toast.success('Tatuaje eliminado correctamente.');
            tattoos.value = tattoos.value.filter((tattoo) => tattoo._id !== tattoPostId);
        })
        .catch((error) => {
            console.error('Error deleting review:', error);
            toast.error('Error al eliminar el tatuaje.');
        });
};

onMounted(() => {
    getTattooPosts()
        .then((res) => {
            tattoos.value = res.data;
        })
        .catch((error) => {
            console.error('Error fetching tattoo artists:', error);
        })
        .finally(() => {
            loading.value = false;
        });
});
</script>

<template>
    <div class="p-6 text-white rounded-lg shadow-lg lg:max-w-[90rem] mx-auto">
        <BackButton />
        <h2 class="text-2xl font-bold mb-4">Gestionar Tatuajes</h2>
        <div class="bg-gray-900 p-2 rounded-lg shadow-md ring-neon">
            <div v-if="loading" class="flex justify-center items-center h-[18rem]">
                <Spinner />
            </div>
            <div v-else-if="!tattoos.length" class="text-center p-6">
                <p class="text-lg">No hay tatuajes para mostrar.</p>
            </div>
            <div v-else class="overflow-x-auto">
                <table class="w-full border border-gray-700">
                    <thead class="bg-gray-800">
                        <tr>
                            <th class="p-3 text-left w-1/4 min-w-[120px]">Foto</th>
                            <th class="p-3 text-left w-3/4">Descripción</th>
                            <th class="p-3 text-center w-40">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="tattoo in tattoos" :key="tattoo._id" class="border-t border-gray-700">
                            <td class="p-3 w-1/4 min-w-[120px]">
                                <img :src="tattoo.images[0]?.url || placeholderUserImage" alt="Foto del tatuaje"
                                    class="w-32 h-32 object-cover rounded" />
                            </td>
                            <td class="p-3 w-3/4">{{ tattoo.description || '-' }}</td>
                            <td class="p-3 w-40">
                                <div class="flex justify-center items-center h-full">
                                    <button @click="deleteTattoo(tattoo._id)"
                                        class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded flex items-center gap-2">
                                        <AiFillDelete /> Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
