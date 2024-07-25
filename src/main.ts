import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './assets/index.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { IoAlertCircle,MdArrowbackRound  } from "oh-vue-icons/icons";
addIcons(IoAlertCircle,MdArrowbackRound );
const firebaseConfig = {
  apiKey: "AIzaSyDnpT0NiCoXGWuuC5DPSCO6G11i968Hyk8",
  authDomain: "very-first-project-00.firebaseapp.com",
  projectId: "very-first-project-00",
  storageBucket: "very-first-project-00.appspot.com",
  messagingSenderId: "408574731413",
  appId: "1:408574731413:web:955777af9d161935bee79c",
  measurementId: "G-Y8QZYE3J7J"
};
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);


const app = createApp(App);
app.use(router)
app.component('v-icon',OhVueIcon)
app.mount('#app')
