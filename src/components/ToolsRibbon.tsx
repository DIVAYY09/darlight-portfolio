"use client";

import { motion } from "framer-motion";

const tools = [
    "Figma", "Notion", "Linear", "Jira", "React", "Next.js", "Tailwind", "Framer Motion", "Blender", "Spline", "Python", "OpenAI", "Vercel", "TypeScript"
];

export function ToolsRibbon() {
    return (
        <section className="relative w-full z-20 -mt-10">

            {/* 1. THE BADGE (Now outside the overflow-hidden container so it pops out) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-6 py-2 rounded-full z-30 shadow-xl border border-white/10">
                <span className="text-[10px] md:text-xs font-mono text-[#E2D4B7] uppercase tracking-widest font-bold">
                    Arsenal & Tech Stack
                </span>
            </div>

            {/* 2. THE RIBBON CONTAINER */}
            <div className="bg-[#E2D4B7] py-10 rounded-t-[40px] overflow-hidden">
                {/* INFINITE LOOP */}
                <div className="flex relative">
                    <motion.div
                        className="flex whitespace-nowrap"
                        animate={{ x: "-50%" }}
                        transition={{
                            duration: 40, // SLOWED DOWN (Was 20)
                            ease: "linear",
                            repeat: Infinity
                        }}
                    >
                        {[...tools, ...tools].map((tool, i) => (
                            <div key={i} className="flex items-center mx-8 md:mx-16">
                                <span className="text-3xl md:text-5xl font-bold text-black uppercase font-[family-name:var(--font-diamond)] opacity-80 hover:opacity-100 transition-opacity cursor-default">
                                    {tool}
                                </span>
                                <span className="ml-8 md:ml-16 text-xl text-black/30">●</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}