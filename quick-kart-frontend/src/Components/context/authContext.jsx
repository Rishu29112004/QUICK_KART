import { createContext, useContext, useEffect, useState } from "react";
import { clearTokens, getAccessToken, setTokens } from "../../../utils/token";
import { authService } from "../services/auth.service";
import { loginSchema } from "../custom/header/components/validations/login.schema";
import { signupSchema } from "../custom/header/components/validations/signup.schema";
import { toast } from "sonner";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const userData = async () => {
    try {
      const token = getAccessToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      const res = await authService.me();
      setUser(res.data.data);
      setIsAuthenticated(true);
    } catch {
      clearTokens();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (loginSchema) => {
    try {
      const res = await authService.login(loginSchema);
      const { accessToken, refreshToken, ...userData } = res.data.data;

      setTokens(accessToken, refreshToken);
      setUser(userData);
      setIsAuthenticated(true);
      toast.success("Login successful");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  const registerUser = async (signupSchema) => {
    try {
      const res = await authService.register(signupSchema);
      if (res.data?.status === "success") {
        console.log(res.data.message);
      }
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
    }
  };

  const logout = async (callApi = true) => {
    try {
      if (callApi) await authService.logout();
    } catch {
    } finally {
      clearTokens();
      setUser(null);
      toast.success("Logout Successful");
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    userData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
