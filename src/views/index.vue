<script setup>
import { ref } from 'vue';
import { BiBrush, BiUser } from 'vue-icons-plus/bi';
import { RiInkBottleFill } from 'vue-icons-plus/ri';
import { useRouter } from 'vue-router';

const router = useRouter();

const stats = [
    { title: 'Usuarios', count: 120, icon: BiUser, route: '/admin/usuarios' },
    { title: 'Tatuadores', count: 45, icon: BiBrush, route: '/dashboard/tattooists' },
    { title: 'Tatuajes', count: 300, icon: RiInkBottleFill, route: '/admin/tatuajes' }
];

</script>

<template>
    <div class="min-h-screen bg-black text-white p-6">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold mb-6">Panel de Administración</h1>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
