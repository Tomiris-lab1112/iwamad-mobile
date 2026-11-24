import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyC-MbEqGOWXwWyXkcif77CgP2C-AOLAxg',
  authDomain: 'iwamad-chat-167e8.firebaseapp.com',
  databaseURL:
    'https://iwamad-chat-167e8-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'iwamad-chat-167e8',
  storageBucket: 'iwamad-chat-167e8.firebasestorage.app',
  messagingSenderId: '454243121511',
  appId: '1:454243121511:web:6fa7ccc2482199efd8d7c2',
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
