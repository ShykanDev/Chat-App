  <template>
    <div class="w-full bg-slate-50">
        <div class="flex flex-col items-center w-full ">
            <h2 class="mt-3 mb-2 text-2xl font-medium text-slate-600 font-poppins">Chats</h2>
            <div class="flex items-center w-5/6 gap-2 p-1 mb-1 text-black bg-white rounded-full h-11 font-poppins "><v-icon name="md-search-sharp" scale="1.5" /><input v-model="searchName"  @input="filterUsers(searchName)" type="text" class="w-full text-lg bg-transparent border-none outline-none placeholder:text-slate-800"  placeholder="Search contact"></div>
            <div class="flex flex-col items-center w-full gap-2 mt-2">
                <RouterLink class="w-[98%]" :to="{name:'chat', params:{name:user.name}}" v-for="user in usersFiltered" :key="user.name"><ChatCard class="w-full" :name="user.name" :message="user.message"  /></RouterLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import ChatCard from './ChatCard.vue';
import { ref } from 'vue';

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

const usersFiltered = ref(users);

const filterUsers = (name:string) => {
    (!searchName.value) ? usersFiltered.value = users : usersFiltered.value = users.slice().filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
};



let searchName = ref('')

// TEMPORAL USERS DATA


</script>

<style scoped>

</style>