import React from "react";
import { Brain, Target, CalendarCheck, TrendingUp } from "lucide-react";

const StatCard = ({ icon: Icon, title, value, subtitle }) => {
    return (
        <div className="relative p-6 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-400">{title}</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
                    <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-linear-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                    <Icon className="text-white h-6 w-6" />
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    return (
        <div className="relative min-h-screen bg-[#0B0F1A] overflow-hidden p-8">

            {/* Background Blobs */}
            <div className="absolute -top-40 -left-40 w-112.5 h-112.5 bg-orange-500 opacity-20 blur-[140px] rounded-full"></div>
            <div className="absolute -bottom-40 -right-40 w-112.5 h-112.5 bg-purple-600 opacity-20 blur-[140px] rounded-full"></div>

            {/* Page Content */}
            <div className="relative z-10">

                {/* Heading */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-white tracking-wide">
                        AI Study Dashboard 🚀
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Track your productivity, progress and AI insights.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

                    <StatCard
                        icon={CalendarCheck}
                        title="Today's Tasks"
                        value="8"
                        subtitle="2 completed"
                    />

                    <StatCard
                        icon={Target}
                        title="Goals Completed"
                        value="24"
                        subtitle="This month"
                    />

                    <StatCard
                        icon={Brain}
                        title="AI Suggestions"
                        value="5"
                        subtitle="New insights available"
                    />

                    <StatCard
                        icon={TrendingUp}
                        title="Productivity Score"
                        value="87%"
                        subtitle="Up by 5% this week"
                    />

                </div>

                {/* Main Content Section */}
                <div className="grid lg:grid-cols-3 gap-6 mt-10">

                    {/* Study Planner Section */}
                    <div className="lg:col-span-2 p-6 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                        <h2 className="text-xl font-semibold text-white mb-4">
                            📅 Upcoming Study Plan
                        </h2>

                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                                <div>
                                    <p className="text-white font-medium">React Revision</p>
                                    <p className="text-sm text-slate-400">Today - 6:00 PM</p>
                                </div>
                                <span className="text-xs px-3 py-1 rounded-full bg-purple-600 text-white">
                                    High Priority
                                </span>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                                <div>
                                    <p className="text-white font-medium">DSA Practice</p>
                                    <p className="text-sm text-slate-400">Tomorrow - 7:00 AM</p>
                                </div>
                                <span className="text-xs px-3 py-1 rounded-full bg-blue-600 text-white">
                                    Medium
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* AI Insights Section */}
                    <div className="p-6 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                        <h2 className="text-xl font-semibold text-white mb-4">
                            🤖 AI Insights
                        </h2>

                        <div className="space-y-4 text-slate-300 text-sm">
                            <p>
                                🔥 You are most productive between 6 AM - 9 AM.
                            </p>
                            <p>
                                📈 Your consistency improved by 12% this week.
                            </p>
                            <p>
                                💡 Consider adding a short revision session tonight.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Dashboard;