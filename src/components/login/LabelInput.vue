<template>
    <div class="">
        <label class="self-start font-medium text-lg" for="email">Email</label>
                <input v-model="" class="border w-full text-lg text-center h-12 rounded-md focus:outline-none focus:border-[#006EAD]" type="email" name="email" placeholder="Enter your name" required title="Enter the email address registered with your account">
    </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue';
const data = ref('')
const props = defineProps({
    type:{
        type:String,
        required:true,
        default:'text'
    },
    placeholder:{
        type:String,
        required:true,
        default:'Default Placeholder'
    },
    title:{
        type:String,
        required:true,
        default:'Default Title'
    }

})

</script>

<style scoped>

</style>