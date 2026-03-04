import React from "react";
import { Brain, CheckSquare, BarChart3, Focus, Target, LayoutDashboard } from "lucide-react";

const Features = () => {
    const features = [
        {
            title: "AI-Powered Study Recommendations",
            desc: "Advanced machine learning analyzes your study patterns and delivers optimized schedules, subject prioritization, and smart improvement strategies.",
            icon: <Brain size={30} />,
        },
        {
            title: "Intelligent Task Management",
            desc: "Organize academic tasks with priority tagging, deadline tracking, and structured workflows designed for clarity and execution.",
            icon: <CheckSquare size={30} />,
        },
        {
            title: "Performance Analytics",
            desc: "Monitor productivity metrics, time allocation, and goal completion rates through detailed visual reports.",
            icon: <BarChart3 size={30} />,
        },
        {
            title: "Deep Focus Mode",
            desc: "Distraction-minimized sessions with time-blocking and controlled environments to enhance concentration.",
            icon: <Focus size={30} />,
        },
        {
            title: "Goal & Milestone Tracking",
            desc: "Define academic objectives and measure progress through structured milestones and performance checkpoints.",
            icon: <Target size={30} />,
        },
        {
            title: "Real-Time Dashboard",
            desc: "Centralized overview of ongoing sessions, weekly performance, and study consistency indicators.",
            icon: <LayoutDashboard size={30} />,
        },
    ];

    return (
        <div className="relative min-h-screen bg-[#1C1C1E] text-white overflow-hidden pt-44 px-6">

            {/* Background Effects */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-20"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-500 rounded-full blur-[150px] opacity-20"></div>

            <div className="relative z-10 max-w-6xl mx-auto text-center">

                {/* Page Heading */}
                <h2 className="text-5xl md:text-6xl font-extrabold mb-8 bg-linear-to-r from-yellow-400 via-orange-500 to-purple-500 bg-clip-text text-transparent">
                    Core Platform Features
                </h2>

                <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed mb-24">
                    A structured productivity system engineered to help students plan better, focus deeper,
                    and achieve measurable academic growth.
                </p>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-3 gap-14">

                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="group p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:-translate-y-3 hover:border-purple-400 transition-all duration-500"
                        >
                            <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-linear-to-r from-orange-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-500">
                                {feature.icon}
                            </div>

                            <h3 className="text-2xl font-semibold mb-4 text-white">
                                {feature.title}
                            </h3>

                            <p className="text-gray-400 leading-relaxed text-lg">
                                {feature.desc}
                            </p>
                        </div>
                    ))}

                </div>

            </div>

            {/* Minimal Footer */}
            <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-sm mt-32">
                © 2026 AI Study Planner
            </footer>

        </div>
    );
};

export default Features;