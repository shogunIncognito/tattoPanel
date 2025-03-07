<script setup>
import { onMounted, ref } from 'vue';
import { BiUserX } from 'vue-icons-plus/bi';
import BackButton from '../components/BackButton.vue';
import { getUsers, toggleUserApprobation } from '../services/api';
import { IpFileSearch } from 'vue-icons-plus/ip';
import Spinner from '../components/Spinner.vue';
import { placeholderUserImage } from '../utils/consts'
import { useRouter } from 'vue-router';
import { FaUserCheck } from 'vue-icons-plus/fa';

const users = ref([]);
const loading = ref(true)
const router = useRouter();

const toggleUserStatus = (id) => {
    toggleUserApprobation(id)
        .then((res) => {
            const newText = res.data.isVerified ? 'suspendido' : 'aprobado';
            toast.success(`Usuario ${newText} correctamente.`);
            const userIndex = users.value.findIndex((user) => user._id === id);
            users.value[userIndex].isVerified = res.data.isVerified;
        })
        .catch((error) => {
            console.error('Error suspending user:', error);
            toast.error('Error al suspender el usuario.');
        });
};

onMounted(() => {
    getUsers()
        .then((res) => {
            console.log(res.data);

            users.value = res.data;
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
        })
        .finally(() => {
            loading.value = false;
        });
})
</script>

<template>
    <div class="p-6 text-white rounded-lg shadow-lg lg:max-w-[90rem] mx-auto">
        <BackButton />
        <h2 class="text-2xl font-bold mb-4">Gestionar Usuarios</h2>
        <div class="bg-gray-900 p-2 rounded-lg shadow-md ring-neon">
            <div class="overflow-x-auto">
                <table class="w-full border border-gray-700">
                    <thead class="bg-gray-800">
                        <tr>
                            <th class="p-3 text-left">Foto</th>
                            <th class="p-3 text-left">Nombre</th>
                            <th class="p-3 text-left">Correo</th>
                            <th class="p-3 text-left">Fecha registro</th>
                            <th class="p-3 text-left">Cuenta habilitada</th>
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
                        <tr v-else v-for="user in users" :key="user._id" class="border-t border-gray-700">
                            <td class="p-3">
                                <img :src="user.photoPerfil?.url || placeholderUserImage" alt="Foto de perfil"
                                    class="w-10 h-10 rounded-full">
                            </td>
                            <td class="p-3">{{ user.name }}</td>
                            <td class="p-3">{{ user.email }}</td>
                            <td class="p-3">{{ user.registrationDate.split('T')[0] }}</td>
                            <td class="p-3">
                                <span :class="{ 'text-green-500': user.isVerified, 'text-red-500': !user.isVerified }">
                                    {{ user.isVerified ? 'Sí' : 'No' }}
                                </span>
                            </td>
                            <td class="p-3 text-center flex flex-col lg:grid lg:grid-cols-2 grid-cols-1 gap-2 w-full">
                                <button @click="router.push(`/users/${user._id}`)"
                                    class="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded flex items-center gap-2">
                                    <IpFileSearch /> Ver reseñas
                                </button>
                                <button @click="toggleUserStatus(user._id)"
                                    :class="(user.isVerified ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700') + ' px-4 py-2 rounded-lg flex items-center gap-2'">
                                    <span v-if="user.isVerified" class="flex items-center gap-2">
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
