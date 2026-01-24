"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser"; // IMPORT EMAILJS

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [formState, setFormState] = useState({
        name: "",
        email: "", // This is the USER'S email (Return Address)
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    // Lock scroll
    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        // EMAILJS LOGIC
        // replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_PUBLIC_KEY' with actual values from EmailJS dashboard
        emailjs.send(
            'service_1axekxf',
            'template_5jf6dmv',
            {
                from_name: formState.name,
                from_email: formState.email, // Sender's email
                message: formState.message,
                to_email: 'divayyadav123@gmail.com', // Your email (Destination)
            },
            'nzptqXMsjmgyRQo26'
        )
            .then((result) => {
                // SUCCESS: Show success screen
                setStatus("sent");
                setTimeout(() => {
                    onClose();
                    setStatus("idle");
                    setFormState({ name: "", email: "", message: "" });
                }, 3000);
            }, (error) => {
                // ERROR: Handle failure
                console.log(error.text);
                setStatus("error");
            });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* BACKDROP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md cursor-pointer"
                    />

                    {/* THE TERMINAL WINDOW */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="pointer-events-auto w-full max-w-2xl bg-[#0F0F0F] border border-white/10 rounded-xl shadow-2xl overflow-hidden relative"
                        >

                            {/* HEADER */}
                            <div className="h-10 bg-white/5 border-b border-white/10 flex items-center justify-between px-4">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                </div>
                                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                    // SECURE_UPLINK_V2.0
                                </div>
                                <button onClick={onClose} className="text-white/30 hover:text-white transition-colors text-xs">EXIT</button>
                            </div>

                            {/* CONTENT */}
                            <div className="p-8 md:p-12 relative">

                                {status === "sent" ? (
                                    // SUCCESS STATE
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center justify-center py-12 space-y-4"
                                    >
                                        <div className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center text-green-500 text-2xl">✓</div>
                                        <h3 className="text-white font-mono text-xl uppercase tracking-widest">Transmission Successful</h3>
                                        <p className="text-white/40 text-xs font-mono">Signal locked. Data packet received.</p>
                                    </motion.div>
                                ) : status === "error" ? (
                                    // ERROR STATE
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center justify-center py-12 space-y-4"
                                    >
                                        <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 text-2xl">✕</div>
                                        <h3 className="text-white font-mono text-xl uppercase tracking-widest">Transmission Failed</h3>
                                        <p className="text-white/40 text-xs font-mono">Signal lost. Please retry manual uplink.</p>
                                        <button onClick={() => setStatus("idle")} className="text-[#E2D4B7] underline text-sm">RETRY</button>
                                    </motion.div>
                                ) : (
                                    // FORM STATE
                                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">

                                        {/* NAME */}
                                        <div className="relative group">
                                            <label className="text-[10px] font-mono text-[#E2D4B7] uppercase tracking-widest mb-2 block">
                                // IDENTIFICATION
                                            </label>
                                            <input
                                                type="text"
                                                name="from_name" // Name for EmailJS
                                                required
                                                value={formState.name}
                                                onChange={e => setFormState({ ...formState, name: e.target.value })}
                                                placeholder="ENTER CODENAME"
                                                className="w-full bg-transparent border-b border-white/10 py-2 text-white font-sans text-xl outline-none focus:border-[#E2D4B7] transition-colors placeholder:text-white/10"
                                            />
                                        </div>

                                        {/* EMAIL */}
                                        <div className="relative group">
                                            <label className="text-[10px] font-mono text-[#E2D4B7] uppercase tracking-widest mb-2 block">
                                // RETURN FREQUENCY (YOUR EMAIL)
                                            </label>
                                            <input
                                                type="email"
                                                name="from_email" // Name for EmailJS
                                                required
                                                value={formState.email}
                                                onChange={e => setFormState({ ...formState, email: e.target.value })}
                                                placeholder="ENTER EMAIL ADDRESS"
                                                className="w-full bg-transparent border-b border-white/10 py-2 text-white font-sans text-xl outline-none focus:border-[#E2D4B7] transition-colors placeholder:text-white/10"
                                            />
                                        </div>

                                        {/* MESSAGE */}
                                        <div className="relative group">
                                            <label className="text-[10px] font-mono text-[#E2D4B7] uppercase tracking-widest mb-2 block">
                                // INTEL
                                            </label>
                                            <textarea
                                                name="message" // Name for EmailJS
                                                required
                                                rows={3}
                                                value={formState.message}
                                                onChange={e => setFormState({ ...formState, message: e.target.value })}
                                                placeholder="ENTER DATA PACKET..."
                                                className="w-full bg-transparent border-b border-white/10 py-2 text-white font-sans text-xl outline-none focus:border-[#E2D4B7] transition-colors placeholder:text-white/10 resize-none"
                                            />
                                        </div>

                                        {/* SUBMIT BUTTON */}
                                        <button
                                            type="submit"
                                            disabled={status === "sending"}
                                            className="w-full py-4 bg-white/5 hover:bg-[#E2D4B7] hover:text-black border border-white/10 text-white font-mono text-xs uppercase tracking-[0.3em] transition-all duration-300 flex items-center justify-center gap-4 group"
                                        >
                                            {status === "sending" ? (
                                                <span className="animate-pulse">ESTABLISHING UPLINK...</span>
                                            ) : (
                                                <>
                                                    <span>INITIATE TRANSMISSION</span>
                                                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                                                </>
                                            )}
                                        </button>

                                    </form>
                                )}

                                {/* DECORATIVE GRID */}
                                <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                                    <div className="w-20 h-20 border-r border-t border-[#E2D4B7]" />
                                </div>
                                <div className="absolute bottom-0 left-0 p-4 opacity-20 pointer-events-none">
                                    <div className="w-20 h-20 border-l border-b border-[#E2D4B7]" />
                                </div>

                            </div>

                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}