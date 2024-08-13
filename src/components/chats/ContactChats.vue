  <template>
    <div class="w-full bg-slate-50">
        <div class="flex flex-col items-center w-full gap-1">
            <div class="relative flex items-center justify-center w-full">
                <h2 class="mt-3 mb-2 text-2xl font-medium text-slate-600 font-poppins">Chats</h2>
                <Transition>
                    <v-icon v-if="users.length < 1" class="absolute right-2" name="ri-loader-4-fill" scale="1.3" color="#3B82F6" animation="spin" speed="normal" />    
                </Transition>
            </div>
            <div class="flex items-center w-5/6 gap-2 p-1 mb-1 text-black bg-white rounded-full h-11 font-poppins ">
                <v-icon name="md-search-sharp" scale="1.5" />
                <input v-model="searchName"  type="text" class="w-full text-lg bg-transparent border-none outline-none placeholder:text-slate-800"  placeholder="Search contact">
            </div>
            <div class="flex items-center text-black bg-white rounded-full h-11 font-poppins">
                    <input v-model="recipientName" type="text" class="w-full text-lg bg-transparent border-none outline-none placeholder:text-slate-800" placeholder="Add new contact by ID">
                    <button @click="handleNewUser" class="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600">Add</button>
            </div>
            <Transition>
            <div v-if="users.length > 0" class="flex flex-col items-center w-full gap-2 mt-2">
                    <RouterLink class="w-[98%]"  :to="{name:'chat', params:{ recipientName:user.contactName }, query:{currentUserId:userId, recipientName:user.contactName}}" v-for="user in users" :key="user.contactChatId"><ChatCard class="w-full" :name="user.contactName" :message="user.message"/></RouterLink>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import ChatCard from './ChatCard.vue';
import { onMounted, Ref, ref } from 'vue';
import router from '@/router';
import { addDoc, collection, getDocs, getFirestore, query, Timestamp, where } from 'firebase/firestore';
import { UseUserValues } from '@/store/UserValuesStore';
import Imessage from '@/interfaces/contactsChats/Imessage';
const users:Ref<Array<Imessage>> = ref([
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
const usersCollection = collection(db, 'users');
const chatsCollection = collection(db, 'messages');
const userContactsCollection =  collection(db, 'userContacts');


const handleNewUser = async () => {
    const q_name = query(usersCollection, where('name', '==', recipientName.value));
    try {
        const querySnapshot = await getDocs(q_name);
        if (!querySnapshot.empty && recipientName.value) { // If user exists will add contact 
            alert(`User with Id: ${recipientName.value} is valid!`)
            await addDoc(chatsCollection, { // adding first message
                chatId: getUsersIdSorted(userId, recipientName.value),
                message: 'First Message!',
                senderId: userId,
                timestamp: Timestamp.now(),
            })
            // Verify if contact exists (to avoid duplicates)
            const q_contactChatId = query(userContactsCollection, where('contactChatId', '==', getUsersIdSorted(userId, recipientName.value)));
            const querySnapshotContactId = await getDocs(q_contactChatId);
            if (querySnapshotContactId.empty) {
                await addDoc(userContactsCollection,{
                    contactChatId:getUsersIdSorted(userId, recipientName.value),
                    contactName:recipientName.value,
                    userId:userId
                })
                } else{
                    alert(`Contact with Id: ${recipientName.value} already exists!`)
                    return
                }
            router.push({ name: `chat`, params: { name: recipientName.value } })
        } else {
            alert(`User with Id: ${recipientName.value} does not exist!`)
        }
    } catch (error) {
        console.log(error);
    }
}

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

// Obtener contactos cuando el componente se monta
onMounted(() => {
    fetchContacts();
});
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