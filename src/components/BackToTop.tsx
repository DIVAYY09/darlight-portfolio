"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function BackToTop() {
    const { scrollYProgress } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    // Show only after scrolling down
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setIsVisible(latest > 0.1);
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                // CHANGED: right-4 bottom-8 on mobile, right-8 bottom-32 on desktop
                <div className="fixed right-4 bottom-8 md:right-8 md:bottom-32 z-[200] pointer-events-none h-[200px] flex items-end justify-center">

                    {/* THE ROD */}
                    <div
                        className="absolute top-0 w-[2px] h-full bg-white/10"
                        style={{ left: "50%", transform: "translateX(-50%)" }}
                    >
                        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000_2px,#000_4px)] opacity-50" />
                    </div>

                    {/* THE LEVER HANDLE */}
                    <motion.button
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        whileHover={{ y: 10 }}
                        whileTap={{ y: 80 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        onClick={scrollToTop}
                        className="pointer-events-auto relative group flex flex-col items-center !cursor-grab active:!cursor-grabbing p-6 -m-6"
                    >
                        {/* 1. THE GRIP */}
                        <div className="w-4 h-20 bg-neutral-900 rounded-full border border-white/20 relative overflow-hidden flex flex-col items-center justify-between py-2 shadow-2xl group-hover:border-[#E2D4B7] group-hover:shadow-[0_0_20px_rgba(226,212,183,0.3)] transition-all duration-300">
                            {/* Hazard Stripes */}
                            <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,#E2D4B7_4px,#E2D4B7_6px)]" />
                            {/* Screw Head Top */}
                            <div className="w-2 h-2 rounded-full bg-white/20 shadow-inner" />
                            {/* The "Grip" Texture */}
                            <div className="flex flex-col gap-1">
                                <div className="w-2 h-[2px] bg-white/10 rounded-full" />
                                <div className="w-2 h-[2px] bg-white/10 rounded-full" />
                                <div className="w-2 h-[2px] bg-white/10 rounded-full" />
                            </div>
                            {/* Screw Head Bottom */}
                            <div className="w-2 h-2 rounded-full bg-white/20 shadow-inner" />
                        </div>

                        {/* 2. THE PULL RING */}
                        <div className="w-8 h-8 rounded-full border-2 border-[#E2D4B7]/50 mt-[-10px] -z-10 flex items-center justify-center group-hover:bg-[#E2D4B7]/10 transition-colors">
                            <div className="w-1 h-1 bg-[#E2D4B7] rounded-full" />
                        </div>

                        {/* 3. THE LABEL */}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
                            <span className="text-[10px] font-mono text-black font-bold uppercase tracking-widest bg-[#E2D4B7] px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                PULL TO RECALL
                            </span>
                            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#E2D4B7] rotate-45" />
                        </div>

                    </motion.button>
                </div>
            )}
        </AnimatePresence>
    );
}