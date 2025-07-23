import { createContext } from "react";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
    const value = {};
    return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>;
};

export default DoctorContextProvider;
// This file creates a context for the application, allowing components to access shared state or functions.
