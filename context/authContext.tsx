import { auth, db } from "@/firebaseConfig";
import {
  User as FirebaseUser,
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
  username?: string;
  profileUrl?: string;
  role?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface SignUpData {
  email: string;
  password: string;
  username: string;
  profileUrl: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  data?: FirebaseUser;
}

interface AuthContextProps {
  user: User | null;
  login: (userData: LoginData) => Promise<AuthResponse>;
  SignUp: (userData: SignUpData) => Promise<AuthResponse>;
  logout: () => Promise<AuthResponse>;
  isAuthenticated: boolean | undefined;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setIsAuthenticated(true);
          await updateUserData(firebaseUser.uid, firebaseUser.email || "");
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const updateUserData = async (userId: string, email: string) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUser({
          id: userId,
          email: data.email || email,
          username: data.username,
          profileUrl: data.profileUrl,
          role: data.role,
        });
      } else {
        // If user document doesn't exist, create a basic user object with Firebase user email
        setUser({
          id: userId,
          email: email,
        });
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      // Fallback to basic user object
      setUser({
        id: userId,
        email: email,
      });
    }
  };

  const logout = async (): Promise<AuthResponse> => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return { success: false, message: errorMessage };
    }
  };

  const login = async (data: LoginData): Promise<AuthResponse> => {
    const { email, password } = data;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      return {
        success: true,
        data: response.user,
      };
    } catch (error) {
      let message = "An error occurred during login";
      if (error instanceof Error) {
        if (error.message.includes("(auth/invalid-email)")) {
          message = "Invalid Email";
        } else if (error.message.includes("(auth/invalid-credential)")) {
          message = "Wrong Credentials";
        } else if (error.message.includes("(auth/user-not-found)")) {
          message = "User not found";
        } else if (error.message.includes("(auth/wrong-password)")) {
          message = "Wrong password";
        } else {
          message = error.message;
        }
      }
      return {
        success: false,
        message,
      };
    }
  };

  const SignUp = async (data: SignUpData): Promise<AuthResponse> => {
    try {
      const { email, password, username, profileUrl } = data;
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", response.user.uid), {
        username,
        profileUrl,
        userId: response.user.uid,
        email,
        createdAt: new Date().toISOString(),
      });

      return {
        success: true,
        data: response.user,
      };
    } catch (error) {
      let message = "An error occurred during sign up";
      if (error instanceof Error) {
        if (error.message.includes("(auth/invalid-email)")) {
          message = "Invalid Email";
        } else if (error.message.includes("(auth/email-already-in-use)")) {
          message = "Email already exists";
        } else if (error.message.includes("(auth/weak-password)")) {
          message = "Password is too weak";
        } else {
          message = error.message;
        }
      }
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
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
