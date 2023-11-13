import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem("@taNaMesa:token");
    const user = localStorage.getItem("@taNaMesa:user");
    if (token && user) return { user: JSON.parse(user), token };
    return {
      user: { id: "", name: "", userType: ""},
      token: "",
    };
  });

  const signIn = async (user) => {
    setData(
      {
        user: {
          id: user.id,
          name: user.name,
          userType: user.type,
        }, 
        token: user.token
      });
    localStorage.setItem("@taNaMesa:token", user.token);
    delete user.token;
    localStorage.setItem(
      "@taNaMesa:user",
      JSON.stringify({...user, userType: user.type})
    );
  };

  const signOut = () => {
    localStorage.clear();
    setData({
      user: { id: "", name: "", userType: ""},
      token: "",
    });
  };

  function isLogged () { 
    return data.token !== "" // TODO: check if token is valid
  }
  

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
