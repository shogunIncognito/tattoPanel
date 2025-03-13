<script setup>
import { onMounted, ref } from 'vue';
import { BiTrash, BiUserX } from 'vue-icons-plus/bi';
import { getUserReviews, toggleUserApprobation } from '../services/api';
import Spinner from '../components/Spinner.vue';
import { placeholderUserImage } from '../utils/consts';
import { useRoute, useRouter } from 'vue-router';
import { AiFillStar } from 'vue-icons-plus/ai';
import { Io5ArrowBackOutline } from 'vue-icons-plus/io5';
import { deleteReview } from '../services/api'
import { toast } from 'vue3-toastify';
import { FaUserCheck } from 'vue-icons-plus/fa';

const user = ref(null);
const reviews = ref([]);
const loading = ref(true);
const route = useRoute();
const router = useRouter();

const suspendUser = () => {
    toggleUserApprobation(user.value._id)
        .then(() => {
            toast.success(`Usuario ${user.value.isVerified ? 'suspendido' : 'aprobado'} correctamente.`);
            user.value.isVerified = !user.value.isVerified;
        })
        .catch((error) => {
            console.error('Error suspending user:', error);
            toast.error('Error al suspender el usuario.');
        });
};

const deleteUserReview = (reviewId) => {
    deleteReview(reviewId)
        .then(() => {
            toast.success('Reseña eliminada correctamente.');
            reviews.value = reviews.value.filter((review) => review._id !== reviewId);
        })
        .catch((error) => {
            console.error('Error deleting review:', error);
            toast.error('Error al eliminar la reseña.');
        });
};

onMounted(() => {
    getUserReviews(route.params.id)
        .then((res) => {
            user.value = res.data.user;
            reviews.value = res.data.qualifications;
        })
        .catch((error) => {
            console.error('Error fetching user reviews:', error);
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
        class="bg-gray-900 text-white min-h-screen p-6 max-w-4xl md:mx-auto mx-2 my-5 rounded-lg shadow-lg ring-neon">
        <div class="flex items-center gap-10 mb-6">
            <button @click="router.back()" class="text-[#00c853] hover:text-[#00e676] flex items-center gap-2">
                <Io5ArrowBackOutline />
                Volver
            </button>
        </div>
        <div class="relative bg-gray-800 rounded-lg shadow-lg p-4 ring-neon">
            <img :src="user.photoBackground?.url || placeholderUserImage" alt="Banner"
                class="w-full h-40 object-cover rounded-md">
            <div class="flex items-center flex-col md:flex-row gap-4 mt-4 px-4">
                <img :src="user.photoPerfil?.url || placeholderUserImage" alt="Profile"
                    class="w-20 h-20 object-cover rounded-full border-4 border-gray-700">
                <div>
                    <h2 class="text-xl font-bold">{{ user.name }}</h2>
                    <p class="text-gray-400">{{ user.email }}</p>
                </div>
                <div class="md:ml-auto flex gap-4">
                    <button @click="suspendUser"
                        :class="(user.isVerified ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700') + ' px-4 py-2 rounded-lg flex items-center gap-2'">
                        <span v-if="user.isVerified" class="flex items-center gap-2">
                            <BiUserX /> Deshabilitar
                        </span>
                        <span v-else class="flex items-center gap-2">
                            <FaUserCheck /> Aprobar
                        </span>
                    </button>
                </div>
            </div>
        </div>

        <h3 class="text-xl font-bold mt-6">Reseñas</h3>
        <div v-if="reviews.length === 0" class="text-gray-300 mt-4">
            <p>Este usuario no tiene reseñas.</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div v-for="review in reviews" :key="review.id"
                class="bg-gray-800 flex flex-col p-4 rounded-lg shadow-md ring-neon">
                <div class="flex items-center gap-4">
                    <img :src="review.user.photoPerfil?.url || 'https://static.vecteezy.com/system/resources/previews/036/594/092/original/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg'"
                        alt="Foto del usuario" class="w-12 h-12 object-cover rounded-full" />
                    <div>
                        <h3 class="text-lg font-semibold">{{ review.user.name }}</h3>
                        <div class="flex items
                                    -center gap-1">
                            <AiFillStar v-for="i in 5" :key="i" class="text-2xl"
                                :color="i <= review.qualification ? '#FFD700' : '#C0C0C0'" />
                        </div>
                    </div>
                </div>
                <p class="text-gray-300 mt-4">{{ review.comment }}</p>

                <div class="flex-1 justify-end mt-4 flex items-end gap-4">
                    <BiTrash @click="deleteUserReview(review._id)" class="cursor-pointer text-red-500" />
                </div>
            </div>
        </div>
    </div>
</template>
