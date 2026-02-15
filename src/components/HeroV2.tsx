"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";

const FullBleedLiquid = dynamic(
    () => import("@/components/3d/FullBleedLiquid").then((mod) => mod.FullBleedLiquid),
    { ssr: false }
);

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroV2() {
    const scrollToProjects = () => {
        const el = document.getElementById("projekler");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-screen flex flex-col bg-[#050505] overflow-hidden text-white selection:bg-amber-500 selection:text-white cursor-grab active:cursor-grabbing">
            {/* Full-Bleed Liquid Sphere */}
            <FullBleedLiquid />

            {/* Top — Name & Role */}
            <div className="relative z-10 w-full px-8 md:px-16 pt-12 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease }}
                    className="flex items-center justify-between"
                >
                    <span className="text-xs md:text-sm font-medium text-neutral-500 tracking-[0.25em] uppercase">
                        Portfolio © 2026
                    </span>
                    <span className="text-xs md:text-sm font-medium text-neutral-500 tracking-[0.25em] uppercase">
                        İstanbul, TR
                    </span>
                </motion.div>
            </div>

            {/* Bottom — Main Info */}
            <div className="relative z-10 mt-auto w-full px-8 md:px-16 pb-12 pointer-events-none">
                {/* Name */}
                <div className="overflow-hidden mb-2">
                    <motion.h1
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.4, ease }}
                        className="text-5xl md:text-8xl font-bold tracking-tight"
                    >
                        Abdulsamed Bozdağ
                    </motion.h1>
                </div>

                {/* Role */}
                <div className="overflow-hidden mb-8">
                    <motion.p
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.6, ease }}
                        className="text-xl md:text-2xl font-light text-neutral-400"
                    >
                        İletişim Tasarımcısı
                    </motion.p>
                </div>

                {/* CTA */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    onClick={scrollToProjects}
                    className="pointer-events-auto group flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                >
                    <span className="text-base font-medium">Projelere Git</span>
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </motion.button>
            </div>
        </section>
    );
}
