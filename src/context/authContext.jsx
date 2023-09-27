import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem("@taNaMesa:token");
    const user = localStorage.getItem("@taNaMesa:user");
    if (token && user) return { user: JSON.parse(user), token };
    return {
      user: { id: "", name: ""},
      token: "",
    };
  });

  const signIn = async (user, token) => {
    setData({user, token});
    localStorage.setItem(
      "@taNaMesa:user",
      JSON.stringify(user)
    );
    localStorage.setItem("@taNaMesa:token", token);
  };

  const signOut = () => {
    localStorage.clear();
    setData({
      user: { id: "", name: "", userType: ""},
      token: "",
    });
  };

  const isLogged = () => {
    if (data.token === "") {
      return false;
    }
    return true
  };

  const generateToken = (token=data.token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return config;
  };

  return (
    <AuthContext.Provider
      value={{ data, signIn, signOut, isLogged, generateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
