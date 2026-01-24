"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function FloatingNav() {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl"
        >
            {/* 1. LINKEDIN LOGO BUTTON */}
            <a
                href="https://www.linkedin.com/in/pm-g/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 hover:border-[#E2D4B7] transition-colors cursor-pointer"
                title="Visit LinkedIn Profile"
            >
                {/* Replace with your actual logo image if you have one, or use a placeholder */}
                <Image
                    src="/pmlogo.png" // Using portrait as logo placeholder for now
                    alt="Profile"
                    fill
                    className="object-cover"
                />
            </a>

            {/* 2. NAVIGATION LINKS */}
            <div className="h-4 w-[1px] bg-white/10" /> {/* Divider */}

            <div className="flex gap-6 text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/70">
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#E2D4B7] transition-colors">Home</button>
                <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="hover:text-[#E2D4B7] transition-colors">About</button>
                <button onClick={() => window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' })} className="hover:text-[#E2D4B7] transition-colors">Work</button>
                <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="hover:text-[#E2D4B7] transition-colors">Connect +</button>
            </div>

        </motion.div>
    );
}