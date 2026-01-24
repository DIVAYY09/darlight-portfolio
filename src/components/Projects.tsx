"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// DUMMY DATA
const strategies = [
    { id: "01", title: "NEURAL MARKET FIT", category: "Case Study", date: "2024" },
    { id: "02", title: "THE SILENT LAUNCH", category: "Tear Down", date: "2023" },
    { id: "03", title: "GROWTH HACKING 2.0", category: "Protocol", date: "2025" },
    { id: "04", title: "ALGORITHMIC BRANDING", category: "Case Study", date: "2024" },
    { id: "05", title: "USER PSYCHE MAPPING", category: "Research", date: "2023" },
    { id: "06", title: "DARK PATTERN ETHICS", category: "Tear Down", date: "2025" },
];

const designs = [
    { color: "bg-red-500", text: "UI SYSTEM" },
    { color: "bg-blue-500", text: "3D ASSETS" },
    { color: "bg-purple-500", text: "MOTION" },
    { color: "bg-green-500", text: "BRANDING" },
];

export function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);

    // SCROLL HOOKS
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // --- ANIMATION SEQUENCE ---

    // 1. TEXT FADE (0% -> 10%)
    const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const textScale = useTransform(scrollYProgress, [0, 0.1], [1, 1.1]); // Subtle zoom out

    // 2. THE BREACH (10% -> 25%) - Doors wait for text to fade before opening
    const breachLeftX = useTransform(scrollYProgress, [0.1, 0.25], ["0%", "-100%"]);
    const breachRightX = useTransform(scrollYProgress, [0.1, 0.25], ["0%", "100%"]);

    // 3. THE STRATEGY LIST SCROLL (25% -> 100%)
    const listY = useTransform(scrollYProgress, [0.25, 1], ["0%", "-60%"]);

    // AUTO-ROTATION LOGIC
    const [rotation, setRotation] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setRotation((prev) => prev + 90);
        }, 3000);

        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <section
            ref={containerRef}
            className="relative h-[300vh] w-full bg-neutral-900"
        >

            {/* STICKY VIEWPORT */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

                {/* === THE BREACH DOORS === */}
                <motion.div
                    style={{ x: breachLeftX }}
                    className="absolute top-0 left-0 w-1/2 h-full bg-[#E8E8E8] z-50 border-r border-black/10 flex items-center justify-end pr-4 md:pr-10"
                >
                    {/* LEFT HALF OF TEXT (Optional split effect, or we keep text separate on top) */}
                </motion.div>

                <motion.div
                    style={{ x: breachRightX }}
                    className="absolute top-0 right-0 w-1/2 h-full bg-[#E8E8E8] z-50 border-l border-black/10 flex items-center justify-start pl-4 md:pl-10"
                />

                {/* === TITLE: PROJECT CONTROL PANEL (On top of doors) === */}
                <motion.div
                    style={{ opacity: textOpacity, scale: textScale }}
                    className="absolute z-[60] pointer-events-none text-center"
                >
                    <h2 className="text-3xl md:text-6xl font-bold text-neutral-400/80 uppercase tracking-widest font-[family-name:var(--font-diamond)]">
                        Project<br />Control Panel
                    </h2>
                    <p className="mt-4 text-xs font-mono text-neutral-500 uppercase tracking-[0.3em]">
                // Accessing Secure Archives
                    </p>
                </motion.div>


                {/* === THE MAIN CONTENT === */}
                <div className="w-full h-full max-w-[95%] grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6 relative z-10">

                    {/* --- LEFT CARD: DESIGN (Visuals) --- */}
                    <div className="relative w-full h-full bg-[#111] rounded-[30px] overflow-hidden border border-white/5 flex flex-col p-6 md:p-10">

                        {/* Header */}
                        <div className="flex justify-between items-start mb-4 md:mb-8 shrink-0">
                            <h3 className="text-4xl md:text-6xl font-bold text-white font-[family-name:var(--font-diamond)]">
                                DESIGN
                            </h3>
                            <span className="px-3 py-1 border border-white/20 rounded-full text-[10px] uppercase tracking-widest text-white/50">
                                Visual Core
                            </span>
                        </div>

                        {/* 3D Carousel Cylinder - SMALLER & TIGHTER */}
                        <div
                            className="flex-1 flex items-center justify-center perspective-[1000px] relative my-4 md:my-0"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <motion.div
                                className="relative w-28 h-40 md:w-40 md:h-56 preserve-3d" // REDUCED SIZE
                                animate={{ rotateY: rotation }}
                                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {designs.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`absolute inset-0 rounded-xl ${item.color} opacity-90 flex items-center justify-center text-black font-bold text-lg md:text-xl border-2 border-white/10 shadow-2xl`}
                                        style={{
                                            // Reduced translateZ to 130px to bring them closer
                                            transform: `rotateY(${i * 90}deg) translateZ(130px)`,
                                        }}
                                    >
                                        {item.text}
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Footer / Button */}
                        <div className="mt-auto flex justify-center w-full shrink-0 pt-4">
                            <button className="group w-fit px-6 py-3 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-yellow-400 transition-colors flex items-center gap-4 text-xs md:text-sm">
                                <span>View Blueprints</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                    </div>


                    {/* --- RIGHT CARD: STRATEGY (Dossiers) --- */}
                    <div className="relative w-full h-full bg-[#E8E8E8] rounded-[30px] overflow-hidden border border-black/5 flex flex-col">

                        {/* Header */}
                        <div className="absolute top-0 left-0 w-full p-8 md:p-12 z-20 bg-gradient-to-b from-[#E8E8E8] via-[#E8E8E8] to-transparent h-40 flex justify-between items-start pointer-events-none">
                            <h3 className="text-4xl md:text-6xl font-bold text-black font-[family-name:var(--font-diamond)]">
                                STRATEGY
                            </h3>
                            <span className="px-3 py-1 border border-black/20 rounded-full text-[10px] uppercase tracking-widest text-black/50">
                                Classified
                            </span>
                        </div>

                        {/* Scrolling List */}
                        <div className="flex-1 overflow-hidden relative mt-40 px-6 md:px-12 pb-12">
                            <motion.div style={{ y: listY }} className="flex flex-col gap-2">
                                {strategies.map((strategy, index) => (
                                    <div
                                        key={index}
                                        className="group relative w-full h-24 md:h-32 border-b border-black/10 flex items-center justify-between cursor-pointer overflow-hidden rounded-lg px-4"
                                    >
                                        {/* BLACK RECTANGLE HOVER EFFECT */}
                                        <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />

                                        {/* Content */}
                                        <div className="flex flex-col relative z-10 group-hover:text-white transition-colors duration-300">
                                            <span className="text-xs font-mono text-black/40 mb-1 group-hover:text-white/50">
                                                {strategy.id} // {strategy.category}
                                            </span>
                                            <h4 className="text-xl md:text-3xl font-bold uppercase font-[family-name:var(--font-diamond)]">
                                                {strategy.title}
                                            </h4>
                                        </div>

                                        {/* Date */}
                                        <span className="relative z-10 text-xs font-mono text-black/40 border border-black/10 px-2 py-1 rounded group-hover:text-white/50 group-hover:border-white/20 transition-colors">
                                            {strategy.date}
                                        </span>
                                    </div>
                                ))}
                                <div className="h-64 w-full" />
                            </motion.div>
                        </div>

                        {/* Fade overlay at bottom */}
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#E8E8E8] to-transparent z-20 pointer-events-none" />

                    </div>

                </div>
            </div>
        </section>
    );
}