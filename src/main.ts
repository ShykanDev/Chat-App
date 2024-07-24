import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnpT0NiCoXGWuuC5DPSCO6G11i968Hyk8",
  authDomain: "very-first-project-00.firebaseapp.com",
  projectId: "very-first-project-00",
  storageBucket: "very-first-project-00.appspot.com",
  messagingSenderId: "408574731413",
  appId: "1:408574731413:web:955777af9d161935bee79c",
  measurementId: "G-Y8QZYE3J7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


createApp(App).use(router).mount('#app')
