"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { StickyBackButton } from "@/components/StickyBackButton";
import { LightboxImage } from "@/components/ImageLightbox";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";

export default function Uni4SocietyPage() {
    const { t } = useLanguage();
    const project = t("cv.uni4society");

    const stickers = [
        { src: "/Uni4Society/Sticker/U4S_bayıl_istersen.png", alt: "Bayıl İstersen Sticker" },
        { src: "/Uni4Society/Sticker/U4S_benim_eşgal.png", alt: "Benim Eşgal Sticker" },
        { src: "/Uni4Society/Sticker/U4S_girişmciolalımdedin.png", alt: "Girişimci Olalım Dedin Sticker" },
        { src: "/Uni4Society/Sticker/U4S_ionaylandıysa.png", alt: "İonaylandıysa Sticker" },
        { src: "/Uni4Society/Sticker/U4S_what a week.png", alt: "What a Week Sticker" },
        { src: "/Uni4Society/Sticker/peri.png", alt: "Peri Sticker" },
    ];

    const contents = [
        { src: "/Uni4Society/Sticker/İçerikler/Frame 8-1.jpg", alt: "Uni4Society Content 8-1" },
        { src: "/Uni4Society/Sticker/sm içerik/2022yatırımüni1.png", alt: "Yatırım Üni 1" },
        { src: "/Uni4Society/Sticker/sm içerik/2022yatırımüni2.png", alt: "Yatırım Üni 2" },
        { src: "/Uni4Society/Sticker/sm içerik/ilkkan özlüsöz.png", alt: "Filozof İlkkan" },
        { src: "/Uni4Society/Sticker/Tişört tasarımı/U4S Tişört Mockup.jpg", alt: "Uni4Society Tişört Mockup" },
    ];

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 transition-colors duration-500">
            <StickyBackButton />
            <div className="fixed top-6 right-6 z-50">
                <ThemeToggle />
            </div>

            {/* Brand Gradient Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-20 dark:opacity-[0.15]">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#FAE000] blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#AA144D] blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#58B4AE] blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#ED9724] blur-[120px] animate-pulse" style={{ animationDuration: '9s' }} />
            </div>

            {/* Hero Section */}
            <section className="relative h-[80vh] w-full overflow-hidden bg-neutral-900">
                <LightboxImage
                    src="/Uni4Society/Sticker/İçerikler/Behance-KAPAK copy.jpg"
                    alt="Uni4Society YTÜ Cover"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-20 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-2xl">
                            {project.category}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">

                {/* Intro / Info */}
                <section className="grid md:grid-cols-12 gap-12 items-start">
                    <div className="md:col-span-4 space-y-8 sticky top-32">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Info Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/30 mb-2">Deneyim</p>
                                    <p className="text-sm font-medium leading-relaxed">{project.role}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/30 mb-2">YIL</p>
                                    <p className="text-sm font-medium leading-relaxed">{project.date}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/30 mb-2">Araçlar</p>
                                    <p className="text-sm font-medium leading-relaxed">{project.tools}</p>
                                </div>
                            </div>

                            {/* Partner Logos */}
                            <div className="pt-12 flex flex-wrap items-center gap-8 md:gap-12">
                                {[
                                    { src: "/Uni4Society/Sticker/logolar/spark-pp-logo.png", alt: "Spark", width: 60 },
                                    { src: "/Uni4Society/Sticker/logolar/Ytü-Teknopark Logo.png", alt: "YTÜ Teknopark", width: 120 },
                                    { src: "/Uni4Society/Sticker/logolar/Ytü-StartupHouse.png", alt: "YTÜ Startup House", width: 100 },
                                    { src: "/Uni4Society/Sticker/logolar/yildiz-teknik-universitesi-logo-diket-turkce-.png", alt: "YTÜ Logo", width: 80 },
                                    { src: "/Uni4Society/Sticker/logolar/uni4socirt_ytü.png", alt: "U4S YTÜ", width: 80 }
                                ].map((logo, i) => (
                                    <div key={i} className="relative transition-all duration-500 hover:scale-110">
                                        <Image
                                            src={logo.src}
                                            alt={logo.alt}
                                            width={logo.width}
                                            height={logo.width / 2}
                                            className="object-contain dark:brightness-0 dark:invert transition-all duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="md:col-span-8 space-y-12">
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                            {project.introTitle}
                        </h2>
                        <div className="text-xl text-muted-foreground leading-relaxed whitespace-pre-line">
                            {project.description}
                        </div>
                    </div>
                </section>

                {/* Stickers Section */}
                <section className="space-y-12 text-center">
                    <div className="max-w-3xl mx-auto space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold">{project.stickerTitle}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {project.stickerDesc}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {stickers.map((sticker, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="aspect-square relative group bg-foreground/[0.02] rounded-3xl p-6 border border-foreground/5 hover:border-primary/20 transition-all duration-500"
                            >
                                <LightboxImage
                                    src={sticker.src}
                                    alt={sticker.alt}
                                    fill
                                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Bootcamp Section */}
                <section className="space-y-16">
                    <div className="max-w-3xl space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold">{project.bootcampTitle}</h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {project.bootcampDesc}
                        </p>
                    </div>

                    {/* Posters Grid */}
                    <div className="md:col-span-12 grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative rounded-3xl overflow-hidden border border-foreground/5 shadow-2xl"
                        >
                            <LightboxImage
                                src="/Uni4Society/Sticker/İçerikler/BOOTCAMPAfiş-QR-DİKEY.jpg"
                                alt="Bootcamp Vertical Poster"
                                className="w-full h-auto"
                                width={600}
                                height={900}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative rounded-3xl overflow-hidden border border-foreground/5 shadow-2xl bg-neutral-900/50"
                        >
                            <LightboxImage
                                src="/Uni4Society/Sticker/İçerikler/BOOTCAMPAfiş-QR-YATAY.jpg"
                                alt="Bootcamp Horizontal Poster"
                                className="w-full h-auto"
                                width={1200}
                                height={800}
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Content Grid */}
                <section className="space-y-12">
                    <div className="max-w-3xl space-y-4 text-center mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold">{project.contentTitle}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {project.contentDesc}
                        </p>
                    </div>

                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {contents.map((content, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="break-inside-avoid relative rounded-3xl overflow-hidden border border-foreground/5 shadow-lg hover:shadow-2xl transition-all duration-500 group"
                            >
                                <LightboxImage
                                    src={content.src}
                                    alt={content.alt}
                                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                                    width={800}
                                    height={1000}
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div >
        </main >
    );
}
