<template>
    <section
        class="w-full py-3 pattern-dots pattern-sky-200 pattern-bg-slate-100 pattern-size-6 pattern-opacity-80 min-h-dvh animate-fade-left animate-duration-500">
        <div class="fixed top-0 left-0 right-0 z-10 py-2 bg-slate-50">
            <RouterLink :to="{ name: 'home' }" class="z-10 flex items-center">
                <v-icon class="ml-1" name="md-keyboardarrowleft-round" color="#1b98ff" scale="2" />
                <h3 class="text-lg text-[#1b98ff] font-poppins font-medium">Chats</h3>
            </RouterLink>
        </div>
        <div class="flex items-center justify-center mt-[20%]">
            <div
                class="flex flex-col items-center justify-center w-10/12 py-4 bg-white min-h-16 rounded-xl font-poppins">
                <label for="Add Contact" class="pb-2 text-lg font-medium text-sky-800">Add Contact</label>
                <div class="flex items-center justify-center w-full gap-1">
                    <input v-model="recipientName"
                        class="box-border h-10 p-1 bg-transparent w-[40%] border rounded-md border-sky-600 focus:outline-none "
                        type="text" placeholder="Daniel">
                    <button @click="handleNewUser"
                        class="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Add</button>
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
import router from '@/router';
import { UseUserValues } from '@/store/UserValuesStore';
import { addDoc, collection, getDocs, getFirestore, query, Timestamp, where, doc, getDoc } from 'firebase/firestore';
import { ref } from 'vue';

const recipientName = ref(''); //vmodel for the contact name
const userId = UseUserValues().getUserUid;

//Firebase stuff
const db = getFirestore();
const usersCollection = collection(db, 'users');
const chatsCollection = collection(db, 'messages');
const userContactsCollection = collection(db, 'userContacts');


const getUsersIdSorted = (id1: string, id2: string) => [id1, id2].sort().join('-');


const handleNewUser = async () => {
    
    try {
        // verify chat already exist in the usersContactCollections (verify chatId) and verify if the contact name is in the usersCollections
        const q_getNameUsColection = query(usersCollection, where('name', '==', recipientName.value));
        const q_getNameUsContactColections = query(userContactsCollection, where('name','==', recipientName.value));
        // queries result of both userCollections
        const contactNameUsCollections = (await getDocs(q_getNameUsColection)).docs[0];         
        const contactNameUsContactCollections = (await getDocs(q_getNameUsContactColections)).docs[0];
        // Verifying if user is trying to add himself ( if so, show error and return )
        if (contactNameUsCollections.data().name == UseUserValues().getUserName) {
            alert('Error, you are trying to add yourself');
            return
        }
        (contactNameUsCollections) ? alert('User exists on users collection!') : alert('User does not exist on users!');
        (contactNameUsContactCollections) ? alert('User exists on userContacts collection!') : alert('Contact does not exist on userContacts!');
        if(contactNameUsCollections && !contactNameUsContactCollections) {
            console.log('User exist on users collection, but not on userContacts collection, so add contact is available');
            
        }
        
        
        
            
    } catch (error) {
        console.log(error);
    }

    // const recipientIdResponse = ref('')
    // const q_name = query(usersCollection, where('name', '==', recipientName.value));
    // const q_recipientId = query(usersCollection, where('name','==', recipientName.value));
    // try {
    //     const querySnapshot = await getDocs(q_name);
    //     if (!querySnapshot.empty && recipientName.value) { // If user exists will add contact 
    //         alert(`User with Id: ${recipientName.value} is valid!`)
    //         const recipientId = (await getDocs(q_recipientId));
    //         recipientId.forEach(doc => recipientIdResponse.value = doc.data().id)
    //         await addDoc(chatsCollection, { // adding first message
    //             chatId: getUsersIdSorted(userId, recipientIdResponse.value),
    //             recipientId: recipientIdResponse.value,
    //             recipientName:recipientName.value,
    //             senderId: userId,
    //             senderName: UseUserValues().getUserName,
    //             timestamp: Timestamp.now(),
    //         })
    //         // Verify if contact exists (to avoid duplicates)
    //         const q_contactChatId = query(userContactsCollection, where('contactChatId', '==', getUsersIdSorted(userId, recipientName.value)));
    //         const querySnapshotContactId = await getDocs(q_contactChatId);
    //         if (querySnapshotContactId.empty) {
    //             await addDoc(userContactsCollection,{
    //                 contactChatId:getUsersIdSorted(userId, recipientIdResponse.value),
    //                 contactName:recipientName.value,
    //                 userId:userId
    //             })
    //             // fetchContacts();
    //             router.push({name:'chat', params:{ recipientName:recipientName.value }})
    //             } else if(!querySnapshotContactId.empty) {
    //                 alert(`Contact with Id: ${recipientName.value} already exists!`)
    //                 return
    //             }
    //     } else {
    //         alert(`User with Id: ${recipientName.value} does not exist!`)
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
}
</script>

<style scoped></style>