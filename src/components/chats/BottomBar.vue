<template>
    <section>
        <div class="w-full pt-1 pb-4 bg-slate-200 rounded-tl-2xl rounded-tr-2xl shadow-[0px_12px_8px_10px_#cbd5e0]">
            <div class="flex justify-around">
                <RouterLink :class="{'text-sky-500 bg-opacity-100 animate-jump animate-duration-[400ms] animate-ease-in-out': $route.name === 'home' }" class="flex flex-col items-center pt-1 font-medium transition-all duration-500 ease-in-out bg-white bg-opacity-0 font-poppins min-w-16 min-h-16 rounded-3xl" :to="{name:'home'}">
                    <v-icon scale="1.5" name="io-chatbubbles" color="#1b98ff" />
                    <small>Chats</small>
                </RouterLink>
                <RouterLink :class="{'text-sky-500 bg-opacity-100 animate-jump animate-duration-[400ms] animate-ease-in-out': $route.name === 'addContact' }"  class="flex flex-col items-center pt-1 font-medium bg-white bg-opacity-0 font-poppins min-w-16 min-h-16 rounded-3xl" :to="{name:'addContact'}">
                    <v-icon scale="1.5" name="fa-user-plus" color="#1b98ff" />
                    <small>Añadir</small>
                </RouterLink>
                <RouterLink :class="{'text-sky-500 bg-opacity-100 animate-jump animate-duration-[400ms] animate-ease-in-out': $route.name === 'asd' }"  class="flex flex-col items-center pt-1 font-medium font-poppins min-w-16 min-h-16 rounded-3xl" :to="{name:''}">
                    <v-icon scale="1.7" name="la-user-friends-solid" color="#1b98ff" />
                    <small>Solicitudes</small>
                </RouterLink>
                <RouterLink :class="{'text-sky-500 bg-opacity-100 animate-jump animate-duration-[400ms] animate-ease-in-out': $route.name === 'asd' }"  class="flex flex-col items-center pt-1 font-medium font-poppins min-w-16 min-h-16 rounded-3xl" :to="{name:''}">
                    <v-icon scale="1.5" name="md-settings-round" color="#1b98ff" />
                    <small>Ajustes</small>
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

// watching the changes of the current view (router)
const router = useRoute();

const currentView = ref(router.name);

</script>

<style scoped></style>