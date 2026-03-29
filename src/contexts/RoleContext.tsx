import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "architect" | "contractor" | "client" | "consultant";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userName: string;
}

const RoleContext = createContext<RoleContextType>({
  role: "architect",
  setRole: () => {},
  userName: "Sarah Chen",
});

const roleNames: Record<UserRole, string> = {
  architect: "Sarah Chen",
  contractor: "Mike Johnson",
  client: "Emily Davis",
  consultant: "Dr. Alan Foster",
};

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem("byld-role") as UserRole) || "architect";
  });

  const handleSetRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem("byld-role", newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole: handleSetRole, userName: roleNames[role] }}>
      {children}
    </RoleContext.Provider>
  );
}

export const useRole = () => useContext(RoleContext);
