// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier} from 'firebase/auth';
import { getFirestore,doc, collection, setDoc } from 'firebase/firestore';


const firebaseConfig = {

    apiKey: "AIzaSyCTcszWV34e8Y7oRVZS1hFMkQ6YvBLECKo",
  
    authDomain: "book-finds.firebaseapp.com",
  
    projectId: "book-finds",
  
    storageBucket: "book-finds.firebasestorage.app",
  
    messagingSenderId: "729242971463",
  
    appId: "1:729242971463:web:f6c56f24224a7bc16ef062",
  
    measurementId: "G-T6057T6XW2"
  
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
export { auth, googleProvider, RecaptchaVerifier,db  };
export const addToWishlist = async (book) => {
  const user = auth.currentUser;
  if (!user) {
    alert("Please log in to use the wishlist.");
    return;
  }
  const userWishlistRef = doc(db, 'users', user.uid);
  const wishlistCollectionRef = collection(userWishlistRef, 'wishlist');
  const bookRef = doc(wishlistCollectionRef, book.id || book.title); // use a unique ID

  await setDoc(bookRef, {
    title: book.title,
    author: book.author || '',
    image: book.fullybooked_image || '',
    createdAt: new Date(),
  });

  alert(`"${book.title}" added to wishlist!`);
};