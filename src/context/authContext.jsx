import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("@taNaMesa:token");
  const user = JSON.parse(localStorage.getItem("@taNaMesa:user"));
  let dataDefault = {
    user: { id: "", name: "", userType: ""},
    token: "",
  }
  if (token && user) {
    dataDefault = {
      user: {
        id: user.id,
        name: user.name,
        userType: user.type,
      }, 
      token };
  }
  const [data, setData] = useState(dataDefault);

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
