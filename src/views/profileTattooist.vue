<script setup>
import { onMounted, ref } from 'vue';
import { BiTrash, BiUserX } from 'vue-icons-plus/bi';
import { getTattooistPosts } from '../services/api';
import Spinner from '../components/Spinner.vue';
import { placeholderUserImage } from '../utils/consts';
import { useRoute, useRouter } from 'vue-router';
import { AiFillStar } from 'vue-icons-plus/ai';
import { Io5ArrowBackOutline } from 'vue-icons-plus/io5';
import { deleteTattooPost } from '../services/api'
import { toast } from 'vue3-toastify';
import TattooCard from '../components/TattooCard.vue';

const tattooist = ref(null);
const tattoos = ref([]);
const loading = ref(true);
const route = useRoute();
const router = useRouter();

const suspendTattooist = () => {
    console.log(`User ${user.value.id} suspended.`);
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
            console.log(res.data);

            // tattooist.value = res.data[0].tattooist;
            tattoos.value = res.data;
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
                    <p class="text-gray-400">{{ tattooist.email }}</p>
                </div>
                <div class="ml-auto flex gap-4">
                    <button @click="suspendTattooist"
                        class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2">
                        <BiUserX /> Suspender
                    </button>
                </div>
            </div>
        </div>

        <h3 class="text-xl font-bold mt-6">Tatuajes</h3>
        <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <TattooCard v-for="tattoo in tattoos" :key="tattoo._id" :tattoo="tattoo" @deleteTattoo="deleteTattoo" />
        </div>
    </div>
</template>
