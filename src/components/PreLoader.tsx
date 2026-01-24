"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function PreLoader() {
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        // Lock scroll
        document.body.style.overflow = "hidden";

        // COUNTER LOGIC: fast count to 100
        const countInterval = setInterval(() => {
            setCounter((prev) => {
                if (prev < 100) {
                    return prev + 1;
                } else {
                    clearInterval(countInterval);
                    return 100;
                }
            });
        }, 20);

        // FINISH LOGIC
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "";
        }, 2500);

        return () => {
            document.body.style.overflow = "";
            clearTimeout(timer);
            clearInterval(countInterval);
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">

                    {/* LEFT PANEL */}
                    <motion.div
                        initial={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                        className="absolute left-0 top-0 w-1/2 h-full bg-[#050505] z-20"
                    />

                    {/* RIGHT PANEL */}
                    <motion.div
                        initial={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                        className="absolute right-0 top-0 w-1/2 h-full bg-[#050505] z-20"
                    />

                    {/* CENTER CONTENT */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        // Added perspective here to make the 3D rotation look real
                        className="relative z-30 flex flex-col items-center justify-center gap-4"
                        style={{ perspective: "1000px" }}
                    >
                        {/* 1. 3D ROTATING LOGO (Y-AXIS) */}
                        <motion.div
                            initial={{ rotateY: 0 }}
                            animate={{ rotateY: 360 }}
                            // Ease "easeInOut" makes it look heavier and more premium than "linear"
                            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                            className="relative w-24 h-24 md:w-32 md:h-32 mb-4"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                fill
                                className="object-contain opacity-80"
                                priority
                            />
                        </motion.div>

                        {/* 2. THE PERCENTAGE COUNTER */}
                        <h1 className="text-6xl md:text-8xl font-bold text-white font-[family-name:var(--font-diamond)] tabular-nums tracking-tighter">
                            {counter}%
                        </h1>

                        {/* 3. LOADING TEXT */}
                        <p className="text-white/40 text-xs uppercase tracking-[0.2em] animate-pulse">
                            Initializing Studio
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}