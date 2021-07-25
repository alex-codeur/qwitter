import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDHbm73K_E2mcBE-9Yjmj0mYZkoj5jNv-Q",
  authDomain: "qwitter-b8c57.firebaseapp.com",
  projectId: "qwitter-b8c57",
  storageBucket: "qwitter-b8c57.appspot.com",
  messagingSenderId: "282610673204",
  appId: "1:282610673204:web:ac0f47f3b30645cec8cc61"
};

firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()

export default db