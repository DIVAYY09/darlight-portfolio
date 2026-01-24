"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Define the shape of data we expect
export interface ProjectData {
    title: string;
    category: string;
    date?: string;
    tags?: string[];
    description?: string;
}

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: ProjectData | null;
}

export function ProjectModal({ isOpen, onClose, data }: ProjectModalProps) {
    // NEW: State to track if the window is maximized
    const [isMaximized, setIsMaximized] = useState(false);

    // Reset maximize state when modal opens/closes
    useEffect(() => {
        if (!isOpen) setIsMaximized(false);
    }, [isOpen]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    if (!data) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* 1. BACKDROP (BLUR) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md cursor-pointer"
                    />

                    {/* 2. THE HOLOGRAPHIC CARD CONTAINER */}
                    {/* Conditional Padding: Removes padding when maximized so it hits the edges */}
                    <div className={`fixed inset-0 z-[101] flex items-center justify-center pointer-events-none transition-all duration-300 ${isMaximized ? "p-0" : "p-4 md:p-10"}`}>

                        <motion.div
                            layout // Enables smooth transition between sizes
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{ scaleY: 1, opacity: 1 }}
                            exit={{ scaleY: 0, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            // CONDITIONAL CLASSES:
                            // Maximized: Full width/height, No Radius
                            // Normal: Max width 4xl, Max Height 80vh, Rounded 2xl
                            className={`pointer-events-auto bg-[#0A0A0A] border border-white/10 shadow-2xl overflow-hidden flex flex-col relative transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                ${isMaximized ? "w-full h-full rounded-none" : "w-full max-w-4xl max-h-[80vh] rounded-2xl"}
              `}
                            style={{ transformOrigin: "center" }}
                        >

                            {/* DECORATIVE HEADER (The "Folder Tab") */}
                            <div className="h-12 w-full bg-white/5 border-b border-white/10 flex items-center justify-between px-6 shrink-0">

                                {/* TRAFFIC LIGHT BUTTONS */}
                                <div className="flex items-center gap-2 group">

                                    {/* RED: CLOSE */}
                                    <button
                                        onClick={onClose}
                                        className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 hover:shadow-[0_0_8px_rgba(239,68,68,0.6)] transition-all duration-200 cursor-pointer"
                                        title="Close"
                                    />

                                    {/* YELLOW: INACTIVE (Decorative) */}
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50 cursor-default" />

                                    {/* GREEN: MAXIMIZE / RESTORE */}
                                    <button
                                        onClick={() => setIsMaximized(!isMaximized)}
                                        className="w-3 h-3 rounded-full bg-green-500/50 hover:bg-green-500 hover:shadow-[0_0_8px_rgba(34,197,94,0.6)] transition-all duration-200 cursor-pointer"
                                        title={isMaximized ? "Restore Down" : "Maximize"}
                                    />
                                </div>

                                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                    // CONFIDENTIAL // {data.category}
                                </div>

                                {/* Close Icon (Backup) */}
                                <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                                    ✕
                                </button>
                            </div>

                            {/* CONTENT CONTAINER */}
                            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">

                                {/* TITLE BLOCK */}
                                <div className="mb-10 border-b border-white/10 pb-10">
                                    <motion.span
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="block text-yellow-500 text-xs font-mono uppercase tracking-[0.2em] mb-2"
                                    >
                                        Project ID: {data.date || "2026"}
                                    </motion.span>
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-4xl md:text-6xl font-bold text-white font-[family-name:var(--font-diamond)] uppercase leading-[0.9]"
                                    >
                                        {data.title}
                                    </motion.h2>
                                </div>

                                {/* GRID LAYOUT FOR DETAILS */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                                    {/* LEFT: METADATA */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="col-span-1 space-y-6"
                                    >
                                        <div>
                                            <h4 className="text-white/40 text-[10px] uppercase tracking-widest mb-2">Role</h4>
                                            <p className="text-white font-medium">Lead Strategist</p>
                                        </div>
                                        <div>
                                            <h4 className="text-white/40 text-[10px] uppercase tracking-widest mb-2">Timeline</h4>
                                            <p className="text-white font-medium">8 Weeks</p>
                                        </div>
                                        <div>
                                            <h4 className="text-white/40 text-[10px] uppercase tracking-widest mb-2">Tags</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {data.tags?.map(tag => (
                                                    <span key={tag} className="px-2 py-1 bg-white/5 rounded border border-white/5 text-[10px] text-white/70">
                                                        {tag}
                                                    </span>
                                                )) || <span className="text-white/30 text-xs">N/A</span>}
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* RIGHT: MAIN BODY */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="col-span-1 md:col-span-2 text-white/80 text-lg leading-relaxed font-sans"
                                    >
                                        {data.description ? (
                                            <p>{data.description}</p>
                                        ) : (
                                            <>
                                                <p className="mb-6">
                                                    <strong className="text-white">OBJECTIVE:</strong> To deconstruct the existing user behavior patterns and reconstruct a streamlined flow that maximizes engagement retention. We identified critical friction points in the initial onboarding phase.
                                                </p>
                                                <p className="mb-6">
                                                    <strong className="text-white">EXECUTION:</strong> By implementing a modular design system and reducing cognitive load, we achieved a 40% increase in session duration. The strategy focused on "invisible" UX—removing barriers before the user noticed them.
                                                </p>
                                                <div className="p-6 bg-white/5 rounded-xl border border-white/5 mt-8">
                                                    <p className="font-mono text-xs text-yellow-500 mb-2">// KEY OUTCOME</p>
                                                    <p className="text-xl font-bold text-white">
                                                        "The interface doesn't just function; it anticipates."
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>

                                </div>

                            </div>

                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}