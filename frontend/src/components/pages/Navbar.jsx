import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
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
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[94%] max-w-6xl z-50 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.37)] rounded-3xl px-10 py-4 flex justify-between items-center transition-all duration-300">

            <Link to="/" className="text-2xl font-extrabold bg-linear-to-r from-orange-400 via-purple-400 to-blue-400 bg-clip-text text-transparent cursor-pointer">
                AI Study Planner
            </Link>

            <div className="hidden md:flex space-x-10 font-medium text-gray-300">
                {[
                    { name: "Home", path: "/" },
                    { name: "Features", path: "/features" },
                    { name: "About", path: "/about" },
                    { name: "Contact", path: "/contact" },
                ].map((item, i) => (
                    <Link key={i} to={item.path} className="relative hover:text-white transition-all duration-300 cursor-pointer group">
                        {item.name}
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-linear-to-r from-yellow-400 via-orange-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">

                {user ? (

                    <div ref={dropdownRef} className="relative">

                        {/* Profile Section */}
                        <div
                            className="flex items-center gap-3 cursor-pointer"
                            onClick={() => setOpenDropdown(!openDropdown)}
                        >

                            {/* Profile Circle */}
                            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20">

                                {user.profileImage ? (
                                    <img
                                        src={user.profileImage}
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-linear-to-r from-orange-500 via-purple-500 to-blue-500 text-white font-bold">
                                        {user.username?.charAt(0)}
                                    </div>
                                )}

                            </div>

                            {/* User Name */}
                            <span className="text-white font-medium">
                                {user.username}
                            </span>

                        </div>


                        {/* Dropdown */}
                        {openDropdown && (

                            <div className="absolute right-0 mt-6 w-56 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 overflow-hidden">

                                <button onClick={() => navigate("/dashboard")} className="w-full text-left px-5 py-3 text-slate-300 hover:text-white hover:bg-white/5 hover:rounded-2xl transition-all duration-200 cursor-pointer">
                                    Dashboard
                                </button>

                                <button onClick={() => navigate("/dashboard/notes")} className="w-full text-left px-5 py-3 text-slate-300 hover:text-white hover:bg-white/5 hover:rounded-2xl transition-all duration-200 cursor-pointer">
                                    Notes
                                </button>

                                <button onClick={() => navigate("/dashboard/ai")} className="w-full text-left px-5 py-3 text-slate-300 hover:text-white hover:bg-white/5 hover:rounded-2xl transition-all duration-200 cursor-pointer">
                                    AI Assistant
                                </button>

                                <button onClick={() => navigate("dashboard/interview")} className="w-full text-left px-5 py-3 text-slate-300 hover:text-white hover:bg-white/5 hover:rounded-2xl transition-all duration-200 cursor-pointer">
                                    Interview Prep
                                </button>

                                <button onClick={() => navigate("/forgot-password")} className="w-full text-left px-5 py-3 text-slate-300 hover:text-white hover:bg-white/5 hover:rounded-2xl transition-all duration-200 cursor-pointer">
                                    Change Password
                                </button>

                                <div className="flex justify-center">
                                    <div className="h-0.5 w-50 bg-white/10"></div>
                                </div>

                                <button onClick={handleLogout} className="w-full text-left px-5 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/15 hover:rounded-2xl transition-all duration-200 cursor-pointer">
                                    Logout
                                </button>

                            </div>

                        )}

                    </div>

                ) : (

                    <>
                        <button
                            className="text-yellow-400 hover:text-white transition cursor-pointer"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>

                        <button
                            className="px-6 py-2 rounded-xl bg-linear-to-r from-orange-500 via-purple-500 to-blue-500 hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
                            onClick={() => navigate("/signup")}
                        >
                            Get Started
                        </button>
                    </>

                )}

            </div>

        </nav>
    );
};

export default Navbar;