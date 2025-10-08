"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (token: string, email: string, rememberMe: boolean) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const userEmail =
      localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");

    if (token && userEmail) {
      setIsAuthenticated(true);
      setUser({ email: userEmail });
    }
    setLoading(false);
  }, []);

  const login = (
    token: string,
    email: string,
    rememberMe: boolean,
    redirectUrl: string = "/dashboard"
  ) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("token", token);
    storage.setItem("userEmail", email);
    setIsAuthenticated(true);
    setUser({ email });

    router.push(redirectUrl);
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    sessionStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
