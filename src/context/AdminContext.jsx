import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

    const value = {
        aToken,
        setAToken,
        backendUrl,
    };
    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
// This file creates a context for the application, allowing components to access shared state or functions.
