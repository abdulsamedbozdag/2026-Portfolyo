"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FigmaInspectWrapperProps {
    children: React.ReactNode;
    label: string;
    active?: boolean;
}

export function FigmaInspectWrapper({ children, label, active = true }: FigmaInspectWrapperProps) {
    const [isHovered, setIsHovered] = useState(false);

    if (!active) return <>{children}</>;

    return (
        <div
            className="relative group p-1 -m-1 inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Bounding Box & Handles */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 z-10 pointer-events-none"
                    >
                        {/* Outline */}
                        <div className="absolute inset-0 border border-indigo-500/60" />

                        {/* Corner Handles */}
                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-indigo-500 border border-white/40" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 border border-white/40" />
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-indigo-500 border border-white/40" />
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-indigo-500 border border-white/40" />

                        {/* Inspect Label Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: -50 }}
                            animate={{ opacity: 1, y: 0, x: -50 }}
                            className="absolute top-0 left-1/2 -translate-y-full mb-1.5 px-2 py-0.5 bg-indigo-500 text-[10px] font-mono font-medium text-white whitespace-nowrap rounded-sm"
                        >
                            {label}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={cn(
                "relative transition-all duration-300",
                isHovered && "scale-[1.01]"
            )}>
                {children}
            </div>
        </div>
    );
}
