import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

const Verify = () => {

    const navigate = useNavigate();
    const { token } = useParams();

    const [status, setStatus] = useState("Verifying your email...");
    const [type, setType] = useState("loading"); // loading | success | error

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await axios.post(
                    "http://localhost:8000/user/verify",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (res.data.success) {
                    setType("success");
                    setStatus("Email Verified Successfully 🎉");

                    setTimeout(() => {
                        navigate("/login");
                    }, 2500);
                } else {
                    setType("error");
                    setStatus("Invalid or Expired Token.");
                }
            } catch (error) {
                console.log(error);
                setType("error");
                setStatus("Verification Failed. Please try again.");
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#0B0F1A] overflow-hidden px-6">

            {/* Background Glow */}
            <div className="absolute -top-32 -left-32 w-105 h-105 bg-orange-500 opacity-25 blur-[130px] rounded-full"></div>
            <div className="absolute -bottom-32 -right-32 w-105 h-105 bg-purple-600 opacity-25 blur-[130px] rounded-full"></div>

            {/* Glass Card */}
            <div className="relative w-full max-w-md p-8 rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.15)] text-center space-y-6">

                {/* Status Icon */}
                <div className="flex justify-center">
                    {type === "loading" && (
                        <div className="bg-purple-500/20 p-4 rounded-full">
                            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                        </div>
                    )}

                    {type === "success" && (
                        <div className="bg-green-500/20 p-4 rounded-full">
                            <CheckCircle className="w-8 h-8 text-green-400" />
                        </div>
                    )}

                    {type === "error" && (
                        <div className="bg-red-500/20 p-4 rounded-full">
                            <XCircle className="w-8 h-8 text-red-400" />
                        </div>
                    )}
                </div>

                {/* Status Text */}
                <h2 className="text-2xl font-bold text-white">
                    {status}
                </h2>

                {/* Helper Text */}
                {type === "loading" && (
                    <p className="text-slate-400 text-sm">
                        Please wait while we verify your account.
                    </p>
                )}

                {type === "success" && (
                    <p className="text-slate-400 text-sm">
                        Redirecting you to login...
                    </p>
                )}

                {type === "error" && (
                    <button
                        onClick={() => navigate("/login")}
                        className="mt-4 px-6 py-2 rounded-xl bg-linear-to-r from-purple-600 to-blue-500 text-white font-medium hover:scale-[1.03] transition-all cursor-pointer"
                    >
                        Go to Login
                    </button>
                )}

            </div>
        </div>
    );
};

export default Verify;