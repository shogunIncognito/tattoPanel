<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getReviews, getTattooists } from '../services/api';
import { placeholderUserImage } from '../utils/consts'
import BackButton from '../components/BackButton.vue';
import { BiUserX } from 'vue-icons-plus/bi';
import { IpFileSearch } from 'vue-icons-plus/ip';
import Spinner from '../components/Spinner.vue';
import { AiFillStar } from 'vue-icons-plus/ai';
import { LuUserSearch } from 'vue-icons-plus/lu';

const reviews = ref([]);
const loading = ref(true);

const removeReview = async (id) => {
    try {
        await axios.patch(`/api/tattoo-artists/${id}/disable`); // Adjust endpoint
        const artist = reviews.value.find(artist => artist._id === id);
        if (artist) artist.isVerified = false;
    } catch (error) {
        console.error('Error disabling tattoo artist:', error);
    }
};

onMounted(() => {
    getReviews()
        .then((res) => {
            console.log(res.data);

            reviews.value = res.data;
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
        <h2 class="text-2xl font-bold mb-4">Gestionar Reseñas</h2>
        <div class="bg-gray-900 p-2 rounded-lg shadow-md ring-neon">
            <div class="overflow-x-auto">
                <table class="w-full border border-gray-700">
                    <thead class="bg-gray-800">
                        <tr>
                            <th class="p-3 text-left">Nombre de usuario</th>
                            <th class="p-3 text-left">Comentario</th>
                            <th class="p-3 text-left">Calificacion</th>
                            <th class="p-3 text-left">Tatuador</th>
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
                        <tr v-else v-for="review in reviews" :key="review._id" class="border-t border-gray-700">
                            <td class="p-3">{{ review.user.name }}</td>
                            <td class="p-3">{{ review.comment || '-' }}</td>
                            <td class="p-3 flex gap-2">
                                <AiFillStar class="text-yellow-500" />
                                {{ review.qualification }}
                            </td>
                            <td class="p-3">{{ review.tattooArtist.name }}</td>
                            <td class="p-3 text-center flex gap-2 justify-center">
                                <button @click="removeReview(review._id)"
                                    class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded flex items-center gap-2">
                                    <LuUserSearch /> Ver usuario
                                </button>
                                <button @click="removeReview(review._id)"
                                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded flex items-center gap-2">
                                    <BiUserX />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
