<script setup>
import { ref } from 'vue';
import { AiFillEye, AiFillEyeInvisible } from 'vue-icons-plus/ai';
import { RouterLink, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { getApiErrorMessage } from '../../utils/functions';
import { useAuthStore } from '../../store/useAuthStore';
import { loginAdmin } from '../../services/api';

const router = useRouter();
const { setSession } = useAuthStore();

const user = ref({
    user: '',
    password: '',
});

const showPassword = ref(false);

const handleLogin = () => {
    loginAdmin(user.value)
        .then(async (res) => {
            toast.success('Inicio de sesión exitoso');
            await setSession(res.data.token);
            router.push('/');
        })
        .catch((error) => {
            console.error('Error al iniciar el usuario:', error);
            toast.error(getApiErrorMessage(error.response.data.message) || 'Error al iniciar sesión', {
                autoClose: 5000,
            });
        });
};

</script>

<template>
    <div class="bg-black flex-col min-h-[90dvh] flex justify-center items-center p-5">
        <h2 class="text-white text-tatto text-[4rem] mb-5">Tattoo <span class="text-neon">Ink</span></h2>
        <div class="bg-[#1a1a1a] p-10 rounded-lg w-full max-w-md ring-neon">
            <h2 class="text-white text-center mb-8 text-2xl">
                Iniciar
                <span class="text-neon">sesión</span>
                como
                <span class="text-neon">administrador</span>
            </h2>

            <form @submit.prevent="handleLogin">
                <div class="mb-5">
                    <label for="user" class="block text-white mb-2 text-lg">Nombre de usuario</label>
                    <input type="text" id="user" v-model="user.user" required placeholder="Ingresa tu usuario"
                        class="w-full p-3 border border-[#333] rounded-md bg-[#333] text-white text-lg focus:outline-none focus:border-[#00e676]" />
                </div>

                <div class="mb-5">
                    <label for="password" class="block text-white mb-2 text-lg">Contraseña</label>
                    <div class="relative flex items-center">
                        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="user.password" required
                            placeholder="Ingresa tu contraseña"
                            class="w-full p-3 pr-12 border border-[#333] rounded-md bg-[#333] text-white text-lg focus:outline-none focus:border-[#00e676]" />
                        <span class="absolute right-3 cursor-pointer" @click="showPassword = !showPassword">
                            <AiFillEye v-if="showPassword" class="text-white" />
                            <AiFillEyeInvisible v-else class="text-white" />
                        </span>
                    </div>
                </div>

                <button type="submit"
                    class="w-full p-3 bg-[#00c853] text-white rounded-md text-lg cursor-pointer transition hover:bg-[#555] hover:shadow-[0px_0px_10px_#33ff5850,0px_0px_40px_#33ff5850,0px_0px_60px_#33ff5850] mb-4">
                    Iniciar sesión
                </button>
            </form>
        </div>
    </div>
</template>
