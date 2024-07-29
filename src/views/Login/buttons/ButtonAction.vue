<template>
    <div class="">
        <button :class="`bg-[${props.btnBg}] text-${props.btnColText}`" class="p-1 rounded-md hover:bg-sky-600 active:bg-sky-700 font-poppins">{{ props.btnMsg }}</button>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
    btnMsg:{
        type:String,
        required:true,
        default:'Button Action'
    },
    btnBg:{
        type:String,
        required:false,
        default:'#006EAD',
    },
    btnHoverBg:{ //ignore this one
        type:String,
        required:false,
        default:''
    },
    btnColText:{
        type:String,
        required:false,
        default:'white'
    }
})

</script>

<style scoped>

</style>