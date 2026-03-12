import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { validateEmail } from "../utils/helper.js";
import { Loader2 } from "lucide-react";
import axiosInstance from "../utils/axiosInstance.js";
import uploadImage from "../utils/uploadImage.js";
import ProfilePhotoSelector from "../Auth/ProfilePhotoSelector.jsx";

const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!fullName.trim()) {
            setError("Please enter full name.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        try {
            setIsLoading(true);
            setError("");

            let profileImageUrl = "";

            // Upload Image
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }

            const response = await axiosInstance.post("/user/register", {
                username: fullName,
                email,
                password,
                profileImageUrl: profileImageUrl
            });

            // localStorage.setItem("token", response.data.token);
            localStorage.setItem("token", response.data.data.token);

            navigate("/verify");

        } catch (err) {
            setError(
                err.response?.data?.message || "Something went wrong."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0B0F1A] overflow-hidden px-6">

            {/* Background Glow */}
            <div className="absolute -top-32 -left-32 w-105 h-105 bg-orange-500 opacity-25 blur-[130px] rounded-full"></div>
            <div className="absolute -bottom-32 -right-32 w-105 h-105 bg-purple-600 opacity-25 blur-[130px] rounded-full"></div>

            <div className="relative w-full max-w-md p-8 rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.15)]">

                <h2 className="text-3xl font-bold text-white text-center">
                    Create Account 🚀
                </h2>

                <p className="text-sm text-slate-400 text-center mt-2 mb-6">
                    Join AI Study Planner and start your smart journey
                </p>

                {/* Profile Image Selector */}
                <div className="flex justify-center mb-6">
                    <ProfilePhotoSelector
                        image={profilePic}
                        setImage={setProfilePic}
                    />
                </div>

                <form onSubmit={handleSignUp} className="space-y-6">

                    {/* Full Name */}
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 text-orange-400" size={18} />
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Full Name"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-orange-400" size={18} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-purple-400" size={18} />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create Password"
                            className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-slate-400 hover:text-white transition cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 rounded-xl bg-linear-to-r from-purple-600 to-blue-500 text-white font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${isLoading
                            ? "opacity-80 cursor-not-allowed"
                            : "hover:scale-[1.03] hover:shadow-purple-500/40 active:scale-[0.97]"
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Creating Account...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 text-slate-500 text-xs">
                        <div className="flex-1 h-px bg-white/10"></div>
                        OR
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>

                    {/* Login Link */}
                    <p className="text-sm text-slate-400 text-center">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="text-orange-400 hover:text-orange-300 font-medium transition cursor-pointer"
                        >
                            Log In
                        </button>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default SignUp;