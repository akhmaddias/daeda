import firebase from 'firebase/app';
import 'firebase/functions'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const app = firebase.initializeApp({
  apiKey: "AIzaSyA_UID1hOyzJ3VmW-Yb4gfKJDlcJfTM3VI",
  authDomain: "canteen-581c0.firebaseapp.com",
  databaseURL: "https://canteen-581c0.firebaseio.com",
  projectId: "canteen-581c0",
  storageBucket: "canteen-581c0.appspot.com",
  messagingSenderId: "628207977073",
  appId: "1:628207977073:web:34191c5dc9917886e651d0",
  measurementId: "G-M2RQ95063N"
})

export const userAuth = firebase.auth()
export const db = app.database()
export const firebaseFuncs = firebase.functions()
export const menuRef = db.ref('menu')
export const deliveryTimeRef = db.ref('deliveryTime')
export const storage = firebase.storage()
