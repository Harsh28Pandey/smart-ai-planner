import React, { useState } from "react";
import { LayoutDashboard, CalendarCheck, BarChart3, LogOut, Sparkles, CheckSquare, Timer, Bot, BookOpen } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";

import StudyPlanner from "../pages/StudyPlanner.jsx";
import Analytics from "../pages/Analytics.jsx";
import DashboardHome from "../pages/DashboardHome.jsx";
import AIAssistant from "../pages/AIAssistant.jsx";
import Tasks from "../pages/Tasks.jsx";
import FocusMode from "../pages/FocusMode.jsx";
import Notes from "../pages/Notes.jsx";

const TABS = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "planner", name: "Study Planner", icon: CalendarCheck },
    { id: "tasks", name: "Tasks", icon: CheckSquare },
    { id: "focus", name: "Focus Mode", icon: Timer },
    { id: "ai", name: "AI Assistant", icon: Bot },
    { id: "notes", name: "Notes", icon: BookOpen },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
];

const DashboardLayout = () => {

    const [activeTab, setActiveTab] = useState("dashboard");

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const renderContent = () => {
        const components = {
            dashboard: <DashboardHome />,
            planner: <StudyPlanner />,
            tasks: <Tasks />,
            focus: <FocusMode />,
            ai: <AIAssistant />,   // FIXED
            notes: <Notes />,
            analytics: <Analytics />,
        };
        return components[activeTab] || null;
    };

    return (
        <div className="relative min-h-screen bg-[#0B0F1A] overflow-hidden">

            {/* Background blobs */}
            <div className="absolute -top-40 -left-40 w-112.5 h-112.5 bg-orange-500 opacity-20 blur-[160px] rounded-full"></div>
            <div className="absolute -bottom-40 -right-40 w-112.5 h-112.5 bg-purple-600 opacity-20 blur-[160px] rounded-full"></div>

            {/* SIDEBAR */}
            <aside className="fixed left-0 top-0 h-screen w-64 p-6 backdrop-blur-2xl bg-white/5 border-r border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.15)] flex flex-col z-20">

                {/* Logo */}
                <div className="flex items-center gap-3 mb-12">
                    <div className="p-2 rounded-lg bg-linear-to-br from-purple-600 to-blue-500">
                        <Sparkles className="text-white" size={18} />
                    </div>

                    <h2 className="text-lg font-semibold text-white tracking-wide">
                        Smart AI Planner
                    </h2>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2 flex-1">

                    {TABS.map((tab) => {

                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl
                                transition-all duration-300 ease-in-out transform hover:scale-[1.04]
                                ${isActive
                                        ? "bg-linear-to-r from-purple-600 to-blue-500 text-white shadow-lg"
                                        : "text-slate-400 hover:bg-white/10 hover:text-white"
                                    }`}
                            >

                                <Icon size={18} />

                                <span className="text-sm font-medium">
                                    {tab.name}
                                </span>

                            </button>
                        );
                    })}

                </nav>

                {/* Logout */}
                <div className="pt-6 border-t border-white/10">

                    <button
                        onClick={handleLogout}
                        className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl 
                        text-slate-400 hover:bg-red-500/20 hover:text-red-400 
                        transition-all duration-300 transform hover:scale-[1.04]"
                    >

                        <LogOut size={18} />

                        <span className="text-sm font-medium">
                            Log Out
                        </span>

                    </button>

                </div>

            </aside>

            {/* MAIN CONTENT */}
            <main className="relative z-10 flex-1 p-10 overflow-y-auto ml-64">

                {/* Header */}
                <div className="mb-8">

                    <h1 className="text-2xl font-bold text-white capitalize">
                        {activeTab}
                    </h1>

                    <p className="text-slate-400 mt-1">
                        Manage your {activeTab} efficiently with AI assistance.
                    </p>

                </div>

                {/* Content Container */}
                <div className="p-8 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.15)] min-h-112.5">

                    {renderContent()}

                </div>

            </main>

        </div>
    );
};

export default DashboardLayout;