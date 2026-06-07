"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PreLoader() {
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isExploding = useRef(false);

    // 1. Counter Logic & Timers
    useEffect(() => {
        document.body.style.overflow = "hidden";
        if (typeof window !== 'undefined') window.scrollTo(0, 0);

        const countInterval = setInterval(() => {
            setCounter((prev) => {
                const jump = Math.floor(Math.random() * 4) + 1;
                if (prev + jump >= 100) {
                    clearInterval(countInterval);
                    return 100;
                }
                return prev + jump;
            });
        }, 30);

        return () => {
            clearInterval(countInterval);
            document.body.style.overflow = "";
        };
    }, []);

    // 2. Explosion Trigger
    useEffect(() => {
        if (counter === 100) {
            isExploding.current = true;
            // Wait 0.6s for particles to clear the viewport, then trigger component unmount
            const exitTimer = setTimeout(() => {
                setIsLoading(false);
                // Restore scrolling after unmount transition completes (0.5s)
                setTimeout(() => {
                    document.body.style.overflow = "";
                }, 500);
            }, 600);
            return () => clearTimeout(exitTimer);
        }
    }, [counter]);

    // 3. Canvas Particle Physics
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                let animationFrameId: number;
                const particles: Particle[] = [];
                const numParticles = 900; // 800-1000 high density
                const colors = ["#ffffff", "#f5bd02"];

                const resize = () => {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                };
                resize();
                window.addEventListener("resize", resize);

                class Particle {
                    x: number;
                    y: number;
                    vx: number;
                    vy: number;
                    radius: number;
                    color: string;
                    angle: number;
                    distance: number;
                    speed: number;

                    constructor() {
                        this.angle = Math.random() * Math.PI * 2;
                        this.distance = Math.random() * (Math.max(canvas!.width, canvas!.height) / 1.5);
                        this.x = canvas!.width / 2 + Math.cos(this.angle) * this.distance;
                        this.y = canvas!.height / 2 + Math.sin(this.angle) * this.distance;
                        this.vx = 0;
                        this.vy = 0;
                        this.radius = Math.random() * 1.5 + 0.5;
                        this.color = colors[Math.floor(Math.random() * colors.length)];
                        this.speed = Math.random() * 0.03 + 0.01;
                    }

                    update() {
                        const centerX = canvas!.width / 2;
                        const centerY = canvas!.height / 2;

                        if (!isExploding.current) {
                            // Vortex logic: swirl inward
                            this.angle += this.speed;
                            this.distance -= this.speed * 15; // move inward
                            if (this.distance < 20) {
                                this.distance = Math.random() * (Math.max(canvas!.width, canvas!.height) / 1.5);
                            }
                            
                            const targetX = centerX + Math.cos(this.angle) * this.distance;
                            const targetY = centerY + Math.sin(this.angle) * this.distance;

                            // Magnetic pull towards calculated spiral point
                            this.vx += (targetX - this.x) * 0.05;
                            this.vy += (targetY - this.y) * 0.05;
                            
                            // Fluid friction
                            this.vx *= 0.9;
                            this.vy *= 0.9;
                        } else {
                            // Antigravity blast: violent repulsive force
                            const dx = this.x - centerX;
                            const dy = this.y - centerY;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            
                            // Prevent division by zero and apply massive force
                            const force = 3000 / Math.max(dist, 1); 
                            
                            this.vx += (dx / dist) * force * 0.2;
                            this.vy += (dy / dist) * force * 0.2;
                            
                            // Less friction so they scatter off screen
                            this.vx *= 0.98;
                            this.vy *= 0.98;
                        }

                        this.x += this.vx;
                        this.y += this.vy;
                    }

                    draw() {
                        ctx!.beginPath();
                        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                        ctx!.fillStyle = this.color;
                        ctx!.fill();
                    }
                }

                // Initialize swarm
                for (let i = 0; i < numParticles; i++) {
                    particles.push(new Particle());
                }

                const render = () => {
                    // Dark background with slight transparency for motion blur trails
                    ctx!.fillStyle = "rgba(0, 0, 0, 0.2)";
                    ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

                    particles.forEach((p) => {
                        p.update();
                        p.draw();
                    });

                    animationFrameId = requestAnimationFrame(render);
                };
                render();

                return () => {
                    window.removeEventListener("resize", resize);
                    cancelAnimationFrame(animationFrameId);
                };
            }
        }
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[100] bg-black pointer-events-auto"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Fullscreen Canvas Background */}
                    <canvas 
                        ref={canvasRef} 
                        className="absolute inset-0 w-full h-full block"
                    />

                    {/* Centered Typography */}
                    <AnimatePresence>
                        {counter < 100 && (
                            <motion.div 
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-50 drop-shadow-[0_0_15px_rgba(245,189,2,0.4)]"
                                exit={{ opacity: 0, scale: 1.2 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-baseline font-mono font-bold leading-none">
                                    <span className="text-8xl md:text-[12vw] tracking-tighter tabular-nums bg-clip-text text-transparent bg-gradient-to-b from-[#f5bd02] to-yellow-600">
                                        {counter}
                                    </span>
                                    <span className="text-5xl md:text-[4vw] text-[#f5bd02] ml-2">%</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}