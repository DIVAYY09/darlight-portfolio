"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function PreLoader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Lock scroll during animation
        document.body.style.overflow = "hidden";

        // Unlock scroll after animation sequence (approx 2s total buffer)
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "";
        }, 2000);

        return () => {
            document.body.style.overflow = "";
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <div className="fixed inset-0 z-50 flex pointer-events-none">
                    {/* Left Panel */}
                    <motion.div
                        initial={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
                        className="w-1/2 h-full bg-[#050505] relative z-20"
                    />

                    {/* Right Panel */}
                    <motion.div
                        initial={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
                        className="w-1/2 h-full bg-[#050505] relative z-20"
                    />

                    {/* Logo Container - Absolute center to sit on top of split panels */}
                    <motion.div
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, ease: "easeIn" }}
                        className="absolute inset-0 z-30 flex items-center justify-center p-10"
                    >
                        {/* Using a white logo placeholder if logo.png is dark, or just the image */}
                        <div className="relative w-32 h-32 md:w-48 md:h-48">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
