"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LightboxImage } from "@/components/ImageLightbox";
import { StickyBackButton } from "@/components/StickyBackButton";
import { useLanguage } from "@/context/LanguageContext";

export default function SocialMediaPage() {
    const { t, language } = useLanguage();

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-500 selection:bg-blue-600/20">
            <StickyBackButton />

            {/* Hero Section */}
            <section className="relative h-[80vh] w-full bg-[#0A0A0A] overflow-hidden">
                <Image
                    src="/Social Media/kfc Billboardcopy.jpg"
                    alt="Social Media Design Hero"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl"
                    >
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase border border-white/20 rounded-full backdrop-blur-md bg-white/5">
                                {t("common.socialMedia")}
                            </span>
                            <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase border border-amber-500/30 text-amber-400 rounded-full backdrop-blur-md bg-amber-500/10">
                                {t("common.conceptWork")}
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none uppercase">
                            {(t("common.socialMedia") as string).split(' ').map((word, i) => (
                                <span key={i} className="block">{word}</span>
                            ))}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-light leading-relaxed">
                            {language === 'tr'
                                ? "Markaların dijital dünyadaki sesini, estetik ve stratejik tasarım diliyle güçlendiriyoruz."
                                : "Strengthening the voice of brands in the digital world with an aesthetic and strategic design language."}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Project Info */}
            <section className="max-w-7xl mx-auto py-24 px-6 transition-colors duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-8">
                        <h2 className="text-3xl font-bold mb-4 text-foreground transition-colors duration-500">
                            {language === 'tr' ? "Stratejik Görsel İletişim" : "Strategic Visual Communication"}
                        </h2>
                        <p className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-8">
                            {t("common.unoofficialNote")}
                        </p>
                        <p className="text-lg text-foreground/60 leading-relaxed mb-8 transition-colors duration-500">
                            {language === 'tr'
                                ? "Sosyal medya, bir markanın hedef kitlesiyle en doğrudan temas kurduğu alandır. Bu projede farklı sektörlerden markalar için (Hızlı Tüketim, Sağlık, Kafe vb.) özgün kampanya kurguları ve görsel dünyalar oluşturuldu. Her tasarım, platformun dinamiklerine ve markanın tonuna uygun olarak modernize edildi."
                                : "Social media is the space where a brand establishes the most direct contact with its target audience. In this project, unique campaign setups and visual worlds were created for brands from different sectors (FMCG, Health, Cafe, etc.). Each design was modernized in accordance with the dynamics of the platform and the tone of the brand."}
                        </p>
                    </div>
                    <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-8">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-2 transition-colors duration-500">
                                {language === 'tr' ? "ROL" : "ROLE"}
                            </h3>
                            <p className="text-lg font-medium text-foreground transition-colors duration-500">Art Director</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-2 transition-colors duration-500">
                                {language === 'tr' ? "ODAK" : "FOCUS"}
                            </h3>
                            <p className="text-lg font-medium text-foreground transition-colors duration-500">
                                {language === 'tr' ? "Reklam & İçerik" : "Advertising & Content"}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-2 transition-colors duration-500">
                                {language === 'tr' ? "ARAÇLAR" : "TOOLS"}
                            </h3>
                            <p className="text-lg font-medium text-foreground transition-colors duration-500">Adobe Suite, AI</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Grid - New Hierarchy */}
            <section className="max-w-[1600px] mx-auto px-6 pb-24 space-y-24">

                {/* 1. Dentistry Section */}
                <div className="space-y-8">
                    <div className="w-full aspect-[21/9] relative rounded-3xl overflow-hidden shadow-2xl group border border-border transition-colors duration-500">
                        <LightboxImage
                            src="/Social Media/Dentistry/BehanceŞerit_Dentist_şerit.jpg"
                            alt="Dentistry Campaign Banner"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="aspect-square relative rounded-2xl overflow-hidden shadow-xl group border border-border transition-colors duration-500">
                            <LightboxImage
                                src="/Social Media/Dentistry/Dentist_1.jpg"
                                alt="Dentistry Post 1"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="aspect-square relative rounded-2xl overflow-hidden shadow-xl group border border-border transition-colors duration-500">
                            <LightboxImage
                                src="/Social Media/Dentistry/Dentist_2.jpg"
                                alt="Dentistry Post 2"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="aspect-square relative rounded-2xl overflow-hidden shadow-xl group border border-border transition-colors duration-500">
                            <LightboxImage
                                src="/Social Media/Dentistry/Dentist_3.jpg"
                                alt="Dentistry Post 3"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Cafe Section */}
                <div className="space-y-8">
                    <div className="w-full aspect-[21/9] relative rounded-3xl overflow-hidden shadow-2xl group border border-border transition-colors duration-500">
                        <LightboxImage
                            src="/Social Media/Cafe/tatlıkafe_şerit.jpg"
                            alt="Cafe Campaign Banner"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="aspect-square relative rounded-2xl overflow-hidden shadow-xl group border border-border transition-colors duration-500">
                            <LightboxImage
                                src="/Social Media/Cafe/1.jpg"
                                alt="Cafe Post 1"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="aspect-square relative rounded-2xl overflow-hidden shadow-xl group border border-border transition-colors duration-500">
                            <LightboxImage
                                src="/Social Media/Cafe/2.jpg"
                                alt="Cafe Post 2"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="aspect-square relative rounded-2xl overflow-hidden shadow-xl group border border-border transition-colors duration-500">
                            <LightboxImage
                                src="/Social Media/Cafe/3.jpg"
                                alt="Cafe Post 3"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>

                {/* 3. KFC & Billboard Section */}
                <div className="w-full aspect-video relative rounded-3xl overflow-hidden shadow-2xl group border border-border transition-colors duration-500">
                    <LightboxImage
                        src="/Social Media/kfc Billboardcopy.jpg"
                        alt="KFC Billboard Campaign"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                <div className="pt-12 text-center">
                    <p className="text-foreground/40 font-medium transition-colors duration-500">
                        {language === 'tr' ? "Ve daha fazlası dijital stratejilerle hayat buluyor." : "And much more comes to life with digital strategies."}
                    </p>
                </div>
            </section>
        </main>
    );
}
