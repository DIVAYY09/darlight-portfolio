"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLMotionProps<"section"> {
    children: React.ReactNode;
}

export function Section({ children, className, ...props }: SectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn("min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-16 py-24", className)}
            {...props}
        >
            {children}
        </motion.section>
    );
}
