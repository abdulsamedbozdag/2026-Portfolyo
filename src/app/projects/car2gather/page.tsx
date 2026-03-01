"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { LightboxImage } from "@/components/ImageLightbox";
import { StickyBackButton } from "@/components/StickyBackButton";
import { StickyScroll } from "@/components/car2gather/StickyScroll";

export default function Car2GatherPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-500 selection:bg-orange-500/20">
            <StickyBackButton />

            {/* Hero Section */}
            <section className="relative h-[80vh] w-full bg-neutral-900 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative w-64 h-64 md:w-96 md:h-96 z-20"
                >
                    <Image
                        src="/logos/car2gather.png"
                        alt="car2gather Logo"
                        fill
                        className="object-contain brightness-0 invert drop-shadow-[0_0_30px_rgba(255,165,0,0.3)]"
                        priority
                    />
                </motion.div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white z-30">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="max-w-4xl"
                    >
                        <span className="inline-block px-3 py-1 mb-4 text-sm font-medium border border-white/30 rounded-full backdrop-blur-sm">
                            {t("common.app")}
                        </span>
                        <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight">
                            car2gather
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Project Details */}
            <section className="bg-background transition-colors duration-500">
                <div className="max-w-3xl mx-auto py-24 px-6 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-left md:text-center">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-2">Rolüm</h3>
                            <p className="text-lg font-medium transition-colors duration-500">{t("cv.car2gather.role")}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-2">Yıl</h3>
                            <p className="text-lg font-medium transition-colors duration-500">{t("cv.car2gather.year")}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-2">Araçlar</h3>
                            <p className="text-lg font-medium transition-colors duration-500">Figma, React, Tailwind CSS</p>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight text-foreground transition-colors duration-500">
                        {t("cv.car2gather.description")}
                    </h2>
                </div>

                {/* Sticky Scroll Feature Section - Moved Up */}
                <StickyScroll />

                {/* Content Flow */}
                <div className="max-w-7xl mx-auto space-y-12 px-6 pb-24">
                    {/* YouTube Video Section */}
                    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/f8DeApN6xvc"
                            title="car2gather Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="absolute inset-0"
                        ></iframe>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-24">
                    <div className="bg-card border border-border rounded-2xl p-12 text-center text-foreground/40 transition-colors duration-500">
                        <p>Dashboard ve arayüz detayları buraya eklenecek.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
