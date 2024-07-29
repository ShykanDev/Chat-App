<template>
    <div class="flex items-center flex-col mt-20">
      <h1 class="text-2xl font-poppins" >Home Page</h1>
      <ButtonAction @click="logout"  class="self-end mr-4" :btn-msg="btnActionPropsLogout.btnMsg"/>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import ButtonAction from './Login/buttons/ButtonAction.vue';
import IButtonAction from '@/interfaces/buttons/IButtonAction';
import { signOut, getAuth } from 'firebase/auth';
import { UseUserValues } from '@/store/UserValuesStore';
import { useRouter } from 'vue-router';

const btnActionPropsLogout:IButtonAction = reactive({  btnMsg:'Logout'}) //// button login values (color text message etc)

const auth = getAuth();

const storeUserValues = UseUserValues();

const router = useRouter();
const logout =async() => {
   try {
    await signOut(auth)
    storeUserValues.setIsAuth(false)
    router.push({name:'login'})
   } catch (error) {
    console.log(`Error while trying to signOut: ${(error as Error).message}`);
   }
}
</script>

<style scoped>

</style>