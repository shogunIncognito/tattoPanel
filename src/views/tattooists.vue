<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { toggleTattooistApprobation, getTattooists } from '../services/api';
import { placeholderUserImage } from '../utils/consts'
import BackButton from '../components/BackButton.vue';
import { BiUserX } from 'vue-icons-plus/bi';
import { IpFileSearch } from 'vue-icons-plus/ip';
import Spinner from '../components/Spinner.vue';
import { useRouter } from 'vue-router';
import { FaUserCheck } from 'vue-icons-plus/fa';
import { toast } from 'vue3-toastify';

const tattooArtists = ref([]);
const loading = ref(true);
const router = useRouter()
const isToggleloading = ref(false);

const disableTattooArtist = async (id) => {
    try {
        isToggleloading.value = true;
        const res = await toggleTattooistApprobation(id);
        const newText = res.data.authorizedArtist ? 'habilitado' : 'suspendido';
        toast.success(`Tatuador ${newText} correctamente.`);
        const tattooArtistIndex = tattooArtists.value.findIndex((tattooArtist) => tattooArtist._id === id);
        tattooArtists.value[tattooArtistIndex].authorizedArtist = !tattooArtists.value[tattooArtistIndex].authorizedArtist;
    } catch (error) {
        console.error('Error disabling tattoo artist:', error);
    } finally {
        isToggleloading.value = false;
    }
};

onMounted(() => {
    getTattooists()
        .then((res) => {
            tattooArtists.value = res.data;
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
        <h2 class="text-2xl font-bold mb-4">Gestionar Tatuadores</h2>
        <div class="bg-gray-900 p-2 rounded-lg shadow-md ring-neon">
            <div class="overflow-x-auto">
                <table class="w-full border border-gray-700">
                    <thead class="bg-gray-800">
                        <tr>
                            <th class="p-3 text-left">Foto</th>
                            <th class="p-3 text-left">Nombre</th>
                            <th class="p-3 text-left">Correo</th>
                            <th class="p-3 text-left">Telefono</th>
                            <th class="p-3 text-left">Aprobado</th>
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
                        <tr v-else v-for="tattooist in tattooArtists" :key="tattooist._id"
                            class="border-t border-gray-700">
                            <td class="p-3">
                                <img :src="tattooist.photoPerfil?.url || placeholderUserImage" alt="Foto de perfil"
                                    class="w-10 h-10 rounded-full">
                            </td>
                            <td class="p-3">{{ tattooist.name }}</td>
                            <td class="p-3">{{ tattooist.email }}</td>
                            <td class="p-3">{{ tattooist.numberPhone }}</td>
                            <td class="p-3">
                                <span
                                    :class="{ 'text-green-500': tattooist.authorizedArtist, 'text-red-500': !tattooist.authorizedArtist }">
                                    {{ tattooist.authorizedArtist ? 'Sí' : 'No' }}
                                </span>
                            </td>
                            <td class="p-3 text-center flex flex-col lg:grid lg:grid-cols-2 grid-cols-1 gap-2 w-full">
                                <button @click="router.push(`/tattooists/${tattooist._id}`)"
                                    class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded flex items-center gap-2">
                                    <IpFileSearch /> Ver tatuajes
                                </button>
                                <button @click="disableTattooArtist(tattooist._id)" :disabled="isToggleloading"
                                    :class="(tattooist.authorizedArtist ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700') + ' px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50'">
                                    <span v-if="tattooist.authorizedArtist" class="flex items-center gap-2">
                                        <BiUserX /> Deshabilitar
                                    </span>
                                    <span v-else class="flex items-center gap-2">
                                        <FaUserCheck /> Habilitar
                                    </span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
