<template>
    <div class="mt-[11%] w-full flex flex-col justify-center items-center ">
        <div class="flex flex-col justify-center items-center font-poppins gap-1 rounded-xl w-11/12 p-1 animate-fade" >
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
                <ErrorAlert :message-error="msgError" :severity-error="severityError" :error-user-data="incorrectUserData"/>
                <h3 class="text-sm self-end text-[#006EAD] font-medium cursor-pointer mt-2">Forgot your password?</h3>
            </div>
            <button @click="loginEmail" class="w-11/12 mt-5 mb-4 p-2 border border-slate-400 text-[#006EAD] bg-transparent rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-400">Login</button>
            <div class="w-11/12 bg-slate-200 mb-4 h-[1px]"></div>
            <label class="font-normal text-base mb-2" for="">Don't have an account?</label>
           <RouterLink to="/create-account"> <button class="w-[200px] bg-[#006EAD] p-2 text-white rounded-md">Create Account</button></RouterLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ErrorAlert from '@/components/login/ErrorAlert.vue';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { ref } from 'vue';

const auth = getAuth();

const email = ref('')
const password = ref('')

const msgError = ref('') // error message that will be shown if the user data is incorrect or missing
const severityError = ref('') // severity of the error message 
const incorrectUserData = ref(false) // boolean that will be true if the user data is incorrect or missing
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const loginEmail = async () => {
    if (!email.value || !password.value) {
        incorrectUserData.value = true;
        msgError.value = 'Empty fields detected, make sure you filled required values';
        severityError.value = 'low'
        return;
    } else if (!emailRegex.test(email.value)){
        incorrectUserData.value = true;
        msgError.value = 'Invalid email address. Please enter a valid email';
        severityError.value = 'low'
        return;
    } else {
        incorrectUserData.value = false;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
            if(userCredential.user.emailVerified){
                console.log("Credentials are valid, access given");
            } else if(!userCredential.user.emailVerified) {
                incorrectUserData.value = true;
                console.log("User email not verified");
                msgError.value = 'Your email is not verified, please click on the link sent to your email';
                severityError.value = 'medium'
            } 
        } catch (error) {
            incorrectUserData.value = true;
            severityError.value = 'high';
            ((error as Error).message === 'Firebase: Error (auth/invalid-credential).' ? msgError.value = 'Invalid credentials. Check the email and password and try again' : msgError.value = 'Error while trying to login, try again later, error: ' + error);
            console.log("Error while trying to login: " + error);
            
        }
    }
}
</script>

<style scoped>

</style>