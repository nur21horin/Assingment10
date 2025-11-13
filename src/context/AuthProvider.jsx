import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Children, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.init";
import { AuthContext } from "./Authcontext";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
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

  const LogOut=()=>{
    setLoading(true);
    return signOut(auth).then(()=>{
        console.log("User logged out");
    })
    .finally(()=>setLoading(false))
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed",currentUser?.email);
      if(currentUser){
      setUser(currentUser);
      }else{
        setUser(null);
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
    LogOut
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
