import React, { useState, createContext, ReactNode, useContext } from "react";

interface UserContextProps {
  user: any; 
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const storedUser = localStorage.getItem("usuario");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [user, setUser] = useState(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
