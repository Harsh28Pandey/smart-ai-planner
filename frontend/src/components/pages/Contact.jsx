import React from "react";
import { Sparkles, Brain, Target, HelpCircle } from "lucide-react";

const Contact = () => {
    const links = [
        { icon: <Sparkles />, color: "bg-orange-400", href: "#features" },
        { icon: <Brain />, color: "bg-purple-400", href: "#ai-modules" },
        { icon: <Target />, color: "bg-blue-400", href: "#analytics" },
        { icon: <HelpCircle />, color: "bg-green-400", href: "#support" },
    ];

    return (
        <div className="relative min-h-screen bg-[#1C1C1E] text-white overflow-hidden pt-32 px-6">

            {/* Background Gradient Blobs */}
            <div className="absolute -top-40 -left-40 w-100 h-100 bg-purple-600 rounded-full blur-[140px] opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-40 -right-40 w-100 h-100 bg-orange-500 rounded-full blur-[140px] opacity-30 animate-pulse"></div>
            <div className="absolute top-[40%] left-[50%] w-75 h-75 bg-blue-500 rounded-full blur-[140px] opacity-20 animate-pulse"></div>

            <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">

                {/* Left Side - Horizontal Links */}
                <div className="lg:w-1/2 flex flex-col items-center lg:items-start space-y-6">
                    <h2 className="text-5xl font-extrabold bg-linear-to-r from-yellow-400 via-orange-500 to-purple-500 bg-clip-text text-transparent mb-6">
                        About AI Study Planner
                    </h2>

                    {/* Description */}
                    <p className="text-gray-300 text-lg max-w-md">
                        AI Study Planner is designed to help students organize their learning efficiently, track progress,
                        and get AI-powered insights for smarter study sessions. Explore features, analytics, and support to
                        maximize your productivity.
                    </p>

                    {/* Horizontal Links */}
                    <div className="flex gap-6 mt-6">
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className={`w-16 h-16 rounded-full flex items-center justify-center ${link.color} hover:scale-110 transition-all duration-300 shadow-lg`}
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right Side - Contact Form */}
                <div className="lg:w-1/2">
                    <form className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(00,0.5)] space-y-6">

                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                        />

                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                        />

                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        />

                        <textarea
                            rows="4"
                            placeholder="Your Request / Message"
                            className="w-full p-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 resize-none"
                        ></textarea>

                        <button
                            type="submit"
                            className="w-full py-4 rounded-xl bg-linear-to-r from-orange-500 via-purple-500 to-blue-500 hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer font-semibold"
                        >
                            Send Message
                        </button>

                    </form>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-16 text-center text-gray-500 text-sm">
                © 2026 AI Study Planner. All rights reserved.
            </footer>

        </div>
    );
};

export default Contact;