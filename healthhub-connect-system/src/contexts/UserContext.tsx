
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Name = string;
export type Surname = string;
export type Role = "admin" | "doctor" | "pharmacist" | "patient";

interface UserContextType {
    name: string;
    surname: string;
    setName: (name: String)=> void;
    setSurname: (surname: String) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Try to get the role from localStorage on initial load
  const [name, setNameState] = useState<Name>(() => {
    const savedName = localStorage.getItem("user_name");
    return (savedName as Name) || "John";
  });

  // Update role handler that also saves to localStorage
  const setName = (newName: Name) => {
    setNameState(newName);
    localStorage.setItem("user_name", newName);
  };

  const [surname, setSurnameState] = useState<Name>(() => {
    const savedSurname = localStorage.getItem("user_surname");
    return (savedSurname as Surname) || "Doe";
  });

  // Update role handler that also saves to localStorage
  const setSurname = (newSurname: Surname) => {
    setSurnameState(newSurname);
    localStorage.setItem("user_surname", newSurname);
  };

  return (
    <UserContext.Provider value={{ name, surname , setName, setSurname }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a RoleProvider");
  }
  return context;
}
