import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAQGcpfqxspjkK8-QQiHH_Kjpj3CO3Kof8',
  authDomain: 'gqlapp01.firebaseapp.com',
  projectId: 'gqlapp01',
  storageBucket: 'gqlapp01.appspot.com',
  messagingSenderId: '9584062739',
  appId: '1:9584062739:web:95d22cf7f7a669ab5aeae6',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
