<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAuthStore } from '../store/useAuthStore';
import { BiLogOut, BiMenu } from 'vue-icons-plus/bi';

const authStore = useAuthStore();
const isMenuOpen = ref(false);
const router = useRouter();

const logout = () => {
    authStore.deleteSession();
    router.push('/auth');
    isMenuOpen.value = false;
};
</script>

<template>
    <nav class="bg-gray-900 text-white p-4 shadow-lg ring-neon flex justify-between items-center sticky top-0 z-50">
        <div class="text-xl font-bold overflow-hidden whitespace-nowrap text-ellipsis flex items-center gap-2">
            <span style="font-size: 26px;" class="text-tatto">Tattoo <span class="text-neon">Ink</span> </span>
            <span class="md:block hidden">- Panel de administración</span>
        </div>
        <button @click="isMenuOpen = !isMenuOpen" class="md:hidden focus:outline-none text-2xl">
            <BiMenu />
        </button>
        <ul :class="{ 'hidden': !isMenuOpen, 'flex': isMenuOpen }"
            class="absolute md:static top-16 left-0 w-full bg-gray-900 md:flex md:items-center md:space-x-6 md:w-auto md:bg-transparent flex-col md:flex-row z-50 shadow-lg md:shadow-none">
            <li class="w-full md:w-auto">
                <button @click="logout" class="flex items-center gap-2 px-4 py-2 hover:text-red-500 w-full md:w-auto">
                    <BiLogOut /> Cerrar sesión
                </button>
            </li>
        </ul>
    </nav>
</template>

<style>
@media (min-width: 768px) {
    ul {
        display: flex !important;
    }
}
</style>
