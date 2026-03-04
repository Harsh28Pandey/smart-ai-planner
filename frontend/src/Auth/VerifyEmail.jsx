import { MailCheck } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {

    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0B0F1A] overflow-hidden px-6">

            {/* Background Glow */}
            <div className="absolute -top-32 -left-32 w-105 h-105 bg-orange-500 opacity-25 blur-[130px] rounded-full"></div>
            <div className="absolute -bottom-32 -right-32 w-105 h-105 bg-purple-600 opacity-25 blur-[130px] rounded-full"></div>

            {/* Glass Card */}
            <div className="relative w-full max-w-md p-8 rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.15)] text-center space-y-6">

                {/* Icon */}
                <div className="flex justify-center">
                    <div className="bg-purple-500/20 p-4 rounded-full">
                        <MailCheck className="w-8 h-8 text-purple-400" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white">
                    Check Your Email 📩
                </h2>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed">
                    We’ve sent you a verification link. Please check your inbox
                    and click the link to activate your account.
                </p>

                {/* Helper Text */}
                <p className="text-xs text-slate-500">
                    Didn’t receive the email? Check your spam folder or wait a few minutes.
                </p>

                {/* Optional Action Button */}
                <button
                    onClick={() => navigate("/login")}
                    className="w-full py-3 rounded-xl bg-linear-to-r from-purple-600 to-blue-500 text-white font-semibold shadow-lg hover:scale-[1.03] hover:shadow-purple-500/40 active:scale-[0.97] transition-all duration-200 cursor-pointer"
                >
                    Go to Login
                </button>

                {/* Resend Option */}
                <p className="text-sm text-slate-400">
                    Didn’t get the email?{" "}
                    <button className="text-orange-400 hover:text-orange-300 font-medium transition cursor-pointer">
                        Resend
                    </button>
                </p>

            </div>
        </div>
    );
};

export default VerifyEmail;