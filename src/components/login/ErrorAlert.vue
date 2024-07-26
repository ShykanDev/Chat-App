<template>
    <div class="">
        <div v-if="props.errorUserData" class="flex items-start "><v-icon name="io-alert-circle" scale="1.2" :color="currentColor" animation="ring" speed="slow" /><h3 :style="{color:currentColor}" class="text-sm m-0 p-0">{{props.messageError}}</h3></div>
    </div>
</template>


<script lang="ts" setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
    severityError:{
        type:String,
        required:true,
        default:'low'
    },
    errorUserData:{
        type:Boolean,
        required:true,
        default:false
    },
    messageError:{
        type:String,
        required:true,
        default:'Error with your data try again later' 
    }
})

const currentColor = computed(()=>{
    if(props.severityError === 'low') return '#0081e9';
    if(props.severityError === 'medium') return '#ff9c00'
    if(props.severityError === 'high') return '#c70000'
    return '#0081e9'
})
</script>

<style scoped>

</style>