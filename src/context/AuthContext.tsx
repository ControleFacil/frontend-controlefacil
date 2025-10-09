"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { getAccountStatus } from "@/http/api/auth/accountService";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (token: string, email: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
  loading: boolean;
  hasAccount: boolean | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAccount, setHasAccount] = useState<boolean | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const userEmail =
      localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");

    if (token && userEmail) {
      setIsAuthenticated(true);
      setUser({ email: userEmail });

      const verifyAccount = async () => {
        try {
          const data = await getAccountStatus(token);
          setHasAccount(data.hasAccount);

         if (!data.hasAccount) {
            router.push("/auth/register/account");
          } else if (data.contaAtiva === false) {
            router.push("/auth/register/plan");
          } else {
            router.push("/dashboard");
          }

        } catch (err) {
          console.error("Erro ao verificar conta:", err);
          setHasAccount(false);
          router.push("/auth/login");
        } finally {
          setLoading(false);
        }
      };

      verifyAccount();
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setHasAccount(null);
      setLoading(false);
    }
  }, [router]);

  const login = async (token: string, email: string, rememberMe: boolean) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("token", token);
    storage.setItem("userEmail", email);

    setIsAuthenticated(true);
    setUser({ email });

    try {
      const data = await getAccountStatus(token);
      setHasAccount(data.hasAccount);

      if (!data.hasAccount) {
        router.push("/auth/register");
      } else if (!data.contaAtiva) {
        router.push("/auth/register/plan");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Erro ao verificar conta:", err);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    sessionStorage.removeItem("userEmail");

    setIsAuthenticated(false);
    setUser(null);
    setHasAccount(null);

    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading, hasAccount }}
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
