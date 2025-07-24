import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const SideBar = () => {
    const { aToken } = useContext(AdminContext);

    return (
        <div className="min-h-screen bg-white border-r border-[#d6d6d6] ">
            {aToken && (
                <ul className="text-[#515151] mt-5">
                    <NavLink
                        className={({ isActive }) =>
                            `${
                                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6fff]" : ""
                            } flex items-center gap-3 py-3.5 px-3 md:px:9 md:min-w-72 cursor-pointer`
                        }
                        to={"/admin-dashboard"}>
                        <img src={assets.home_icon} alt="" />
                        <p>Dashboard</p>
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            `${
                                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6fff]" : ""
                            } flex items-center gap-3 py-3.5 px-3 md:px:9 md:min-w-72 cursor-pointer`
                        }
                        to={"/all-appointments"}>
                        <img src={assets.appointment_icon} alt="" />
                        <p>Appointments</p>
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            `${
                                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6fff]" : ""
                            } flex items-center gap-3 py-3.5 px-3 md:px:9 md:min-w-72 cursor-pointer`
                        }
                        to={"/add-dcotor"}>
                        <img src={assets.add_icon} alt="" />
                        <p>Add Doctor</p>
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            `${
                                isActive ? "bg-[#F2F3FF] border-r-4 border-[#5f6fff]" : ""
                            } flex items-center gap-3 py-3.5 px-3 md:px:9 md:min-w-72 cursor-pointer`
                        }
                        to={"/doctor-list"}>
                        <img src={assets.people_icon} alt="" />
                        <p>Doctors List</p>
                    </NavLink>
                </ul>
            )}
        </div>
    );
};

export default SideBar;
