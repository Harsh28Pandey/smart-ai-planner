import React, { useEffect, useState } from "react";
import axios from "axios";
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
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                    <Icon className="text-white h-6 w-6" />
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboard = async () => {
        try {
            const res = await axios.get("/api/dashboard");
            setData(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="text-white flex justify-center items-center h-screen">
                Loading Dashboard...
            </div>
        );
    }

    return (
        <div className="p-8">

            {/* Heading */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-white">
                    AI Study Dashboard 🚀
                </h1>
                <p className="text-slate-400 mt-2">
                    Track your productivity and study insights.
                </p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

                <StatCard
                    icon={CalendarCheck}
                    title="Today's Tasks"
                    value={data.tasksToday}
                    subtitle={`${data.completedTasks} completed`}
                />

                <StatCard
                    icon={Target}
                    title="Goals Completed"
                    value={data.goalsCompleted}
                    subtitle="This month"
                />

                <StatCard
                    icon={Brain}
                    title="AI Suggestions"
                    value={data.aiSuggestions}
                    subtitle="New insights available"
                />

                <StatCard
                    icon={TrendingUp}
                    title="Productivity Score"
                    value={`${data.productivityScore}%`}
                    subtitle={`Up by ${data.productivityGrowth}%`}
                />

            </div>

            {/* Main Section */}
            <div className="grid lg:grid-cols-3 gap-6 mt-10">

                {/* Study Plan */}
                <div className="lg:col-span-2 p-6 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/10">

                    <h2 className="text-xl font-semibold text-white mb-4">
                        📅 Upcoming Study Plan
                    </h2>

                    <div className="space-y-4">

                        {data?.upcomingPlans?.map((plan, index) => (

                            <div
                                key={index}
                                className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center"
                            >

                                <div>
                                    <p className="text-white font-medium">
                                        {plan.title}
                                    </p>

                                    <p className="text-sm text-slate-400">
                                        {plan.time}
                                    </p>
                                </div>

                                <span className={`text-xs px-3 py-1 rounded-full 
                ${plan.priority === "High"
                                        ? "bg-purple-600"
                                        : "bg-blue-600"
                                    } text-white`}>

                                    {plan.priority}

                                </span>

                            </div>

                        ))}

                    </div>

                </div>

                {/* AI Insights */}
                <div className="p-6 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/10">

                    <h2 className="text-xl font-semibold text-white mb-4">
                        🤖 AI Insights
                    </h2>

                    <div className="space-y-4 text-slate-300 text-sm">

                        {data?.aiInsights?.map((insight, index) => (
                            <p key={index}>💡 {insight}</p>
                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;