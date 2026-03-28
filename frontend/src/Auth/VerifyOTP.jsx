import axiosInstance from "../utils/axiosInstance.js";
import { CheckCircle, Loader2, RotateCcw } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyOTP = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [timer, setTimer] = useState(30);

    const inputRefs = useRef([]);
    const { email } = useParams();
    const navigate = useNavigate();

    // ⏳ Countdown Timer
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    // 🔢 Handle Change (Only Numbers)
    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // ⬅️ Handle Backspace
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === "Enter") {
            handleVerify();
        }
    };

    // 📋 Paste Full OTP
    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d{6}$/.test(pasteData)) return;

        const updatedOtp = pasteData.split("");
        setOtp(updatedOtp);
        inputRefs.current[5]?.focus();
    };

    // 🔍 Verify OTP
    const handleVerify = async () => {
        const finalOtp = otp.join("");

        if (finalOtp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }

        try {
            setIsLoading(true);
            setError("");

            const res = await axiosInstance.post(
                `/user/verify-otp/${email}`,
                { otp: finalOtp },
                { skipAuthRedirect: true }
            );

            setSuccessMessage(res.data.message);
            setIsVerified(true);

            setTimeout(() => {
                navigate(`/change-password/${email}`);
            }, 2500);

        } catch (error) {
            setError(error.response?.data?.message || "Invalid OTP.");
        } finally {
            setIsLoading(false);
        }
    };

    // 🔁 Clear OTP
    const clearOtp = () => {
        setOtp(["", "", "", "", "", ""]);
        setError("");
        inputRefs.current[0]?.focus();
    };

    // 🔄 Resend OTP
    const resendOtp = async () => {
        try {
            await axiosInstance.post(
                `/user/resend-otp/${email}`,
                {},
                { skipAuthRedirect: true }
            );
            setTimer(30);
            setSuccessMessage("New OTP sent successfully!");
        } catch (err) {
            setError("Failed to resend OTP.");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0B0F1A] overflow-hidden px-6">

            {/* Glow Background */}
            <div className="absolute -top-32 -left-32 w-105 h-105 bg-orange-500 opacity-25 blur-[130px] rounded-full"></div>
            <div className="absolute -bottom-32 -right-32 w-105 h-105 bg-purple-600 opacity-25 blur-[130px] rounded-full"></div>

            <div className="relative w-full max-w-md p-8 rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.15)] text-center space-y-6">

                <h2 className="text-2xl font-bold text-white">
                    Verify OTP 🔐
                </h2>

                <p className="text-slate-400 text-sm">
                    Enter the 6-digit code sent to
                </p>
                <p className="text-orange-400 font-medium text-sm break-all">
                    {email}
                </p>

                {error && <p className="text-red-400 text-sm">{error}</p>}
                {successMessage && <p className="text-green-400 text-sm">{successMessage}</p>}

                {isVerified ? (
                    <div className="flex flex-col items-center space-y-4 py-6">
                        <div className="bg-green-500/20 p-4 rounded-full">
                            <CheckCircle className="w-8 h-8 text-green-400" />
                        </div>
                        <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* OTP Inputs */}
                        <div
                            className="flex justify-between gap-2"
                            onPaste={handlePaste}
                        >
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    inputMode="numeric"
                                    value={digit}
                                    maxLength={1}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    className="w-12 h-12 text-center text-xl font-bold rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                />
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="space-y-3">

                            <button
                                onClick={handleVerify}
                                disabled={isLoading || otp.some((d) => d === "")}
                                className="w-full py-3 rounded-xl bg-linear-to-r from-purple-600 to-blue-500 text-white font-semibold shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all disabled:opacity-60 flex justify-center items-center cursor-pointer"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify Code"
                                )}
                            </button>

                            <button
                                onClick={clearOtp}
                                disabled={isLoading}
                                className="w-full py-3 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition flex items-center justify-center cursor-pointer"
                            >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Clear
                            </button>

                        </div>

                        {/* Resend */}
                        <p className="text-sm text-slate-400">
                            {timer > 0 ? (
                                <>Resend OTP in <span className="text-orange-400">{timer}s</span></>
                            ) : (
                                <button
                                    onClick={resendOtp}
                                    className="text-orange-400 hover:text-orange-300 cursor-pointer"
                                >
                                    Resend OTP
                                </button>
                            )}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyOTP;