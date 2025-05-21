import React, { useContext, useState, useEffect, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import {
  getDocs,
  collection,
  doc,
  setDoc,
    deleteDoc, 
  writeBatch 
} from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


const fetchWishlist = async (uid) => {
  const wishlistRef = collection(doc(db, 'users', uid), 'wishlist');
  const snapshot = await getDocs(wishlistRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
    const handleDeleteFromWishlist = async (itemId) => {
      const updatedWishlist = wishlist.filter(item => item.id !== itemId);
      setWishlist(updatedWishlist);

      if (user) {
        const itemRef = doc(db, 'users', user.uid, 'wishlist', itemId);
        await deleteDoc(itemRef);
      } else {
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      }
    };

    const handleClearWishlist = async () => {
      setWishlist([]);

      if (user) {
        const wishlistRef = collection(doc(db, 'users', user.uid), 'wishlist');
        const snapshot = await getDocs(wishlistRef);
        const batch = writeBatch(db);
        snapshot.docs.forEach(doc => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      } else {
        localStorage.removeItem('wishlist');
      }
    };

  useEffect(() => {
const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    await firebaseUser.reload(); // Ensure latest status
    if (firebaseUser.emailVerified) {
      setUser(firebaseUser);
      const fetched = await fetchWishlist(firebaseUser.uid);
      setWishlist(fetched);
    } else {
      setUser(null); 
      setError('Please verify your email before continuing.');
    }
  } else {
    const local = localStorage.getItem('wishlist');
    setWishlist(local ? JSON.parse(local) : []);
    setUser(null);
  }

  setLoading(false);
});

    return unsubscribe;
  }, []);
  

  const saveToFirestore = async (uid, item) => {
    const itemRef = doc(collection(doc(db, 'users', uid), 'wishlist'));
    await setDoc(itemRef, item);
  };

  const handleAddToWishlist = async (item) => {
     if (wishlist.some(w => w.id === item.id)) return; 

    const newWishlist = [...wishlist, item];
    setWishlist(newWishlist);

    if (user) {
      await saveToFirestore(user.uid, item);
    } else {
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    }
  };

  return (
<AuthContext.Provider
  value={{
    user,
    wishlist,
    handleAddToWishlist,
    handleDeleteFromWishlist,
    handleClearWishlist,
    loading
  }}
>

      {!loading && children}
    </AuthContext.Provider>
  );
};
