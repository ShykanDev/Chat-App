<template>
    <section
        class="w-full py-3 pattern-dots pattern-sky-200 pattern-bg-slate-100 pattern-size-6 pattern-opacity-80 min-h-dvh animate-fade-left animate-duration-500">
        <div class="fixed top-0 left-0 right-0 z-10 py-2 shadow-sm bg-slate-50">
            <RouterLink :to="{ name: 'home' }" class="z-10 flex items-center">
                <v-icon class="ml-1" name="md-keyboardarrowleft-round" color="#1b98ff" scale="2" />
                <h3 class="text-lg text-[#1b98ff] font-poppins font-medium">Chats</h3>
            </RouterLink>
        </div>
        <div class="flex items-center justify-center mt-[20%] md:mt-[5%]">
            <div
                class="flex flex-col items-center justify-center w-10/12 py-4 bg-white shadow-xl min-h-16 rounded-xl font-poppins">
                <label for="Add Contact" class="pb-2 text-lg font-medium text-sky-800">Add Contact</label>
                <div class="flex items-center justify-center w-full gap-1">
                    <input v-model="recipientName"
                        class="box-border h-10 p-1 bg-transparent w-[40%] border rounded-md border-sky-600 focus:outline-none "
                        type="text" placeholder="Daniel">
                    <button @click="handleNewUser"
                        class="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Add</button>
                </div>
                <div class="mt-3 font-medium">
                    <ErrorAlert :message-error="msgError" :severity-error="severityError"
                        :error-user-data="incorrectUserData" />
                </div>
                <div class="flex items-start gap-1 py-3"> 
                    <div class="flex flex-col text-left">
                        <div class="flex flex-wrap justify-center text-center">
                            <v-icon class="mr-1" name="oi-info" scale="1.2" color="#3B82F6" />
                            <span>Once</span>
                            <span>the</span>
                            <span>contact</span>
                            <span>is</span>
                            <span>added</span>
                            <span>you</span>
                            <span>will</span>
                            <span>be</span>
                            <span>redirected</span>
                            <span>to</span>
                            <span>its</span>
                            <span>chat</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import ErrorAlert from '@/components/login/ErrorAlert.vue';
import router from '@/router';
import { UseUserValues } from '@/store/UserValuesStore';
import { addDoc, collection, getDocs, getFirestore, query, Timestamp, where, doc, getDoc } from 'firebase/firestore';
import { onMounted, ref } from 'vue';

// Error values to display in the error alert
const msgError = ref('');
const severityError = ref('');
const incorrectUserData = ref(false);

// values to be updated when component is mounted
const recipientId = ref('');
const chatId = ref('');

// function to update the recipientId and chatId when component is mounted
const getRecipientAndChatId = async () => {
    const q_getContactId = query(usersCollection, where('name', '==', recipientName.value));
    const contactId = (await getDocs(q_getContactId)).docs[0];
    const q_getChatId = query(userContactsCollection, where('contactChatId', '==', getChatId(UseUserValues().getUserUid, recipientName.value)));
    const chatIdDb = (await getDocs(q_getChatId)).docs[0];
    if (contactId) recipientId.value = contactId.data().id;
    if (chatIdDb) chatId.value = chatIdDb.data().chatId;
}

const recipientName = ref(''); //vmodel for the contact name
const userId = UseUserValues().getUserUid;

//Firebase stuff
const db = getFirestore();
const usersCollection = collection(db, 'users');
const chatsCollection = collection(db, 'messages');
const userContactsCollection = collection(db, 'userContacts');


const getChatId = (id1: string, id2: string) => [id1, id2].sort().join('-');


const handleNewUser = async () => {
    if (!recipientName.value) return; 
    // set the error values to default
    incorrectUserData.value = false;
    msgError.value = '';
    severityError.value = 'low';
    try {
        await getRecipientAndChatId(); // Calling the function to get the contact Id and the Chat Id
        const q_getNameUsColection = query(usersCollection, where('name', '==', recipientName.value));
        const q_getNameUsContactColections = query(userContactsCollection, where('contactChatId', '==', getChatId(userId, recipientId.value)));
        // queries result of both userCollections
        const contactNameUsCollections = (await getDocs(q_getNameUsColection)).docs[0];
        const contactNameUsContactCollections = (await getDocs(q_getNameUsContactColections)).docs[0];
        // -Verifying if user is trying to add himself ( if so, show error and return )
        if (contactNameUsCollections) {  // If contact exist on users database 
            if (contactNameUsCollections.data().name == UseUserValues().getUserName){ // If user is trying to add himself, display an error
                incorrectUserData.value = true;
                msgError.value = 'You cannot add yourself as a contact!';
                severityError.value = 'medium';
                return
            }
        } else { //If user (contact) does not exist on database display the error 
            console.log('user does not exist on database');
            incorrectUserData.value = true;
            msgError.value = 'User does not exist on database!';
            severityError.value = 'high';
            return
        }
        // -Verify if useris trying to add a contact that already exist on the contact list
        if (contactNameUsContactCollections) {
            console.log('User already exist on contact list' + contactNameUsContactCollections.data().contactChatId);
            incorrectUserData.value = true;
            msgError.value = 'User already exist on contact list!';
            severityError.value = 'medium';
            return
        } 
        // -Adding the contact to the contact list
        await addDoc(userContactsCollection, {
            contactChatId: getChatId(userId, recipientId.value),
            contactName: recipientName.value,
            userName: UseUserValues().getUserName,
            userId: userId,
            contactId: recipientId.value,
            timestamp: Timestamp.now(),
        })
        
        
    } catch (error) {
        console.log(error);
    }

}

</script>

<style scoped>
div> {
  /* max-width: 40ch; */
  text-align: center;
  transform: scale(0.94);
  animation: scale 3s forwards cubic-bezier(0.5, 1, 0.89, 1);
}
@keyframes scale {
  100% {
    transform: scale(1);
  }
}

span {
  display: inline-block;
  opacity: 0;
  filter: blur(4px);
  padding-right: 3px;
  color: rgb(27, 96, 175);
}

span:nth-child(1) {
  animation: fade-in 0.8s 0.1s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(2) {
  animation: fade-in 0.8s 0.2s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(3) {
  animation: fade-in 0.8s 0.3s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(4) {
  animation: fade-in 0.8s 0.4s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(5) {
  animation: fade-in 0.8s 0.5s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(6) {
  animation: fade-in 0.8s 0.6s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(7) {
  animation: fade-in 0.8s 0.7s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(8) {
  animation: fade-in 0.8s 0.8s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(9) {
  animation: fade-in 0.8s 0.9s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(10) {
  animation: fade-in 0.8s 1s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(11) {
  animation: fade-in 0.8s 1.1s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(12) {
  animation: fade-in 0.8s 1.2s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(13) {
  animation: fade-in 0.8s 1.3s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(14) {
  animation: fade-in 0.8s 1.4s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(15) {
  animation: fade-in 0.8s 1.5s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(16) {
  animation: fade-in 0.8s 1.6s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(17) {
  animation: fade-in 0.8s 1.7s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(18) {
  animation: fade-in 0.8s 1.8s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

@keyframes fade-in {
  100% {
    opacity: 1;
    filter: blur(0);
  }
}

</style>