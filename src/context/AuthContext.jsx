import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState((localStorage.getItem("user")) )

const login = (token, userData) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(userData));
  console.log("userData", userData);
  setToken(token);
  setUser(userData);
};

const logout = () => {
  localStorage.clear();
  setToken(null);
  setUser(null);
};

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loginOpen, setLoginOpen }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
