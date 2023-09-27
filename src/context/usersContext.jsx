import { createContext, useContext, useState, useCallback } from "react";

const UsersContext = createContext({});

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("@taNaMesa:user");
    if (user) return JSON.parse(user) 
    return { id: "", name: ""}
  });

  return (
    <UsersContext.Provider value={{ user, setUser}}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  return context;
};
