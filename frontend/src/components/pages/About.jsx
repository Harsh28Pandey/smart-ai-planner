import React from "react";
import { motion } from "framer-motion";

const About = () => {
    return (
        <div className="relative min-h-screen bg-[#1C1C1E] text-white overflow-hidden pt-40 px-6">

            {/* Background Subtle Glow */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-15"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-500 rounded-full blur-[150px] opacity-15"></div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-6xl font-extrabold mb-10 bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-500 bg-clip-text text-transparent"
                >
                    About AI Study Planner
                </motion.h2>

                {/* Core Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10"
                >
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
                        AI Study Planner is a structured academic productivity platform
                        built to help students plan efficiently, focus consistently,
                        and improve measurable performance outcomes.
                    </p>

                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        The system integrates intelligent study recommendations,
                        task organization, performance tracking, and behavioral
                        insights into a single unified workspace.
                    </p>

                    <p className="text-gray-400 text-lg leading-relaxed">
                        By combining structured planning principles with adaptive AI models,
                        the platform reduces decision fatigue, increases clarity,
                        and promotes long-term academic consistency.
                    </p>
                </motion.div>

            </div>
        </div>
    );
};

export default About;