import { createContext, useContext, useState } from "react";
import { updateUser } from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(userData) {
    setUser(userData);
  }

  async function logout() {
    await AsyncStorage.removeItem("user");
    setUser(null);
  }

  async function atualizarUsuario(payload) {
    try {
      const response = await updateUser(payload);

      setUser(response.user);

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, atualizarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}