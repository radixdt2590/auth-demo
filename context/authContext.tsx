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
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    setTimeout(() => setIsAuthenticated(false), 3000);
  }, []);

  const logout = async () => {
    try {
    } catch (error) {}
  };

  const login = async () => {
    try {
    } catch (error) {}
  };

  const SignUp = async () => {
    try {
    } catch (error) {}
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
