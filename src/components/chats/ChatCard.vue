<template>
    <div class="cursor-pointer">
        <div class="rounded-xl flex items-center gap-2 p-1 bg-slate-50 border-b border-t border-b-slate-200 border-t-slate-200 hover:bg-[#8262d9]  hover:text-white text-slate-800">
                <img class="rounded-full h-14 w-14 " src="https://thispersondoesnotexist.com/" alt="">
            <div class="flex flex-col items-start w-full">
                <h2 class="text-lg font-medium font-poppins">{{ props.name }}</h2>
                <div>
                    <h3 class="text-sm text-left font-poppins">{{ props.message }}</h3>
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
