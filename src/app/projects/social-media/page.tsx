"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LightboxImage } from "@/components/ImageLightbox";
import { StickyBackButton } from "@/components/StickyBackButton";
import { useLanguage } from "@/context/LanguageContext";

export default function SocialMediaPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-white dark:bg-[#050505] selection:bg-blue-600 selection:text-white">
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
                        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase border border-white/20 rounded-full backdrop-blur-md bg-white/5">
                            {t("common.brandComm")}
                        </span>
                        <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none">
                            SOCIAL<br />MEDIA
                        </h1>
                        <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-light leading-relaxed">
                            Markaların dijital dünyadaki sesini, estetik ve stratejik tasarım diliyle güçlendiriyoruz.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Project Info */}
            <section className="max-w-7xl mx-auto py-24 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-8">
                        <h2 className="text-3xl font-bold mb-8">Stratejik Görsel İletişim</h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                            Sosyal medya, bir markanın hedef kitlesiyle en doğrudan temas kurduğu alandır.
                            Bu projede farklı sektörlerden markalar için (Hızlı Tüketim, Sağlık, Kafe vb.)
                            özgün kampanya kurguları ve görsel dünyalar oluşturuldu.
                            Her tasarım, platformun dinamiklerine ve markanın tonuna uygun olarak modernize edildi.
                        </p>
                    </div>
                    <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-8">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Rol</h3>
                            <p className="text-lg font-medium">Art Director</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Odak</h3>
                            <p className="text-lg font-medium">Reklam & İçerik</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Araçlar</h3>
                            <p className="text-lg font-medium">Adobe Suite, AI</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Grid - Masonry style feel */}
            <section className="max-w-[1600px] mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Dentist Campaign */}
                    <div className="lg:col-span-2 aspect-video relative rounded-3xl overflow-hidden shadow-2xl group border border-neutral-100 dark:border-white/5">
                        <LightboxImage
                            src="/Social Media/BehanceŞerit_Dentist.jpg"
                            alt="Dentist Campaign"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl group border border-neutral-100 dark:border-white/5">
                        <LightboxImage
                            src="/Social Media/Dentist_1.jpg"
                            alt="Dentist Content"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    {/* Cafe & Food */}
                    <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl group border border-neutral-100 dark:border-white/5">
                        <LightboxImage
                            src="/Social Media/tatlıkafe.jpg"
                            alt="Cafe Design"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    <div className="lg:col-span-2 aspect-[16/10] relative rounded-3xl overflow-hidden shadow-2xl group border border-neutral-100 dark:border-white/5">
                        <LightboxImage
                            src="/Social Media/kfc Billboardcopy.jpg"
                            alt="KFC Billboard"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    {/* More content */}
                    <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl group border border-neutral-100 dark:border-white/5">
                        <LightboxImage
                            src="/Social Media/1.jpg"
                            alt="Social Media Asset 1"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl group border border-neutral-100 dark:border-white/5">
                        <LightboxImage
                            src="/Social Media/2.jpg"
                            alt="Social Media Asset 2"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    <div className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl group border border-neutral-100 dark:border-white/5">
                        <LightboxImage
                            src="/Social Media/3.jpg"
                            alt="Social Media Asset 3"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                </div>

                <div className="mt-24 text-center">
                    <p className="text-neutral-400 font-medium">Ve daha fazlası dijital stratejilerle hayat buluyor.</p>
                </div>
            </section>
        </main>
    );
}
