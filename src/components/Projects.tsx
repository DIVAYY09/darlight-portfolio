"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ProjectModal, ProjectData } from "./ProjectModal";

// --- DATA REMAINS UNCHANGED ---
const strategies: ProjectData[] = [
    {
        id: "01",
        title: "FIGMA REALITY MODE",
        category: "Product Design",
        date: "2025",
        tags: ["Product Design", "Figma", "3D", "Prototyping"],
        description: `**OBJECTIVE:** Designers today work in a 'pixel-perfect' hallucination. We design on 27-inch 5K Retina displays, but our users experience our products on cracked screens, under direct sunlight, with thumb-reach limitations. This disconnect creates a Context Gap: the dangerous space between what we design and what is actually usable.\n\n**EXECUTION:** The Pivot: Early explorations focused on a floating 'Picture-in-Picture' window (similar to YouTube). However, user testing revealed a critical flaw: it obstructed the canvas. We killed the floating window and pivoted to utilizing the Properties Panel.\nEngineering Empathy: Integrating 3D into a performance-critical tool like Figma posed a significant technical risk. The execution relied on Low-Poly Architecture (<5k polys), Local Caching for zero-latency, and Bi-Directional Sync to create a 'live wire' between the canvas and the 3D shell.\n\n**IMPACT:** By shifting validation from an 'active task' to a 'passive state,' we changed the workflow economics.\nThe Efficiency Delta: Old Workflow (Export -> AirDrop -> Check) took ~2 minutes per check. Reality Mode takes 0 steps.\nThe Cumulative ROI: For a senior product designer validating 20 times a day, Reality Mode reclaims 40 minutes of daily focus time.`,
        notionLink: "https://www.behance.net/gallery/243579821/Figma-Reality-Mode"
    },
    {
        id: "02",
        title: "AMAZON MUSIC DISCOVERY",
        category: "Product Design",
        date: "2025",
        tags: ["Retention", "UX Research"],
        description: `**OBJECTIVE:** To reduce 'discovery friction' and increase daily engagement retention for Amazon Music users compared to Spotify’s algorithmic dominance.\n\n**EXECUTION:** Conducted research on Prime users' listening habits. Proposed a modular discovery engine that leverages Alexa and the Amazon ecosystem to create emotionally engaging, context-aware music suggestions.\n\n**IMPACT:** Designed a framework to improve Daily Listening Time (DLT) and increase conversion rates for 'Unlimited' tier upgrades by reducing the cognitive load required to find new music.`,
        notionLink: "https://www.behance.net/gallery/241165145/Amazon-Music-Case-Study"
    },
    {
        id: "03",
        title: "AI MARKET INTELLIGENCE AGENT",
        category: "Autonomous Agent",
        date: "2025",
        tags: ["AI", "Gemini", "Product"],
        description: `**OBJECTIVE:** To solve the 'information tax' on productivity by shifting from manual search to autonomous intelligence for analysts and Product Managers.\n\n**EXECUTION:** Built an agentic system using Gemini 2.5 Flash-Lite that performs semantic analysis on real-time social and financial signals. Unlike traditional scrapers, it interrogates data for professional relevance rather than simple keyword fetching.\n\n**IMPACT:** Reduced data noise by approx. 60% and automated the daily market-scouting workflow, providing high-signal insights directly to decision-makers without manual intervention.`,
        notionLink: "https://www.notion.so/AI-Market-Intelligence-Agent-MIA-2d2d3b85d75a80668553c39060259ca9"
    },
    {
        id: "04",
        title: "THE DOMINO'S 11PM HACK",
        category: "Product Tear-down",
        date: "2025",
        tags: ["Neuromarketing", "Psychology"],
        description: `**OBJECTIVE:** To deconstruct the psychological triggers used by food-tech giants to drive high-intent impulse purchases during late-night hours.\n\n**EXECUTION:** Analyzed 'Dayparting' strategies and 'Ego Depletion' effects. The study maps how push notifications are specifically timed (11:00 PM - 11:30 PM) when human willpower is statistically lowest to maximize conversion rates.\n\n**IMPACT:** Identified key neuromarketing principles that explain a significant spike in late-night Average Order Value (AOV) through artificial urgency and FOMO mechanics.`,
        notionLink: "https://www.notion.so/Why-Domino-s-hacks-your-phone-at-11-PM-2eb764bd9a3e8059b322fc4f82978cf3"
    },
    {
        id: "05",
        title: "CIRAYU: GOVT. AUTOMATION",
        category: "Product Design",
        date: "2025",
        tags: ["Hackathon Winner", "AI", "Automation"],
        description: `**OBJECTIVE:** To automate complex and bureaucratic government form-filling tasks, significantly reducing the error rate and time-to-submission for the common citizen.\n\n**EXECUTION:** Led a cross-functional team at CodeFiesta 4.0 to map intricate legal workflows. Built an AI-driven platform that validates documents in real-time and guides users through dense government portals step-by-step.\n\n**IMPACT:** Winner (1st Place) out of 300+ teams. The solution validated a model that reduces manual data entry errors by 70% and cuts down average form-completion time by half, streamlining access to essential services.`,
        notionLink: "#"
    },
];

