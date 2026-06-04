"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PreLoader() {
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        if (typeof window !== 'undefined') window.scrollTo(0, 0);

        const countInterval = setInterval(() => {
            setCounter((prev) => {
                const jump = Math.floor(Math.random() * 4) + 1;
                if (prev + jump >= 100) {
                    clearInterval(countInterval);
                    return 100;
                }
                return prev + jump;
            });
        }, 30);

        const timer = setTimeout(() => {
            setIsLoading(false);
            setTimeout(() => {
                document.body.style.overflow = "";
            }, 800);
        }, 2800);

        return () => {
            document.body.style.overflow = "";
            clearTimeout(timer);
            clearInterval(countInterval);
        };
    }, []);

    // 20x20 grid = 400 blocks
    const blocks = Array.from({ length: 400 }, (_, i) => i);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none"
                >
                    {/* Pixel Grid Background */}
                    <div 
                        className="absolute inset-0 w-full h-full grid pointer-events-auto"
                        style={{
                            gridTemplateColumns: "repeat(20, minmax(0, 1fr))",
                            gridTemplateRows: "repeat(20, minmax(0, 1fr))"
                        }}
                    >
                        {blocks.map((_, i) => {
                            const rowIndex = Math.floor(i / 20);
                            const colIndex = i % 20;
                            return (
                                <motion.div
                                    key={i}
                                    className="bg-[#f5bd02] w-full h-full origin-center"
                                    exit={{ 
                                        scale: 0,
                                        opacity: 0, 
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut",
                                        delay: (rowIndex + colIndex) * 0.04
                                    }}
                                />
                            );
                        })}
                    </div>

                    {/* STATUS TEXT */}
                    <motion.div 
                        className="relative z-10 flex flex-col items-center justify-center pointer-events-auto mix-blend-difference"
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-bold text-white font-[family-name:var(--font-diamond)] tracking-tighter leading-none">
                            {counter}%
                        </h1>
                        <motion.p
                            className="text-white/60 text-[10px] md:text-xs uppercase tracking-[0.5em] font-mono mt-2"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 0.3, repeat: Infinity }}
                        >
                            {counter < 90 ? "LOADING..." : "SYSTEM READY"}
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}