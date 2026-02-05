"use client";

import { useEffect, useRef } from "react";

interface WaterRipplesProps {
    imageUrl: string;
    translateY?: number; // Manual vertical shift prop
}

export function WaterRipples({ imageUrl, translateY = 0 }: WaterRipplesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // REFS
    const widthRef = useRef(0);
    const heightRef = useRef(0);
    const halfWidthRef = useRef(0);
    const halfHeightRef = useRef(0);
    const sizeRef = useRef(0);

    // BUFFERS
    const rippleMapRef = useRef<Int16Array>(new Int16Array(0));
    const lastMapRef = useRef<Int16Array>(new Int16Array(0));
    const rippleImageDataRef = useRef<ImageData | null>(null);
    const textureImageDataRef = useRef<ImageData | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        // 'willReadFrequently' optimizes the heavy pixel reading operations
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        let animationFrameId: number;

        // --- 1. INITIALIZATION ---
        const init = () => {
            const width = container.offsetWidth;
            const height = container.offsetHeight;

            canvas.width = width;
            canvas.height = height;

            widthRef.current = width;
            heightRef.current = height;
            halfWidthRef.current = width >> 1;
            halfHeightRef.current = height >> 1;
            sizeRef.current = width * (height + 2) * 2;

            rippleMapRef.current = new Int16Array(sizeRef.current);
            lastMapRef.current = new Int16Array(sizeRef.current);

            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                // Draw with Manual Offset
                drawImageCover(ctx, img, width, height, translateY);

                textureImageDataRef.current = ctx.getImageData(0, 0, width, height);
                rippleImageDataRef.current = ctx.getImageData(0, 0, width, height);
            };
        };

        // Helper: CSS 'object-fit: cover' logic + Manual translateY
        const drawImageCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number, offsetYManual: number) => {
            const imgAspect = img.width / img.height;
            const canvasAspect = w / h;
            let renderW, renderH, offsetX, offsetY;

            if (imgAspect < canvasAspect) {
                renderW = w;
                renderH = w / imgAspect;
                offsetX = 0;
                // Center vertically + Manual Shift
                offsetY = ((h - renderH) / 2) + offsetYManual;
            } else {
                renderH = h;
                renderW = h * imgAspect;
                offsetX = (w - renderW) / 2;
                offsetY = 0 + offsetYManual;
            }
            ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
        };

        // --- 2. RENDER LOOP ---
        const render = () => {
            const width = widthRef.current;
            const height = heightRef.current;

            if (!textureImageDataRef.current || !rippleImageDataRef.current) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            const rippleMap = rippleMapRef.current;
            const lastMap = lastMapRef.current;
            const texture = textureImageDataRef.current.data;
            const rippleImage = rippleImageDataRef.current;
            const ripple = rippleImage.data;

            let mapIndex = width;
            let pixelIndex = 0;

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const data = (
                        rippleMap[mapIndex - width] +
                        rippleMap[mapIndex + width] +
                        rippleMap[mapIndex - 1] +
                        rippleMap[mapIndex + 1]
                    ) >> 1;

                    let newHeight = data - lastMap[mapIndex];
                    newHeight -= newHeight >> 5; // Damping
                    lastMap[mapIndex] = newHeight;

                    // Refraction Strength (1024 is standard, lower = stronger distortion)
                    const distortionStrength = 1024;
                    const xOffset = ((x - halfWidthRef.current) * newHeight / distortionStrength) << 0;
                    const yOffset = ((y - halfHeightRef.current) * newHeight / distortionStrength) << 0;

                    if (newHeight !== 0) {
                        let newX = x + xOffset;
                        let newY = y + yOffset;
                        if (newX >= width) newX = width - 1;
                        if (newX < 0) newX = 0;
                        if (newY >= height) newY = height - 1;
                        if (newY < 0) newY = 0;

                        const newPixelIndex = (newY * width + newX) * 4;
                        ripple[pixelIndex] = texture[newPixelIndex];
                        ripple[pixelIndex + 1] = texture[newPixelIndex + 1];
                        ripple[pixelIndex + 2] = texture[newPixelIndex + 2];
                    } else {
                        ripple[pixelIndex] = texture[pixelIndex];
                        ripple[pixelIndex + 1] = texture[pixelIndex + 1];
                        ripple[pixelIndex + 2] = texture[pixelIndex + 2];
                    }
                    mapIndex++;
                    pixelIndex += 4;
                }
            }

            const temp = rippleMapRef.current;
            rippleMapRef.current = lastMapRef.current;
            lastMapRef.current = temp;

            ctx.putImageData(rippleImage, 0, 0);
            animationFrameId = requestAnimationFrame(render);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) << 0;
            const y = (e.clientY - rect.top) << 0;
            disturb(x, y);
        };

        const disturb = (dx: number, dy: number) => {
            const width = widthRef.current;
            // INCREASED RADIUS: Loops from -6 to +6 (Total 12px brush)
            // This makes the ripples "fatter" and more noticeable
            for (let j = dy - 6; j < dy + 6; j++) {
                for (let k = dx - 6; k < dx + 6; k++) {
                    if (j >= 0 && j < heightRef.current && k >= 0 && k < width) {
                        // Higher energy (600) for deeper waves
                        rippleMapRef.current[width * j + k] += 600;
                    }
                }
            }
        };

        init();
        render();

        window.addEventListener("resize", init);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", init);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [imageUrl, translateY]);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 bg-black">
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
}