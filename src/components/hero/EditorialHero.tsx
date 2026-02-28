"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, MapPin, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

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
        <section className="relative h-screen w-full overflow-hidden bg-background text-foreground font-friendly transition-colors duration-500">

            {/* Main Layout */}
            <div className="relative z-20 h-full flex flex-col justify-between px-6 md:px-12 py-10 max-w-[1400px] mx-auto">

                {/* Navigation Navbar */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10 md:bg-transparent md:backdrop-blur-none md:border-none transition-all duration-500">
                    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 md:py-10 flex justify-between items-center text-sm tracking-wide">
                        <div className="flex items-center gap-8">
                            <Link href="/" className="font-bold text-foreground/90 hover:opacity-70 transition-opacity">
                                A. Samed Bozdağ
                            </Link>
                            <Link href="/" className="hidden md:block font-medium text-foreground/60 hover:text-foreground transition-colors">
                                Home
                            </Link>
                        </div>

                        <div className="flex items-center gap-3 md:gap-6">
                            <Link href="/" className="md:hidden font-medium text-foreground/60 hover:text-foreground transition-colors mr-2">
                                Home
                            </Link>
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
                        </div>
                    </div>
                </nav>

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
                            <span>{t("hero.title")}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-[1.3] md:leading-[1.15] tracking-tight transition-colors duration-500">
                            <span className="opacity-60 font-normal italic">{t("common.hello")}</span><br />
                            {t("common.im")}
                        </h1>

                        <p className="text-lg md:text-xl text-foreground/50 leading-relaxed font-normal max-w-lg transition-colors duration-500 px-0 md:px-0">
                            {t("hero.description")}
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-4"
                        >
                            <button className="px-8 py-3.5 rounded-full bg-foreground text-background font-semibold hover:bg-emerald-500 transition-colors duration-300">
                                {t("common.projects")}
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
                        className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-foreground/20 transition-colors duration-500"
                    >
                        <div className="animate-bounce">
                            <ArrowDown size={14} />
                        </div>
                        <span>{t("common.scrollDown")}</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
