"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TireScene } from "@/components/prometeon/TireScene";

export default function PrometeonInterlude() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center bg-background transition-colors duration-500 overflow-hidden">
            {/* Background Title (Behind the Tire) - Same style as Spitfire */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                >
                    <h2 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/10 tracking-tighter leading-none uppercase transition-all duration-500">
                        PROMETEON
                    </h2>
                    <p className="mt-4 text-sm md:text-lg uppercase tracking-[0.5em] text-foreground/40 font-medium transition-colors duration-500">
                        Endüstriyel Mükemmellik
                    </p>
                </motion.div>
            </div>

            {/* 3D Scene (In Front) - Added vertical padding to prevent covering entire screen */}
            <div className="absolute inset-x-0 top-[10vh] bottom-[10vh] z-10">
                <TireScene />
            </div>

            {/* Bottom Controls (On Top) */}
            <div className="absolute bottom-16 md:bottom-24 left-0 w-full flex flex-col items-center gap-6 z-20 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 1 }}
                    className="pointer-events-auto"
                >
                    <Link
                        href="/projects/prometeon"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-card hover:bg-foreground/5 backdrop-blur-md border border-border text-foreground font-medium tracking-wide transition-all hover:scale-105"
                    >
                        <span>Projeyi İncele</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </motion.div>

                <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/20 transition-colors duration-500 animate-pulse">
                    İnteraktif 3D
                </span>
            </div>

            {/* Gradient fades for seamless integration */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent pointer-events-none transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none transition-colors duration-500" />
        </section>
    );
}
