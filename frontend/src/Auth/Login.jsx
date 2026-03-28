import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper.js";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import axiosInstance from "../utils/axiosInstance.js";
import { Loader2 } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter the password.");
            return;
        }

        try {
            setIsLoading(true);
            setError("");

            const res = await axiosInstance.post(
                "/user/login",
                { email, password },
                { skipAuthRedirect: true }
            );

            // console.log("Login Response:", res.data);

            const token = res.data.token;
            const user = res.data.user;

            if (!token) {
                throw new Error("Token not received");
            }

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // ✅ redirect after success
            navigate("/dashboard", { replace: true });

        } catch (err) {
            // console.log("Login Error:", err.response?.data || err.message);
            setError(
                err.response?.data?.message ||
                err.message ||
                "Invalid email or password"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0B0F1A] overflow-hidden px-6">

            {/* Background Gradient Blobs */}
            <div className="absolute -top-32 -left-32 w-105 h-105 bg-orange-500 opacity-25 blur-[130px] rounded-full"></div>
            <div className="absolute -bottom-32 -right-32 w-105 h-105 bg-purple-600 opacity-25 blur-[130px] rounded-full"></div>

            {/* Glass Card */}
            <div className="relative w-full max-w-md p-8 rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.15)]">

                <h2 className="text-3xl font-bold text-white text-center tracking-wide">
                    Welcome Back 👋
                </h2>
                <p className="text-sm text-slate-400 text-center mt-2 mb-8">
                    Log in to continue your AI-powered study journey
                </p>

                <form onSubmit={handleLogin} className="space-y-6">

                    {/* Email Input */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-orange-400" size={18} />
                        <input
                            type="email"
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            placeholder="Email Address"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
                        />
                    </div>

                    {/* Password Section */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm text-slate-400">Password</label>
                            <button
                                type="button"
                                onClick={() => navigate("/forgot-password")}
                                className="text-xs text-orange-400 hover:text-orange-300 transition cursor-pointer"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-purple-400" size={18} />

                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                placeholder="Enter your password"
                                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                            />

                            {/* Eye Toggle */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-slate-400 hover:text-white transition cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 rounded-xl bg-linear-to-r from-purple-600 to-blue-500 text-white font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${isLoading
                            ? "opacity-80 cursor-not-allowed"
                            : "hover:scale-[1.03] hover:shadow-purple-500/40 active:scale-[0.97]"
                            }
    `}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span className="tracking-wide">Logging in...</span>
                            </>
                        ) : (
                            "Log In"
                        )}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 text-slate-500 text-xs">
                        <div className="flex-1 h-px bg-white/10"></div>
                        OR
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>

                    {/* Signup Link */}
                    <p className="text-sm text-slate-400 text-center">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/signup")}
                            className="text-orange-400 hover:text-orange-300 font-medium transition duration-200 cursor-pointer"
                        >
                            Sign Up
                        </button>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Login;