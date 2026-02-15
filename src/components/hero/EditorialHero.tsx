"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, MapPin, Globe } from "lucide-react";

// ---------------------------------------------------------------------------
// Atmospheric Grain Overlay
// ---------------------------------------------------------------------------
function GrainOverlay() {
    return (
        <div
            className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay"
            aria-hidden="true"
        >
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <filter id="grainFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#grainFilter)" />
            </svg>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Live Clock
// ---------------------------------------------------------------------------
function LiveClock() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Europe/Istanbul",
                })
            );
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);

    return <span className="tabular-nums font-medium">{time}</span>;
}

// ---------------------------------------------------------------------------
// Editorial Hero Component
// ---------------------------------------------------------------------------
export default function EditorialHero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-[#050505] text-[#ededed] font-friendly">

            {/* Main Layout */}
            <div className="relative z-20 h-full flex flex-col justify-between px-6 md:px-12 py-10 max-w-[1400px] mx-auto">

                {/* Top Navigation-like Element */}
                <div className="flex justify-between items-center text-sm tracking-wide opacity-80">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-bold text-white/90"
                    >
                        A. Samed Bozdağ
                    </motion.div>

                    <div className="flex items-center gap-6">
                        {/* Language Toggle Placeholder */}
                        <button className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                            <Globe size={14} />
                            <span className="font-medium text-xs">TR / EN</span>
                        </button>

                        <div className="hidden md:flex items-center gap-2">
                            <MapPin size={14} className="text-white/40" />
                            <span>İstanbul, Türkiye</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                            <LiveClock />
                        </div>
                    </div>
                </div>

                {/* Friendly Hero Content */}
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-6"
                    >
                        <div className="inline-flex items-center gap-3 text-emerald-400 font-medium tracking-wide">
                            <span className="h-0.5 w-10 bg-emerald-400/30"></span>
                            <span>İletişim Tasarımcısı</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.15] tracking-tight">
                            <span className="opacity-60 font-normal italic">Selamlar!</span><br />
                            Ben Abdul Samed Bozdağ.
                        </h1>

                        <p className="text-lg md:text-xl text-white/50 leading-relaxed font-normal max-w-lg">
                            Tasarım ve anlatıyı birleştirerek insani, işlevsel ve estetik dijital deneyimler inşa ediyorum.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-4"
                        >
                            <button className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-emerald-400 transition-colors duration-300">
                                Projelerimi Gör
                            </button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Subtle Indicator */}
                <div className="flex justify-start">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/20"
                    >
                        <div className="animate-bounce">
                            <ArrowDown size={14} />
                        </div>
                        <span>Aşağı Kaydır</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
