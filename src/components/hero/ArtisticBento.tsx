"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

// ---------------------------------------------------------------------------
// Noise Overlay — cinematic film grain across the entire viewport
// ---------------------------------------------------------------------------
function NoiseOverlay() {
    return (
        <div
            className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]"
            aria-hidden="true"
        >
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Breathing Card — wraps each grid item with organic floating animation
// ---------------------------------------------------------------------------
function BreathingCard({
    children,
    className = "",
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    return (
        <motion.div
            className={`
        group relative overflow-hidden
        bg-neutral-900/40 backdrop-blur-2xl
        border border-white/5 rounded-[2.5rem]
        transition-all duration-500 ease-out
        hover:scale-[1.02] hover:border-white/20
        ${className}
      `}
            animate={{ y: [0, -5, 0] }}
            transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}

// ---------------------------------------------------------------------------
// Block A — The Artist (Magazine Cover)
// ---------------------------------------------------------------------------
function BlockArtist() {
    return (
        <BreathingCard className="flex flex-col justify-between p-8 lg:p-10" delay={0}>
            {/* Abstract Avatar */}
            <div className="mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-transparent border border-white/10 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-white/10 to-white/5 backdrop-blur-sm" />
                </div>
            </div>

            {/* Typography */}
            <div className="mt-auto">
                <h1 className="text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] leading-[0.85] text-white/90">
                    ABDUL
                </h1>
                <h1 className="text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] leading-[0.85] text-white/90 mt-1">
                    SAMED
                </h1>
                <p className="text-sm tracking-[0.2em] uppercase text-white/30 mt-5 font-light">
                    Communication Designer
                </p>
            </div>
        </BreathingCard>
    );
}

// ---------------------------------------------------------------------------
// Block B — The Masterpiece (Spitfire Stage)
// ---------------------------------------------------------------------------
function BlockMasterpiece() {
    return (
        <BreathingCard
            className="flex flex-col items-center justify-center relative lg:col-span-2"
            delay={1.2}
        >
            {/* Radial Spotlight */}
            <div
                className="absolute inset-0 rounded-[2.5rem]"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)",
                }}
            />

            {/* Subtle concentric rings for depth */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border border-white/[0.03] animate-pulse" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 rounded-full border border-white/[0.02]" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <p className="text-xs tracking-[0.3em] uppercase text-white/20 mb-4 font-light">
                    Featured Project
                </p>
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white/80">
                    Spitfire Mk.1
                </h2>
                <p className="text-sm text-white/25 mt-2 tracking-wide">
                    Interactive 3D — Coming Soon
                </p>

                {/* Placeholder shimmer line */}
                <div className="mt-8 mx-auto w-32 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
        </BreathingCard>
    );
}

// ---------------------------------------------------------------------------
// Block C — Context (Location + Live Clock)
// ---------------------------------------------------------------------------
function BlockContext() {
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

    return (
        <BreathingCard className="flex flex-col justify-between p-8 lg:p-10" delay={0.6}>
            {/* Location */}
            <div>
                <div className="flex items-center gap-2 text-white/40 mb-1">
                    <MapPin size={14} strokeWidth={1.5} />
                    <span className="text-xs tracking-[0.15em] uppercase font-light">
                        Location
                    </span>
                </div>
                <p className="text-xl font-semibold text-white/80 tracking-tight">
                    İstanbul, TR
                </p>
            </div>

            {/* Live Clock */}
            <div className="mt-6">
                <p className="text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white/70 tabular-nums">
                    {time}
                </p>
            </div>

            {/* Availability */}
            <div className="mt-6 flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="text-xs tracking-[0.15em] uppercase text-white/30 font-light">
                    Available for work
                </span>
            </div>
        </BreathingCard>
    );
}

// ---------------------------------------------------------------------------
// Block D — Selected Work (Boody AI CTA)
// ---------------------------------------------------------------------------
function BlockSelectedWork() {
    return (
        <BreathingCard className="flex flex-col justify-between p-8 lg:p-10 overflow-hidden" delay={2}>
            {/* Dark gradient decoration */}
            <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-40"
                style={{
                    background:
                        "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
                }}
            />

            {/* App Icon Placeholder */}
            <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600/40 to-indigo-600/30 border border-white/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-white/60">B</span>
                </div>
            </div>

            {/* CTA */}
            <div className="relative z-10 mt-auto">
                <h3 className="text-xl font-bold text-white/80 tracking-tight">
                    Boody AI
                </h3>
                <div className="flex items-center gap-1.5 mt-2 text-white/40 group-hover:text-white/60 transition-colors">
                    <span className="text-sm tracking-wide">UI/UX Case Study</span>
                    <ArrowUpRight
                        size={16}
                        strokeWidth={1.5}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                </div>
            </div>
        </BreathingCard>
    );
}

// ===========================================================================
// Main Export
// ===========================================================================
export default function ArtisticBento() {
    return (
        <section
            className="relative min-h-screen w-full"
            style={{ backgroundColor: "#050505" }}
        >
            {/* Cinematic Noise */}
            <NoiseOverlay />

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-auto lg:h-[85vh] p-6 max-w-[1600px] mx-auto">
                {/* A — Artist (col 1, full height) */}
                <BlockArtist />

                {/* B — Masterpiece (col 2-3, full height) */}
                <BlockMasterpiece />

                {/* Right column: C + D stacked */}
                <div className="flex flex-col gap-6 lg:row-span-1">
                    <BlockContext />
                    <BlockSelectedWork />
                </div>
            </div>
        </section>
    );
}
