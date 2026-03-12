import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance.js";

const DashboardNavbarLayout = ({ title, description, user }) => {

    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {

            await axiosInstance.post("/user/logout");

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            navigate("/");

        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative z-1000 w-full flex justify-between items-center px-8 py-5 mb-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl">

            {/* Title + Description */}
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-white">
                    {title}
                </h1>

                <p className="text-slate-400 text-sm mt-1">
                    {description}
                </p>
            </div>

            {/* Profile */}
            <div ref={dropdownRef} className="relative">

                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setOpenDropdown(!openDropdown)}
                >

                    <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20">
                        {user?.profileImageUrl ? (
                            <img src={user.profileImageUrl} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-linear-to-r from-purple-500 to-blue-500 text-white font-semibold">
                                {user?.username?.charAt(0)}
                            </div>
                        )}
                    </div>

                    <span className="text-white font-medium">
                        {user?.username}
                    </span>

                </div>

                {openDropdown && (

                    <div className="absolute right-0 top-12 w-52 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 overflow-hidden z-1100">

                        <button
                            onClick={() => navigate("/")}
                            className="w-full text-left px-5 py-3 text-slate-300 hover:text-white hover:rounded-2xl hover:bg-white/5 transition cursor-pointer"
                        >
                            Home
                        </button>

                        <button
                            onClick={() => navigate("/contact")}
                            className="w-full text-left px-5 py-3 text-slate-300 hover:text-white hover:rounded-2xl hover:bg-white/5 transition cursor-pointer"
                        >
                            Contact Us
                        </button>

                        <button
                            onClick={() => navigate("/forgot-password")}
                            className="w-full text-left px-5 py-3 text-slate-300 hover:text-white hover:rounded-2xl hover:bg-white/5 transition cursor-pointer"
                        >
                            Change Password
                        </button>

                        <div className="h-px bg-white/10 mx-4"></div>

                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-5 py-3 text-red-400 hover:text-red-300 hover:rounded-2xl hover:bg-red-500/10 transition cursor-pointer"
                        >
                            Logout
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
};

export default DashboardNavbarLayout;