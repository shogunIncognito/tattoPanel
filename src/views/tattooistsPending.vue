<script setup>
import { onMounted, ref } from 'vue';
import { BiCheckCircle, BiXCircle } from 'vue-icons-plus/bi';
import { placeholderUserImage } from '../utils/consts';
import Spinner from '../components/Spinner.vue';
import { toggleTattooistApprobation, getTattooistsToVerify, denyTattooistApprobation } from '../services/api';
import BackButton from '../components/BackButton.vue';
import { toast } from 'vue3-toastify';

const tattooists = ref([]);
const loading = ref(true);

const handleApprove = (id) => {
    toggleTattooistApprobation(id)
        .then(() => {
            tattooists.value = tattooists.value.filter(t => t._id !== id);
            toast.success('Tatuador aprobado correctamente');
        })
        .catch((error) => {
            console.error(error);
        });
};

const handleDisapprove = async (id) => {
    try {
        tattooists.value = tattooists.value.filter(t => t._id !== id);
        toast.success('Tatuador rechazado correctamente');
        await denyTattooistApprobation(id)
    } catch (error) {
        console.error(error);
        toast.error('Error al rechazar el tatuador');
    }
};

onMounted(() => {
    getTattooistsToVerify()
        .then((response) => {
            tattooists.value = response.data;
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            loading.value = false;
        });
});
</script>

<template>
    <div class="p-6 text-white min-h-screen">
        <BackButton />
        <h1 class="text-3xl font-bold mb-4 text-center">Tatuadores no autorizados</h1>
        <div v-if="loading" class="flex justify-center items-center h-[70vh]">
            <Spinner />
        </div>
        <div v-else-if="tattooists.length === 0" class="text-center my-20">
            <p class="text-xl">No hay tatuadores pendientes de autorizacion</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="tattooist in tattooists" :key="tattooist._id"
                class="bg-gray-800 flex flex-col p-4 rounded-lg shadow-lg">
                <div class="flex flex-col gap-4">
                    <img :src="placeholderUserImage" alt="Profile Image" class="w-16 h-16 rounded-full">
                    <div class="space-y-2">
                        <h2 class="text-2xl font-semibold">{{ tattooist.name }}</h2>
                        <p class="text-gray-200">Especialidad: {{ tattooist.specialty }}</p>
                        <p class="text-gray-200">Experiencia: {{ tattooist.experience }}</p>
                        <p class="text-gray-200">Correo: {{ tattooist.email }}</p>
                        <p v-if="tattooist.numberPhone" class="text-gray-200">Telefono: {{ tattooist.numberPhone }}</p>
                        <p v-if="tattooist.address" class="text-gray-200">Dirección: {{ tattooist.address }}</p>
                        <p v-if="tattooist.schedule" class="text-gray-200">Horario: {{ tattooist.schedule }}</p>
                        <p v-if="tattooist.description" class="text-gray-200 max-w-xl">Descripción: {{
                            tattooist.description }}
                        </p>
                        <div class="my-2">
                            <p class="text-gray-200 font-bold">Redes sociales:</p>
                            <p v-for="(social, key) in tattooist.socialNetworks" :key="key" class="text-gray-200">
                                {{ key.charAt(0).toUpperCase() + key.slice(1) + ': ' + social }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end gap-2 mt-4 lg:items-end flex-1 flex-col lg:flex-row items-center">
                    <button @click="handleApprove(tattooist._id)"
                        class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2 w-full lg:w-auto">
                        <BiCheckCircle /> Aprobar
                    </button>
                    <button @click="handleDisapprove(tattooist._id)"
                        class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2 w-full lg:w-auto">
                        <BiXCircle /> Rechazar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
