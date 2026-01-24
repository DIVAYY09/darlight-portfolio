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

      {/* HERO CARD CONTAINER */}
      <motion.div
        className="relative h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] m-3 md:m-5 rounded-3xl md:rounded-[40px] overflow-hidden bg-black isolate"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src="/hero-portrait.png"
            alt="Portrait"
            fill
            // Keep centered horizontally, shift down 25% vertically to show face
            className="object-cover object-[center_25%] absolute inset-0"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 z-10" />
        </div>

        {/* CONTENT GRID */}
        <div className="relative z-20 h-full w-full grid grid-cols-1 md:grid-cols-12 p-6 md:p-10 pointer-events-none">

          {/* LEFT COLUMN: TEXT (Reduced width and font size) */}
          {/* Changed col-span-5 to col-span-4 to give the face more room */}
          <div className="col-span-1 md:col-span-4 flex flex-col justify-center h-full pointer-events-auto">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              // REDUCED FONT SIZE: Changed from text-[7rem] to text-5xl/7xl
              className="text-5xl md:text-7xl font-bold text-white uppercase leading-[0.9] tracking-tight font-[family-name:var(--font-diamond)]"
            >
              Darlight<br />
              Studio
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              // UPDATED SUBTITLE: Bolder white text. (Black would be invisible here)
              className="mt-6 text-white text-sm md:text-base tracking-wider uppercase font-extrabold pl-1"
            >
              Product Strategist and Designer
            </motion.p>
          </div>

          {/* CENTER/RIGHT COLUMNS (Empty for image focus) */}
          <div className="hidden md:block col-span-8"></div>

          {/* NAVBAR POSITIONING (Shifted down) */}
          {/* Changed bottom-8 to bottom-4 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-auto">
            <FloatingNav />
          </div>

        </div>
      </motion.div>

      {/* PAGE CONTENT (White Background) */}
      <div className="w-full max-w-[95%] mx-auto relative z-10 bg-[#f8f8f8] rounded-b-3xl pb-20 px-4 md:px-0 text-black">
        <Section id="about" className="min-h-[80vh] flex flex-col md:flex-row items-start justify-between py-24 md:py-32 border-b border-neutral-200">
          <div className="w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-8 font-[family-name:var(--font-diamond)]">01 — About</h2>
            <p className="text-xl md:text-2xl text-neutral-800 max-w-3xl leading-relaxed font-medium">
              I create digital experiences that merge strategy with intuition. We forge designs that tell a story and define a presence.
            </p>
          </div>
        </Section>
      </div>
    </main>
  );
}
