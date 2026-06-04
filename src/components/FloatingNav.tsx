"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function FloatingNav() {
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);

    // Helper to scroll to ID
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const navItems = [
        { name: "Home", action: () => scrollToSection("home") },
        { name: "About", action: () => scrollToSection("about") },
        { name: "Work", action: () => scrollToSection("work") },
        { name: "Connect +", action: () => scrollToSection("contact") },
    ];

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2 flex items-center gap-4 shadow-lg"
        >

            <div className="flex gap-1" onMouseLeave={() => setHoveredTab(null)}>
                {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={item.action}
                        onMouseEnter={() => setHoveredTab(item.name)}
                        className="relative px-3 py-1.5 text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/70 hover:text-white transition-colors"
                    >
                        <AnimatePresence>
                            {hoveredTab === item.name && (
                                <svg className="absolute inset-x-0 bottom-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                                    <motion.path
                                        d="M5,35 Q20,28 45,34 T95,28 M90,28 Q60,35 10,32"
                                        stroke="#f5bd02"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                    />
                                </svg>
                            )}
                        </AnimatePresence>
                        <motion.span 
                            className="relative z-10 block"
                            animate={{ y: hoveredTab === item.name ? -3 : 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            {item.name}
                        </motion.span>
                    </button>
                ))}
            </div>
        </motion.div>
    );
}