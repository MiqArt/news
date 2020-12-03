import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAqmvNSyOGFhqXFDNR6kK-U3v2GzFxbWAk",
  authDomain: "news-miqart.firebaseapp.com",
  projectId: "news-miqart",
  storageBucket: "news-miqart.appspot.com",
  messagingSenderId: "359634870157",
  appId: "1:359634870157:web:a13dd4047ccca6b26d27c4"
};

firebase.initializeApp(firebaseConfig);

export default firebase;