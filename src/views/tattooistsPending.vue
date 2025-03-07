<script setup>
import { onMounted, ref } from 'vue';
import { BiCheckCircle, BiXCircle } from 'vue-icons-plus/bi';
import { placeholderUserImage } from '../utils/consts';
import Spinner from '../components/Spinner.vue';

const tattooists = ref([
    {
        id: '1',
        name: 'John Doe',
        specialty: 'Black & Grey',
        experience: '5 years',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        profileImage: 'https://via.placeholder.com/100',
    },
    {
        id: '2',
        name: 'Jane Smith',
        specialty: 'Traditional',
        experience: '3 years',
        email: 'janesmith@example.com',
        phone: '',
        profileImage: 'https://via.placeholder.com/100',
    }
]);
const loading = ref(false);

const approveTattooist = (id) => {
    tattooists.value = tattooists.value.filter(t => t.id !== id);
};

const rejectTattooist = (id) => {
    tattooists.value = tattooists.value.filter(t => t.id !== id);
};

onMounted(() => {
    console.log('Tattooists:', tattooists.value);
});
</script>

<template>
    <div class="p-6 bg-gray-900 text-white min-h-screen">
        <h1 class="text-2xl font-bold mb-4">Tatuadores pendientes de aprobar</h1>
        <div v-if="loading" class="flex justify-center items-center h-[70vh]">
            <Spinner />
        </div>
        <div v-else-if="tattooists.length === 0" class="text-center">
            <p class="text-lg">No hay tatuadores pendientes de aprobación</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="tattooist in tattooists" :key="tattooist.id"
                class="bg-gray-800 flex flex-col p-4 rounded-lg shadow-lg">
                <div class="flex items-center gap-4">
                    <img :src="placeholderUserImage" alt="Profile Image" class="w-16 h-16 rounded-full">
                    <div>
                        <h2 class="text-xl font-semibold">{{ tattooist.name }}</h2>
                        <p class="text-gray-400">Specialty: {{ tattooist.specialty }}</p>
                        <p class="text-gray-400">Experience: {{ tattooist.experience }}</p>
                        <p class="text-gray-400">Email: {{ tattooist.email }}</p>
                        <p v-if="tattooist.phone" class="text-gray-400">Phone: {{ tattooist.phone }}</p>
                    </div>
                </div>
                <div class="flex justify-end gap-2 mt-4 items-end flex-1">
                    <button @click="approveTattooist(tattooist.id)"
                        class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2">
                        <BiCheckCircle /> Aprobar
                    </button>
                    <button @click="rejectTattooist(tattooist.id)"
                        class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2">
                        <BiXCircle /> Rechazar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
