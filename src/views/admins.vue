<script setup>
import { ref, onMounted } from 'vue';
import { getAdmins, deleteAdmin } from '../services/api';
import { placeholderUserImage } from '../utils/consts'
import BackButton from '../components/BackButton.vue';
import { BiUserX } from 'vue-icons-plus/bi';
import Spinner from '../components/Spinner.vue';
import { toast } from 'vue3-toastify';
import { useAuthStore } from '../store/useAuthStore';

const admins = ref([]);
const loading = ref(true);
const authStore = useAuthStore();

const handleDeleteAdmin = async (id) => {
    try {
        deleteAdmin(id);
        admins.value = admins.value.filter((admin) => admin._id !== id);
        toast.success('Administrador eliminado correctamente');
    } catch (error) {
        console.error('Error deleting tattoo artist:', error);
        toast.error('Error eliminando el administrador');
    }
};

onMounted(() => {
    getAdmins()
        .then((res) => {
            admins.value = res.data;
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
        <h2 class="text-2xl font-bold mb-4">Gestionar Administradores</h2>
        <div class="bg-gray-900 p-2 rounded-lg shadow-md ring-neon">
            <div class="overflow-x-auto">
                <table class="w-full border border-gray-700">
                    <thead class="bg-gray-800">
                        <tr>
                            <th class="p-3 text-left">Foto</th>
                            <th class="p-3 text-left">Nombre</th>
                            <th class="p-3 text-center" v-if="authStore.user.user === 'firstAdmin'">Acciones</th>
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
                        <tr v-else v-for="admin in admins" :key="admin._id" class="border-t border-gray-700">
                            <td class="p-3">
                                <img :src="admin.photoPerfil?.url || placeholderUserImage" alt="Foto de perfil"
                                    class="w-10 h-10 rounded-full">
                            </td>
                            <td class="p-3">{{ admin.user }}</td>
                            <td class="p-3 text-center" v-if="authStore.user.user === 'firstAdmin'">
                                <button @click="handleDeleteAdmin(admin._id)"
                                    class="p-2 bg-red-500 rounded-lg hover:bg-red-600">
                                    <BiUserX class="w-6 h-6" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
