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
                end: isMobile ? "+=150%" : "+=200%", // Reduced scroll distance to eliminate dead zone
                scrub: isMobile ? 1 : 1.5,
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
            <section ref={sectionRef} className="relative h-[200vh] w-full bg-black">
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

                    {/* Cinematic Gradient Overlays */}
                    pulp                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />
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
                <div className="max-w-3xl mx-auto py-32 px-6 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-left md:text-center">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-2 transition-colors duration-500">Rolüm</h3>
                            <p className="text-lg font-medium text-foreground transition-colors duration-500">Art Director & 3D Artist</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-2 transition-colors duration-500">Yıl</h3>
                            <p className="text-lg font-medium text-foreground transition-colors duration-500">2024</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-2 transition-colors duration-500">Araçlar</h3>
                            <p className="text-lg font-medium text-foreground transition-colors duration-500">Blender, Photoshop</p>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight text-foreground transition-colors duration-500">
                        Dijital ve fiziksel dünyaların sınırlarını bulanıklaştıran bir deneyim.
                    </h2>
                </div>

                {/* Labirent Section */}
                <div className="max-w-3xl mx-auto py-24 px-6 text-center">
                    <h2 className="text-3xl font-bold mb-8 text-foreground transition-colors duration-500">ANA AFİŞ</h2>
                    <div className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-12 space-y-6 transition-colors duration-500">
                        <p>
                            Hayatın her alanından isimlerin "The Game" konseptiyle konuşma yaptığı
                            etkinliğimizin tasarımı için "Labirent"ten ilham alındı.
                        </p>
                        <p>
                            Labirent felsefesi, genellikle hayatın karmaşıklığını,
                            belirsizliğini ve yol ayrımlarını temsil etmek için
                            kullanılan bir metafordur.
                        </p>
                        <p>
                            Bu felsefi yaklaşım, insan deneyimini, bilgiyi ve seçimleri
                            anlamaya çalışırken bazen karşılaşılan karmaşıklığı
                            ve zorlukları ifade etmek için kullanılır.
                        </p>
                    </div>
                </div>

                {/* Main Poster */}
                <div className="max-w-5xl mx-auto px-6 mb-32">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border transition-colors duration-500">
                        <LightboxImage
                            src="/tedx/tedx-poster.png"
                            alt="TEDx Labirent Main Poster"
                            className="w-full h-auto"
                            width={1200}
                            height={1800}
                        />
                    </div>
                </div>

                {/* YouTube Video Section - Shrunk Container */}
                <div className="max-w-5xl mx-auto px-6 py-24">
                    <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl bg-black border border-border transition-colors duration-500">
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

                {/* Text Block */}
                <div className="max-w-3xl mx-auto py-24 px-6">
                    <h3 className="text-2xl font-bold mb-6 text-foreground transition-colors duration-500">Sahne Tasarımı</h3>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                        Sahne tasarımı, konuşmacının odak noktasında kalmasını sağlarken, arka planda
                        sürekli değişen ve yaşayan bir dijital organism hissi yaratacak şekilde kurgulandı.
                    </p>
                </div>

                {/* Full Width Image - Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border transition-colors duration-500">
                    <div className="aspect-[4/5] relative bg-background transition-colors duration-500">
                        <LightboxImage src="/tedx/TedX1.jpg" alt="TEDx Detail 1" fill className="object-cover" />
                    </div>
                    <div className="aspect-[4/5] relative bg-background transition-colors duration-500">
                        <LightboxImage src="/tedx/TedX2.jpg" alt="TEDx Detail 2" fill className="object-cover" />
                    </div>
                </div>

                {/* Sosyal Medya Section */}
                <div className="max-w-7xl mx-auto py-32 px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground transition-colors duration-500">Sosyal Medya</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-border transition-colors duration-500 group">
                            <LightboxImage
                                src="/tedx/TedX_SosyalMedya_sol.png"
                                alt="TEDx Social Media Left"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-border transition-colors duration-500 group">
                            <LightboxImage
                                src="/tedx/TedX_SosyalMedya_orta.png"
                                alt="TEDx Social Media Middle"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-border transition-colors duration-500 group">
                            <LightboxImage
                                src="/tedx/TedX_SosyalMedya_sağ.png"
                                alt="TEDx Social Media Right"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* New Labirent Image Asset */}
                    <div className="mt-16 relative rounded-3xl overflow-hidden shadow-2xl border border-border transition-colors duration-500">
                        <LightboxImage
                            src="/tedx/sonnlabirent.jpg"
                            alt="TEDx Final Labirent View"
                            className="w-full h-auto"
                            width={1200}
                            height={800}
                        />
                    </div>
                </div>

                {/* Storyboard Section */}
                <div className="max-w-5xl mx-auto py-32 px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-foreground transition-colors duration-500">Storyboard</h2>
                    </div>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border transition-colors duration-500">
                        <LightboxImage
                            src="/tedx/TheGame- storyboard.jpg"
                            alt="TEDx The Game Storyboard"
                            className="w-full h-auto"
                            width={1200}
                            height={800}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
