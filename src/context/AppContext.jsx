import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        return age;
    };
    const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDataFormat = (slotDate) => {
        const dateArray = slotDate.split("_");
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
    };

    const value = {
        calculateAge,
        slotDataFormat,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
// This file creates a context for the application, allowing components to access shared state or functions.
