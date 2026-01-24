"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

export function Contact() {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // PHYSICS UPDATE:
        // Divisor = 1 means it moves exactly with your mouse (Very Strong Pull)
        // Divisor < 1 would mean it moves FASTER than your mouse (Overshoot)
        setPosition({ x: middleX / 1.2, y: middleY / 1.2 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <section className="relative h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden z-10">

            {/* BACKGROUND DECORATION */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div className="w-[40vw] h-[40vw] border border-white/10 rounded-full animate-[spin_60s_linear_infinite]" />
                <div className="absolute w-[60vw] h-[60vw] border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
            </div>

            <div className="text-center mb-12 pointer-events-none">
                <p className="text-neutral-500 text-xs md:text-sm font-mono uppercase tracking-[0.3em] mb-4">
            // End of Transmission
                </p>
                <h2 className="text-4xl md:text-6xl text-white font-[family-name:var(--font-diamond)]">
                    Ready to initiate?
                </h2>
            </div>

            {/* THE GRAVITY WELL TRIGGER ZONE */}
            {/* We use a large padding (p-20) invisible box to capture the mouse early */}
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={reset}
                animate={{ x: position.x, y: position.y }}
                // PHYSICS: stiffer = snappier, lower damping = more wobbly/alive
                transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
                className="relative z-20 cursor-pointer group p-20"
            >
                {/* THE ACTUAL BUTTON */}
                <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-[#E2D4B7] flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:scale-110 shadow-[0_0_40px_rgba(226,212,183,0.3)]">

                    {/* Ripple Effect */}
                    <div className="absolute inset-0 bg-white/40 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 ease-out" />

                    <span className="relative z-10 text-black font-bold text-lg md:text-xl uppercase tracking-widest group-hover:scale-110 transition-transform">
                        Let's Talk
                    </span>
                </div>
            </motion.div>

            {/* FOOTER LINKS */}
            <div className="absolute bottom-10 w-full flex justify-between px-10 text-neutral-500 text-xs font-mono uppercase tracking-widest pointer-events-auto">
                <div className="flex gap-6">
                    <a href="#" className="hover:text-[#E2D4B7] transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-[#E2D4B7] transition-colors">Twitter</a>
                    <a href="#" className="hover:text-[#E2D4B7] transition-colors">Email</a>
                </div>
                <div>
                    © 2026 DarkLight Studio
                </div>
            </div>

        </section>
    );
}