<template>
    <div class="cursor-pointer">
            <div class="flex items-center gap-2 p-1 bg-white border-b shadow-sm border-b-slate-200 border-t-slate-200 hover:bg-[#3B82F6] hover:text-white text-slate-800">
                <!-- <img class="rounded-full h-14 w-14 " src="https://picsum.photos/64/64" alt=""> -->
                 <v-icon name="ri-user-3-line" scale="1.8" color="#219AFF" />
            <div class="flex items-center justify-between w-full">
                <div class="flex flex-col items-start">
                    <h2 class="text-lg font-medium font-poppins">{{ props.name }}</h2>
                    <h3 class="text-sm text-left font-poppins">{{ props.message }}</h3>
                </div>
                <div class="">
                    <v-icon  name="bi-arrow-right-short" scale="2.2" color="#219AFF"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
    name:{
        type:String,
        required:true,
        default:'User Name'
    },
    message:{    
        type:String,
        required:true,
        default:'User Message'
    }
})
</script>

<style scoped></style>
