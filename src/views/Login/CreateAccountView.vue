<template>
    <div class="mt-[4%] w-full flex flex-col justify-center items-center ">
        <div class="self-start ml-2 mb-2 flex items-center"><v-icon name="md-arrowback-round" color="black" scale="1.2" /><RouterLink :to="{ name: 'login' }" class=" text-slate-600 text-base font-poppins"><h2>Return to Login</h2></RouterLink></div>
        <div class="flex flex-col justify-center items-center font-poppins gap-1 rounded-xl w-11/12 p-1">
            <h1 class="mb-2 font-medium text-2xl">Create Account</h1>
            <form @submit.prevent class="flex flex-col justify-center items-center font-poppins gap-1 rounded-xl w-11/12 p-1">
            <label class="self-start font-medium text-lg" for="email">Email</label>
            <input v-model="email" class="border w-full text-lg text-center h-12 rounded-md focus:outline-none focus:border-[#006EAD] mb-4" type="email" name="email" placeholder="Enter your email" required>
            <label class="self-start font-medium text-lg" for="password">Password</label>
            <input v-model="password" class="border w-full text-lg text-center h-12 rounded-md focus:outline-none focus:border-[#006EAD] mb-4" type="password" name="password" placeholder="Enter your password">
            <label class="self-start font-medium text-lg" for="confirm-password">Confirm Password</label>
            <input v-model="confirmPassword" class="border w-full text-lg text-center h-12 rounded-md focus:outline-none focus:border-[#006EAD]" type="password" name="confirm-password" placeholder="Confirm your password">
            <h3 v-if="errorPasswordsMismatch" class="text-sm text-red-600">Your password doesn't match</h3>
            <div class="self-start">
                <button @click="handleCreateAccount" type="submit" class="w-full mt-5 p-2 text-white bg-[#006EAD] rounded-md shadow-md hover:bg-[#296480] ">Create Account</button>
            </div>
        </form>
    </div>
</div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'

const auth = getAuth();

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorPasswordsMismatch = ref(false)

const handleCreateAccount = async (): Promise<void> => {
    if (password.value !== confirmPassword.value || password.value === '' || confirmPassword.value === '') {
        errorPasswordsMismatch.value = true;
        return;
    } else {
        errorPasswordsMismatch.value = false;
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