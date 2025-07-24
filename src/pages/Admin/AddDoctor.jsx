import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [experience, setExperience] = useState("1 Year");
    const [fees, setFees] = useState("");
    const [speciality, setSpeciality] = useState("General physician");
    const [educations, setEducations] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [about, setAbout] = useState("");

    const { backendUrl, aToken } = useContext(AdminContext);

    const handleSubmit = async (e) => {
        console.log("Submitting form with data:");
        e.preventDefault();

        try {
            if (!docImg) {
                return toast.error("Please upload a doctor image.");
            }

            const formData = new FormData();
            formData.append("image", docImg);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("experience", experience);
            formData.append("fee", Number(fees));
            formData.append("specialization", speciality);
            formData.append("degree", educations);
            formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));
            formData.append("about", about);

            const data = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
                headers: {
                    aToken,
                },
            });

            if (data.data.success) {
                // reset input fileds
                setDocImg(false);
                setName("");
                setEmail("");
                setPassword("");
                setExperience("1 Year");
                setFees("");
                setSpeciality("General physician");
                setEducations("");
                setAddress1("");
                setAddress2("");
                setAbout("");
                toast.success(data.data.message);
            } else {
                toast.error(data.data.message);
            }
        } catch (error) {
            console.error("Error adding doctor:", error);
            toast.error("Failed to add doctor. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="m-5 w-full">
            <p className="mb-3 text-lg font-medium">Add Dcotor</p>

            <div className="bg-white px-8 py-8 border-[#d6d6d6] rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
                <div className="flex items-center gap-4 mb-8 text-gray-500">
                    <label htmlFor="doc-img">
                        <img
                            className="w-16 bg-gray-100 rounded-full cursor-pointer"
                            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                            alt=""
                        />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <p>
                        Upload doctor <br /> pictire
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
                    <div className="w-full lg:flex-1 flex flex-col gap-5">
                        <div className="flex-1 flex flex-col gap-2">
                            <p>Doctor name</p>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className="border border-[#d6d6d6] rounded px-3 py-2"
                                type="text"
                                placeholder="Name"
                                required
                            />
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                            <p>Doctor Email</p>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="border border-[#d6d6d6] rounded px-3 py-2"
                                type="email"
                                placeholder="Email"
                                required
                            />
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                            <p>Doctor Password</p>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="border border-[#d6d6d6] rounded px-3 py-2"
                                type="password"
                                placeholder="password"
                                required
                            />
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                            <p>Experience</p>
                            <select
                                onChange={(e) => setExperience(e.target.value)}
                                value={experience}
                                className="border border-[#d6d6d6] rounded px-3 py-2"
                                name=""
                                id="">
                                <option value="1 Year">1 Year</option>
                                <option value="2 Years">2 Years</option>
                                <option value="3 Years">3 Years</option>
                                <option value="4 Years">4 Years</option>
                                <option value="5 Years">5 Years</option>
                                <option value="6 Years">6 Years</option>
                                <option value="7 Years">7 Years</option>
                                <option value="8 Years +">8 Years +</option>
                            </select>
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                            <p>Fees</p>
                            <input
                                onChange={(e) => setFees(e.target.value)}
                                value={fees}
                                className="border border-[#d6d6d6] rounded px-3 py-2"
                                type="number"
                                placeholder="fees"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full lg:flex-1 flex flex-col gap-5">
                        <div className="flex-1 flex flex-col gap-2">
                            <p>Speciality</p>
                            <select
                                onChange={(e) => setSpeciality(e.target.value)}
                                value={speciality}
                                className="border border-[#d6d6d6] rounded px-3 py-2"
                                name=""
                                id="">
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                            <p>Educations</p>
                            <input
                                onChange={(e) => setEducations(e.target.value)}
                                value={educations}
                                className="border border-[#d6d6d6] rounded px-3 py-2"
                                type="text"
                                placeholder="Educations"
                                required
                            />
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                            <p>Address</p>
                            <input
                                onChange={(e) => setAddress1(e.target.value)}
                                value={address1}
                                className="border border-[#d6d6d6] rounded px-3 py-2"
                                type="text"
                                placeholder="Address 1"
                                required
                            />
                            <input
                                onChange={(e) => setAddress2(e.target.value)}
                                value={address2}
                                className="border border-[#d6d6d6] rounded px-3 py-2"
                                type="text"
                                placeholder="Address 2"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <p className="mt-4 mb-2">About Doctor</p>
                    <textarea
                        onChange={(e) => setAbout(e.target.value)}
                        value={about}
                        className="border border-[#d6d6d6] rounded px-4 pt-2 w-full"
                        placeholder="Write about doctor"
                        rows={5}
                        required
                    />
                </div>
                <button type="submit" className="bg-[#5f6fff] px-10 py-4 mt-4 text-white rounded-full cursor-pointer">
                    Add Doctor
                </button>
            </div>
        </form>
    );
};

export default AddDoctor;
