"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/Section";
import { PreLoader } from "@/components/PreLoader";
import { FloatingNav } from "@/components/FloatingNav";

export default function Home() {
  return (
    <main className="w-full min-h-screen relative selection:bg-black selection:text-white">
      <PreLoader />

      {/* HERO CARD CONTAINER 
          - White page background (from globals.css) surrounds this card.
          - margins (m-4) create the white border.
          - rounded-[40px] gives the iPhone-like corners.
      */}
      <motion.div
        className="relative h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] m-3 md:m-5 rounded-3xl md:rounded-[40px] overflow-hidden bg-black isolate"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* BACKGROUND IMAGE LAYER */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src="/hero-portrait.png" // Ensure this matches your file name exactly
            alt="Portrait"
            fill
            /* CRITICAL FIX FOR FACE: 
               object-[center_25%] shifts the image down, moving your face UP into the visible area.
               Adjust the % if needed (e.g., 20% moves it lower, 30% moves it higher).
            */
            className="object-cover object-[center_25%] absolute inset-0"
            priority
          />
          {/* Gradient Overlay: Darker at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 z-10" />
        </div>

        {/* CONTENT GRID LAYER (The "Magnetto" Layout)
           - 12 Column Grid for precise placement
        */}
        <div className="relative z-20 h-full w-full grid grid-cols-1 md:grid-cols-12 p-6 md:p-10 pointer-events-none">

          {/* LEFT COLUMN: BRAND NAME (Cols 1-5) */}
          <div className="col-span-1 md:col-span-5 flex flex-col justify-center h-full pointer-events-auto">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              // Uses your Custom Font "Diamond Grotesk"
              className="text-6xl md:text-8xl lg:text-[7rem] font-bold text-white uppercase leading-[0.85] tracking-tight font-[family-name:var(--font-diamond)]"
            >
              Darlight<br />
              Studio
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-4 text-white/60 text-sm tracking-widest uppercase font-bold pl-1"
            >
              Design Studio • London
            </motion.p>
          </div>

          {/* CENTER COLUMN: EMPTY (Cols 6-8) - Leaves space for your face */}
          <div className="hidden md:block col-span-3"></div>

          {/* RIGHT COLUMN: DESCRIPTION (Cols 9-12) */}
          <div className="col-span-1 md:col-span-4 flex flex-col justify-center items-start md:items-end h-full pointer-events-auto">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              // Uses your Custom Font "Space Rabbit"
              className="text-white/90 text-sm md:text-lg font-medium leading-relaxed text-left md:text-right max-w-sm font-[family-name:var(--font-space)]"
            >
              Merging shadow and light, strategy and intuition.
              We forge designs that tell a story and define a presence.
            </motion.p>
          </div>

          {/* NAVBAR POSITIONING */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-auto">
            <FloatingNav />
          </div>

        </div>
      </motion.div>

      {/* REST OF THE PAGE SECTIONS */}
      {/* Ensure this container matches the white theme */}
      <div className="w-full max-w-[95%] mx-auto relative z-10 bg-[#f8f8f8] rounded-b-3xl pb-20 px-2 md:px-0 text-black">

        {/* ... (Keep your About, Projects, and Contact sections here as they were) ... */}
        {/* Only updating the Section wrapper to ensure text is visible on white bg */}
        <Section id="about" className="min-h-[80vh] flex flex-col md:flex-row items-start justify-between py-24 md:py-32 border-b border-neutral-200">
          {/* Copy your previous About section content here */}
          <div className="w-full">
            <h2 className="text-5xl font-bold text-black mb-6">01 — About</h2>
            <p className="text-xl text-neutral-600 max-w-2xl">
              I create digital experiences that merge strategy with intuition.
            </p>
          </div>
        </Section>

        {/* Placeholder for Projects & Contact (You can paste the rest from your old file) */}

      </div>
    </main>
  );
}
