import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export const firebaseConfig: FirebaseOptions = {
    apiKey: 'AIzaSyCZ-3muEKhZKkQlB75WRcgd85SVDVmYJn8',
    authDomain: 'constant-crow-397513.firebaseapp.com',
    projectId: 'constant-crow-397513',
    storageBucket: 'constant-crow-397513.appspot.com',
    messagingSenderId: '533332705036',
    appId: '1:533332705036:web:13876a6c4e26da50f3d329',
    measurementId: 'G-LZQ699FKSY',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
