"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image"; // 1. IMPORT IMAGE COMPONENT
import { ContactModal } from "./ContactModal";

const DotGrid = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const spacing = 45; // Wide gap spacing
        const baseRadius = 1.5;
        const maxRadius = spacing / 2; // Edge-to-edge touch when expanded
        const interactionRadius = 150;
        const padding = 64; // Inset margin for dots

        let dots: { x: number; y: number; currentRadius: number }[] = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initDots();
        };

        const initDots = () => {
            dots = [];
            // Generate dots only within the inner bounds
            for (let x = padding; x < canvas.width - padding; x += spacing) {
                for (let y = padding; y < canvas.height - padding; y += spacing) {
                    dots.push({ x, y, currentRadius: baseRadius });
                }
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(226, 212, 183, 0.5)'; // Match accent color #E2D4B7

            dots.forEach(dot => {
                const dx = mouse.current.x - dot.x;
                const dy = mouse.current.y - dot.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                let targetRadius = baseRadius;
                if (dist < interactionRadius) {
                    // Smooth easing factor for radius
                    const factor = 1 - (dist / interactionRadius);
                    const easedFactor = factor * factor * (3 - 2 * factor); // smoothstep
                    targetRadius = baseRadius + (maxRadius - baseRadius) * easedFactor;
                }

                // Smoothly lerp the radius towards target (no coordinate movement)
                dot.currentRadius += (targetRadius - dot.currentRadius) * 0.15;

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, Math.max(0, dot.currentRadius), 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleMouseLeave = () => {
            mouse.current = { x: -1000, y: -1000 };
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        resize();
        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full z-0 pointer-events-none" 
        />
    );
};

export function Contact() {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // MODAL STATE
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX / 1.2, y: middleY / 1.2 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden z-10 bg-black">
            

                {/* === NEW BACKGROUND IMAGE LAYER === */}
                {/* We use -z-10 to ensure it sits behind all content */}
                <div className="absolute inset-0 -z-10 w-full h-full">
                    <Image
                        src="/contact-bg.jpg"
                        alt="Contact Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/70" />
                </div>


            {/* === DOT GRID BACKGROUND === */}
            <DotGrid />

            {/* === CONTENT (Animations remain intact below) === */}
            <div className="text-center mb-12 pointer-events-none relative z-10">

                <h2 className="text-4xl md:text-6xl text-white font-[family-name:var(--font-diamond)]">
                    Ready to initiate?
                </h2>
            </div>

            {/* THE GRAVITY WELL TRIGGER ZONE */}
            <motion.div
                ref={ref}
                onClick={() => setIsModalOpen(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={reset}
                animate={{ x: position.x, y: position.y }}
                transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
                className="relative z-10 pointer-events-auto cursor-pointer group p-20"
            >
                <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-[#E2D4B7] flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:scale-110 shadow-[0_0_60px_rgba(226,212,183,0.4)]">
                    <div className="absolute inset-0 bg-white/40 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 ease-out" />
                    <span className="relative z-10 text-black font-bold text-lg md:text-xl uppercase tracking-widest group-hover:scale-110 transition-transform">
                        Let's Talk
                    </span>
                </div>
            </motion.div>

            {/* FOOTER LINKS */}
            <div className="absolute bottom-10 w-full flex justify-between px-10 text-neutral-400 text-xs font-mono uppercase tracking-widest pointer-events-auto z-20">
                <div className="flex gap-6">
                    <a href="https://www.linkedin.com/in/divay09/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E2D4B7] transition-colors">LinkedIn</a>
                    <a href="https://www.behance.net/designbydarklight" target="_blank" rel="noopener noreferrer" className="hover:text-[#E2D4B7] transition-colors">Behance</a>
                    <a href="https://x.com/PM_Guy34" target="_blank" rel="noopener noreferrer" className="hover:text-[#E2D4B7] transition-colors">Twitter</a>
                    <a href="mailto:divay034@gmail.com" className="hover:text-[#E2D4B7] transition-colors">Email</a>
                </div>
                <div>
                    © 2026 DarkLight Studio
                </div>
            </div>



            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

        </section>
    );
}