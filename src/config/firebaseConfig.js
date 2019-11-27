import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmNLsmFfsWhgkjc4b79y_rM3dtZnfP1gY",
  authDomain: "wireframer-bb78e.firebaseapp.com",
  databaseURL: "https://wireframer-bb78e.firebaseio.com",
  projectId: "wireframer-bb78e",
  storageBucket: "wireframer-bb78e.appspot.com",
  messagingSenderId: "98599477324",
  appId: "1:98599477324:web:9ee19bd93c5f5d19a9d4e9",
  measurementId: "G-BCS2Y4WLX6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;