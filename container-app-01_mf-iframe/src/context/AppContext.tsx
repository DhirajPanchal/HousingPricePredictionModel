"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

export interface Module {
  moduleId: number;
  moduleName: string;
  route: string;
  location: string;
}

export interface UserContextType {
  userName: string;
  modules: Module[];
  setUserContext: (userName: string, modules: Module[]) => void;
  clearUserContext: () => void;
}

const AppContext = createContext<UserContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState("");
  const [modules, setModules] = useState<Module[]>([]);
  const router = useRouter();

  const setUserContext = (name: string, mods: Module[]) => {
    setUserName(name);
    setModules(mods);
  };

  const clearUserContext = () => {
    setUserName("");
    setModules([]);
    router.push("/");
  };

  return (
    <AppContext.Provider
      value={{ userName, modules, setUserContext, clearUserContext }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
