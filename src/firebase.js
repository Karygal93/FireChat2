import firebase from 'firebase'
import { getStorage } from "firebase/storage";
import "firebase/firestore";
import 'firebase/storage';


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAmXQ8llefsr8vOb8oByLrkQCrLyvvubS0",
    authDomain: "firechat-e6d9d.firebaseapp.com",
    projectId: "firechat-e6d9d",
    storageBucket: "firechat-e6d9d.appspot.com",
    messagingSenderId: "61676921150",
    appId: "1:61676921150:web:998996d7ec18d6efd74c6f",
    measurementId: "G-1GB3BEBF8E"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;



export { projectStorage, projectFirestore, timestamp , db, auth };


