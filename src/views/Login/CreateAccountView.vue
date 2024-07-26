<template>
    <div class="mt-[3%] w-full flex flex-col justify-center items-center">
        <div class="self-start ml-2 mb-2 flex items-center animate-fade-right"><v-icon name="md-arrowback-round" color="black" scale="1.2" /><RouterLink :to="{ name: 'login' }" class=" text-slate-600 text-base font-poppins"><h2>Return to Login</h2></RouterLink></div>
        <div class="flex flex-col justify-center items-center font-poppins gap-1
         rounded-xl w-11/12 p-1 animate-fade">
            <h1 class="mb-2 font-medium text-2xl">Create Account</h1>
            <form @submit.prevent class="flex flex-col justify-center items-center font-poppins gap-1 rounded-xl w-11/12 p-1">
            <label class="self-start font-medium text-lg" for="email">Email</label>
            <input v-model="email" class=" border-b border-slate-600 w-full text-lg text-center h-12 focus:outline-none focus:border-sky-700 mb-7" type="email" name="email" placeholder="Enter your email" required>
            <label class="self-start font-medium text-lg" for="password">Password</label>
            <input v-model="password" class="border-b border-slate-600 w-full text-lg text-center h-12 focus:outline-none focus:border-sky-700 mb-7" type="password" name="password" placeholder="Set a password ">
            <label class="self-start font-medium text-lg" for="confirm-password">Confirm Password</label>
            <input v-model="confirmPassword" class="border-b border-slate-600 w-full text-lg text-center h-12 focus:outline-none focus:border-sky-700 mb-7" type="password" name="confirm-password" placeholder="Confirm your password">
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
const errorEmptyValues = ref(false)
const errorPasswordsMismatch = ref(false)


const handleCreateAccount = async (): Promise<void> => {
    if (password.value !== confirmPassword.value || password.value === '' || confirmPassword.value === '') {
        errorPasswordsMismatch.value = true;
        return;
    } else if( !email.value || !password.value || !confirmPassword.value) {
        errorEmptyValues.value = true;
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