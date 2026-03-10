import React from "react";
import { Sparkles, Brain, Target, HelpCircle, Mail, User, MessageSquare } from "lucide-react";

const Contact = () => {

    const links = [
        { icon: <Sparkles size={20} />, label: "Features", color: "from-orange-400 to-orange-600" },
        { icon: <Brain size={20} />, label: "AI Modules", color: "from-purple-400 to-purple-600" },
        { icon: <Target size={20} />, label: "Analytics", color: "from-blue-400 to-blue-600" },
        { icon: <HelpCircle size={20} />, label: "Support", color: "from-green-400 to-green-600" },
    ];

    return (
        <div className="relative min-h-screen bg-[#1C1C1E] text-white overflow-hidden pt-28">

            {/* Background Blur Effects */}
            <div className="absolute -top-40 -left-40 w-105 h-105 bg-purple-600 rounded-full blur-[150px] opacity-30"></div>
            <div className="absolute -bottom-40 -right-40 w-105 h-105 bg-orange-500 rounded-full blur-[150px] opacity-30"></div>

            {/* MAIN CONTAINER (Same as Navbar) */}
            <div className="relative z-10 max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-2 gap-14 items-center">

                    {/* LEFT SIDE */}
                    <div className="space-y-7">

                        <h2 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-yellow-400 via-orange-500 to-purple-500 bg-clip-text text-transparent">
                            AI Study Planner
                        </h2>

                        <p className="text-gray-300 leading-relaxed max-w-lg">
                            Plan smarter with AI-powered study tools, productivity analytics,
                            and intelligent recommendations designed to help students stay
                            organized and achieve their academic goals.
                        </p>

                        {/* Feature Links */}
                        <div className="grid grid-cols-2 gap-4 pt-3">

                            {links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition backdrop-blur-lg"
                                >

                                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg bg-linear-to-r ${link.color}`}>
                                        {link.icon}
                                    </div>

                                    <span className="text-sm text-gray-200">
                                        {link.label}
                                    </span>

                                </a>
                            ))}

                        </div>

                    </div>

                    {/* RIGHT SIDE CONTACT FORM */}
                    <div>

                        <form className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl space-y-5">

                            <h3 className="text-xl font-semibold">
                                Contact Us
                            </h3>

                            {/* Name */}
                            <div className="relative">
                                <User size={18} className="absolute top-4 left-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none"
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <Mail size={18} className="absolute top-4 left-4 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
                                />
                            </div>

                            {/* Subject */}
                            <div className="relative">
                                <MessageSquare size={18} className="absolute top-4 left-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            {/* Message */}
                            <textarea
                                rows="4"
                                placeholder="Your Message"
                                className="w-full p-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none resize-none"
                            />

                            <button
                                type="submit"
                                className="w-full py-3 rounded-2xl bg-linear-to-r from-orange-500 via-purple-500 to-blue-500 hover:scale-[1.02] transition font-semibold cursor-pointer"
                            >
                                Send Message
                            </button>

                        </form>

                    </div>

                </div>

                {/* FOOTER */}
                <footer className="mt-16 text-center text-gray-500 text-sm border-t border-white/10 pt-6">
                    © 2026 AI Study Planner
                </footer>

            </div>

        </div>
    );
};

export default Contact;