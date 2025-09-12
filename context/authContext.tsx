import { auth, db } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  role?: string;
}

interface AuthContextProps {
  user: User | null;
  login: (userData: any) => any;
  SignUp: (userData: any) => any;
  logout: () => void;
  isAuthenticated: boolean | undefined;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const updateUserData = async (userId: string) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({ ...user, ...data });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message, error };
    }
  };

  const login = async (data: any) => {
    const { email, password } = data;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return {
        success: true,
      };
    } catch (error: any) {
      let message = error?.message;
      if (message.includes("(auth/invalid-email)")) message = "Invalid Email";
      if (message.includes("(auth/invalid-credential)"))
        message = "Wrong Credentials";
      return {
        success: false,
        message,
      };
    }
  };

  const SignUp = async (data: any) => {
    console.log("🚀 ~ SignUp ~ data:", data);
    try {
      const { email, password, username, profileUrl } = data;
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("🚀 ~ SignUp ~ response:", response);
      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profileUrl,
        userId: response?.user?.uid,
        email,
      });
      return {
        success: true,
        data: response?.user,
      };
    } catch (error: any) {
      let message = error?.message;
      if (message.includes("(auth/invalid-email)")) message = "Invalid Email";
      if (message.includes("(auth/email-already-in-use)"))
        message = "Email already exist";
      return {
        success: false,
        message,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        SignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
