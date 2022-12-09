//firebase config key setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


//My Web app's firebase configuration


//Initialize firebase

const firebaseConfig = {
  apiKey: "AIzaSyDVczfgcktfFLSIkKeoCl7EieI4U8gQZT4",
  authDomain: "crypto-46376.firebaseapp.com",
  projectId: "crypto-46376",
  storageBucket: "crypto-46376.appspot.com",
  messagingSenderId: "672002030944",
  appId: "1:672002030944:web:f43bcbe634752a111e7205",
  measurementId: "G-V0Z9TPYJPE"
}


if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
