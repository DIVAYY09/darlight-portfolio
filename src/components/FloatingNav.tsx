"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Journal", href: "#projects" }, // Using projects as placeholder for Journal
];

export function FloatingNav({ className }: { className?: string }) {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
            className={cn("absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-4", className)}
        >
            <nav className="flex items-center justify-between p-2 pl-3 bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">

                {/* Left: Avatar Placeholder */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 border border-white/5 overflow-hidden shrink-0">
                    {/* Using logo.png as requested, or a colored circle placeholder */}
                    <div className="relative w-full h-full">
                        <Image src="/logo.png" alt="Avatar" fill className="object-cover" />
                    </div>
                </div>

                {/* Center: Links */}
                <div className="hidden sm:flex items-center gap-1 mx-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="px-4 py-2 rounded-full text-sm font-medium text-neutral-400 hover:text-white transition-all hover:bg-white/5"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Right: Connect Button */}
                <Link
                    href="#contact"
                    className="flex items-center px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:scale-105 transition-transform"
                >
                    CONNECT +
                </Link>
            </nav>
        </motion.div>
    );
}
