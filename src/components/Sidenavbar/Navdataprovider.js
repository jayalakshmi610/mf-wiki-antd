import React, { createContext, useContext, useState } from "react";
import { newNavData } from "../navdata";

// Create the context
const NavDataContext = createContext();

// Create a provider component
export const NavDataProvider = ({ children }) => {
  const [navData, setNavData] = useState(newNavData);

  return (
    <NavDataContext.Provider value={{ navData, setNavData }}>
      {children}
    </NavDataContext.Provider>
  );
};

// Custom hook for consuming the context
export const useNavData = () => {
  const context = useContext(NavDataContext);
  if (!context) {
    throw new Error("useNavData must be used within a NavDataProvider");
  }
  return context;
};
