import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const value = {};
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
// This file creates a context for the application, allowing components to access shared state or functions.
