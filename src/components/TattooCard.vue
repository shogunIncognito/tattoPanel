<script setup>
import { ref } from "vue";
import { Io5ChevronBackOutline, Io5ChevronForwardOutline } from "vue-icons-plus/io5";
import { AiOutlineStar } from "vue-icons-plus/ai";
import { BiTrash } from "vue-icons-plus/bi";

const { tattoo } = defineProps(['tattoo'])
defineEmits(['deleteTattoo'])

const currentIndex = ref(0);

const nextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % tattoo.images.length;
};

const prevImage = () => {
    currentIndex.value = (currentIndex.value - 1 + tattoo.images.length) % tattoo.images.length;
};

</script>

<template>
    <div class="text-white flex flex-col items-center justify-center md:p-6">
        <!-- Contenedor principal -->
        <div class="w-full max-w-4xl bg-darker p-6 rounded-lg shadow-lg ring-neon">
            <!-- Carrusel de imágenes -->
            <div class="relative w-full overflow-hidden rounded-lg">
                <img :src="tattoo.images[currentIndex].url" alt="Tatuaje"
                    class="mx-auto h-[30rem] object-cover rounded-lg transition duration-300">

                <!-- Botones de navegación del carrusel -->
                <button @click="prevImage"
                    class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full">
                    <Io5ChevronBackOutline />
                </button>
                <button @click="nextImage"
                    class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full">
                    <Io5ChevronForwardOutline />
                </button>
            </div>

            <!-- Información del tatuaje -->
            <div class="mt-4">
                <p class="mt-2 text-gray-300">{{ tattoo.description }}</p>

                <!-- Likes -->
                <div class="mt-3 flex items-center space-x-2 hover:text-yellow-400 w-fit cursor-pointer">
                    <AiOutlineStar class="text-yellow-400" />
                    <span class="text-lg font-bold">{{ tattoo.countLikes }}</span>
                </div>
            </div>

            <!-- Botones de acción -->
            <div class="mt-6 flex justify-between">
                <button @click="$emit('deleteTattoo', tattoo._id)"
                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded flex items-center gap-2">
                    <BiTrash />
                    Eliminar tatuaje
                </button>
            </div>
        </div>
    </div>
</template>
