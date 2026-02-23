"use client";

import { motion, useAnimation, useMotionValue, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef, createContext, useContext } from "react";
import Image from "next/image";
import { ArrowDown, Sun, Moon } from "lucide-react";
import { StickyBackButton } from "@/components/StickyBackButton";
import { LightboxImage } from "@/components/ImageLightbox";
import GlobeToMap from "@/components/prometeon/GlobeToMap";
import { TireScene } from "@/components/prometeon/TireScene";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

// ---------------------------------------------------------------------------
// TYPES & DATA
// ---------------------------------------------------------------------------
const ThemeContext = createContext<{ isDark: boolean; toggle: () => void }>({
    isDark: true,
    toggle: () => { },
});

const useTheme = () => useContext(ThemeContext);

// ---------------------------------------------------------------------------
// Dark / Light Mode Toggle
// ---------------------------------------------------------------------------
const ThemeToggle = () => {
    const { isDark, toggle } = useTheme();
    return (
        <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed top-6 right-6 z-[100] p-3 rounded-full border backdrop-blur-xl transition-colors duration-500"
            style={{
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            }}
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait">
                {isDark ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <Sun size={18} className="text-amber-300" />
                    </motion.div>
                ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <Moon size={18} className="text-[#0f204b]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

// ---------------------------------------------------------------------------
// Marquee Item Component
// ---------------------------------------------------------------------------
const MarqueeItem = ({ src, alt }: { src: string; alt: string }) => {
    const { isDark } = useTheme();
    return (
        <motion.div
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group relative w-80 h-52 rounded-2xl overflow-hidden shrink-0 cursor-pointer border transition-colors duration-500"
            style={{
                borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                background: isDark ? "#111" : "#f0f0f0",
            }}
        >
            <LightboxImage
                src={src}
                alt={alt}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
    );
};

// ---------------------------------------------------------------------------
// Draggable Marquee
// ---------------------------------------------------------------------------
const DraggableMarquee = () => {
    const images = [
        "/prometeon/Lansman/lansman1.jpeg",
        "/prometeon/Lansman/lansman2.jpeg",
        "/prometeon/Lansman/lastikler.jpeg",
        "/prometeon/Lansman/lastikveciragan.jpeg",
        "/prometeon/Lansman/prometeon_isik.jpeg",
        "/prometeon/Lansman/unlockanewera.jpeg",
        "/prometeon/kampanya/prometeon_axess_kampanyasi.jpeg",
        "/prometeon/kampanya/prometeon_maximum_kampanyasi.jpeg",
        "/prometeon/Lansman/toplufoto.jpeg",
    ];

    const x = useMotionValue(0);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.1 });

    const allImages = [...images, ...images, ...images]; // Reduced clones from 4 transfer to 3
    const itemWidth = 336; // 320px + 16px gap
    const trackWidth = allImages.length * itemWidth;

    useEffect(() => {
        let animationFrame: number;
        let lastTime = performance.now();

        const animate = (time: number) => {
            if (!isInView) {
                animationFrame = requestAnimationFrame(animate);
                return;
            }

            if (!isDragging) {
                const delta = time - lastTime;
                const speed = 0.04; // Slightly slower for better perf/aesthetic
                const currentX = x.get();
                let nextX = currentX - speed * delta;

                const oneSetWidth = images.length * itemWidth;
                if (nextX <= -oneSetWidth) {
                    nextX += oneSetWidth;
                }

                x.set(nextX);
            }
            lastTime = time;
            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isDragging, images.length, x, isInView]);

    return (
        <div
            ref={containerRef}
            className="overflow-hidden select-none py-10 cursor-grab active:cursor-grabbing"
        >
            <motion.div
                drag="x"
                style={{ x }}
                dragConstraints={{ left: -trackWidth / 2, right: trackWidth / 2 }}
                dragElastic={0.1}
                dragMomentum={true}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                className="flex gap-4"
            >
                {allImages.map((src, i) => (
                    <MarqueeItem key={i} src={src} alt={`Prometeon Asset ${(i % images.length) + 1}`} />
                ))}
            </motion.div>
        </div >
    );
};

// ---------------------------------------------------------------------------
// Editorial Showcase (Magazine Stack)
// ---------------------------------------------------------------------------
const EditorialShowcase = () => {
    const { isDark } = useTheme();
    const { t } = useLanguage();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const magazineConfigs = [
        { rotate: -12, x: -130, y: 25 },
        { rotate: -4, x: -45, y: -5 },
        { rotate: 4, x: 45, y: 5 },
        { rotate: 12, x: 130, y: 30 },
    ];

    return (
        <section className="relative py-32 overflow-hidden transition-colors duration-500" style={{ background: isDark ? "#080808" : "#f5f5f5" }}>
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-4 transition-colors duration-500"
                        style={{ color: isDark ? "#ededed" : "#212b59" }}
                    >
                        {t("prometeon.publishing")}
                    </motion.h2>
                    <p className="text-sm font-light tracking-[0.4em] uppercase transition-colors duration-500" style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)" }}>
                        {t("prometeon.publishingSub")}
                    </p>
                </div>

                <div className="relative h-[550px] md:h-[650px] flex items-center justify-center">
                    {magazineConfigs.map((config, i) => (
                        <motion.div
                            key={i}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            initial={{
                                rotate: config.rotate,
                                x: config.x,
                                y: config.y,
                            }}
                            animate={{
                                rotate: hoveredIndex === i ? 0 : config.rotate,
                                scale: hoveredIndex === i ? 1.15 : hoveredIndex !== null ? 0.95 : 1,
                                x: config.x,
                                y: hoveredIndex === i ? config.y - 30 : config.y,
                                zIndex: hoveredIndex === i ? 50 : 10 - i,
                            }}
                            transition={{ type: "spring", stiffness: 180, damping: 22 }}
                            className="absolute w-56 h-72 md:w-72 md:h-[400px] rounded-xl overflow-hidden cursor-pointer border transition-colors duration-500"
                            style={{
                                borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
                                boxShadow: hoveredIndex === i
                                    ? "0 40px 80px -16px rgba(0,0,0,0.6)"
                                    : "0 10px 30px -8px rgba(0,0,0,0.3)",
                            }}
                        >
                            <Image
                                src="/prometeon/dergi/bizden_8_dergi.png"
                                alt={`Prometeon Dergisi Sayı ${i + 1}`}
                                fill
                                className={`object-cover transition-all duration-500 ${hoveredIndex !== null && hoveredIndex !== i ? "opacity-40 blur-[1px]" : "opacity-90"}`}
                            />
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
                                <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest">Sayı 0{i + 1}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none" style={{ background: isDark ? "rgba(15,32,75,0.08)" : "rgba(15,32,75,0.04)", filter: "blur(100px)" }} />
        </section>
    );
};

// ---------------------------------------------------------------------------
// Floating Tire Cross-Section (Dedicated Section)
// ---------------------------------------------------------------------------
const TireCrossSection = () => {
    const { isDark } = useTheme();
    const { t } = useLanguage();
    return (
        <section className="relative py-32 overflow-hidden transition-colors duration-500" style={{ background: isDark ? "#050505" : "#ffffff" }}>
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 space-y-6"
                    >
                        <p className="text-[10px] font-light tracking-[0.4em] uppercase transition-colors duration-500" style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)" }}>
                            Ürün Görselleştirme
                        </p>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase transition-colors duration-500" style={{ color: isDark ? "#ededed" : "#0f204b" }}>
                            {t("prometeon.techTitle")}
                        </h2>
                        <p className="text-base max-w-md font-light leading-relaxed transition-colors duration-500" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)" }}>
                            {t("prometeon.techDesc")}
                        </p>
                        <div className="flex gap-8 pt-4">
                            {["Ar-Ge Render", "3D Varlık", "Teknik Özellik"].map((tag) => (
                                <span key={tag} className="text-[9px] font-light tracking-widest uppercase px-3 py-1.5 rounded-full border transition-colors duration-500" style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)", color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.4)" }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Tire Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative flex-1 flex items-center justify-center min-h-[500px] md:min-h-[600px]"
                    >
                        <div className="relative w-full h-full">
                            <TireScene />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// ---------------------------------------------------------------------------
// Creative Showcase (Replaces boring Bento Grid)
// ---------------------------------------------------------------------------
const CreativeShowcase = () => {
    const { isDark } = useTheme();
    const { t } = useLanguage();

    const showcaseItems = [
        {
            title: "Lansman Etkinliği",
            subtitle: "Çırağan Sarayı, İstanbul",
            image: "/prometeon/Lansman/toplufoto.jpeg",
            span: "lg:col-span-7",
        },
        {
            title: "Özel Günler",
            subtitle: "Milli Gün Kampanyaları",
            image: "/prometeon/Özel Günler/19_MAYIS.jpeg",
            span: "lg:col-span-5",
        },
        {
            title: "Kurum İçi İletişim",
            subtitle: "Sosyal Medya ve Markalama",
            image: "/prometeon/Özel Günler/ANNELERGUNU.png",
            span: "lg:col-span-5",
        },
        {
            title: "Ürün Lansmanı",
            subtitle: "Endüstriyel Vitrin",
            image: "/prometeon/Lansman/EMR_0101 Renkli (124 of 681).jpg",
            span: "lg:col-span-7",
        },
    ];

    return (
        <section className="relative py-32 transition-colors duration-500" style={{ background: isDark ? "#050505" : "#ffffff" }}>
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-3 transition-colors duration-500"
                        style={{ color: isDark ? "#ffffff" : "#212b59" }}
                    >
                        {t("prometeon.galleryTitle")}
                    </motion.h2>
                    <p className="text-xs font-mono tracking-[0.3em] uppercase transition-colors duration-500" style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)" }}>
                        {t("prometeon.gallerySub")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    {showcaseItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`${item.span} md:col-span-6 group relative h-[350px] md:h-[420px] rounded-2xl overflow-hidden cursor-pointer border transition-colors duration-500`}
                            style={{ borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)" }}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                            {/* Title */}
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <motion.div
                                    initial={{ y: 10, opacity: 0.8 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                >
                                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1">{item.title}</h3>
                                    <p className="text-[10px] font-light text-white/50 uppercase tracking-widest">{item.subtitle}</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};


// ==========================================
// MAIN PAGE
// ==========================================
export default function PrometeonPage() {
    const [isDark, setIsDark] = useState(true);
    const toggle = () => setIsDark((p) => !p);
    const { language, setLanguage, t } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === "tr" ? "en" : "tr");
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggle }}>
            <main
                className="min-h-screen overflow-x-hidden transition-colors duration-500 selection:bg-[#0f204b] selection:text-white font-rem"
                style={{
                    background: isDark ? "#050505" : "#fafafa",
                    color: isDark ? "#ededed" : "#1a1a1a",
                }}
            >
                <StickyBackButton />
                <ThemeToggle />

                {/* Top Bar for Language Toggle (Prometeon Specific) */}
                <div className="fixed top-24 right-6 z-[100]">
                    <button
                        onClick={toggleLanguage}
                        className="p-3 rounded-full border backdrop-blur-xl transition-colors duration-500 flex items-center justify-center"
                        style={{
                            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                            borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                        }}
                    >
                        <Globe size={18} className={isDark ? "text-white/60" : "text-[#0f204b]/60"} />
                        <span className="ml-2 text-xs font-bold uppercase tracking-tighter">
                            {language === "tr" ? "EN" : "TR"}
                        </span>
                    </button>
                </div>

                {/* ═══════════════════════════════════════════════════════ */}
                {/* HERO SECTION: Dark Premium w/ Unrolling Globe        */}
                {/* ═══════════════════════════════════════════════════════ */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh] w-full max-w-7xl mx-auto px-6 relative z-10 transition-colors duration-500">
                    {/* LEFT: STORY & LOGO */}
                    <div className="flex flex-col items-start justify-center space-y-8">
                        {/* PROMETEON LOGO - Fixed Path */}
                        <div className="relative h-16 w-64 mb-6">
                            <Image
                                src="/prometeon/Logo/Prometeon_Slogan_Darkblue_NoBox_PNG-01.png"
                                alt="Prometeon"
                                fill
                                className="object-contain"
                                priority
                                style={{ filter: isDark ? "brightness(0) invert(1)" : "none" }}
                            />
                        </div>

                        <h1 className="text-6xl lg:text-8xl font-bold tracking-tight leading-[0.9] transition-colors duration-500" style={{ color: isDark ? "#ffffff" : "#212b59" }}>
                            {t("prometeon.slogan")}<br />
                            <span className="text-neutral-500">{t("prometeon.sloganHighlight")}</span>
                        </h1>
                        <p className="text-xl text-neutral-500 max-w-lg leading-relaxed transition-colors duration-800" style={{ color: isDark ? "#f4f4f6" : "#212b59" }}>
                            {t("prometeon.description")}
                        </p>
                    </div>

                    {/* RIGHT: THE UNROLLING GLOBE */}
                    <div className="w-full flex justify-center items-center">
                        {/* Render the UNROLLING wireframe GlobeToMap component here */}
                        <GlobeToMap isDark={isDark} />
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════ */}
                {/* SECTION 2: Corporate Publishing (Magazine Fan)         */}
                {/* ═══════════════════════════════════════════════════════ */}
                <EditorialShowcase />

                {/* ═══════════════════════════════════════════════════════ */}
                {/* SECTION 1.5: Draggable Marquee                       */}
                {/* ═══════════════════════════════════════════════════════ */}
                <DraggableMarquee />


                {/* ═══════════════════════════════════════════════════════ */}
                {/* SECTION 4: Creative Showcase Gallery                   */}
                {/* ═══════════════════════════════════════════════════════ */}
                <CreativeShowcase />

                {/* ═══════════════════════════════════════════════════════ */}
                {/* Footer                                                 */}
                {/* ═══════════════════════════════════════════════════════ */}
                <section className="py-20 border-t text-center transition-colors duration-500" style={{ borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)" }}>
                    <p className="text-[10px] font-light tracking-[0.5em] uppercase transition-colors duration-500" style={{ color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.15)" }}>
                        Prometeon Tire Group — Endüstriyel Mükemmellik
                    </p>
                </section>
            </main>
        </ThemeContext.Provider>
    );
}
