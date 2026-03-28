import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import axiosInstance from "../utils/axiosInstance.js";

const ChangePassword = () => {

    const { email } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChangePassword = async () => {
        setError("");
        setSuccess("");

        if (!newPassword || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setIsLoading(true);

            const res = await axiosInstance.post(
                `/user/change-password/${email}`,
                { newPassword, confirmPassword },
                { skipAuthRedirect: true }
            );

            setSuccess(res.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 2500);

        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0B0F1A] overflow-hidden px-6">

            {/* Background Glow */}
            <div className="absolute -top-32 -left-32 w-105 h-105 bg-orange-500 opacity-25 blur-[130px] rounded-full"></div>
            <div className="absolute -bottom-32 -right-32 w-105 h-105 bg-purple-600 opacity-25 blur-[130px] rounded-full"></div>

            {/* Glass Card */}
            <div className="relative w-full max-w-md p-8 rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.15)] space-y-6">

                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">
                        Change Password 🔐
                    </h2>
                    <p className="text-sm text-slate-400 mt-2">
                        Set a new password for
                    </p>
                    <p className="text-orange-400 font-medium text-sm break-all">
                        {email}
                    </p>
                </div>

                {/* Alerts */}
                {error && (
                    <p className="text-red-400 text-sm text-center">
                        {error}
                    </p>
                )}

                {success && (
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <p className="text-green-400 text-sm">{success}</p>
                        <p className="text-slate-400 text-xs">
                            Redirecting to login...
                        </p>
                    </div>
                )}

                {/* Inputs */}
                {!success && (
                    <div className="space-y-4">

                        {/* New Password */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-purple-400" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="New password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-slate-400 hover:text-white cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-purple-400" size={18} />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-3.5 text-slate-400 hover:text-white cursor-pointer"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleChangePassword}
                            disabled={isLoading}
                            className="w-full py-3 rounded-xl bg-linear-to-r from-purple-600 to-blue-500 text-white font-semibold shadow-lg hover:scale-[1.03] hover:shadow-purple-500/40 active:scale-[0.97] transition-all duration-200 disabled:opacity-60 flex justify-center items-center cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Changing...
                                </>
                            ) : (
                                "Change Password"
                            )}
                        </button>

                    </div>
                )}

                {/* Footer */}
                <p className="text-xs text-slate-500 text-center">
                    Make sure your password is strong & secure.
                </p>

            </div>
        </div>
    );
};

export default ChangePassword;