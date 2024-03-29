import firebase from 'firebase/app';
import 'firebase/functions'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import firebaseConfig from '@/config/firebase'

const app = firebase.initializeApp(firebaseConfig)

export const userAuth = firebase.auth()
export const db = app.database()
export const firebaseFuncs = firebase.functions()
export const menuRef = db.ref('menu')
export const deliveryTimeRef = db.ref('deliveryTime')
export const storage = firebase.storage()
