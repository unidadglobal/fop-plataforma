import firebase from 'firebase/app'

import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxZavAi4YdpMP6NvSgGi11CN9a6BBSiEk",
  authDomain: "fop-tv.firebaseapp.com",
  projectId: "fop-tv",
  storageBucket: "fop-tv.appspot.com",
  messagingSenderId: "13477192943",
  appId: "1:13477192943:web:a424507d5471e8c44fa71a",
  measurementId: "G-ETW5CMJF2N"
  };

firebase.initializeApp(firebaseConfig)
export default firebase.auth();
