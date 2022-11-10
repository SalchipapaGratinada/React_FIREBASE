import firebase from "firebase";
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCMdbba8KijSwAb82LEbxdSj1qzY7P-SoY",
    authDomain: "crud-56946.firebaseapp.com",
    projectId: "crud-56946",
    storageBucket: "crud-56946.appspot.com",
    messagingSenderId: "402496006645",
    appId: "1:402496006645:web:0d56644f668ca6f61b18bc"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export {firebase};