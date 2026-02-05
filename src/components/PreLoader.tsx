"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Types for particles
type Particle = { id: number; x: number; y: number; rotation: number; delay: number; duration: number };
type Debris = { id: number; x: number; y: number; rotationSpeed: number; size: number; delay: number; duration: number };

export function PreLoader() {
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);
    // Two types of elements being sucked in: Light Streaks & Physical Debris
    const [streaks, setStreaks] = useState<Particle[]>([]);
    const [debrisChunks, setDebrisChunks] = useState<Debris[]>([]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        if (typeof window !== 'undefined') window.scrollTo(0, 0);

        // 1. Generate Light Streaks (Fast lines)
        const generatedStreaks = [...Array(40)].map((_, i) => {
            const angle = Math.random() * 360;
            const distance = 1000 + Math.random() * 500;
            return {
                id: i,
                x: Math.cos(angle * (Math.PI / 180)) * distance,
                y: Math.sin(angle * (Math.PI / 180)) * distance,
                rotation: angle + 90,
                delay: Math.random() * 2,
                duration: Math.random() * 0.5 + 0.3
            };
        });
        setStreaks(generatedStreaks);

        // 2. Generate Crumbling Debris (Slower, rotating chunks)
        const generatedDebris = [...Array(25)].map((_, i) => {
            const angle = Math.random() * 360;
            const distance = 1200 + Math.random() * 600; // Start further out
            return {
                id: i + 100,
                x: Math.cos(angle * (Math.PI / 180)) * distance,
                y: Math.sin(angle * (Math.PI / 180)) * distance,
                rotationSpeed: (Math.random() - 0.5) * 720, // Random fast spin
                size: Math.random() * 15 + 5, // Varied chunk sizes
                delay: Math.random() * 1.5,
                duration: Math.random() * 1 + 0.8 // Slower than streaks
            };
        });
        setDebrisChunks(generatedDebris);

        // 3. Counter Logic
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

        // 4. Finish Logic
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

    // Intensity multiplier based on progress
    const intensity = counter / 100;

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-black overflow-hidden"
                    exit={{
                        opacity: 0,
                        scale: 2, // Massive expansion on exit
                        filter: "blur(40px) brightness(5)", // Intense flash out
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                >
                    {/* === 1. BACKGROUND COLLAPSE === */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#111_0%,_#000_80%)]" />

                        {/* Subtle Cracked Noise Texture fading in */}
                        <motion.div
                            className="absolute inset-0 opacity-0 mix-blend-overlay"
                            animate={{ opacity: intensity * 0.3 }}
                            style={{ backgroundImage: 'url("/panel-texture.png")', backgroundSize: 'cover' }}
                        />

                        {/* Rotating Grid shrinking faster */}
                        <motion.div
                            className="absolute inset-[-100%] opacity-30"
                            style={{
                                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                                backgroundSize: '60px 60px',
                            }}
                            animate={{
                                rotate: 360,
                                scale: [1.5, 0.1] // Extreme shrinking
                            }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeIn" }}
                        />

                        {/* Layer A: Light Streaks (Existing) */}
                        {streaks.map((p) => (
                            <motion.div
                                key={p.id}
                                className="absolute top-1/2 left-1/2 w-[1px] h-[60px] bg-gradient-to-b from-transparent via-blue-100 to-transparent"
                                initial={{ x: p.x, y: p.y, rotate: p.rotation, opacity: 0 }}
                                animate={{ x: 0, y: 0, opacity: [0, 1, 0], scaleY: [1, 4, 0] }}
                                transition={{ duration: p.duration, repeat: Infinity, ease: "easeIn", delay: p.delay }}
                            />
                        ))}

                        {/* Layer B: NEW CRUMBLING DEBRIS CHUNKS */}
                        {debrisChunks.map((d) => (
                            <motion.div
                                key={d.id}
                                className="absolute top-1/2 left-1/2 bg-[#333] border border-white/20"
                                style={{ width: d.size, height: d.size }}
                                initial={{ x: d.x, y: d.y, opacity: 0, rotate: 0 }}
                                animate={{
                                    x: 0, y: 0,
                                    opacity: [0, 1, 0],
                                    rotate: d.rotationSpeed,
                                    scale: [1, 0.2] // Shrink as they fall in
                                }}
                                transition={{ duration: d.duration, repeat: Infinity, ease: "easeIn", delay: d.delay }}
                            />
                        ))}
                    </div>

                    {/* === 2. SINGULARITY CORE & FLARES === */}
                    <motion.div
                        className="relative z-10 flex flex-col items-center justify-center"
                        animate={{
                            // Extreme shaking near end
                            x: counter > 85 ? [0, -4, 4, -3, 3, 0] : 0,
                            y: counter > 85 ? [0, 4, -4, 3, -3, 0] : 0,
                        }}
                        transition={{ duration: 0.04, repeat: counter > 85 ? Infinity : 0 }}
                    >
                        {/* NEW: INTENSE CENTER FLARES (Bursts of light) */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"
                            animate={{
                                opacity: [0, intensity * 0.6, 0], // Flash intensity based on progress
                                scale: [0.8, 1.1, 0.9],
                            }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/30 blur-[80px] rounded-full mix-blend-overlay pointer-events-none"
                            animate={{
                                opacity: [0, intensity * 0.8, 0], // Faster white flashes
                                scale: [0.9, 1.3, 0.8],
                            }}
                            transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }}
                        />

                        {/* BLACK HOLE RINGS & LOGO */}
                        <div className="relative mb-8">
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 border border-white/30 rounded-full border-dashed"
                                animate={{ rotate: 360, scale: [1, 0.8, 1] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                            />
                            <div className="relative w-32 h-32 md:w-40 md:h-40 bg-black rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_80px_rgba(255,255,255,0.2)] z-20">
                                <motion.div
                                    animate={{ rotateY: 360 }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="relative w-20 h-20 md:w-24 md:h-24 perspective-1000"
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <Image src="/logo.png" alt="Logo" fill className="object-contain" priority />
                                </motion.div>
                            </div>
                        </div>

                        {/* STATUS TEXT */}
                        <div className="flex flex-col items-center gap-2 mix-blend-difference relative z-30">
                            <h1 className="text-6xl md:text-8xl font-bold text-white font-[family-name:var(--font-diamond)] tracking-tighter leading-none">
                                {counter}%
                            </h1>
                            <motion.p
                                className="text-white/60 text-[10px] md:text-xs uppercase tracking-[0.5em] font-mono"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 0.3, repeat: Infinity }}
                            >
                                {counter < 90 ? "REALITY COLLAPSING..." : "SINGULARITY ACHIEVED"}
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}