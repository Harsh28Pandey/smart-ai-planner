import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Home = () => {

    useEffect(() => {
        const elements = document.querySelectorAll(".reveal");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("opacity-100", "translate-y-0");
                    }
                });
            },
            { threshold: 0.2 }
        );

        elements.forEach((el) => observer.observe(el));
    }, []);

    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-[#1C1C1E] text-white overflow-hidden pt-40">
            {/* ========== Animated Background Blobs ========== */}
            <div className="absolute -top-25 -left-25 w-100 h-100 bg-purple-600 rounded-full blur-[140px] opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-30 -right-25 w-100 h-100 bg-orange-500 rounded-full blur-[140px] opacity-30 animate-pulse animation-delay-2000"></div>
            <div className="absolute top-[40%] left-[50%] w-75 h-75 bg-blue-500 rounded-full blur-[140px] opacity-20 animate-pulse animation-delay-4000"></div>

            {/* ================= HERO ================= */}
            <section className="pb-16 text-center px-6 relative z-10"> {/* pb-32 -> pb-16 */}
                <div className="max-w-4xl mx-auto reveal opacity-0 translate-y-10 transition-all duration-1000">
                    <h2 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">
                        Plan Smarter.
                        <br />
                        <span className="bg-linear-to-r from-yellow-400 via-orange-500 to-purple-500 bg-clip-text text-transparent">
                            Study Better.
                        </span>
                    </h2>

                    <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                        AI powered productivity system designed to transform how students plan,
                        execute, and succeed.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
                        <button className="px-10 py-4 rounded-2xl bg-linear-to-r from-orange-500 via-purple-500 to-blue-500 
                          hover:scale-110 transition-all duration-300 shadow-xl cursor-pointer group relative overflow-hidden"
                          onClick={() => navigate("/signup")}
                          >
                            <span>Start Planning</span>
                            <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>

                        <button className="px-10 py-4 rounded-2xl border border-white/20 backdrop-blur-lg 
                          hover:bg-white/10 transition-all duration-300 cursor-pointer relative overflow-hidden">
                            Watch Demo
                        </button>
                    </div>

                    {/* Stats Row for Credibility */}
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-8 md:gap-12 max-w-2xl mx-auto text-sm md:text-lg">
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-1">10K+</div>
                            <div className="text-gray-500">Students</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-1">95%</div>
                            <div className="text-gray-500">Success Rate</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-1">50+</div>
                            <div className="text-gray-500">Universities</div>
                        </div>
                        <div className="md:block hidden">
                            <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-1">24/7</div>
                            <div className="text-gray-500">AI Support</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FEATURES ================= */}
            <section className="py-16 px-6 relative z-10"> {/* py-32 -> py-16 */}
                <div className="max-w-6xl mx-auto text-center">
                    <h3 className="text-4xl font-bold mb-12 reveal opacity-0 translate-y-10 transition-all duration-1000"> {/* mb-20 -> mb-12 */}
                        Powerful Features
                    </h3>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { title: "AI Insights", desc: "Get personalized study recommendations and insights based on your performance patterns.", icon: "🔮" },
                            { title: "Smart Scheduling", desc: "Automatically optimize your study calendar around deadlines, exams, and energy levels.", icon: "🗓️" },
                            { title: "Progress Tracking", desc: "Visual dashboards show your improvement and predict your exam readiness.", icon: "📊" },
                            { title: "Focus Mode", desc: "Block distractions and enter deep work sessions with AI-guided timers.", icon: "🧠" },
                            { title: "Exam Simulator", desc: "Practice with real exam conditions and get instant feedback.", icon: "📝" },
                            { title: "Study Groups", desc: "Collaborate with peers and share notes seamlessly.", icon: "👥" }
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="p-10 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10
                      hover:-translate-y-3 hover:shadow-2xl transition-all duration-500
                      reveal opacity-0 translate-y-10 cursor-pointer group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10">
                                    <div className="text-5xl mb-6">{feature.icon}</div>
                                    <h4 className="text-2xl font-semibold mb-4 bg-linear-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                                        {feature.title}
                                    </h4>
                                    <p className="text-gray-400 relative z-10">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= HOW IT WORKS ================= */}
            <section className="py-16 px-6 relative z-10 bg-white/2 backdrop-blur-lg rounded-3xl mx-6 -mb-12"> {/* py-32 -> py-16, -mb-20 -> -mb-12 */}
                <div className="max-w-6xl mx-auto text-center">
                    <h3 className="text-4xl font-bold mb-12 reveal opacity-0 translate-y-10 transition-all duration-1000"> {/* mb-20 -> mb-12 */}
                        How It Works
                    </h3>
                    <div className="grid md:grid-cols-3 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex items-start space-x-4 p-6 rounded-2xl bg-white/5">
                                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-xl font-bold shrink-0">1</div>
                                <div>
                                    <h4 className="text-xl font-semibold mb-2">Connect Your Schedule</h4>
                                    <p className="text-gray-400">Import classes, exams, and deadlines automatically.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4 p-6 rounded-2xl bg-white/5">
                                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center text-xl font-bold shrink-0">2</div>
                                <div>
                                    <h4 className="text-xl font-semibold mb-2">Get AI Plan</h4>
                                    <p className="text-gray-400">Receive your personalized weekly study roadmap.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4 p-6 rounded-2xl bg-white/5">
                                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-xl font-bold shrink-0">3</div>
                                <div>
                                    <h4 className="text-xl font-semibold mb-2">Track & Adjust</h4>
                                    <p className="text-gray-400">Monitor progress and adapt in real-time.</p>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <div className="bg-linear-to-r from-orange-500/10 to-purple-500/10 p-12 rounded-3xl border border-white/20">
                                <h4 className="text-3xl font-bold mb-6 text-center">Your Results in 30 Days</h4>
                                <div className="grid md:grid-cols-2 gap-6 text-left">
                                    <div className="p-6 bg-white/5 rounded-2xl">
                                        <div className="text-3xl font-bold text-yellow-400">+47%</div>
                                        <div className="text-gray-400">Grades Improved</div>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-2xl">
                                        <div className="text-3xl font-bold text-green-400">-62%</div>
                                        <div className="text-gray-400">Study Stress</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= TESTIMONIALS ================= */}
            <section className="py-16 px-6 relative z-10"> {/* py-32 -> py-16 */}
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-4xl font-bold mb-12 reveal opacity-0 translate-y-10 transition-all duration-1000"> {/* mb-20 -> mb-12 */}
                        Students Love It
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { quote: "Doubled my productivity overnight. Finally got an A in calculus!", name: "Priya S.", role: "IIT Delhi" },
                            { quote: "The AI actually understands my schedule. Game changer!", name: "Rahul K.", role: "JEE Aspirant" },
                            { quote: "Stress-free exams. My planner knows me better than I do.", name: "Ananya M.", role: "NEET Topper" }
                        ].map((testimonial, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 hover:shadow-2xl transition-all duration-500 reveal opacity-0 translate-y-10">
                                <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                                <div className="flex items-center justify-center">
                                    <div className="w-12 h-12 bg-linear-to-r from-orange-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4 text-xl font-bold">★</div>
                                    <div className="text-left">
                                        <div className="font-semibold text-white">{testimonial.name}</div>
                                        <div className="text-gray-500">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>

    );
};

export default Home;