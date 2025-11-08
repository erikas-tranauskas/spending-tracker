import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDifgyEfvIxwDm3cuzGebPX-hoSoEnyzJ0',
  authDomain: 'wealthwise-8a5db.firebaseapp.com',
  projectId: 'wealthwise-8a5db',
  storageBucket: 'wealthwise-8a5db.firebasestorage.app',
  messagingSenderId: '445318405409',
  appId: '1:445318405409:web:de1b17106b0ecc12397260',
  measurementId: 'G-KNMMPYTQQ9',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
