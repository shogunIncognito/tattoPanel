<script setup>
import { BiSolidCommentDetail, BiSolidPen, BiUser } from 'vue-icons-plus/bi';
import { Fa6Users } from 'vue-icons-plus/fa6';
import { GrSecure } from 'vue-icons-plus/gr';
import { TbUserQuestion } from 'vue-icons-plus/tb';
import { useRouter } from 'vue-router';

const router = useRouter();

const stats = [
    { title: 'Usuarios', count: 120, icon: Fa6Users, route: '/users' },
    { title: 'Tatuadores', count: 45, icon: BiUser, route: '/tattooists' },
    { title: 'Tatuadores pendientes', count: 10, icon: TbUserQuestion, route: '/tattooists/pending' },
    { title: 'Tatuajes', count: 300, icon: BiSolidPen, route: '/tattoos' },
    { title: 'Reseñas', count: 150, icon: BiSolidCommentDetail, route: '/reviews' },
    { title: 'Crear administrador', count: 1, icon: GrSecure, route: '/admin/create' }
];

</script>

<template>
    <div class="min-h-screen bg-black text-white p-6">
        <div class="max-w-4xl mx-auto">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="stat in stats" :key="stat.title" @click="router.push(stat.route)"
                    class="bg-gray-900 p-4 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition-all">
                    <component :is="stat.icon" class="text-green-400 text-4xl" />
                    <h2 class="text-xl font-semibold mt-2">{{ stat.title }}</h2>
                    <p class="text-lg text-green-400 font-bold">{{ stat.count }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* Agrega aquí animaciones u otros estilos personalizados */
</style>
