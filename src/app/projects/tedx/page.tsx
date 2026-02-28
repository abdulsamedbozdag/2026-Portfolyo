"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LightboxImage } from "@/components/ImageLightbox";
import { StickyBackButton } from "@/components/StickyBackButton";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function TedxPage() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const [videoProgress, setVideoProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    }, []);


    useGSAP(() => {
        if (!videoRef.current || !sectionRef.current) return;

        const video = videoRef.current;

        // Scrubbing timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: isMobile ? "+=300%" : "+=800%", // Truly slow playback on desktop, faster on mobile
                scrub: isMobile ? 1 : 2, // More responsive scrub on mobile
                pin: true,
                anticipatePin: 1,
            },
        });

        const videoDuration = { time: 0 };

        tl.to(videoDuration, {
            time: 1,
            onUpdate: () => {
                if (video.duration) {
                    video.currentTime = video.duration * videoDuration.time;
                }
            },
            ease: "none",
        });

    }, { scope: sectionRef });

    // Track loading progress
    useEffect(() => {
        const video = videoRef.current;

        // Safety timeout: Unlock screen after 10s regardless of load state
        const timer = setTimeout(() => {
            setIsVideoLoaded(true);
        }, 10000);

        if (!video) return () => clearTimeout(timer);

        const handleProgress = () => {
            if (video.buffered.length > 0) {
                const bufferedEnd = video.buffered.end(video.buffered.length - 1);
                const duration = video.duration;
                if (duration > 0) {
                    setVideoProgress(Math.round((bufferedEnd / duration) * 100));
                }
            }
        };

        video.addEventListener('progress', handleProgress);
        return () => video.removeEventListener('progress', handleProgress);
    }, []);

    return (
        <main className="min-h-screen bg-white dark:bg-neutral-950 selection:bg-red-600 selection:text-white overflow-x-hidden">
            <StickyBackButton />
            {/* Scrollytelling Intro Section */}
            <section ref={sectionRef} className="relative h-[400vh] w-full bg-black">
                {/* Sticky Video Container */}
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <video
                        ref={videoRef}
                        src="/tedx/tedx-intro_1.mp4"
                        muted
                        playsInline
                        preload="auto"
                        className="h-full w-full object-cover"
                        onLoadedData={() => setIsVideoLoaded(true)}
                        onCanPlay={() => setIsVideoLoaded(true)}
                        style={{ filter: "brightness(0.5) contrast(1.1)" }}
                    />

                    {/* Navigation Overlaid */}
                    <nav className="absolute top-0 left-0 right-0 z-50 p-8 flex justify-between items-center mix-blend-difference text-white">
                        <Link
                            href="/"
                            className="flex items-center gap-3 hover:opacity-70 transition-all group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium tracking-tight">Ana Sayfaya Dön</span>
                        </Link>
                    </nav>

                    {/* Cinematic Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />

                    {/* Noise texture overlay */}

                    <div className="absolute inset-0 pointer-events-none opacity-30 contrast-150 mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                    {/* Scroll Hint Icon - Bottom Right */}
                    {isVideoLoaded && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                            className="absolute bottom-8 right-8 z-40 flex flex-col items-center gap-2 pointer-events-none"
                        >
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                                className="flex flex-col items-center gap-1"
                            >
                                {/* Mouse SVG Icon */}
                                <svg width="28" height="42" viewBox="0 0 28 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="1" y="1" width="26" height="40" rx="13" stroke="white" strokeWidth="2" opacity="0.6" />
                                    <motion.rect
                                        x="12" y="8" width="4" height="10" rx="2" fill="white" opacity="0.8"
                                        animate={{ y: [8, 16, 8] }}
                                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </svg>
                                {/* Down Arrow */}
                                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.5">
                                    <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </motion.div>
                            <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
                        </motion.div>
                    )}

                    {/* Visual Hint / Loader */}
                    {!isVideoLoaded && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50 gap-6">
                            <div className="w-48 h-[2px] bg-neutral-900 overflow-hidden relative">
                                <motion.div
                                    className="absolute inset-0 bg-red-600"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: videoProgress / 100 }}
                                    transition={{ type: "spring", stiffness: 50 }}
                                    style={{ originX: 0 }}
                                />
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-neutral-500 text-xs font-bold uppercase tracking-[0.2em] animate-pulse">Deneyim Hazırlanıyor</span>
                                <span className="text-neutral-700 text-[10px] font-mono">{videoProgress}%</span>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Content Container - Limit width and center */}
            <section className="bg-background transition-colors duration-500">

                {/* Intro / Role / Tools */}
                <div className="max-w-3xl mx-auto py-24 px-6 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-left md:text-center">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-2">Rolüm</h3>
                            <p className="text-lg font-medium">Art Director & 3D Artist</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-2">Yıl</h3>
                            <p className="text-lg font-medium">2024</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-2">Araçlar</h3>
                            <p className="text-lg font-medium">Blender, Photoshop</p>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight text-foreground transition-colors duration-500">
                        Dijital ve fiziksel dünyaların sınırlarını bulanıklaştıran bir oyun deneyimi.
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        TEDx Yıldız Teknik Üniversitesi etkinliği için hazırlanan "The Game" konsepti,
                        izleyicileri sadece birer seyirci olmaktan çıkarıp, etkinliğin bir parçası haline
                        getirmeyi hedefledi. Derin perspektifler, neon ışıklar ve glitch efektleriyle
                        kurgulanan bu evren, konuşmacıların hikayelerine görsel bir zemin oluşturdu.
                    </p>
                </div>

                {/* Full Width Media - YouTube */}
                <div className="w-full bg-black">
                    <div className="max-w-[1920px] mx-auto">
                        <div className="aspect-video w-full">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/1pXU7wuAEkU?rel=0&modestbranding=1"
                                title="TEDx YTU Project Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="border-0 block"
                            />
                        </div>
                    </div>
                </div>

                {/* Text Block */}
                <div className="max-w-3xl mx-auto py-24 px-6">
                    <h3 className="text-2xl font-bold mb-6 text-foreground transition-colors duration-500">Sahne Tasarımı</h3>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                        Sahne tasarımı, konuşmacının odak noktasında kalmasını sağlarken, arka planda
                        sürekli değişen ve yaşayan bir dijital organism hissi yaratacak şekilde kurgulandı.
                    </p>
                </div>

                {/* Full Width Image - Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="aspect-[4/5] relative bg-neutral-100 dark:bg-neutral-900">
                        <LightboxImage src="/tedx/TedX1.jpg" alt="TEDx Detail" fill className="object-contain" />
                    </div>
                    <div className="aspect-[4/5] relative bg-neutral-100 dark:bg-neutral-900">
                        <LightboxImage src="/tedx/TedX2.jpg" alt="TEDx Detail" fill className="object-contain" />
                    </div>
                </div>

                {/* Text Block */}
                <div className="max-w-3xl mx-auto py-24 px-6 text-center">
                    <h3 className="text-2xl font-bold mb-6 text-foreground transition-colors duration-500">Sonuç</h3>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        Etkinlik boyunca kullanılan tüm görsel materyaller, sosyal medya içerikleri ve
                        sahne görselleri, katılımcılardan tam not aldı ve etkinliğin "The Game" temasını
                        başarıyla yansıttı.
                    </p>
                </div>

                {/* Bottom Full Image */}
                <div className="h-[80vh] relative w-full bg-neutral-100 dark:bg-neutral-900">
                    <LightboxImage src="/tedx/TedX3.jpg" alt="TEDx Atmosphere" fill className="object-contain" />
                </div>
            </section>
        </main>
    );
}
