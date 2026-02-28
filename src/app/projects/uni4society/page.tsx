"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { StickyBackButton } from "@/components/StickyBackButton";
import { LightboxImage } from "@/components/ImageLightbox";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Uni4SocietyPage() {
    const { t } = useLanguage();
    const project = t("uni4society");

    const stickers = [
        { src: "/Uni4Society/Sticker/U4S_bayıl_istersen.png", alt: "Bayıl İstersen Sticker" },
        { src: "/Uni4Society/Sticker/U4S_benim_eşgal.png", alt: "Benim Eşgal Sticker" },
        { src: "/Uni4Society/Sticker/U4S_girişmciolalımdedin.png", alt: "Girişimci Olalım Dedin Sticker" },
        { src: "/Uni4Society/Sticker/U4S_ionaylandıysa.png", alt: "İonaylandıysa Sticker" },
        { src: "/Uni4Society/Sticker/U4S_what a week.png", alt: "What a Week Sticker" },
        { src: "/Uni4Society/Sticker/peri.png", alt: "Peri Sticker" },
    ];

    const contents = [
        { src: "/Uni4Society/Sticker/İçerikler/Frame 0.jpg", alt: "Uni4Society Content 0" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 1.jpg", alt: "Uni4Society Content 1" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 3.jpg", alt: "Uni4Society Content 3" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 4.jpg", alt: "Uni4Society Content 4" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 4.1.jpg", alt: "Uni4Society Content 4.1" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 6.jpg", alt: "Uni4Society Content 6" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 7.jpg", alt: "Uni4Society Content 7" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 7.1.jpg", alt: "Uni4Society Content 7.1" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 7.2.jpg", alt: "Uni4Society Content 7.2" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 7.2-1.jpg", alt: "Uni4Society Content 7.2-1" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 7.2-2.jpg", alt: "Uni4Society Content 7.2-2" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 8.jpg", alt: "Uni4Society Content 8" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 8-1.jpg", alt: "Uni4Society Content 8-1" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 9.jpg", alt: "Uni4Society Content 9" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 10.jpg", alt: "Uni4Society Content 10" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 11.jpg", alt: "Uni4Society Content 11" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 12.jpg", alt: "Uni4Society Content 12" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 13.jpg", alt: "Uni4Society Content 13" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 14.jpg", alt: "Uni4Society Content 14" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 15.jpg", alt: "Uni4Society Content 15" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 16.jpg", alt: "Uni4Society Content 16" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 17.jpg", alt: "Uni4Society Content 17" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 18.jpg", alt: "Uni4Society Content 18" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 19.jpg", alt: "Uni4Society Content 19" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 20.jpg", alt: "Uni4Society Content 20" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 21.jpg", alt: "Uni4Society Content 21" },
        { src: "/Uni4Society/Sticker/İçerikler/Frame 22.jpg", alt: "Uni4Society Content 22" },
    ];

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 transition-colors duration-500">
            <StickyBackButton />
            <div className="fixed top-6 right-6 z-50">
                <ThemeToggle />
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
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4">
                            {project.title}
                        </h1>
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
                        <div className="space-y-1">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{t("about.experience")}</h3>
                            <p className="text-lg font-medium">{project.role}</p>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{t("about.education")}</h3>
                            <p className="text-lg font-medium">{project.date}</p>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Araçlar</h3>
                            <p className="text-lg font-medium">{project.tools}</p>
                        </div>
                    </div>

                    <div className="md:col-span-8 space-y-12">
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                            {project.introTitle}
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {project.description}
                        </p>
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

                {/* Content Grid */}
                <section className="space-y-12">
                    <div className="max-w-3xl space-y-4 text-center mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold">{project.contentTitle}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {project.contentDesc}
                        </p>
                    </div>

                    <div className="columns-1 md:columns-2 gap-8 space-y-8">
                        {contents.map((content, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="break-inside-avoid relative rounded-3xl overflow-hidden border border-foreground/5"
                            >
                                <LightboxImage
                                    src={content.src}
                                    alt={content.alt}
                                    className="w-full h-auto"
                                    width={800}
                                    height={1000}
                                />
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
