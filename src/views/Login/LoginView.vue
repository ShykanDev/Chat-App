<template>
    <div class="mt-[11%] w-full flex flex-col justify-center items-center ">
        <div class="flex flex-col justify-center items-center font-poppins gap-1 rounded-xl w-11/12 p-1" >
            <h1 class="mb-5 font-medium text-2xl">Login to your account</h1>
            <div class="w-11/12 flex flex-col justify-center mt-4">
                <label class="self-start font-medium text-lg" for="email">Email</label>
                <input v-model="email" class="border w-full text-lg text-center h-12 rounded-md focus:outline-none focus:border-[#006EAD]" type="email" name="email" placeholder="Enter your name" required title="Enter the email address registered with your account">
            </div>
            <div class="w-11/12 flex flex-col justify-center mt-4">
                <label class="self-start font-medium text-lg" for="password">Password</label>
                <input v-model="password" class="border w-full text-lg text-center h-12 rounded-md focus:outline-none focus:border-[#006EAD]" type="password" name="password" id="" placeholder="Enter your password"/>
            </div>
            <div class="w-11/12 flex flex-col justify-center mt-2">
                <div v-if="errorLoginEmail"><h3 class="text-sm text-red-600">Invalid credentials verify your email and password are correct</h3></div>
                <h3 class="text-sm self-end text-[#006EAD] font-medium cursor-pointer">Forgot your password?</h3>
            </div>
            <button @click="loginEmail" class="w-11/12 mt-5 mb-4 p-2 border border-slate-400 text-[#006EAD] bg-transparent rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-400">Login</button>
            <div class="w-11/12 bg-slate-200 mb-4 h-[1px]"></div>
            <label class="font-normal text-base mb-2" for="">Don't have an account?</label>
           <RouterLink to="/create-account"> <button class="w-[200px] bg-[#006EAD] p-2 text-white rounded-md">Create Account</button></RouterLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { ref } from 'vue';

const auth = getAuth();

const email = ref('')
const password = ref('')

const errorLoginEmail = ref(false)

const loginEmail = async() => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth,email.value,password.value);
        console.log(userCredential);
    } catch (error) {
        errorLoginEmail.value = true;
        console.log("Error while trying to login: "  + error);
    }
}
</script>

<style scoped>

</style>