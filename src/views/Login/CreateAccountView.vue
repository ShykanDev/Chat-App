<template>
    <LoadingBarsFullScreen v-if="waitingForVerification"/>
    <div class="mt-[12%] w-full flex flex-col justify-center items-center">
        <div class="flex flex-col justify-center items-center font-poppins gap-1 rounded-xl w-full  animate-fade">
            <h1 class="mb-5 font-medium text-2xl text-[#006EAD]">Create Account</h1>
            <form @submit.prevent class="flex flex-col justify-center items-center font-poppins gap-1 rounded-xl w-11/12 p-1">
            <label class="self-start font-medium text-lg flex items-center gap-1 text-sky-800" for="email">Email</label>
            <input v-model="email" class="border w-full text-lg text-center h-12 border-[#006EAD] rounded-md focus:outline-none focus:border-[#006EAD] placeholder:text-slate-700 mb-5" type="email" name="email" placeholder="Email for your account" required title="Enter the email address registered with your account">
            <label class="self-start font-medium text-lg flex items-center gap-1 text-sky-800" for="password">Password</label>
            <input v-model="password" class="border w-full text-lg text-center h-12 border-[#006EAD] rounded-md focus:outline-none focus:border-[#006EAD] placeholder:text-slate-700 mb-5" type="password" name="password" placeholder="Set a password ">
            <label class="self-start font-medium text-lg flex items-center gap-1 text-sky-800" for="confirm-password">Confirm Password</label>
            <input v-model="confirmPassword" class="border w-full text-lg text-center h-12 border-[#006EAD] rounded-md focus:outline-none focus:border-[#006EAD] placeholder:text-slate-700 mb-5" type="password" name="confirm-password" placeholder="Confirm your password">
            <h3 v-if="errorPasswordsMismatch" class="text-sm text-red-600">Your password doesn't match</h3>
            <div class="w-full flex items-center justify-between">
                <button @click="handleCreateAccount" type="submit" class="w-36 p-2 text-white bg-[#006EAD] rounded-md shadow-md hover:bg-[#296480] ">Create Account</button>
                <div class="animate-fade-left"><RouterLink :to="{ name: 'login' }" class="underline text-slate-600 text-base font-medium font-poppins"><h2>I'm already a member</h2></RouterLink></div>
            </div>
        </form>
    </div>
</div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import LoadingBarsFullScreen from '@/components/login/animations/LoadingBarsFullScreen.vue';

const auth = getAuth();

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorEmptyValues = ref(false)
const errorPasswordsMismatch = ref(false) 
const waitingForVerification = ref(false)// used to show loading bar while waiting for email verification to be sent

const handleCreateAccount = async (): Promise<void> => {
    if (password.value !== confirmPassword.value || password.value === '' || confirmPassword.value === '') {
        errorPasswordsMismatch.value = true;
        return;
    } else if( !email.value || !password.value || !confirmPassword.value) {
        errorEmptyValues.value = true;
        return;
    } else {
        errorPasswordsMismatch.value = false;
        waitingForVerification.value = true;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
            console.log(userCredential);
            const user = userCredential.user;
            await sendEmailVerification(user);
            console.log('Email sent');
        } catch (error) {
            console.log(`Error while trying to create account: ${error}`);
        }
    }
};


</script>

<style scoped>

</style>