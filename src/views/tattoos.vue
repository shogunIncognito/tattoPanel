<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getTattooPosts } from '../services/api';
import { placeholderUserImage } from '../utils/consts'
import BackButton from '../components/BackButton.vue';
import { BiUserX } from 'vue-icons-plus/bi';
import { IpFileSearch } from 'vue-icons-plus/ip';
import Spinner from '../components/Spinner.vue';
import { AiFillStar } from 'vue-icons-plus/ai';
import { LuUserSearch } from 'vue-icons-plus/lu';

const tattoos = ref([]);
const loading = ref(true);

const removeReview = async (id) => {
    try {
        await axios.patch(`/api/tattoo-artists/${id}/disable`); // Adjust endpoint
        const artist = tattoos.value.find(artist => artist._id === id);
        if (artist) artist.isVerified = false;
    } catch (error) {
        console.error('Error disabling tattoo artist:', error);
    }
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
    <div class="p-6 text-white rounded-lg shadow-lg">
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
                                <button @click="removeReview(tattoo._id)"
                                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded flex items-center gap-2">
                                    <BiUserX /> Eliminar tatuaje
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
