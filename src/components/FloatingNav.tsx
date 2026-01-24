"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },

    { name: "Connect +", href: "#contact" }, // Moved inside for dynamic animation
];

export function FloatingNav({ className }: { className?: string }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
            className={cn("absolute bottom-2 left-1/2 -translate-x-1/2 z-40 w-auto", className)}
        >
            <nav className="flex items-center gap-2 p-2 bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">

                {/* Left: Avatar/Logo */}
                <Link href="/" className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/5 overflow-hidden shrink-0 hover:opacity-80 transition-opacity">
                    <div className="relative w-full h-full p-1">
                        <Image src="/pmlogo.png" alt="Logo" fill className="object-contain" />
                    </div>
                </Link>

                {/* Center: Links with Sliding Pill Animation */}
                <div className="flex items-center relative">
                    {navItems.map((item, index) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={cn(
                                "relative px-4 py-2 text-xs uppercase tracking-widest font-bold transition-colors duration-200 z-10",
                                // Text becomes black when hovered (because of white pill), otherwise white
                                hoveredIndex === index ? "text-black" : "text-white/70"
                            )}
                        >
                            {hoveredIndex === index && (
                                <motion.span
                                    layoutId="navbar-pill"
                                    className="absolute inset-0 bg-white rounded-lg -z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {item.name}
                        </Link>
                    ))}
                </div>
            </nav>
        </motion.div>
    );
}