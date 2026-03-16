"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, MapPin, Globe, Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import HeroShowcase from "@/components/home/HeroShowcase";
import Link from "next/link";
import { FigmaInspectWrapper } from "./FigmaInspectWrapper";

// (GrainOverlay removed for performance — feTurbulence causes GPU stalls)

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
    const { language, setLanguage, t } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === "tr" ? "en" : "tr");
    };

    return (
        <section className="relative h-screen md:h-screen min-h-[85dvh] w-full overflow-hidden bg-background text-foreground font-friendly transition-colors duration-500">

            {/* Main Layout - Tightened spacing */}
            <div className="relative z-20 h-full flex flex-col justify-start px-6 md:px-12 pt-2 md:pt-4 pb-10 max-w-[1400px] mx-auto gap-4 md:gap-12">

                {/* Navigation Navbar */}
                <nav className="relative z-50 w-full transition-all duration-500">
                    <div className="flex justify-between items-center text-sm tracking-wide py-4">
                        <div className="flex items-center gap-8">
                            <Link href="/" className="font-bold text-foreground/90 hover:opacity-70 transition-opacity">
                                A. Samed Bozdağ
                            </Link>
                        </div>

                        <div className="flex items-center gap-3 md:gap-6">
                            {/* Language Toggle */}
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-2 px-3 py-1 rounded-full border border-border/40 hover:bg-foreground/5 transition-colors duration-500"
                            >
                                <Globe size={14} />
                                <span className="font-medium text-xs">
                                    {language === "tr" ? "EN" : "TR"}
                                </span>
                            </button>

                            <div className="hidden md:flex items-center gap-2 transition-colors duration-500">
                                <MapPin size={14} className="text-foreground/40" />
                                <span>{t("common.location")}</span>
                            </div>
                            <div className="flex items-center gap-3 transition-colors duration-500">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                <LiveClock />
                            </div>

                            <div className="ml-2">
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Friendly Hero Content */}
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-4"
                    >
                        <div className="inline-flex items-center gap-3 text-emerald-400 font-medium tracking-wide">
                            <span className="h-0.5 w-10 bg-emerald-400/30"></span>
                            <FigmaInspectWrapper label="Badge • Auto Layout">
                                <span>{t("hero.title")}</span>
                            </FigmaInspectWrapper>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-[1.3] md:leading-[1.15] tracking-tight transition-colors duration-500">
                            <FigmaInspectWrapper label="Span • 24px">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="opacity-60 font-normal italic">{t("common.hello")}</span>
                                    <motion.div
                                        animate={{ rotate: [0, 15, -10, 15, 0] }}
                                        transition={{ 
                                            duration: 2, 
                                            repeat: Infinity, 
                                            repeatDelay: 1,
                                            ease: "easeInOut" 
                                        }}
                                        className="origin-bottom-right inline-block"
                                    >
                                        {/* Premium Minimalist Waving Hand - Resized to 37px */}
                                        <svg width="37" height="37" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                                            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" />
                                            <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v10" />
                                            <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                                            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.82-2.82L7 15" />
                                        </svg>
                                    </motion.div>
                                </div>
                            </FigmaInspectWrapper>
                            <FigmaInspectWrapper label="H1 • 64px">
                                <span>{t("common.im")}</span>
                            </FigmaInspectWrapper>
                        </h1>

                        <p className="text-lg md:text-xl text-foreground/50 leading-relaxed font-normal max-w-lg transition-colors duration-500 px-0 md:px-0">
                            {t("hero.description")}
                        </p>
                    </motion.div>
                </div>
               {/* Subtle Indicator - Moved to center for better visibility */}
                <div className="flex justify-center w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-foreground/30 transition-colors duration-500"
                    >
                        <span className="font-medium mb-1">{t("common.scrollDown")}</span>
                        <motion.div 
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="text-emerald-400"
                        >
                            <ArrowDown size={14} />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
