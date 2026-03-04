import React, { useState } from "react";
import axios from "axios";
import { Loader2, CheckCircle, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForgotPassword = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Please enter your email address.");
            return;
        }

        try {
            setIsLoading(true);
            setError("");

            const res = await axios.post(
                "http://localhost:8000/user/forgot-password",
                { email }
            );

            if (res.data.success) {
                setIsSubmitted(true);
                toast.success(res.data.message);

                // ✅ 5 seconds ke baad OTP page open hoga
                setTimeout(() => {
                    navigate(`/verify-otp/${email}`);
                }, 5000);
            }

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
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
                    Reset Password 🔐
                </h2>

                <p className="text-sm text-slate-400 text-center mt-2 mb-8">
                    Enter your email to receive a 6-digit OTP
                </p>

                {error && (
                    <p className="text-red-400 text-sm text-center mb-4">
                        {error}
                    </p>
                )}

                {isSubmitted ? (
                    <div className="flex flex-col items-center text-center space-y-5 py-6">

                        <div className="bg-green-500/20 p-4 rounded-full">
                            <CheckCircle className="text-green-400 w-8 h-8" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white">
                                OTP Sent Successfully 🔐
                            </h3>
                            <p className="text-slate-400 text-sm">
                                We’ve sent a 6-digit OTP to
                            </p>
                            <p className="text-orange-400 font-medium">
                                {email}
                            </p>
                        </div>

                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-sm text-purple-400 cursor-pointer hover:text-purple-300 transition-colors"
                        >
                            Try another email
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleForgotPassword} className="space-y-6">

                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 text-orange-400" size={18} />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-xl bg-linear-to-r from-purple-600 to-blue-500 text-white font-semibold shadow-lg hover:scale-[1.03] hover:shadow-purple-500/40 active:scale-[0.97] transition-all duration-200 disabled:opacity-70 flex items-center justify-center cursor-pointer"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Sending...
                                </span>
                            ) : (
                                "Send OTP"
                            )}
                        </button>

                        <p className="text-sm text-slate-400 text-center">
                            Remember your password?{" "}
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="text-orange-400 hover:text-orange-300 font-medium cursor-pointer"
                            >
                                Sign In
                            </button>
                        </p>

                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;