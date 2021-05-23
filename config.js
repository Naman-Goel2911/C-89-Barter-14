import * as firebase from 'firebase'

require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyC31Fo3n85NOPWu1Clg-3Hg05mZ_n210_s",
    authDomain: "barter-5d465.firebaseapp.com",
    projectId: "barter-5d465",
    storageBucket: "barter-5d465.appspot.com",
    messagingSenderId: "497507329466",
    appId: "1:497507329466:web:7a8a2c5bfa7d9532876983"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();