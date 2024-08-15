import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './assets/index.css'
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { IoAlertCircle,MdArrowbackRound,HiSolidLockClosed,MdEmail, MdCheckcircle,RiMailSendLine,MdSearchSharp,MdKeyboardarrowleftRound,RiUser3Line,PrSend,RiLoader4Fill,MdSettingsRound, FaUserPlus,OiInfo,LaUserFriendsSolid    } from "oh-vue-icons/icons";
addIcons(IoAlertCircle,MdArrowbackRound,HiSolidLockClosed,MdEmail, MdCheckcircle,RiMailSendLine,MdSearchSharp,MdKeyboardarrowleftRound,RiUser3Line,PrSend,RiLoader4Fill,MdSettingsRound, FaUserPlus,OiInfo,LaUserFriendsSolid   );
// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDnpT0NiCoXGWuuC5DPSCO6G11i968Hyk8",
  authDomain: "very-first-project-00.firebaseapp.com",
  projectId: "very-first-project-00",
  storageBucket: "very-first-project-00.appspot.com",
  messagingSenderId: "408574731413",
  appId: "1:408574731413:web:955777af9d161935bee79c",
  measurementId: "G-Y8QZYE3J7J",
  databaseURL: "https://very-first-project-00-default-rtdb.firebaseio.com/"
};
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);
const database = getDatabase(appFirebase);
export {database}
// pinia config
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


const app = createApp(App)
app.use(router)
app.use(pinia)
app.component('v-icon',OhVueIcon)
app.mount('#app')
