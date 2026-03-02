"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BoodyPhoneMockup } from "./BoodyPhoneMockup";

interface Section {
    id: string;
    heading: string;
    description: string;
    image?: string;
    images?: string[];
    layout: "text-left" | "image-left";
}

const sections: Section[] = [
    {
        id: "ai-assistant",
        heading: "AI Çalışma Asistanı",
        description: "Matematik veya fen problemlerini yakalamaya (OCR) ve anında adım adım yapay zeka rehberliğinde çözümler almaya olanak tanıyan kusursuz bir iş akışı. Freemium modeline dayalı bir deneyim sunar.",
        image: "/boody-step-a-kaydedilenler.png",
        layout: "text-left"
    },
    {
        id: "campus-network",
        heading: "Akıllı Kampüs Ağı",
        description: "Öğrenciler arasındaki boşluğu doldurur. Ortak akademik ilgi alanlarına ve bölümlere göre kullanıcıları eşleştirir (Algoritma odaklı bağlantı kartları) ve iş birliği için güvenli, uygulama içi grup sohbetlerini kolaylaştırır.",
        images: ["/boody-step-b-yeni-ekle.png", "/boody-step-c-mesajlar.png"],
        layout: "image-left"
    }
];

export function BoodyCaseStudy() {
    return (
        <section className="bg-black text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {sections.map((section, index) => (
                    <div
                        key={section.id}
                        className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 py-24 md:py-[150px] ${section.layout === "image-left" ? "md:flex-row-reverse" : ""
                            }`}
                    >
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex-1 space-y-6"
                        >
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                                {section.heading}
                            </h2>
                            <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed max-w-xl">
                                {section.description}
                            </p>
                        </motion.div>

                        {/* Image Content / Mockups */}
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="flex-1 relative w-full flex justify-center items-center"
                        >
                            {section.id === "ai-assistant" && section.image ? (
                                <BoodyPhoneMockup className="w-[280px] md:w-[320px] aspect-[1/2]">
                                    <Image
                                        src={section.image}
                                        alt={section.heading}
                                        fill
                                        className="object-cover"
                                    />
                                </BoodyPhoneMockup>
                            ) : section.images ? (
                                <div className="relative w-full max-w-[400px] aspect-[4/5] flex items-center justify-center">
                                    <BoodyPhoneMockup className="w-[260px] md:w-[280px] aspect-[1/2] absolute -translate-x-12 -translate-y-8 z-10 rotate-[-5deg]">
                                        <Image
                                            src={section.images[0]}
                                            alt="Yeni Ekle"
                                            fill
                                            className="object-cover"
                                        />
                                    </BoodyPhoneMockup>
                                    <BoodyPhoneMockup className="w-[260px] md:w-[280px] aspect-[1/2] translate-x-12 translate-y-8 z-20 rotate-[5deg]">
                                        <Image
                                            src={section.images[1]}
                                            alt="Mesajlar"
                                            fill
                                            className="object-cover"
                                        />
                                    </BoodyPhoneMockup>
                                </div>
                            ) : null}
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-indigo-600/10 blur-[120px] rounded-full" />
            </div>
        </section>
    );
}
