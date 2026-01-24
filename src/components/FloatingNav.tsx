"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Connect", link: "#contact" },
];

export const FloatingNav = () => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.5, type: "spring", stiffness: 260, damping: 20 }}
            // REDUCED CORNER RADIUS: rounded-[24px] instead of rounded-full
            className="flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-[24px]"
        >
            {/* LOGO UPDATE: pmglogo.png */}
            <Link href="/" className="px-2">
                <Image
                    src="/pmglogo.png"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="w-8 h-auto opacity-90 hover:opacity-100 transition-opacity"
                />
            </Link>

            {/* DYNAMIC SLIDING NAV ITEMS */}
            <div className="flex items-center relative">
                {navItems.map((item, index) => (
                    <Link
                        key={item.name}
                        href={item.link}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={cn(
                            "relative px-5 py-2 text-xs uppercase tracking-widest font-bold transition-colors duration-200 z-10",
                            // Change text color to black if currently hovered, otherwise white
                            hoveredIndex === index ? "text-black" : "text-white/80 hover:text-white"
                        )}
                    >
                        {/* THE SLIDING WHITE PILL ANIMATION */}
                        {hoveredIndex === index && (
                            <motion.span
                                layoutId="navbar-pill"
                                className="absolute inset-0 bg-white rounded-[18px] -z-10"
                                transition={{
                                    type: "spring",
                                    stiffness: 350,
                                    damping: 30,
                                }}
                            />
                        )}
                        {item.name}
                    </Link>
                ))}
            </div>
        </motion.div>
    );
};