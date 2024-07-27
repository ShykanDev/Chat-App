<template>
    <div class="flex flex-col items-center font-poppins mt-[10%] animate-fade">
            <LoadingBarsFullScreen v-if="waitingForResetLink" />
            <PopupSucces v-if="resetLinkSent" :msg1="popupSuccessValues.msg1" :msg2="popupSuccessValues.msg2" />
            <h2 class="font-medium text-2xl text-[#006EAD]">Reset your password</h2>
            <div class="w-10/12 flex flex-col justify-center gap-1 mt-7">
                <label class="self-start font-medium text-lg flex items-center gap-1 text-sky-800" for="email" >Enter your email</label>
                <input v-model="email" class="border w-full text-lg text-center h-12 border-[#006EAD] rounded-md focus:outline-none focus:border-[#006EAD] placeholder:text-slate-700 mb-5" type="text" name="email" id="" placeholder="Type your email" title="A reset link will be sent to this account">
                <ErrorAlert v-if="incorrectUserData" :message-error="msgError" :severity-error="severityError" :error-user-data="incorrectUserData"/>
            </div>
            <div class="rounded-md w-10/12 flex justify-between items-center pt-4">
                <button @click="handleResetPassword" class="self-start font-medium text-lg flex items-center gap-1 text-white p-2 bg-sky-700 rounded-md" for="">Send reset link</button>
                <RouterLink :to="{name:'login'}" class="underline animate-fade-left">Go back to Login</RouterLink>
            </div>
        </div>
</template>

<script lang="ts" setup>
import LoadingBars from '@/components/login/animations/LoadingBars.vue';
import LoadingBarsFullScreen from '@/components/login/animations/LoadingBarsFullScreen.vue';
import ErrorAlert from '@/components/login/ErrorAlert.vue';
import PopupSucces from '@/components/login/popups/PopupSucces.vue';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { reactive, ref } from 'vue';

const email = ref('');

const msgError = ref('') // error message that will be shown if the user data is incorrect or missing
const severityError = ref('') // severity of the error message 
const incorrectUserData = ref(false) // boolean that will be true if the user data is incorrect or missing
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const waitingForResetLink = ref(false) // used to show loading bar while waiting for email verification to be sent
const resetLinkSent = ref(false) // used to show a popup saying that the reset link has been sent


const popupSuccessValues = reactive({
    msg1:'A reset link has been sent to your email',
    msg2:'If you do not see it, please check your spam folder',
})
const auth = getAuth();
const handleResetPassword = async() => {
    if (!email.value) { // Check if all fields are filled
        incorrectUserData.value = true;
        msgError.value = 'Empty email detected, make sure you filled it';
        return;
    } else if (!emailRegex.test(email.value)) { // Check if email is valid format
        incorrectUserData.value = true;
        severityError.value = 'medium';
        msgError.value = 'Invalid email address. Please enter a valid email';
        return;
    }  else {
        incorrectUserData.value = false;
        waitingForResetLink.value = true;
        try {
            incorrectUserData.value = false;
            await sendPasswordResetEmail(auth, email.value)
            waitingForResetLink.value = false;
            resetLinkSent.value = true;
        } catch (error) {
            console.log(error);
            
        }
    }
}
</script>

<style scoped>

</style>