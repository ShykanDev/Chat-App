<template>
    <div class="">
        <form class="flex flex-col justify-center items-center font-poppins" action="/" method="post">
            <h1 class="mb-5 font-medium text-2xl">Login to your account</h1>
            <div class="w-9/12 flex flex-col justify-center mt-4">
                <label class="self-start font-medium text-lg" for="email">Email</label>
                <input class="border w-full text-lg text-center h-12 rounded-md focus:outline-none focus:border-sky-500" type="email" name="email" placeholder="Enter your name" required title="Enter the email address registered with your account">
            </div>
            <div class="w-9/12 flex flex-col justify-center mt-4">
                <label class="self-start font-medium text-lg" for="password">Password</label>
                <input class="border w-full text-lg text-center h-12 rounded-md focus:outline-none focus:border-sky-500" type="password" name="password" id="" placeholder="Enter your password"/>
            </div>
            <div class="w-9/12 flex flex-col justify-center mt-2">
                <h3 class="text-sm self-end text-[#3B82F6] font-medium cursor-pointer">Forgot your password?</h3>
            </div>
            <button class="w-9/12 mt-5 p-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Login</button>
        </form>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>