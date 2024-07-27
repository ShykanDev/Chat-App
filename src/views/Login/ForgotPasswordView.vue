<template>
    <div class="">
        <div class="flex flex-col  items-center font-poppins mt-[10%]" >
            <h2 class="font-medium text-2xl text-[#006EAD]">Reset your password</h2>
            <div class="w-10/12 flex flex-col justify-center gap-1 mt-7">
                <label class="self-start font-medium text-lg flex items-center gap-1 text-sky-800" for="">Enter your email</label>
                <input class="border w-full text-lg text-center h-12 border-[#006EAD] rounded-md focus:outline-none focus:border-[#006EAD] placeholder:text-slate-700 mb-5" type="text" name="" id="" placeholder="Type your email">
            </div>
            <div class="w-10/12 flex flex-col justify-center gap-1">
                <label class="self-start font-medium text-lg flex items-center gap-1 text-sky-800" for="">Set a new password</label>
                <input class="border w-full text-lg text-center h-12 border-[#006EAD] rounded-md focus:outline-none focus:border-[#006EAD] placeholder:text-slate-700 mb-5" type="text" name="" id="" placeholder="Enter your new password">
            </div>
            <div class="w-10/12 flex flex-col justify-center gap-1 ">
                <label class="self-start font-medium text-lg flex items-center gap-1 text-sky-800" for="">Confirm your new password</label>
                <input class="border w-full text-lg text-center h-12 border-[#006EAD] rounded-md focus:outline-none focus:border-[#006EAD] placeholder:text-slate-700 mb-5" type="text" name="" id="" placeholder="Confirm new password">
            </div>
            <div class="rounded-md w-10/12 flex flex-col">
                <button class="self-start font-medium text-lg flex items-center gap-1 text-white p-2 bg-sky-700 rounded-md" for="">Reset Password</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');


</script>

<style scoped>

</style>