<template>
    <div class="overflow-x-hidden animate-fade-left animate-duration-500 h-dvh pattern-dots pattern-sky-200 pattern-bg-slate-100 pattern-size-6 pattern-opacity-80"> 
        <div class="relative flex items-center rounded-b-lg shadow-sm bg-slate-50 text-slate-700 min-h-14">
            <RouterLink :to="{name:'home'}" class="z-10 flex items-center ">
                <v-icon class="ml-1" name="md-keyboardarrowleft-round" color="#1b98ff" scale="2"  />
                <h3 class="text-lg text-[#1b98ff] font-poppins font-medium">Chats</h3>
            </RouterLink>
            <div class="absolute top-0 bottom-0 left-0 right-0 z-0 flex items-center justify-center w-full">
            <h2 class="text-xl font-medium font-poppins" >{{ route.params.recipientName }} </h2>
            </div>
        </div>
        <div class="text-lg text-white bg-blue-500 font-poppins">
            <h2 class="text-red-200">Temporal props value</h2>
            <h2>current user Id: {{ route.query.currentUserId }} </h2>
            <h2>Recipient Name: {{route.query.recipientName}}</h2>
        </div>
        <section class="flex flex-col items-center">
            <ul class="flex flex-col w-full font-poppins">
                <li class="self-start p-2 ml-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-sm rounded-br-2xl bg-white shadow-sm max-w-[85%] mb-2 mt-2 text-left">Hello Alex! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi itaque exercitationem soluta vero. Perspiciatis aliquid voluptates porro amet dolore accusamus a suscipit! Excepturi voluptatem mollitia dignissimos eveniet, cumque veritatis porro!</li>
                <li class="self-end max-w-[85%] p-2 mr-2 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm bg-sky-600 text-left">Hello! 
                </li>
            </ul>
            <div class="fixed flex items-center justify-around w-full bottom-1">
                <input v-model="message" class="w-11/12 h-12 p-3 text-lg text-left bg-white rounded-full shadow-lg outline-none font font-poppins" type="text" placeholder="Message">
                <v-icon name="pr-send" scale="2.3" color="#0369A1"/>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { UseUserValues } from '@/store/UserValuesStore';
import { ref as refFirebase } from 'firebase/database';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

const message = ref(''); 

//Firebase stuff
const db = getFirestore();
const messagesCollection = collection(db, 'messages');

// values to send messages
const chatId = [UseUserValues().getUserUid, route.params.recipientName].sort().join('-');

const sendMessage = async() => {
    try {
        await addDoc(messagesCollection,{
            chatId: chatId,
            message: message.value,
            recipientName:route.query.recipientName,
            // userName
        })
    } catch (e) {
        console.log(e);
        
    }
}



onMounted(()=> console.log(route.query))
</script>

<style scoped>

</style>
