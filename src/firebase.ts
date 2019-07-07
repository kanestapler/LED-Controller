import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import { firebaseConfig } from './firebaseConfig'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const logout = () => {
  firebase.auth().signOut()
}

export default firebase
