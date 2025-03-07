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
            console.log(res.data);
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
            <div class="overflow-x-auto">
                <table class="w-full border border-gray-700">
                    <thead class="bg-gray-800">
                        <tr>
                            <th class="p-3 text-left">Foto</th>
                            <th class="p-3 text-left">Descripcion</th>
                            <th class="p-3 text-center">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="loading" class="h-[18rem]">
                            <td colspan="6" class="text-center">
                                <div class="flex justify-center items-center h-full">
                                    <Spinner />
                                </div>
                            </td>
                        </tr>
                        <tr v-else v-for="tattoo in tattoos" :key="tattoo._id" class="border-t border-gray-700">
                            <td class="p-3">
                                <img :src="tattoo.images[0]?.url || placeholderUserImage" alt="Foto del tatuaje"
                                    class="w-24 h-24 object-cover rounded" />
                            </td>
                            <td class="p-3">{{ tattoo.description || '-' }}</td>
                            <td class="p-3 text-center items-center h-[8rem] flex gap-2 justify-center">
                                <button @click="deleteTattoo(tattoo._id)"
                                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded flex items-center gap-2">
                                    <AiFillDelete /> Eliminar tatuaje
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
