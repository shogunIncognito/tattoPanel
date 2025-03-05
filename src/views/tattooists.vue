<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getTattooists } from '../services/api';
import { placeholderUserImage } from '../utils/consts'
import BackButton from '../components/BackButton.vue';

const tattooArtists = ref([]);

const disableTattooArtist = async (id) => {
    try {
        await axios.patch(`/api/tattoo-artists/${id}/disable`); // Adjust endpoint
        const artist = tattooArtists.value.find(artist => artist._id === id);
        if (artist) artist.isVerified = false;
    } catch (error) {
        console.error('Error disabling tattoo artist:', error);
    }
};

onMounted(() => {
    getTattooists()
        .then((res) => {
            tattooArtists.value = res.data;
        })
        .catch((error) => {
            console.error('Error fetching tattoo artists:', error);
        });
});
</script>

<template>
    <div class="min-h-screen bg-black text-white p-6">
        <BackButton />
        <div class="max-w-5xl mx-auto">
            <h1 class="text-3xl font-bold mb-6">Tatuadores</h1>
            <div class="bg-gray-900 p-4 rounded-lg shadow-md">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b border-gray-700">
                            <th class="p-2">Photo</th>
                            <th class="p-2">Name</th>
                            <th class="p-2">Specialty</th>
                            <th class="p-2">Experience</th>
                            <th class="p-2">Phone</th>
                            <th class="p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="artist in tattooArtists" :key="artist._id"
                            class="border-b border-gray-700 hover:bg-gray-800">
                            <td class="p-2">
                                <img :src="artist.photoPerfil?.url || placeholderUserImage" alt="Photo"
                                    class="w-12 h-12 rounded-full border border-gray-600" />
                            </td>
                            <td class="p-2">{{ artist.name }}</td>
                            <td class="p-2">{{ artist.specialty }}</td>
                            <td class="p-2">{{ artist.experience }}</td>
                            <td class="p-2">{{ artist.numberPhone }}</td>
                            <td class="p-2 flex justify-center gap-3">
                                <button v-if="artist.isVerified" @click="disableTattooArtist(artist._id)"
                                    class="text-red-400 hover:text-red-300">
                                    Deshabilitar
                                </button>
                                <span v-else class="text-gray-400">Disabled</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style>
/* Add animations or custom styles here */
</style>
