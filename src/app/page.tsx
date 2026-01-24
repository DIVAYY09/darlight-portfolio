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
        {/* BACKGROUND IMAGE LAYER */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src="/hero-portrait.png"
            alt="Portrait"
            fill
            className="object-cover object-[center_30%] absolute inset-0"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 z-10" />
        </div>

        {/* CONTENT GRID LAYER */}
        {/* FIX: Changed grid-cols-10 to grid-cols-12 so the columns (5+3+4) fit on one line */}
        <div className="relative z-20 h-full w-full grid grid-cols-1 md:grid-cols-12 p-5 md:p-10 pointer-events-none">

          {/* LEFT COLUMN: BRAND NAME (Spans 5 cols) */}
          <div className="col-span-1 md:col-span-5 flex flex-col justify-center pb-52 h-full pointer-events-auto">

            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-[5rem] font-bold text-white uppercase leading-[0.9] tracking-tight font-[family-name:var(--font-diamond)]"
            >
              DarkLight<br />
              Studio
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-4"
            >
              <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md text-black text-sm tracking-widest uppercase font-medium">
                Product Strategist and Designer
              </span>
            </motion.div>
          </div>

          {/* CENTER COLUMN: EMPTY (Spans 3 cols) */}
          <div className="hidden md:block col-span-3"></div>

          {/* RIGHT COLUMN: DESCRIPTION (Spans 4 cols) */}
          {/* This places the content in the bottom-right corner */}
          <div className="col-span-1 md:col-span-4 flex flex-col justify-end items-end h-full pointer-events-auto pb-8 md:pb-12">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="text-[11px] md:text-xs font-sans leading-tight text-right max-w-[240px] drop-shadow-md"
              style={{ color: "#E2D4B7" }}
            >
              DarkLight Studio illuminates possibilities. Merging shadow and light, strategy and intuition, to forge designs that are both profound and impactful. My work doesn't just occupy space; it tells a story and defines a presence.
            </motion.p>
          </div>

          {/* NAVBAR POSITIONING */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-auto">
            <FloatingNav />
          </div>

        </div>
      </motion.div>

      {/* PAGE CONTENT */}
      <div className="w-full max-w-[95%] mx-auto relative z-10 bg-[#f8f8f8] rounded-b-3xl pb-20 px-4 md:px-0 text-black">
        <Section id="about" className="min-h-[80vh] flex flex-col md:flex-row items-start justify-between py-24 md:py-32 border-b border-neutral-200">
          <div className="w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-8 font-[family-name:var(--font-diamond)]">01 — About</h2>
            <p className="text-xl md:text-2xl text-neutral-800 max-w-3xl leading-relaxed font-medium">
              I create digital experiences that merge strategy with intuition.
            </p>
          </div>
        </Section>
      </div>
    </main>
  );
}