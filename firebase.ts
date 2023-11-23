import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getFunctions} from 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyCjrAc44AA91CIrOc6htPdvnUCWGXKZ7ts",
    authDomain: "circhoolar-3c5e5.firebaseapp.com",
    projectId: "circhoolar-3c5e5",
    storageBucket: "circhoolar-3c5e5.appspot.com",
    messagingSenderId: "232246185043",
    appId: "1:232246185043:web:8ff39b3e32685daa314aa6"
  };

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

export {db, auth, functions};