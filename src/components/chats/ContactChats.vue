<template>
    <div class="w-full pb-5 bg-white min-h-dvh">
        <div class="flex flex-col items-center w-full gap-1">
            <div class="relative flex items-center justify-center w-full px-2">
                <div class="flex justify-between w-full ml-4">
                    <h2 class="self-start mt-3 mb-2 text-2xl font-medium select-none text-sky-900 font-poppins">Chats
                    </h2>
                    <Transition>
                        <h2 v-if="UseUserValues().getUserName"
                            class="self-start mt-3 mb-2 font-medium select-none text-bas text-slate-800 font-poppins animate-fade-down">
                            Hola, {{ UseUserValues().getUserName }}!</h2>
                    </Transition>
                </div>
            </div>
            <div class="flex items-center w-full justify-evenly animate-fade-right">
                <RouterLink :to="{ name: 'addContact' }">
                    <v-icon name="fa-user-plus" scale="1.8" color="#219AFF" />
                </RouterLink>
                <div
                    class="w-[60%] flex items-center gap-2 p-1 mb-1 text-black rounded-2xl border border-slate-400 shadow-md h-11 font-poppins">

                    <v-icon name="md-search-sharp" scale="1.5" />
                    <input v-model="searchName" type="text"
                        class="w-full text-lg bg-transparent border-none outline-none placeholder:text-slate-800"
                        placeholder="Buscar Contacto">
                </div>
                <div class="relative flex">
                    <v-icon name="la-user-friends-solid" scale="1.8" color="#219AFF" />
                    <div
                        class="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-white rounded-lg bg-sky-800">
                        1</div>
                </div>
            </div>
            <Transition>
                <div v-if="users.length > 0"
                    class="flex flex-col items-center w-full gap-2 my-2 animate-fade-up animate-once animate-ease-in-out animate-normal animate-fill-both">
                    <RouterLink class="w-full" :to="{ name: 'chat', params: { recipientName: user.contactName } }"
                        v-for="user in users" :key="user.contactChatId">
                        <ChatCard class="w-full" :name="user.contactName" :message="user.message" />
                    </RouterLink>
                </div>
            </Transition>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import ChatCard from './ChatCard.vue';
import { onMounted, onUnmounted, Ref, ref } from 'vue';
import { collection, getDocs, getFirestore, query, where, onSnapshot } from 'firebase/firestore';
import { UseUserValues } from '@/store/UserValuesStore';
import Imessage from '@/interfaces/contactsChats/Imessage';
import BottomBar from './BottomBar.vue';
const users: Ref<Array<Imessage>> = ref([
]);

// const usersFiltered = ref(users);

// const filterUsers = (name:string) => {
//     (!searchName.value) ? usersFiltered.value = users : usersFiltered.value = users.slice().filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
// };



let searchName = ref('')

//Values for add new contact 
const userId = UseUserValues().getUserUid;
const recipientName = ref('');
const getUsersIdSorted = (id1: string, id2: string) => [id1, id2].sort().join('-');

//Firebase stuff
const db = getFirestore();
const friendRequestCollection = collection(db, 'friendRequest');
const userContactsCollection = collection(db, 'userContacts');


const fetchContacts = async () => {
    try {
        console.log("getting contacts");
        const q = query(userContactsCollection, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                users.value.push({
                    contactChatId: userData.contactChatId,
                    contactName: userData.contactName,
                    userId: userData.userId,
                    message: userData.message,
                });
            });
        } else {
            console.log("There was a problem");
        }
    } catch (error) {
        console.log('Error fetching contacts:', error);
    }
};

const q_friendRequest = query(friendRequestCollection, where('toId', '==', UseUserValues().getUserUid));
let unsucribeFriendRequest: () => void;
unsucribeFriendRequest = onSnapshot(q_friendRequest, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
    })
});

onMounted(() => {
    fetchContacts();
});
onUnmounted(() => {
    unsucribeFriendRequest();
})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.9s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>