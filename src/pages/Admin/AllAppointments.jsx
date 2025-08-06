import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
    const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
    const { calculateAge, slotDataFormat } = useContext(AppContext);

    useEffect(() => {
        getAllAppointments();
        console.log(appointments, "appointments");
    }, [aToken]);

    return (
        <div className="w-full max-w-6xl m-5">
            <p className="mb-3 text-lg font-medium">All Appointments</p>

            <div className="bg-white border border-[#d6d6d6] rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto">
                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b border-[#d6d6d6] font-medium bg-gray-50">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p>Actions</p>
                </div>

                {/* Table Rows */}
                {appointments.map((appointment, index) => (
                    <div
                        key={index}
                        className="sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b border-[#d6d6d6] text-gray-500 hover:bg-gray-100">
                        <p className="max-sm:hidden">{index + 1}</p>

                        <div className="flex items-center gap-2">
                            <img
                                src={appointment.userData.image}
                                alt="patient"
                                className="w-8 h-8 rounded-full bg-gray-200"
                            />
                            <p>{appointment.userData.name}</p>
                        </div>

                        <p className="max-sm:hidden">{calculateAge(appointment.userData.dob)}</p>

                        <p>
                            {slotDataFormat(appointment.slotDate)} - {appointment.slotTime}
                        </p>

                        <div className="flex items-center gap-2">
                            <img
                                src={appointment.docData.image}
                                alt="doctor"
                                className="w-8 h-8 rounded-full bg-blue-200"
                            />
                            <p>{appointment.docData.name}</p>
                        </div>

                        <p>{appointment.docData.fee}$</p>

                        <p>
                            {appointment.cancelled ? (
                                <span className="text-red-500 text-xs font-medium">Cancelled</span>
                            ) : (
                                <img
                                    onClick={() => cancelAppointment(appointment._id)}
                                    className="w-10 cursor-pointer"
                                    src={assets.cancel_icon}></img>
                            )}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllAppointments;
