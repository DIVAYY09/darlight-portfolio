"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/Section";
import { PreLoader } from "@/components/PreLoader";
import { FloatingNav } from "@/components/FloatingNav";

export default function Home() {
  return (
    <main className="w-full bg-zinc-50 min-h-screen relative selection:bg-black selection:text-white">
      <PreLoader />

      {/* Hero Card Container */}
      <motion.div
        className="relative h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] m-2 md:m-5 rounded-3xl md:rounded-[40px] overflow-hidden bg-black"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 2.2, ease: [0.22, 1, 0.36, 1] }} // Starts coming in as book opens
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/hero-portrait.png"
            alt="Portrait"
            fill
            className="object-cover object-top absolute inset-0 z-0"
            priority
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 z-10" />
        </div>

        {/* Content Layer */}
        <div className="relative z-20 h-full w-full flex flex-col justify-between p-6 md:p-12">

          {/* Top Bar (mock) */}
          <div className="flex justify-between items-center text-white/80 uppercase text-xs tracking-widest font-bold">
            <span>Est. 2024</span>
            <span>Portfolio</span>
          </div>

          {/* Main Content: Centered/Split */}
          <div className="flex flex-col md:flex-row items-end md:items-center justify-between w-full h-full pb-20 md:pb-0">

            {/* Left: Design Studio Title */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="mb-8 md:mb-0"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight uppercase leading-[0.9] font-[family-name:var(--font-geist-sans)]">
                Darlight<br />
                <span className="text-white/60">Studio</span>
              </h1>
            </motion.div>

            {/* Right: Description */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="max-w-md text-white/90 text-sm md:text-lg font-medium leading-relaxed text-left md:text-right"
            >
              <p>
                Merging shadow and light, strategy and intuition.
                We forge designs that tell a story and define a presence.
              </p>
            </motion.div>
          </div>

          {/* Navigation inside the card */}
          <FloatingNav className="absolute bottom-8 left-1/2 -translate-x-1/2" />
        </div>
      </motion.div>

      {/* Rest of the sections - Needs to be on white background now? 
          The user requested "Outer page background ... must be White".
      {/* Premium Sections Container */}
      <div className="w-full max-w-[95%] mx-auto relative z-10 bg-zinc-50 rounded-b-3xl pb-20 px-2 md:px-0">

        {/* About Section - Sticky Layout */}
        <Section id="about" className="text-black min-h-[80vh] flex flex-col md:flex-row items-start justify-between py-24 md:py-32 border-b border-neutral-200">
          <div className="w-full md:w-1/4 sticky top-32 mb-12 md:mb-0">
            <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase">01 — About</span>
          </div>
          <div className="w-full md:w-3/4">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-12 font-[family-name:var(--font-geist-sans)]">
              I create digital experiences that merge <span className="text-neutral-400">strategy</span> with <span className="text-neutral-400">intuition</span>.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-neutral-600 leading-relaxed">
              <p>
                With a background in both design and engineering, I bridge the gap between form and function. My work is driven by a desire to craft interfaces that feel natural, responsive, and deeply human.
              </p>
              <p>
                Currently working as a Lead Designer at Studio X, helping brands define their digital presence through motion and typography.
              </p>
            </div>
          </div>
        </Section>

        {/* Projects Section - Interactive Grid */}
        <Section id="projects" className="text-black py-24 md:py-32 border-b border-neutral-200">
          <div className="flex flex-col mb-20">
            <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-4">02 — Selected Work</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Recent Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group relative cursor-pointer">
                <div className="aspect-[4/3] bg-neutral-100 rounded-2xl overflow-hidden mb-6 relative">
                  {/* Placeholder for project image */}
                  <div className="absolute inset-0 bg-neutral-200 group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm">View Case Study</span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-neutral-600 transition-colors">Project Name {item}</h3>
                    <p className="text-neutral-500 text-sm">Web Design • Development</p>
                  </div>
                  <span className="w-10 h-10 border border-neutral-200 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                    ↗
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Contact Section - Massive Footer */}
        <Section id="contact" className="text-black min-h-[70vh] flex flex-col justify-between py-24 md:py-32">
          <div className="w-full">
            <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-4 block">03 — Contact</span>
            <a href="mailto:hello@example.com" className="group block w-full">
              <h2 className="text-[12vw] font-black leading-none tracking-tighter hover:text-neutral-500 transition-colors duration-300 font-[family-name:var(--font-anton)] uppercase">
                Let&apos;s Talk
              </h2>
            </a>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end w-full border-t border-neutral-200 pt-12 mt-12">
            <div className="flex gap-8 mb-8 md:mb-0">
              {["LinkedIn", "Twitter", "Instagram"].map((link) => (
                <a key={link} href="#" className="text-lg font-medium hover:text-neutral-500 transition-colors">{link}</a>
              ))}
            </div>
            <p className="text-neutral-400 text-sm">
              © 2024 Darlight Studio. All Rights Reserved.
            </p>
          </div>
        </Section>
      </div>
    </main>
  );
}
