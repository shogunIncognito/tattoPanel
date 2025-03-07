<script setup>
import { onMounted, ref } from 'vue';
import { BiUserX } from 'vue-icons-plus/bi';
import { getTattooistPosts, toggleTattooistApprobation } from '../services/api';
import Spinner from '../components/Spinner.vue';
import { placeholderUserImage } from '../utils/consts';
import { useRoute, useRouter } from 'vue-router';
import { Io5ArrowBackOutline } from 'vue-icons-plus/io5';
import { deleteTattooPost } from '../services/api'
import { toast } from 'vue3-toastify';
import TattooCard from '../components/TattooCard.vue';
import { FaUserCheck } from 'vue-icons-plus/fa';

const tattooist = ref(null);
const tattoos = ref([]);
const loading = ref(true);
const route = useRoute();
const router = useRouter();

const suspendTattooist = () => {
    toggleTattooistApprobation(tattooist.value._id)
        .then(() => {
            toast.success(`Tatuador ${tattooist.value.authorizedArtist ? 'suspendido' : 'aprobado'} correctamente.`);
            tattooist.value.authorizedArtist = !tattooist.value.authorizedArtist;
        })
        .catch((error) => {
            console.error('Error suspending tattooist:', error);
            toast.error('Error al suspender el tatuador.');
        });
};

const deleteTattoo = (tattoPostId) => {
    deleteTattooPost(tattoPostId)
        .then(() => {
            toast.success('Tatuaje eliminada correctamente.');
            tattoos.value = tattoos.value.filter((review) => review._id !== tattoPostId);
        })
        .catch((error) => {
            console.error('Error deleting review:', error);
            toast.error('Error al eliminar el tatuaje.');
        });
};

onMounted(() => {
    getTattooistPosts(route.params.id)
        .then((res) => {
            tattooist.value = res.data.tattooArtist;
            tattoos.value = res.data.posts;
        })
        .catch((error) => {
            console.error('Error fetching user tattoos:', error);
        })
        .finally(() => {
            loading.value = false;
        });
})
</script>

<template>
    <div v-if="loading" class="flex justify-center items-center h-[70dvh]">
        <Spinner />
    </div>
    <div v-else
        class="bg-gray-900 text-white min-h-screen md:p-6 p-3 max-w-[80rem] mx-3 md:mx-auto my-5 rounded-lg shadow-lg ring-neon">
        <div class="flex items-center gap-10 mb-6">
            <button @click="router.back()" class="text-[#00c853] hover:text-[#00e676] flex items-center gap-2">
                <Io5ArrowBackOutline />
                Volver
            </button>
        </div>
        <div v-if="tattooist" class="relative bg-gray-800 rounded-lg shadow-lg p-4 ring-neon">
            <img :src="tattooist.photoBackground?.url || placeholderUserImage" alt="Banner"
                class="w-full h-40 object-cover rounded-md">
            <div class="flex items-center gap-4 mt-4 px-4">
                <img :src="tattooist.photoPerfil?.url || placeholderUserImage" alt="Profile"
                    class="w-20 h-20 rounded-full border-4 border-gray-700">
                <div>
                    <h2 class="text-xl font-bold">{{ tattooist.name }}</h2>
                </div>

                <div class="ml-auto flex gap-4">
                    <button @click="suspendTattooist"
                        :class="(tattooist.authorizedArtist ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700') + ' px-4 py-2 rounded-lg flex items-center gap-2'">
                        <span v-if="tattooist.authorizedArtist" class="flex items-center gap-2">
                            <BiUserX /> Suspender
                        </span>
                        <span v-else class="flex items-center gap-2">
                            <FaUserCheck /> Aprobar
                        </span>
                    </button>
                </div>
            </div>
            <div class="px-4 mt-4 space-y-1">
                <p class="text-gray-100">Correo: {{ tattooist.email }}</p>
                <p class="text-gray-100">Teléfono: {{ tattooist.numberPhone }}</p>
                <p class="text-gray-100">Especialidad: {{ tattooist.specialty }}</p>
                <p class="text-gray-100">Experiencia: {{ tattooist.experience }}</p>
                <p class="text-gray-100">Dirección: {{ tattooist.address }}</p>
                <div class="my-2">
                    <p class="text-gray-100">Redes sociales:</p>
                    <p v-for="(social, key) in tattooist.socialNetworks" :key="key" class="pl-2">
                        {{ key + ':' + social }}
                    </p>
                </div>
                <p class="text-gray-100">Horario: {{ tattooist.schedule }}</p>
                <p class="text-gray-100">Descripción: {{ tattooist.description }}</p>
            </div>
        </div>

        <h3 class="text-xl font-bold mt-6">Tatuajes</h3>
        <div v-if="tattoos.length === 0" class="text-gray-300 mt-4">
            <p>Este tatuador no tiene tatuajes.</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <TattooCard v-for="tattoo in tattoos" :key="tattoo._id" :tattoo="tattoo" @deleteTattoo="deleteTattoo" />
        </div>
    </div>
</template>
