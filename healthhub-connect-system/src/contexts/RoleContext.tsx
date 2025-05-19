
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Role = "admin" | "doctor" | "pharmacist" | "patient";

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  // Try to get the role from localStorage on initial load
  const [role, setRoleState] = useState<Role>(() => {
    const savedRole = localStorage.getItem("user_role");
    return (savedRole as Role) || "admin";
  });

  // Update role handler that also saves to localStorage
  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem("user_role", newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