const designs = [
    {
        img: "/design-1.png",
        text: "THE ORBITING PULSE",
        category: "Visual Blueprint",
        tags: ["Figma", "Brutalist", "Minimalism"],
        description: "A deep dive into 'The Orbiting Pulse', a study in cosmic minimalism. This project explores the rhythm of space and motion through geometric precision. By utilizing the Golden Ratio and varying line weights, the design creates a gravitational focal point that draws the eye inward. The strategy was to break digital perfection using stippling textures, creating an avant-garde experience that bridges technical precision with abstract emotion."
    },
    {
        img: "/design2.png",
        text: "NEURAL INTERFACE",
        category: "UI Design",
        tags: ["Figma", "UX", "System"],
        description: "This blueprint deconstructs the alignment and spacing grids used in high-density neural applications. The objective was to create a layout that handles massive data streams without overwhelming the user. By implementing a modular 'cell' structure in Figma, the interface achieves maximum clarity and functional aesthetic, ensuring every pixel serves a purpose in the user's workflow."
    },
    {
        img: "/design-3.png",
        text: "CORE BRANDING",
        category: "Identity Archive",
        tags: ["Figma", "Vector", "Branding"],
        description: "The visual DNA of the DarkLight ecosystem. This design focuses on the mathematical construction of the brand mark and its scalability across digital and physical mediums. The strategy involved creating a 'living' logo system that adapts to different environments while maintaining its core authoritative presence through strict geometric constraints and high-contrast aesthetics."
    },
    {
        img: "/design-4.png",
        text: "TACTICAL HUD",
        category: "Sci-fi UI",
        tags: ["Figma", "HUD", "Conceptual"],
        description: "An exploration into futuristic Heads-Up Displays (HUDs). This conceptual blueprint focuses on non-linear navigation and immersive data visualization layers. Inspired by aerospace instrumentation, the design utilizes layered vector graphics to simulate depth and priority, creating a cockpit-like experience that pushes the boundaries of traditional interface design."
    },
];

