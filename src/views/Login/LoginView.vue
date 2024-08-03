<template>
    <div class="mt-[11%] w-full flex flex-col justify-center items-center sm:mt-[2%]">
        <LoadingBarsFullScreen v-if="waitingSuccessLogin" />
        <div class="flex flex-col items-center justify-center w-11/12 gap-1 p-1 font-poppins rounded-xl animate-fade md:w-5/12" >
            <h1 class="mb-5 font-medium text-2xl text-[#006EAD] md:text-3xl">Login to your account</h1>
            <div class="flex flex-col justify-center w-11/12 mt-4">
                <label class="flex items-center self-start text-lg font-medium text-sky-800" for="email">Email</label>
                <input v-model="email" class="border w-full text-lg text-center h-12 border-[#006EAD] rounded-md focus:outline-none focus:border-[#006EAD] placeholder:text-slate-700" type="email" name="email" id="email" placeholder="Enter your email" required title="Enter the email address registered with your account" autocomplete="off">
            </div>
            <div class="flex flex-col justify-center w-11/12 mt-4">
                <label class="flex items-center self-start gap-1 text-lg font-medium text-sky-800" for="password">Password</label>
                <input @keypress.enter="loginEmail" v-model="password" class="border border-[#006EAD] placeholder:text-slate-700 w-full text-lg text-center h-12 rounded-md focus:outline-none focus:border-[#006EAD]" type="password" name="password" id="password" placeholder="Enter your password"/>
            </div>
            <div class="flex flex-col justify-center w-11/12 mt-2">
                <ErrorAlert :message-error="msgError" :severity-error="severityError" :error-user-data="incorrectUserData"/>
                <RouterLink :to="{name:'forgotPassword'}" class="text-sm self-end text-[#006EAD] font-medium cursor-pointer mt-2"> 
                    <h3 class="">Forgot your password?</h3>
                </RouterLink>
            </div>
            <button @click="loginEmail" class="w-11/12 mt-5 mb-4 p-2 border border-slate-400 text-[#006EAD] bg-transparent rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-400">Login</button>
            <div class="w-11/12 bg-slate-200 mb-4 h-[1px]"></div>
            <label class="mb-2 text-base font-normal" for="create-account">Don't have an account?</label>
           <RouterLink to="/create-account"> <button class="w-[200px] bg-[#006EAD] p-2 text-white rounded-md" name="create-account" id="create-account">Create Account</button></RouterLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import LoadingBarsFullScreen from '@/components/login/animations/LoadingBarsFullScreen.vue';
import ErrorAlert from '@/components/login/ErrorAlert.vue';
import { UseUserValues } from '@/store/UserValuesStore';
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const auth = getAuth();
const router = useRouter();
const storeUser = UseUserValues(); //store to set the isAuth value based on current value

const email = ref('')
const password = ref('')

const msgError = ref('') // error message that will be shown if the user data is incorrect or missing
const severityError = ref('') // severity of the error message 
const incorrectUserData = ref(false) // boolean that will be true if the user data is incorrect or missing
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const waitingSuccessLogin = ref(false); 
const loginEmail = async () => {// login function that will be called when the user clicks on the login button
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
        waitingSuccessLogin.value = true;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
            if(userCredential.user.emailVerified){
                storeUser.setIsAuth(true);
                waitingSuccessLogin.value = false;
                router.push({name:'home'})
            } else if(!userCredential.user.emailVerified) {
                incorrectUserData.value = true;
                incorrectUserData.value = true;
                msgError.value = 'Your email is not verified, please click on the link sent to your email';
                severityError.value = 'medium'
                waitingSuccessLogin.value = false;
            }
        } catch (error) {
            incorrectUserData.value = true;
            severityError.value = 'high';
            ((error as Error).message === 'Firebase: Error (auth/invalid-credential).' ? msgError.value = 'Invalid credentials. Check the email and password and try again' : msgError.value = 'Error while trying to login, try again later, error: ' + error);
            console.log("Error while trying to login: " + error);
            waitingSuccessLogin.value = false;
        }
    }
}

</script>

<style scoped>

</style>