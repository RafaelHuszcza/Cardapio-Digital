import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem("@CDigital:token");
    const user = localStorage.getItem("@CDigital:user");
    if (token && user) return { user: JSON.parse(user), token };
    return {
      user: { id: "", name: "", userType: "" },
      token: "",
    };
  });

  const signIn = async (user) => {
    setData({ user: { id: user.id, name: user.name, userType: user.userType }, token: user.token });

    localStorage.setItem("@CDigital:token", user.token);
    delete user.token;
    localStorage.setItem(
      "@CDigital:user",
      JSON.stringify(user)
    );
  };

  const signOut = () => {
    localStorage.clear();
    setData({
      user: { id: "", name: "", userType: "" },
      token: "",
    });
  };

  const isLogged = () => {
    return data.token !== ""
  };

  const generateToken = (token = data.token) => {
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