export function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (data: ProjectData) => {
        setSelectedProject(data);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const [rotation, setRotation] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleDesignClick = () => {
        const totalSlides = designs.length;
        const normalizedRotation = ((rotation % 360) + 360) % 360;
        const activeIndex = (Math.round(normalizedRotation / 90) % totalSlides + totalSlides) % totalSlides;
        const actualIndex = (totalSlides - activeIndex) % totalSlides;
        const currentData = designs[actualIndex];

        openModal({
            title: currentData.text,
            category: currentData.category,
            date: "2025",
            tags: currentData.tags,
            description: currentData.description,
            images: [currentData.img]
        });
    };

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const textScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.1]);
    const breachLeftX = useTransform(scrollYProgress, [0.15, 0.3], ["0%", "-100%"]);
    const breachRightX = useTransform(scrollYProgress, [0.15, 0.3], ["0%", "100%"]);
    const listY = useTransform(scrollYProgress, [0.3, 1], ["0%", "-60%"]);

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => setRotation((prev) => prev + 90), 2000);
        return () => clearInterval(interval);
    }, [isHovered]);

    // === REUSABLE HUD DECORATION COMPONENT ===
    const HUDDecorations = ({ color = "yellow" }: { color?: string }) => (
        <>
            {/* Grid Pattern (Subtle overlay on card) */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            {/* Corner Brackets */}
            <div className={`absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/20 group-hover:border-${color}-500 transition-colors duration-300 z-10`} />
            <div className={`absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white/20 group-hover:border-${color}-500 transition-colors duration-300 z-10`} />
            <div className={`absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white/20 group-hover:border-${color}-500 transition-colors duration-300 z-10`} />
            <div className={`absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/20 group-hover:border-${color}-500 transition-colors duration-300 z-10`} />

            {/* Scanline */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-${color}-500/30 shadow-[0_0_15px_rgba(234,179,8,0.4)] -translate-y-full group-hover:translate-y-[800px] transition-transform duration-[2s] ease-in-out pointer-events-none z-20`} />
        </>
    );

    return (
        <section ref={containerRef} className="relative h-[300vh] w-full bg-black">

            {/* STICKY VIEWPORT */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center z-10">

                {/* === BACKGROUND IMAGE REPLACEMENT === */}
                <div className="absolute inset-0 z-0">
                    {/* The Reference Image */}
                    <Image
                        src="/back.jpg"
                        alt="Project Panel Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Dark Overlay for Readability (Critical for visibility) */}
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* DOORS (Z-Index > Background) */}
                <motion.div style={{ x: breachLeftX }} className="absolute top-0 left-0 w-1/2 h-full bg-[#E8E8E8] z-50 border-r border-black/10 flex items-center justify-end pr-4 md:pr-10" />
                <motion.div style={{ x: breachRightX }} className="absolute top-0 right-0 w-1/2 h-full bg-[#E8E8E8] z-50 border-l border-black/10 flex items-center justify-start pl-4 md:pl-10" />

                {/* TITLE WITH TEXTURE */}
                <div className="absolute inset-0 z-[60] flex items-center justify-center pointer-events-none">
                    <motion.div style={{ opacity: textOpacity, scale: textScale }} className="relative text-center w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
                        <div className="absolute w-[150%] h-[250%] -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Image src="/panel-texture.png" alt="Paint Texture" fill className="object-contain" priority />
                            <div className="absolute inset-0 bg-[#E8E8E8] mix-blend-multiply" />
                        </div>
                        <h2 className="text-4xl md:text-7xl font-bold text-neutral-900 uppercase tracking-tighter font-[family-name:var(--font-diamond)] relative z-10">Project<br />Control Panel</h2>
                        <div className="w-64 h-[2px] bg-black/20 my-6 relative z-10" />
                        <p className="text-xs font-mono text-neutral-600 uppercase tracking-[0.3em] font-bold relative z-10">// Accessing Secure Archives</p>
                    </motion.div>
                </div>

                {/* MAIN CONTENT AREA (Cards sit on top of the new background) */}
                <div className="w-full h-[85vh] max-w-[95%] grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6 relative z-10 mt-auto mb-auto">

                    {/* === DESIGN CARD === */}
                    <div className="group relative w-full h-full bg-neutral-900/90 backdrop-blur-md rounded-[30px] overflow-hidden border border-white/10 flex flex-col p-6 md:p-10 transition-all hover:border-white/30 shadow-2xl">
                        <HUDDecorations color="yellow" />

                        <div className="flex justify-between items-start mb-4 md:mb-8 shrink-0 relative z-20">
                            <h3 className="text-4xl md:text-6xl font-bold text-white font-[family-name:var(--font-diamond)]">DESIGN</h3>
                            <span className="px-3 py-1 border border-white/20 rounded text-[10px] uppercase tracking-widest text-yellow-500 font-mono">SYS.VISUAL_CORE</span>
                        </div>

                        <div className="flex-1 flex items-center justify-center perspective-[1000px] relative my-4 md:my-0 z-20" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                            <motion.div className="relative w-48 h-32 md:w-64 md:h-40 preserve-3d" animate={{ rotateY: rotation }} transition={{ type: "spring", stiffness: 40, damping: 20 }} style={{ transformStyle: "preserve-3d" }}>
                                {designs.map((item, i) => (
                                    <div key={i} className="absolute inset-0 rounded-xl overflow-hidden border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-black" style={{ transform: `rotateY(${i * 90}deg) translateZ(160px)` }}>
                                        <Image src={item.img} alt={item.text} fill className="object-cover opacity-80 hover:opacity-100 transition-opacity" />
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                            <span className="text-white font-bold text-lg md:text-xl tracking-widest uppercase drop-shadow-md">{item.text}</span>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <div className="mt-auto flex justify-center w-full shrink-0 pt-4 relative z-20">
                            <button onClick={handleDesignClick} className="group/btn w-fit px-8 py-4 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-[0.2em] hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300 flex items-center gap-4 text-xs md:text-sm">
                                <span>Initialize Blueprints</span>
                                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                    </div>

                    {/* === STRATEGY CARD (UPDATED: High contrast list items) === */}
                    <div className="group relative w-full h-full bg-neutral-900/90 backdrop-blur-md rounded-[30px] overflow-hidden border border-white/10 flex flex-col transition-all hover:border-white/30 shadow-2xl">
                        <HUDDecorations color="blue" />

                        <div className="absolute top-0 left-0 w-full p-8 md:p-12 z-30 bg-gradient-to-b from-neutral-900 via-neutral-900 to-transparent h-40 flex justify-between items-start pointer-events-none">
                            <h3 className="text-4xl md:text-6xl font-bold text-white font-[family-name:var(--font-diamond)]">STRATEGY</h3>
                            <span className="px-3 py-1 border border-white/20 rounded text-[10px] uppercase tracking-widest text-blue-400 font-mono">SYS.CLASSIFIED</span>
                        </div>

                        <div className="flex-1 overflow-hidden relative mt-4 md:mt-40 px-6 md:px-12 pb-12 z-20">
                            <motion.div style={{ y: listY }} className="flex flex-col gap-3">
                                {strategies.map((strategy, index) => (
                                    <div key={index} onClick={() => openModal(strategy)} className="group/item relative w-full h-24 md:h-32 border border-white/10 bg-black/40 hover:bg-black/60 hover:border-blue-500/50 flex items-center justify-between cursor-pointer overflow-hidden px-6 transition-all duration-300 rounded-lg">
                                        {/* Hover Glow Bar */}
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 transform scale-y-0 group-hover/item:scale-y-100 transition-transform duration-300 origin-bottom" />

                                        <div className="flex flex-col relative z-10">
                                            <span className="text-[10px] font-mono text-white/50 mb-2 tracking-widest group-hover/item:text-blue-400 transition-colors">ID: {strategy.id} // {strategy.category}</span>
                                            <h4 className="text-xl md:text-2xl font-bold uppercase font-[family-name:var(--font-diamond)] text-white group-hover/item:text-blue-100">{strategy.title}</h4>
                                        </div>

                                        <span className="relative z-10 text-[10px] font-mono text-white/50 border border-white/10 px-2 py-1 group-hover/item:text-white group-hover/item:border-white/30 transition-colors rounded">
                                            {strategy.date}
                                        </span>
                                    </div>
                                ))}
                                <div className="h-64 w-full" />
                            </motion.div>
                        </div>

                        {/* Bottom Fade Gradient for List */}
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neutral-900 to-transparent z-30 pointer-events-none" />
                    </div>
                </div>
            </div>

            <ProjectModal isOpen={isModalOpen} onClose={closeModal} data={selectedProject} />
        </section>
    );
}