import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { Children, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.init";
import { AuthContext } from "./Authcontext";
import { data } from "react-router-dom";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [profile, setProfile] = useState({ bio: "" });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const LogOut = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        console.log("User logged out");
      })
      .finally(() => setLoading(false));
  };

  const updateUserProfile = async (profile) => {
    if (!user) throw new Error("No user logged in");
    const token = await user.getIdToken();

    await updateProfile(user, {
      displayName: profile.displayName,
      photoURL: profile.photoURL,
    });

    await fetch(`http://localhost:3000/api/users/${user.uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bio: profile.bio }),
    });

    setUser({
      ...user,
    });

    setProfile(updateProfile);
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, async (currentUser) => {
      console.log("Auth state changed", currentUser?.email);
      if (currentUser) {
        setUser(currentUser);
        // fetchBio(user.uid);
        const token = await currentUser.getIdToken();
        const res = await fetch(
          `http://localhost:3000/api/users/${currentUser.uid}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setProfile({ bio: data.bio || "" });
        }
      } else {
        setUser(null);
        setProfile({bio:""});
      }
      setLoading(false);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  const authInfo = {
    createUser,
    signInUser,
    signInGoogle,
    user,
    loading,
    LogOut,
    updateUserProfile,
    profile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
