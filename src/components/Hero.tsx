"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-between bg-[#faf9f6] dark:bg-[#0a0a0a] overflow-hidden text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
            {/* Subtle Editorial Grid Lines */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute left-[8%] top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800/60" />
                <div className="absolute right-[8%] top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800/60" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neutral-100 dark:bg-neutral-800/30 hidden md:block" />
            </div>

            {/* Top Navigation Bar */}
            <header className="relative z-10 flex items-center justify-between px-8 md:px-16 pt-10">
                <div className="overflow-hidden">
                    <motion.span
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.2, delay: 0.1, ease }}
                        className="block text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500"
                    >
                        Portfolio © 2026
                    </motion.span>
                </div>
                <div className="overflow-hidden">
                    <motion.span
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease }}
                        className="block text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500"
                    >
                        İstanbul, TR
                    </motion.span>
                </div>
            </header>

            {/* Main Hero Content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 py-16">
                {/* Name — Large Editorial Typography */}
                <div className="mb-6 md:mb-8">
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.2, delay: 0.3, ease }}
                            className="text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-[-0.04em] text-neutral-900 dark:text-white"
                        >
                            Abdulsamed
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.2, delay: 0.4, ease }}
                            className="text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-[-0.04em] text-neutral-900 dark:text-white"
                        >
                            Bozdağ
                            <motion.span
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                                className="inline-block w-3 h-3 md:w-4 md:h-4 rounded-full bg-amber-500 ml-3 md:ml-5 align-middle"
                            />
                        </motion.h1>
                    </div>
                </div>

                {/* Tagline & Role */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
                    <div className="max-w-lg">
                        <div className="overflow-hidden">
                            <motion.p
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1.2, delay: 0.6, ease }}
                                className="text-lg md:text-xl font-light leading-relaxed text-neutral-500 dark:text-neutral-400"
                            >
                                Kullanıcı deneyimi ve marka odaklı projeler üreten bir
                                <span className="text-neutral-800 dark:text-neutral-200 font-normal"> İletişim Tasarımcısıyım </span>
                                — dijital ürünler ve görsel sistemler aracılığıyla.
                            </motion.p>
                        </div>
                    </div>

                    <div className="flex-shrink-0 md:text-right">
                        <div className="overflow-hidden">
                            <motion.div
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1.2, delay: 0.7, ease }}
                            >
                                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500 mb-1">
                                    Disiplin
                                </p>
                                <p className="text-base font-medium text-neutral-700 dark:text-neutral-300">
                                    İletişim Tasarımı
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section — Disciplines Marquee + Scroll CTA */}
            <div className="relative z-10 border-t border-neutral-200 dark:border-neutral-800">
                {/* Horizontal Scroll Tags */}
                <div className="overflow-hidden py-5">
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                        className="flex whitespace-nowrap gap-6 text-sm font-medium text-neutral-300 dark:text-neutral-700 uppercase tracking-[0.15em]"
                    >
                        {[0, 1].map((i) => (
                            <span key={i} className="flex items-center gap-6">
                                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />Görsel Kimlik</span>
                                <span className="text-neutral-200 dark:text-neutral-800">—</span>
                                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500" />3D &amp; Motion</span>
                                <span className="text-neutral-200 dark:text-neutral-800">—</span>
                                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" />Web Deneyimi</span>
                                <span className="text-neutral-200 dark:text-neutral-800">—</span>
                                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" />Marka İletişimi</span>
                                <span className="text-neutral-200 dark:text-neutral-800">—</span>
                                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />UI/UX Tasarım</span>
                                <span className="text-neutral-200 dark:text-neutral-800">—</span>
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <div className="flex justify-center pb-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="text-neutral-300 dark:text-neutral-600">
                                <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="1.5" />
                                <motion.circle
                                    cx="10" r="2" fill="currentColor"
                                    animate={{ cy: [8, 16, 8] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
