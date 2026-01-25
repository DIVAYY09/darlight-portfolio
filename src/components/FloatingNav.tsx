"use client";

import { motion } from "framer-motion";
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
            className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-4 shadow-2xl"
        >
            <a
                href="https://www.linkedin.com/in/pm-g/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/20 hover:border-[#E2D4B7] transition-colors cursor-pointer shrink-0"
                title="Visit LinkedIn Profile"
            >
                <Image
                    src="/pmlogo.png"
                    alt="Profile"
                    fill
                    className="object-cover"
                />
            </a>

            <div className="h-4 w-[1px] bg-white/10" />

            <div className="flex gap-1" onMouseLeave={() => setHoveredTab(null)}>
                {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={item.action}
                        onMouseEnter={() => setHoveredTab(item.name)}
                        className="relative px-3 py-1.5 text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/70 hover:text-white transition-colors"
                    >
                        {hoveredTab === item.name && (
                            <motion.span
                                layoutId="nav-hover-pill"
                                className="absolute inset-0 bg-white/10 rounded-md -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{item.name}</span>
                    </button>
                ))}
            </div>
        </motion.div>
    );
}