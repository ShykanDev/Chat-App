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
        <section class="flex flex-col items-center">
            <ul class="flex flex-col w-full h-[85vh] font-poppins overflow-auto scroll-smooth pt-2 pb-2">
                 <li :class="{'self-start p-2 ml-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-sm rounded-br-2xl bg-white shadow-sm max-w-[85%] mb-2 mt-2 text-left': msg.senderName !== UseUserValues().getUserName, 'self-end max-w-[85%] p-2 mr-2 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm bg-sky-600 text-left mb-2': msg.senderName === UseUserValues().getUserName}" v-for="(msg, id) in messages" :key="id"> {{ msg.message }}</li>
            </ul>
            <div class="fixed flex items-center justify-around w-full bottom-1">
                <input @keypress.enter="sendMessage" v-model="message" class="w-11/12 h-12 p-3 text-lg text-left bg-white rounded-full shadow-lg outline-none font font-poppins" type="text" placeholder="Message">
                <v-icon @click="sendMessage" class="cursor-pointer" name="pr-send" scale="2.3" color="#0369A1"/>
            </div>
        </section>
    </div>
</template>

<!-- <script lang="ts" setup>
import IcurrentChat from '@/interfaces/chats/IcurrentChat';
import { UseUserValues } from '@/store/UserValuesStore';
import { addDoc, collection, getDocs, getFirestore, onSnapshot, query, Timestamp, where } from 'firebase/firestore';
import { onMounted, onUnmounted, Ref, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

const message = ref(''); 

//Firebase stuff
const db = getFirestore();
const messagesCollection = collection(db, 'messages');
const usersCollection = collection(db, 'users');
const chatId = (id1:string,id2:string) => [id1,id2].sort().join('-');

// simulating chat history 
const messages:Ref<Array<IcurrentChat>> = ref ([
] )

let recipientId = ref('');
const getRecipientId = async () => {
    const q_getRecipientId = query(usersCollection,where('name','==', route.params.recipientName)); 
    const recipientIdGetDocs = await getDocs(q_getRecipientId);
    recipientIdGetDocs.forEach(doc => recipientId.value = doc.data().id)
    console.log(recipientId.value);
}

const sendMessage = async() => {
    try {
        await addDoc(messagesCollection,{
            chatId: chatId(UseUserValues().getUserUid,recipientId.value),
            message: message.value,
            recipientName:route.query.recipientName,
            senderId:UseUserValues().getUserUid,
            senderName:UseUserValues().getUserName,
            timestamp: Timestamp.now()
        })
    } catch (e) {
        console.log(e);
        
    }
}


const autoUpdateMessages = async() => {
    getRecipientId();
    console.log("recipient id is: " + recipientId.value);
    
    const q = query(messagesCollection, where('chatId', '==', chatId(UseUserValues().getUserUid, recipientId.value)));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
            messages.value = []
            querySnapshot.forEach(doc => {
                if (doc.data().message) {
                    messages.value.push({
                        chatId: doc.data().chatId,
                        message: doc.data().message,
                        recipientName: doc.data().recipientName,
                        senderId: doc.data().senderId,
                        senderName: doc.data().senderName,
                        timestamp: doc.data().timestamp
                    })
                }
            });
    })
}

onMounted(async()=> {
    getRecipientId();
    autoUpdateMessages();
})
onUnmounted(()=>{
console.log("hola");

})
</script> -->

<script lang="ts" setup>
import IcurrentChat from '@/interfaces/chats/IcurrentChat';
import { UseUserValues } from '@/store/UserValuesStore';
import { addDoc, collection, getDocs, getFirestore, onSnapshot, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { onMounted, onUnmounted, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const message = ref('');

// Firebase setup
const db = getFirestore();
const messagesCollection = collection(db, 'messages');
const usersCollection = collection(db, 'users');
const chatId = (id1: string, id2: string) => [id1, id2].sort().join('-');

// Simulating chat history
const messages: Ref<Array<IcurrentChat>> = ref([]);

let recipientId = ref('');
const getRecipientId = async (): Promise<void> => {
    const q_getRecipientId = query(usersCollection, where('name', '==', route.params.recipientName));
    const recipientIdGetDocs = await getDocs(q_getRecipientId);
    recipientIdGetDocs.forEach(doc => recipientId.value = doc.data().id);
    console.log('Recipient ID fetched:', recipientId.value);
}

const sendMessage = async (): Promise<void> => {
    try {
        await addDoc(messagesCollection, {
            chatId: chatId(UseUserValues().getUserUid, recipientId.value),
            message: message.value,
            recipientName: route.query.recipientName,
            senderId: UseUserValues().getUserUid,
            senderName: UseUserValues().getUserName,
            timestamp: Timestamp.now()
        });
    } catch (e) {
        console.error('Error sending message:', e);
    }
}

let unsubscribe: () => void; // Define 'unsubscribe' globally
const autoUpdateMessages = (): void => {
    if (!recipientId.value) {
        console.error('Recipient ID is not set.');
        return;
    }

    const q = query(messagesCollection, where('chatId', '==', chatId(UseUserValues().getUserUid, recipientId.value)),orderBy('timestamp', 'asc'));
    unsubscribe = onSnapshot(q, (querySnapshot) => {
        messages.value = [];
        querySnapshot.forEach(doc => {
            if (doc.data().message) {
                messages.value.push({
                    chatId: doc.data().chatId,
                    message: doc.data().message,
                    recipientName: doc.data().recipientName,
                    senderId: doc.data().senderId,
                    senderName: doc.data().senderName,
                    timestamp: doc.data().timestamp
                });
            }
        });
    });
}

onMounted(async () => {
    await getRecipientId(); // Wait for recipientId to be set
    autoUpdateMessages();   // Now it's safe to start updating messages
});

onUnmounted(() => {
    if (unsubscribe) {
        unsubscribe();
    }
});
</script>

<style scoped>

</style>
