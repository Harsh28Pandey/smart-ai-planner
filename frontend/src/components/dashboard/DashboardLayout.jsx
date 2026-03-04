import React, { useState } from "react";
import {
    LayoutDashboard,
    CalendarCheck,
    Brain,
    BarChart3,
    Settings,
    LogOut,
} from "lucide-react";

const TABS = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "planner", name: "Study Planner", icon: CalendarCheck },
    { id: "insights", name: "AI Insights", icon: Brain },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
    { id: "settings", name: "Settings", icon: Settings },
];

const DashboardLayout = () => {
    const [activeTab, setActiveTab] = useState("dashboard");

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return <div className="text-white">🚀 Dashboard Overview Content</div>;

            case "planner":
                return <div className="text-white">📅 Study Planner Content</div>;

            case "insights":
                return <div className="text-white">🤖 AI Insights Content</div>;

            case "analytics":
                return <div className="text-white">📊 Analytics Content</div>;

            case "settings":
                return <div className="text-white">⚙ Settings Content</div>;

            default:
                return null;
        }
    };

    return (
        <div className="relative min-h-screen bg-[#0B0F1A] flex overflow-hidden">

            {/* Background Blobs */}
            <div className="absolute -top-40 -left-40 w-112.5 h-112.5 bg-orange-500 opacity-20 blur-[140px] rounded-full"></div>
            <div className="absolute -bottom-40 -right-40 w-112.5 h-112.5 bg-purple-600 opacity-20 blur-[140px] rounded-full"></div>

            {/* Sidebar */}
            <aside className="relative z-10 w-64 p-6 backdrop-blur-2xl bg-white/5 border-r border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.15)]">

                {/* Logo */}
                <h2 className="text-xl font-bold text-white mb-10 tracking-wide">
                    Smart AI Planner
                </h2>

                {/* Tabs */}
                <nav className="space-y-3">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                        ? "bg-linear-to-r from-purple-600 to-blue-500 text-white shadow-lg"
                                        : "text-slate-400 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="text-sm font-medium">{tab.name}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="absolute bottom-6 left-6 right-6">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-all">
                        <LogOut size={18} />
                        <span className="text-sm">Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="relative z-10 flex-1 p-10 overflow-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white capitalize">
                        {activeTab}
                    </h1>
                    <p className="text-slate-400 mt-1">
                        Manage your {activeTab} efficiently with AI assistance.
                    </p>
                </div>

                {/* Dynamic Tab Content */}
                <div className="p-6 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.15)] min-h-75">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;