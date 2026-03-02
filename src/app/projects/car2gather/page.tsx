"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { StickyBackButton } from "@/components/StickyBackButton";
import { ResearchHero } from "@/components/car2gather/ResearchHero";
import { CoreSection } from "@/components/car2gather/CoreSection";
import { DiscoverySection } from "@/components/car2gather/DiscoverySection";
import { EmpathySection } from "@/components/car2gather/EmpathySection";
import { ArchitectureSection } from "@/components/car2gather/ArchitectureSection";
import { ProcessSection } from "@/components/car2gather/ProcessSection";
import { StickyScroll } from "@/components/car2gather/StickyScroll";

export default function Car2GatherPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-500 selection:bg-orange-500/20">
            <StickyBackButton />

            {/* 1. Hero Section */}
            <ResearchHero />

            {/* 2. The Core (Problem & Goal) */}
            <CoreSection />

            {/* 3. Discovery (Benchmark & Target Audience) */}
            <DiscoverySection />

            {/* 4. Empathy & Persona */}
            <EmpathySection />

            {/* 5. Architecture (IA & User Flow) */}
            <ArchitectureSection />

            {/* 6. Process & Architecture (Low-Fi & Components) - Pre-existing */}
            <ProcessSection />

            {/* 7. High-Fi Experience (Sticky Scroll) - Pre-existing */}
            <StickyScroll />

            {/* 8. Video Showcase */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl aspect-video"
                >
                    <iframe
                        src="https://www.youtube.com/embed/f8DeApN6xvc"
                        title="car2gather Video"
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </motion.div>
            </section>

            {/* Footer space */}
            <div className="py-24" />
        </main>
    );
}
