import React, { useContext, useState, useEffect, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import {
  getDocs,
  collection,
  doc,
  setDoc
} from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Fetch from Firestore
const fetchWishlist = async (uid) => {
  const wishlistRef = collection(doc(db, 'users', uid), 'wishlist');
  const snapshot = await getDocs(wishlistRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        const fetched = await fetchWishlist(firebaseUser.uid);
        setWishlist(fetched);
      } else {
        const local = localStorage.getItem('wishlist');
        setWishlist(local ? JSON.parse(local) : []);
      }
    });

    return unsubscribe;
  }, []);

  const saveToFirestore = async (uid, item) => {
    const itemRef = doc(collection(doc(db, 'users', uid), 'wishlist'));
    await setDoc(itemRef, item);
  };

  const handleAddToWishlist = async (item) => {
    const newWishlist = [...wishlist, item];
    setWishlist(newWishlist);

    if (user) {
      await saveToFirestore(user.uid, item);
    } else {
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    }
  };

  return (
    <AuthContext.Provider value={{ user, wishlist, handleAddToWishlist, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
