import { createContext, useContext, useState } from "react";

import { login as apiLogin } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken"),
  );
  const [username, setUsername] = useState(() =>
    localStorage.getItem("username"),
  );

  async function login(user, password) {
    const { access, refresh } = await apiLogin(user, password);
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("username", user);
    setAccessToken(access);
    setUsername(user);
  }

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    setAccessToken(null);
    setUsername(null);
  }

  const value = {
    isAuthenticated: Boolean(accessToken),
    accessToken,
    username,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
