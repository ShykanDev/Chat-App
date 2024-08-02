<template>
    <div class="w-full bg-[#ECE8FC] h-dvh">
        <div class="flex flex-col items-center w-full ">
            <h2 class="text-slate-800 font-poppins">Chats</h2>
            <div class="flex bg-slate-50 p-1 rounded-xl gap-2 font-poppins items-center w-5/6 mb-1"><v-icon name="md-search-sharp" scale="1.5" /><input type="text" class="outline-none border-none bg-transparent"  placeholder="Search"></div>
            <div class="w-full flex flex-col gap-2 items-center">
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ChatCard from './ChatCard.vue';


</script>

<style scoped>

</style>