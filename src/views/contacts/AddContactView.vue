<template>
    <section class="w-full py-3 pattern-dots pattern-sky-200 pattern-bg-slate-100 pattern-size-6 pattern-opacity-80 min-h-dvh animate-fade-left animate-duration-500">
        <div class="fixed top-0 left-0 right-0 z-10 py-2 bg-slate-50">
            <RouterLink :to="{name:'home'}" class="z-10 flex items-center">
                <v-icon class="ml-1" name="md-keyboardarrowleft-round" color="#1b98ff" scale="2"  />
                <h3 class="text-lg text-[#1b98ff] font-poppins font-medium">Chats</h3>
            </RouterLink>
        </div>
        <div class="flex items-center justify-center mt-[20%]">
            <div class="flex flex-col items-center justify-center w-9/12 bg-white min-h-16 rounded-xl font-poppins">
                <label for="Add Contact">Add Contact</label>
                <div class="flex items-center gap-1">
                    <input class="box-border p-1 bg-transparent border rounded-md border-sky-600 focus:outline-none" type="text" placeholder="Daniel">
                    <button class="px-4 py-1 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Add</button>
                </div>
                <div class="flex items-center gap-1 py-3">
                    <v-icon name="oi-info" scale="1.4" color="#3B82F6" />
                    <div class="flex flex-col text-left">
                        <p class="px-2 text-sm text-sky-600">Once the contact is added you will</p>
                        <p class="px-2 text-sm text-sky-600"> be redirected to the chat screen</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>

</script>

<style scoped></style>