import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyACW-zH0STmcbYogp7lTnI82ce1Y1xR4CY",
    authDomain: "rentmeroom-c4a04.firebaseapp.com",
    projectId: "rentmeroom-c4a04",
    storageBucket: "rentmeroom-c4a04.appspot.com",
    messagingSenderId: "756342270436",
    appId: "1:756342270436:web:e5f0f9d75c403a973c7ff1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore()
export const authentication = getAuth(app)