<template>
    <LoadingBarsFullScreen v-if="waitingForVerification" />
    <PopupSucces v-if="emailVerificationSent" :btn-msg="popupSuccessValues.btnMsg" :msg1="popupSuccessValues.msg1" :msg2="popupSuccessValues.msg2"/>
    <div class="mt-[12%] w-full flex flex-col justify-center items-center md:mt-[2%] ">
        <div class="flex flex-col items-center justify-center w-full gap-1 font-poppins rounded-xl animate-fade md:w-9/12">
            <h1 class="mb-5 font-medium text-2xl text-[#006EAD] md:text-3xl">Create Account</h1>
            <form @submit.prevent class="flex flex-col items-center justify-center w-11/12 gap-1 p-1 font-poppins rounded-xl" autocomplete="off">
                <label class="flex items-center self-start gap-1 text-lg font-medium text-sky-800" for="name">Name</label>
                <input v-model="name" class="border w-full text-lg text-center h-12 border-[#006EAD] rounded-md focus:outline-none focus:border-[#006EAD] placeholder:text-slate-700 mb-5" type="text" name="name" placeholder="Enter your name" required title="Enter the name you want to have on your account">
                <label class="flex items-center self-start gap-1 text-lg font-medium text-sky-800" for="email">Email</label>
                <input v-model="email" class="border w-full text-lg text-center h-12 border-[#006EAD] rounded-md focus:outline-none focus:border-[#006EAD] placeholder:text-slate-700 mb-5" type="email" name="email" placeholder="Email for your account" required title="Enter the email address registered with your account">
                <label class="flex items-center self-start gap-1 text-lg font-medium text-sky-800" for="password">Password</label>
                <input v-model="password" class="border w-full text-lg text-center h-12 border-[#006EAD] rounded-md focus:outline-none focus:border-[#006EAD] placeholder:text-slate-700 mb-5" type="password" name="password" placeholder="Set a password ">
                <label class="flex items-center self-start gap-1 text-lg font-medium text-sky-800" for="confirm-password">Confirm Password</label>
                <input v-model="confirmPassword" class="border w-full text-lg text-center h-12 border-[#006EAD] rounded-md focus:outline-none focus:border-[#006EAD] placeholder:text-slate-700 mb-5" type="password" name="confirm-password" placeholder="Confirm your password">
                <ErrorAlert :message-error="msgError" :severity-error="severityError" :error-user-data="incorrectUserData"/>
                <div class="flex flex-wrap items-center justify-between w-full ">
                    <button @click="handleCreateAccount" type="submit" class="w-36 p-2 text-white bg-[#006EAD] rounded-md shadow-md hover:bg-[#296480] ">Create Account</button>
                    <div class="mt-3 animate-fade-left">
                        <RouterLink :to="{ name: 'login' }" class="text-base font-medium underline text-slate-600 font-poppins">
                            <h2>I'm already a member</h2>
                        </RouterLink>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import LoadingBarsFullScreen from '@/components/login/animations/LoadingBarsFullScreen.vue';
import ErrorAlert from '@/components/login/ErrorAlert.vue';
import PopupSucces from '@/components/login/popups/PopupSucces.vue';
import { reactive } from 'vue';

const auth = getAuth()
const db = getFirestore();

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const msgError = ref('') // error message that will be shown if the user data is incorrect or missing
const severityError = ref('') // severity of the error message used to display a different color based on the severity
const incorrectUserData = ref(false) // boolean that will be true if the user data is incorrect or missing
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const waitingForVerification = ref(false)// used to show loading bar while waiting for email verification to be sent
const emailVerificationSent = ref(false); // used to show popup that email verification has been sent

const popupSuccessValues = reactive({
    msg1:'Your account has been created. Please check your email to verify your account.',
    msg2:'If you do not see it, please check your spam folder',
    btnMsg:'Go to Login',
})
const handleCreateAccount = async (): Promise<void> => { // Handle account creation and email verification
    if (!email.value || !password.value || !confirmPassword.value|| !name.value) { // Check if all fields are filled
        incorrectUserData.value = true;
        msgError.value = 'Empty fields detected, make sure you filled required values';
        return;
    } else if (!emailRegex.test(email.value)) { // Check if email is valid format
        incorrectUserData.value = true;
        severityError.value = 'medium';
        msgError.value = 'Invalid email address. Please enter a valid email';
        return;
    } else if (password.value !== confirmPassword.value) { // Check if passwords match
        incorrectUserData.value = true;
        severityError.value = 'high';
        msgError.value = 'Passwords do not match';
        return;
    } else if (password.value.length < 6) { // Check if password is at least 6 characters long
        incorrectUserData.value = true;
        msgError.value = 'Password must be at least 6 characters long';
        return;
    } else if (email.value === password.value){ // Check if password is not the same as the email
        incorrectUserData.value = true;
        msgError.value = 'Password cannot be the same as the email';
        return;
    } else {
        incorrectUserData.value = false;
        waitingForVerification.value = true;
        emailVerificationSent.value = false;
        try {// Create account and send email verification to user email
            const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
            const user = userCredential.user;
            await sendEmailVerification(user);
            waitingForVerification.value = false;
            emailVerificationSent.value = true;
            // adding user values to firestore
            const usersCollection = collection(db, 'users'); 
            await setDoc(doc(usersCollection, user.uid), {
                name: name.value,
                email: email.value,
                id: user.uid,
            });
        } catch (error) {
            waitingForVerification.value = false;
            if ((error as Error).message === 'Firebase: Error (auth/email-already-in-use).') {
                incorrectUserData.value = true;
                msgError.value = 'Email already in use, go to login page and login with that email';
                severityError.value = 'medium';
            } else if ((error as Error).message === 'Firebase: Error (auth/invalid-email).') {
                incorrectUserData.value = true;
                msgError.value = 'Invalid email address';
                severityError.value = 'medium';
            } else if ((error as Error).message === 'Firebase: Error (auth/too-many-requests).') {
                incorrectUserData.value = true;
                msgError.value = 'Too many requests, please try again later';
                severityError.value = 'high';
            } 
            else {
                incorrectUserData.value = true;
                msgError.value = `Error while trying to create account,try again later, error: ${(error as Error).message}`;
                severityError.value = 'high';
            }
        }
    }
};


</script>

<style scoped></style>