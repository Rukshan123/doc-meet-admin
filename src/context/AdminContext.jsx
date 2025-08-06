import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/admin/all-doctors`,

                {
                    headers: {
                        atoken: aToken,
                    },
                }
            );

            if (data.success) {
                setDoctors(data.data);
                toast.success("Doctors fetched successfully!");
            } else {
                toast.error(data.message || "Failed to fetch doctors.");
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
            toast.error("Failed to fetch doctors. Please try again later.");
        }
    };

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.patch(
                `${backendUrl}/api/admin/change-availability/${docId}`,
                {},
                { headers: { atoken: aToken } }
            );
            if (data.success) {
                toast.success(data.message || "Doctors fetched successfully!");
                getAllDoctors(); // Refresh the list of doctors after changing availability
            } else {
                toast.error(data.message || "Failed to fetch doctors.");
            }
        } catch (error) {
            console.error("Error changing availability:", error);
            toast.error("Failed to change availability. Please try again later.");
        }
    };

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
                headers: {
                    atoken: aToken,
                },
            });
            if (data.success) {
                setAppointments(data.data);
                toast.success("Appointments fetched successfully!");
            } else {
                toast.error(data.message || "Failed to fetch appointments.");
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
            toast.error("Failed to fetch appointments. Please try again later.");
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/cancel-appointment`,
                { appointmentId },
                {
                    headers: {
                        atoken: aToken,
                    },
                }
            );
            if (data.success) {
                toast.success(data.message || "Appointment cancelled successfully!");
                getAllAppointments(); // Refresh the list of appointments after cancellation
            } else {
                toast.error(data.message || "Failed to cancel appointment.");
            }
        } catch (error) {
            console.error("Error cancelling appointment:", error);
            toast.error("Failed to cancel appointment. Please try again later.");
        }
    };

    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        getAllAppointments,
        appointments,
        setAppointments,
        cancelAppointment,
    };
    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
// This file creates a context for the application, allowing components to access shared state or functions.
