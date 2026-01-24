"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

export function About() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Track mouse relative to this specific section
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    };

    // Content component for reusability
    const Content = ({ isRevealLayer }: { isRevealLayer?: boolean }) => (
        <div className="text-left w-full max-w-7xl">
            <span className="block mb-4 text-4xl md:text-7xl font-bold tracking-tighter uppercase font-[family-name:var(--font-diamond)]">
                I’m Divay.
            </span>
            <span className={`block text-4xl md:text-7xl font-bold tracking-tighter uppercase font-[family-name:var(--font-diamond)] ${isRevealLayer ? "text-yellow-600" : ""}`}>
                Strategist. Designer. Solver.
            </span>

            <p className="mt-8 text-sm md:text-xl leading-relaxed normal-case font-sans font-medium max-w-2xl">
                I navigate the unknown to find clear solutions. My work fuses data-driven strategy with compelling visuals to build products that aren't just functional, but memorable. I dig deep into the <span className={isRevealLayer ? "text-yellow-600 font-bold" : ""}>&quot;why&quot;</span> to create the perfect <span className={isRevealLayer ? "text-yellow-600 font-bold" : ""}>&quot;how.&quot;</span>
            </p>
        </div>
    );

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen w-full bg-[#E8E8E8] rounded-t-[40px] flex flex-col justify-center items-start pl-6 md:pl-20 overflow-hidden cursor-none"
        >
            {/* 1. "DECLASSIFIED" HEADER (Moved Up) */}
            {/* CHANGED: top-16 md:top-24 -> top-12 md:top-16 (Creates more space above) */}
            <div className="absolute top-12 md:top-16 left-6 md:left-20 z-40">
                <motion.div
                    initial={{ width: 0, borderRight: "2px solid #000" }}
                    whileInView={{ width: "100%", borderRight: "0px solid #000" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    className="overflow-hidden whitespace-nowrap pr-1"
                >
                    <p className="text-black/60 text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] font-bold">
                // SUBJECT: DECLASSIFIED
                    </p>
                </motion.div>
            </div>

            {/* 2. BACKGROUND TEXT (Ghost Layer) - Pushed Down */}
            {/* CHANGED: Added pt-24 md:pt-32 to push text down away from the header */}
            <div className="absolute inset-0 flex flex-col justify-center items-start pl-6 md:pl-20 pt-24 md:pt-32 pointer-events-none select-none">
                <div className="text-neutral-300/60">
                    <Content />
                </div>
            </div>

            {/* 3. FOREGROUND TEXT (Real Layer) - Pushed Down to Match */}
            {/* CHANGED: Added pt-24 md:pt-32 to match ghost layer position */}
            <motion.div
                className="absolute inset-0 flex flex-col justify-center items-start pl-6 md:pl-20 pt-24 md:pt-32 pointer-events-none select-none z-10"
                animate={{
                    WebkitMaskImage: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, black 20%, transparent 100%)`,
                    maskImage: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, black 20%, transparent 100%)`,
                } as any}
                transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
            >
                <div className="text-black">
                    <Content isRevealLayer={true} />
                </div>
            </motion.div>

            {/* 4. CUSTOM CURSOR DOT */}
            <div className="absolute inset-0 pointer-events-none z-20">
                <motion.div
                    className="w-4 h-4 rounded-full fixed shadow-[0_0_20px_rgba(234,179,8,0.8)] border border-yellow-500/50 bg-yellow-500/20 backdrop-blur-sm"
                    animate={{
                        x: mousePosition.x - 8,
                        y: mousePosition.y - 8
                    }}
                    transition={{ type: "tween", ease: "linear", duration: 0 }}
                />
            </div>

            {/* 5. INSTRUCTION HINT */}
            <div className="absolute bottom-10 right-10 z-30 opacity-50">
                <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-black text-right">
                    [ CLASSIFIED INTEL ]<br />
                    USE CURSOR TO REVEAL
                </p>
            </div>

        </section>
    );
}