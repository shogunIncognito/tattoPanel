<script setup lang="ts">
import { Io5ArrowBackOutline } from 'vue-icons-plus/io5';
import { RouterLink } from 'vue-router';

</script>

<template>
    <div class="flex items-center gap-10 mb-6">
        <RouterLink to="/" class="text-[#00c853] hover:text-[#00e676] flex items-center gap-2">
            <Io5ArrowBackOutline />
            Volver
        </RouterLink>
    </div>
</template>