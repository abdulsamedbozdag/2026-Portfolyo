"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { PhoneMockup } from "@/components/mockups/PhoneMockup";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface Feature {
    title: string;
    description: string;
    image: string;
}

export function StickyScroll() {
    const { t } = useLanguage();
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const features: Feature[] = [
        {
            title: t("cv.car2gather.step1Title"),
            description: t("cv.car2gather.step1Desc"),
            image: "/RotadakiSürücüler.png"
        },
        {
            title: t("cv.car2gather.step2Title"),
            description: t("cv.car2gather.step2Desc"),
            image: "/SeçilenSürücüyeTalepGöndermSayfası.png"
        },
        {
            title: t("cv.car2gather.step3Title"),
            description: t("cv.car2gather.step3Desc"),
            image: "/ChatSayfası.png"
        }
    ];

    return (
        <section className="relative bg-neutral-950 py-24 md:py-0" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                    {/* Left Column: Text Blocks */}
                    <div className="w-full md:w-1/2 space-y-[50vh] md:space-y-0 relative">
                        {features.map((feature, index) => (
                            <FeatureLink
                                key={index}
                                feature={feature}
                                index={index}
                                setActiveIndex={setActiveIndex}
                            />
                        ))}
                    </div>

                    {/* Right Column: Sticky Phone */}
                    <div className="hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center">
                        <div className="relative w-full max-w-sm aspect-[9/19]">
                            <PhoneMockup className="scale-90 lg:scale-100 transition-transform duration-500">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="absolute inset-0 w-full h-full"
                                    >
                                        <Image
                                            src={features[activeIndex].image}
                                            alt={features[activeIndex].title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 400px"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </PhoneMockup>
                        </div>
                    </div>

                    {/* Mobile: Dynamic View (Non-sticky) */}
                    <div className="md:hidden space-y-24">
                        {features.map((feature, index) => (
                            <div key={index} className="space-y-8">
                                <div className="relative aspect-[9/19] max-w-[280px] mx-auto">
                                    <PhoneMockup className="scale-95">
                                        <Image
                                            src={feature.image}
                                            alt={feature.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </PhoneMockup>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                                    <p className="text-neutral-400 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureLink({ feature, index, setActiveIndex }: { feature: Feature, index: number, setActiveIndex: (i: number) => void }) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        margin: "-40% 0px -40% 0px",
        once: false
    });

    useEffect(() => {
        if (isInView) {
            setActiveIndex(index);
        }
    }, [isInView, index, setActiveIndex]);

    return (
        <div
            ref={ref}
            className={cn(
                "md:h-screen flex flex-col justify-center transition-all duration-700 ease-in-out hidden md:flex",
                isInView ? "opacity-100 translate-x-0" : "opacity-20 -translate-x-4"
            )}
        >
            <span className="text-orange-500 font-mono text-sm mb-4 tracking-widest uppercase">
                Step 0{index + 1}
            </span>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 text-white tracking-tight">
                {feature.title}
            </h3>
            <p className="text-xl text-neutral-400 leading-relaxed max-w-md">
                {feature.description}
            </p>
        </div>
    );
}
