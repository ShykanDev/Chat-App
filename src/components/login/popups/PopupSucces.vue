<template>
    <div class="fixed pt-[40%] flex justify-center left-0 right-0 z-20 p-1 bg-slate-800 top-0 bottom-0 bg-opacity-80 sm:pt-[20%]">
        <div class="bg-slate-50 rounded-xl flex flex-col justify-evenly p-3 items-center font-poppins shadow-md gap-1 w-11/12 max-h-72 text-base xsm:text-xs sm:text-lg md:w-5/12">
            <div class="mb-4 pt-2 pb-2 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-emerald-50 bg-emerald-100 text-emerald-500"><v-icon name="md-checkcircle" color="#00ae1c" scale="2" /></div>
            <div class="pl-1 pr-1"><h2>A verification link has been sent to your email</h2></div>
            <div class="pl-1 pr-1"><h3>Check your email and click on the link</h3></div>
            <div class=""><RouterLink :to="{ name: 'login' }"><button class="w-[60vw] sm:w-44 mt-5 mb-4 p-2 border border-slate-400 text-white bg-[#006EAD] rounded-md  focus:ring-blue-400">Go to Login</button></RouterLink></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import { defineProps } from 'vue';
const props = defineProps({
    msgError: String,
    incorrectUserData: Boolean
})

</script>

<style scoped>

</style>