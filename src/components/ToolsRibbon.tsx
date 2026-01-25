"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// VERIFIED SLUGS (2026 Standards)
const tools = [
    { name: "Figma", slug: "figma" },
    { name: "Notion", slug: "notion" },
    { name: "Linear", slug: "linear" },
    { name: "Jira", slug: "jira" },
    { name: "Miro", slug: "miro" },
    { name: "Amplitude", slug: "amplitude" },
    { name: "Maze", slug: "maze" },
    { name: "Dovetail", slug: "dovetail" },
    { name: "Framer", slug: "framer" },
    { name: "Rive", slug: "rive" },
    { name: "Power BI", slug: "powerbi" },
    { name: "Python", slug: "python" },
    { name: "OpenAI", slug: "openai" },
];

export function ToolsRibbon() {
    return (
        <section className="relative w-full z-20 -mt-10">

            {/* 1. THE BADGE */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-6 py-2 rounded-full z-30 shadow-xl border border-white/10">
                <span className="text-[10px] md:text-xs font-mono text-[#E2D4B7] uppercase tracking-widest font-bold">
                    Arsenal & Tech Stack
                </span>
            </div>

            {/* 2. THE RIBBON CONTAINER */}
            <div className="bg-[#E2D4B7] py-10 rounded-t-[40px] overflow-hidden border-t border-black/5">
                {/* INFINITE LOOP */}
                <div className="flex relative">
                    <motion.div
                        className="flex whitespace-nowrap items-center"
                        animate={{ x: "-50%" }}
                        transition={{
                            duration: 40,
                            ease: "linear",
                            repeat: Infinity
                        }}
                    >
                        {/* Render list twice for infinite loop */}
                        {[...tools, ...tools].map((tool, i) => (
                            <div key={i} className="flex items-center mx-8 md:mx-12 group">

                                {/* LOGO (Black to match theme) */}
                                <div className="relative w-8 h-8 md:w-12 md:h-12 mr-4 md:mr-6 opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                    <Image
                                        src={`https://cdn.simpleicons.org/${tool.slug}/000000`}
                                        alt={`${tool.name} logo`}
                                        fill
                                        className="object-contain"
                                        unoptimized // Crucial for external SVGs
                                    />
                                </div>

                                {/* TEXT */}
                                <span className="text-3xl md:text-5xl font-bold text-black uppercase font-[family-name:var(--font-diamond)] opacity-80 group-hover:opacity-100 transition-opacity cursor-default">
                                    {tool.name}
                                </span>

                                {/* SEPARATOR */}
                                <span className="ml-8 md:ml-12 text-xl text-black/20">●</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}