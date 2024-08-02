<template>
    <div class="">
        <div class="w-11/12 flex flex-col justify-center mt-4">
            <label class="self-start font-medium text-lg flex items-center text-sky-800" :for="props.vModelName">{{ props.labelName }}</label>
            <input v-model="inputValue" class="border w-full text-lg text-center h-12 border-[#006EAD] rounded-md focus:outline-none focus:border-[#006EAD] placeholder:text-slate-700" :type="props.typeInput" :name="props.vModelName" :id="props.vModelName" :placeholder="props.inputPlaceholder" required :title="props.inputTitle" autocomplete="off">
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref, watch } from 'vue';
import { defineEmits } from 'vue';

const inputValue = ref('');

const emmit = defineEmits(['update:inputValue'])

const props = defineProps({
    labelName:{
        type:String,
        required:true,
        default:'Default Label'
    },
    typeInput:{
        type:String,
        default:'text',
        required:true,
    },
    inputTitle:{
        type:String,
        default:'Enter the required data',
        required:true
    },
    inputPlaceholder:{
        type:String,
        default:'Enter your data'
    },
    vModelName:{
        type:String,
        default:'text',
        required:true,
    },
})

watch(inputValue,(newVal, oldVal)=>{
    emmit("update:inputValue",newVal)
})

</script>

<style scoped>

</style>