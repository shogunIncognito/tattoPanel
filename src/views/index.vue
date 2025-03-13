<script setup>
import { onMounted, ref } from 'vue';
import { BiSolidCommentDetail, BiSolidPen, BiUser } from 'vue-icons-plus/bi';
import { Fa6Users, Fa6UserShield } from 'vue-icons-plus/fa6';
import { GrSecure } from 'vue-icons-plus/gr';
import { TbUserQuestion } from 'vue-icons-plus/tb';
import { useRouter } from 'vue-router';
import { getDataStats } from '../services/api';

const router = useRouter();

const stats = [
    { title: 'Usuarios', count: 0, icon: Fa6Users, route: '/users', key: 'lengthUsers' },
    { title: 'Tatuadores', count: 0, icon: BiUser, route: '/tattooists', key: 'lengthArtists' },
    { title: 'Tatuadores pendientes', count: 0, icon: TbUserQuestion, route: '/tattooists/pending', key: 'lengthArtistsInauthorized' },
    { title: 'Tatuajes', count: 0, icon: BiSolidPen, route: '/tattoos', key: 'lengthPosts' },
    { title: 'Reseñas', count: 0, icon: BiSolidCommentDetail, route: '/reviews', key: 'lengthQualification' },
    { title: 'Crear administrador', count: 0, icon: GrSecure, route: '/admins/create', key: 'lengthAdmins' },
    { title: 'Administradores', count: 0, icon: Fa6UserShield, route: '/admins', key: 'lengthAdmins' }
];
const dataStats = ref({});

onMounted(() => {
    getDataStats()
        .then((res) => {
            dataStats.value = res.data;
        })
        .catch((error) => {
            console.error('Error al obtener las estadísticas:', error);
        });
});

</script>

<template>
    <div class="min-h-screen bg-black text-white p-6">
        <div class="max-w-4xl mx-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="stat in stats" :key="stat.title" @click="router.push(stat.route)"
                    class="bg-gray-900 p-4 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition-all">
                    <component :is="stat.icon" class="text-green-400 text-4xl" />
                    <h2 class="text-xl font-semibold mt-2">{{ stat.title }}</h2>
                    <p class="text-lg text-green-400 font-bold">{{ dataStats[stat.key] || 0 }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* Agrega aquí animaciones u otros estilos personalizados */
</style>
