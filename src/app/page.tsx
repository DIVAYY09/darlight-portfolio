"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { PreLoader } from "@/components/PreLoader";
import { FloatingNav } from "@/components/FloatingNav";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { ToolsRibbon } from "@/components/ToolsRibbon"; // IMPORT
import { Contact } from "@/components/Contact"; // IMPORT

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main ref={containerRef} className="w-full relative selection:bg-yellow-400 selection:text-black bg-black">
      <PreLoader />

      {/* 1. HERO SECTION */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0">
        <motion.div
          style={{ scale, opacity }}
          className="relative w-[95%] h-[92%] rounded-[40px] overflow-hidden bg-black isolate shadow-2xl"
        >
          {/* ... HERO CONTENT ... */}
          <div className="absolute inset-0 w-full h-full -z-10">
            <Image
              src="/hero-portrait.png"
              alt="Portrait"
              fill
              className="object-cover object-[center_30%] absolute inset-0"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 z-10" />
          </div>

          <div className="relative z-20 h-full w-full grid grid-cols-1 md:grid-cols-12 p-5 md:p-10 pointer-events-none">
            {/* Left Column */}
            <div className="col-span-1 md:col-span-5 flex flex-col justify-center pb-52 h-full pointer-events-auto">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="text-5xl md:text-7xl lg:text-[6rem] font-bold text-white uppercase leading-[0.9] tracking-tight font-[family-name:var(--font-diamond)]"
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

            {/* Empty Center */}
            <div className="hidden md:block col-span-3"></div>

            {/* Right Column */}
            <div className="col-span-1 md:col-span-4 flex flex-col justify-end items-end h-full pointer-events-auto pb-8 md:pb-12">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="text-[11px] md:text-xs font-sans leading-tight text-right max-w-[240px] drop-shadow-md"
                style={{ color: "#E2D4B7" }}
              >
                DarkLight Studio illuminate possibilities. Merging shadow and light, strategy and intuition, to forge designs that are both profound and impactful. My work doesn't just occupy space; it tells a story and defines a presence.
              </motion.p>
            </div>

            {/* Navbar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-auto">
              <FloatingNav />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2. ABOUT SECTION */}
      <div className="relative z-10 w-full min-h-screen bg-transparent mb-0">
        <div className="h-[20vh]" />
        <About />
      </div>

      {/* 3. PROJECTS SECTION */}
      <div className="relative z-10">
        <Projects />
      </div>

      {/* 4. TOOLS RIBBON (Wipe Animation) */}
      <div className="relative z-20 bg-black">
        <ToolsRibbon />
      </div>

      {/* 5. CONTACT (Gravity Well) */}
      <div className="relative z-20">
        <Contact />
      </div>

    </main>
  );
}