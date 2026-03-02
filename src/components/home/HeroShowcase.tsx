"use client";

import { motion, useMotionValue, useSpring, AnimatePresence, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { MapPin, User, ShieldCheck, Zap, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Layer 1: Figma Annotation Component ---
function FigmaAnnotation({ x, y, label }: { x: number; y: number; label: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute z-50 pointer-events-none flex flex-col items-start gap-1"
            style={{ left: x, top: y }}
        >
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#8B5CF6] text-white text-[10px] font-mono rounded shadow-lg">
                <MousePointer2 size={10} className="fill-white" />
                {label}
            </div>
            <div className="h-px w-24 bg-pink-500/50 relative">
                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1 h-1 bg-pink-500 rounded-full" />
                <span className="absolute -top-4 right-0 text-[10px] text-pink-500 font-mono">w: 96px</span>
            </div>
        </motion.div>
    );
}

// --- Main HeroShowcase Component ---
export default function HeroShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [annotations, setAnnotations] = useState<{ id: number; x: number; y: number; label: string }[]>([]);

    // Parallax values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    // Transforms for different layers
    const x1 = useTransform(springX, [-0.5, 0.5], [40, -40]);
    const y1 = useTransform(springY, [-0.5, 0.5], [40, -40]);

    const x2 = useTransform(springX, [-0.5, 0.5], [80, -80]);
    const y2 = useTransform(springY, [-0.5, 0.5], [80, -80]);

    const x3 = useTransform(springX, [-0.5, 0.5], [60, -60]);
    const y3 = useTransform(springY, [-0.5, 0.5], [60, -60]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePos({ x, y });

        // Centered coordinates for parallax (-0.5 to 0.5)
        mouseX.set((x / rect.width) - 0.5);
        mouseY.set((y / rect.height) - 0.5);

        // Add random figma-style annotations occasionally
        if (Math.random() > 0.97) {
            const labels = ["gap: 16px", "padding: 24px", "#8B5CF6", "border-radius: 12px", "display: flex"];
            const id = Date.now();
            setAnnotations(prev => [...prev.slice(-3), { id, x, y, label: labels[Math.floor(Math.random() * labels.length)] }]);
            setTimeout(() => {
                setAnnotations(prev => prev.filter(a => a.id !== id));
            }, 1000);
        }
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-full min-h-[500px] flex items-center justify-center overflow-hidden cursor-crosshair group hidden lg:flex"
        >
            {/* Layer 1: Architect's Canvas (Grid) */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            {/* Figma Annotations */}
            <AnimatePresence>
                {annotations.map((anno) => (
                    <FigmaAnnotation key={anno.id} x={anno.x} y={anno.y} label={anno.label} />
                ))}
            </AnimatePresence>

            {/* Mouse Tracking Glow */}
            <motion.div
                className="absolute w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none z-0"
                style={{
                    left: mousePos.x - 128,
                    top: mousePos.y - 128,
                }}
            />

            {/* Layer 2: Floating UI Components */}
            <div className="relative w-full h-full flex items-center justify-center p-12">

                {/* Component 1 (Top Left): Location Chip */}
                <motion.div
                    style={{ x: x1, y: y1 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[15%] left-[10%] z-30"
                >
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full py-2.5 px-5 flex items-center gap-3 shadow-2xl">
                        <div className="bg-emerald-500/20 p-1.5 rounded-full">
                            <MapPin size={16} className="text-emerald-400" />
                        </div>
                        <span className="text-sm font-medium text-white/90 tracking-wide">Nereye?</span>
                    </div>
                </motion.div>

                {/* Component 2 (Center Right): User Stats - THE LARGEST */}
                <motion.div
                    style={{ x: x2, y: y2 }}
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute right-[5%] top-[30%] z-20"
                >
                    <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 w-[280px] shadow-2xl relative overflow-hidden group/card">
                        <div className="absolute top-0 right-0 p-4 opacity-20 transition-opacity group-hover/card:opacity-40">
                            <Zap size={40} className="text-purple-400" />
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 p-[1px]">
                                    <div className="w-full h-full rounded-2xl bg-neutral-900 flex items-center justify-center overflow-hidden">
                                        <User size={24} className="text-white/50" />
                                    </div>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-neutral-900 rounded-full" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white/90">Boody AI</h4>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Expert Mode</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] text-white/50 font-mono uppercase">5 AI Sorusu Çözüldü</span>
                                <span className="text-xs font-bold text-purple-400">85%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "85%" }}
                                    transition={{ duration: 2, delay: 1 }}
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Component 3 (Bottom Left): Segmented Control / Toggle */}
                <motion.div
                    style={{ x: x3, y: y3 }}
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[20%] left-[15%] z-30"
                >
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center gap-1 shadow-2xl">
                        <div className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg">UI/UX</div>
                        <div className="px-4 py-2 rounded-xl text-xs font-medium text-white/40 hover:text-white/60 transition-colors">3D</div>
                        <div className="px-4 py-2 rounded-xl text-xs font-medium text-white/40 hover:text-white/60 transition-colors">Motion</div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
