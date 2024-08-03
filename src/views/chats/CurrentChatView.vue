<template>
    <div class="bg-emerald-50 animate-fade-left animate-duration-500 h-dvh"> 
        <div class="relative flex items-center rounded-b-lg shadow-sm bg-slate-50 text-slate-700 min-h-14">
            <RouterLink :to="{name:'home'}" class="z-10 flex items-center ">
                <v-icon class="ml-1" name="md-keyboardarrowleft-round" color="#1b98ff" scale="2"  />
                <h3 class="text-lg text-[#1b98ff]">Chats</h3>
            </RouterLink>
            <div class="absolute top-0 bottom-0 left-0 right-0 z-0 flex items-center justify-center w-full">
            <h2 class="text-xl font-medium font-poppins" >{{ route.params.name }} </h2>
            </div>
        </div>
        <section class="flex flex-col items-center">
            <ul class="flex flex-col w-full font-poppins">
                <li class="self-start p-2 ml-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-sm rounded-br-2xl bg-white shadow-sm max-w-[85%] mb-2 mt-2 text-left">Hello Alex! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi itaque exercitationem soluta vero. Perspiciatis aliquid voluptates porro amet dolore accusamus a suscipit! Excepturi voluptatem mollitia dignissimos eveniet, cumque veritatis porro!</li>
                <li class="self-end max-w-[85%] p-2 mr-2 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm bg-sky-600 text-left">Hello! 
                </li>
            </ul>
            <div class="fixed flex items-center justify-around w-full bottom-1">
                <input class="w-11/12 h-12 p-3 text-lg text-left bg-white rounded-full outline-none font font-poppins" type="text" placeholder="Message">
                <v-icon name="pr-send" scale="2.3" color="#0369A1"/>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { RouterLink, useRoute } from 'vue-router';


const route = useRoute();

</script>

<style scoped>

</style>