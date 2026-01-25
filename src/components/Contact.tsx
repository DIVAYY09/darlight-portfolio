"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image"; // 1. IMPORT IMAGE COMPONENT
import { ContactModal } from "./ContactModal";

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
        // 2. REMOVED 'bg-black' from here so the image shows through
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden z-10">

            {/* === NEW BACKGROUND IMAGE LAYER === */}
            {/* We use -z-10 to ensure it sits behind all content */}
            <div className="absolute inset-0 -z-10 w-full h-full">
                <Image
                    // 3. REPLACE WITH YOUR IMAGE FILENAME INSIDE THE PUBLIC FOLDER
                    src="/contact-bg.jpg"
                    alt="Contact Background"
                    fill
                    // 'object-cover' ensures it fills the screen without stretching
                    className="object-cover"
                    priority // Loads immediately
                />

                {/* OPTIONAL OVERLAY: Adds a dark tint so text remains readable over the image. 
             Adjust 'bg-black/50' (higher number = darker) as needed. */}
                <div className="absolute inset-0 bg-black/60" />
            </div>


            {/* === CONTENT (Animations remain intact below) === */}
            <div className="text-center mb-12 pointer-events-none relative z-10">
                <p className="text-neutral-500 text-xs md:text-sm font-mono uppercase tracking-[0.3em] mb-4">
            // End of Transmission
                </p>
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
                className="relative z-20 cursor-pointer group p-20"
            >
                <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-[#E2D4B7] flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:scale-110 shadow-[0_0_60px_rgba(226,212,183,0.4)]">
                    <div className="absolute inset-0 bg-white/40 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 ease-out" />
                    <span className="relative z-10 text-black font-bold text-lg md:text-xl uppercase tracking-widest group-hover:scale-110 transition-transform">
                        Let's Talk
                    </span>
                </div>
            </motion.div>

            {/* FOOTER LINKS */}
            <div className="absolute bottom-10 w-full flex justify-between px-10 text-neutral-300 text-xs font-mono uppercase tracking-widest pointer-events-auto z-20">
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