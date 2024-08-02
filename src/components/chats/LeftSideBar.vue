<template>
    <div class="w-full bg-[#ECE8FC] h-dvh">
        <div class="flex flex-col items-center w-full ">
            <h2 class="text-2xl font-medium text-slate-700 font-poppins">Chats</h2>
            <div class="flex items-center w-5/6 gap-2 p-1 mb-1 bg-slate-50 rounded-xl font-poppins"><v-icon name="md-search-sharp" scale="1.5" /><input type="text" class="bg-transparent border-none outline-none"  placeholder="Search"></div>
            <div class="flex flex-col items-center w-full gap-2 mt-2">
                <RouterLink class="w-11/12" :to="{name:'chat', params:{name:user.name.toLowerCase()}}" v-for="user in users" :key="user.name"><ChatCard class="w-full" :name="user.name" :message="user.message"  /></RouterLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import ChatCard from './ChatCard.vue';

// TEMPORAL USERS DATA
const users = [
    { name: "Alice", message: "Hello there! How are you doing today?" },
    { name: "Bob", message: "Just finished reading a great book, excited!" },
    { name: "Charlie", message: "I can't wait for the weekend to start!" },
    { name: "Diana", message: "Meeting up with friends this evening, yay!" },
    { name: "Eve", message: "Feeling productive, got a lot done today." },
    { name: "Frank", message: "Just started a new project, it's exciting!" },
    { name: "Grace", message: "Looking forward to the upcoming vacation trip." },
    { name: "Hank", message: "Had a great workout, feeling energized now!" },
    { name: "Ivy", message: "Enjoying a peaceful evening with a good book." },
    { name: "Jack", message: "Finished a challenging puzzle, time to relax." }
];

</script>

<style scoped>

</style>