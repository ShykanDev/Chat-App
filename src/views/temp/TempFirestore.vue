 <template>
    <div>
      <h1 class="text-white bg-rose-900">This is a temp firestore page</h1>
      <h2>Your current receipt ID is: {{ userId }}</h2>
      <div>
        <input
          class="text-slate-800 bg-slate-200 placeholder:text-slate-900 w-80"
          v-model="recipientId"
          type="text"
          placeholder="Enter the ID of the user to send a message"
        />
      </div>
      <ul class="bg-blue-200">
        <li
          v-for="message in messages.sort((a, b) => a.timestamp - b.timestamp)"
          :key="message.id"
          class="border border-b-2"
        >
          {{ message.message }}
        </li>
      </ul>
      <div class="flex justify-center">
        <input
          @keypress.enter="sendMessage"
          v-model="message"
          class="fixed bottom-0 w-4/12 h-12 p-3 text-lg text-left text-white rounded-full outline-none bg-slate-500"
          type="text"
        />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { UseUserValues } from '@/store/UserValuesStore';
  import { addDoc, collection, getFirestore, query, Timestamp, where, onSnapshot } from 'firebase/firestore';
  import { ref, onMounted, watch, onUnmounted } from 'vue';
  
  const userId = UseUserValues().getUserUid;
  const recipientId = ref('');
  const message = ref('');
  const messages = ref<any[]>([]);
  
  // firestore db
  const db = getFirestore();
  const chatsCollection = collection(db, 'messages');
  
  // Ordenar IDs
  const getSortedChatId = (id1: string, id2: string) => {
    return [id1, id2].sort().join('-');
  };
  
  // Función para enviar mensajes
  const sendMessage = async () => {
    const chatId = getSortedChatId(userId, recipientId.value);
    try {
      await addDoc(chatsCollection, {
        chatId: chatId,
        message: message.value,
        senderId: userId,
        timestamp: Timestamp.now(),
      });
      message.value = ''; // Limpiar el campo después de enviar
    } catch (e) {
      console.error(e);
    }
  };
  
  // Función para obtener mensajes en tiempo real
  const fetchMessages = () => {
    const chatId = getSortedChatId(userId, recipientId.value);
    const q = query(chatsCollection, where('chatId', '==', chatId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      messages.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
  
    // Limpiar la suscripción cuando el componente se desmonte
    onUnmounted(() => {
      unsubscribe();
    });
  };
  
  // Obtener mensajes al montar el componente y cuando cambie `recipientId`
  onMounted(() => {
    fetchMessages();
  });
  watch(recipientId, () => {
    fetchMessages();
  });


  /**
   * Step 1 Store the recipient ID in a variable
   * Step 2 Create an UlL element to display the messages with a vfor loop 
   * Step 3 Import the  7 following dependencies from firestore: import { addDoc, collection, getFirestore, query, Timestamp, where, onSnapshot } from 'firebase/firestore';
   * Step 4 Import the following dependencies import { ref, onMounted, watch, onUnmounted } from 'vue';
   * Step 5 We need to store the recipient ID and the current user ID in a variable sorted and join them with a dash `-` 
   * Step 6 We create the store db ( const db = getFirestore() ) and the chats collection ( const chatsCollection = collection(db, 'messages') ) 
   * Step 7 We create the function to send the message to firebase with a funciton like this: 
   *  const sendMessage = async () => {
        const chatId = getSortedChatId(userId, recipientId.value);
        try {
        await addDoc(chatsCollection, {
        chatId: chatId,
        message: message.value,
        senderId: userId,
        timestamp: Timestamp.now(),
      });
      message.value = ''; // Limpiar el campo después de enviar
    } catch (e) {
      console.error(e);
    }
  };
   * Step 8 We create the function to get the messages from firebase with a funciton like this:
    const fetchMessages = () => {
    const chatId = getSortedChatId(userId, recipientId.value);
    const q = query(chatsCollection, where('chatId', '==', chatId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      messages.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
   * Step 9 We create the onMounted function to call the fetchMessages function
   * Step 10 We create the onUnmounted function to call the unsubscribe function
   * 
   */

//    Explanation of the code usage of sendMessage and fetchMessages
/**
 * const sendMessage = async () => {
        const chatId = getSortedChatId(userId, recipientId.value); //1 We order the recipient ID and join them with a dash `-`
        try {
        await addDoc(chatsCollection, { //2 We add the message to firebase by using the addDoc function (addDoc what it does is add a new document to the collection, a document is a collection of related data, like an object)
        chatId: chatId,
        message: message.value,
        senderId: userId,
        timestamp: Timestamp.now(),
      });
      message.value = ''; // 3 We clean the message field when we send it
    } catch (e) {
      console.error(e);// 4 We catch the error and display it in the console if it happens 
    }
  };

  const fetchMessages = () => {
    const chatId = getSortedChatId(userId, recipientId.value); //1 We order the recipient ID and join them with a dash `-`
    const q = query(chatsCollection, where('chatId', '==', chatId)); //2 We create the query to get the messages
    const unsubscribe = onSnapshot(q, (querySnapshot) => { //3 We store the unsubscribe function in a variable to clean it when the component is unmounted
      messages.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); //4 We map the messages to the id and the data
    });

    // 6 We call the fetchMessages function when the component is mounted
    onMounted(() => {
      fetchMessages();
    });

    // 7 We clean the subscription when the component is unmounted
    onUnmounted(() => {
      unsubscribe();
    });
  };

  watch(recipientId, () => { // 5 We watch the recipient ID and call the fetchMessages function when it changes
    fetchMessages();
  });
 */
  </script>
  
  <style scoped>
  /* Puedes agregar estilos específicos aquí */
  </style>
