import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyB5dSQ5Iiy1rDEzg6zJX8g8IS5lSKSaVJk",
    authDomain: "probando-react-16f0c.firebaseapp.com",
    projectId: "probando-react-16f0c",
    storageBucket: "probando-react-16f0c.appspot.com",
    messagingSenderId: "447111735299",
    appId: "1:447111735299:web:871bf4ed6b12e5c8180636",
    measurementId: "G-2KHKHRF5D1"
};
/** Initialize Firebase */
const fireb = firebase.initializeApp(config);
const store = fireb.firestore()

export { store }