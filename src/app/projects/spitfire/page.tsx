"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LightboxImage } from "@/components/ImageLightbox";
import { StickyBackButton } from "@/components/StickyBackButton";
import { SpitfireScene } from "@/components/3d/SpitfireScene";
import { Footer } from "@/components/Footer";

export default function SpitfirePage() {
    return (
        <main className="min-h-screen bg-white dark:bg-neutral-950 selection:bg-amber-500 selection:text-white">
            <StickyBackButton />
            {/* Interactive 3D Hero */}
            <section className="relative min-h-screen w-full bg-neutral-900 dark:bg-neutral-900 overflow-hidden flex flex-col pt-24 pb-12 transition-colors duration-500">

                <div className="flex-1 relative flex items-center justify-center px-4 md:px-16">
                    {/* Rounded Frame for 3D Scene */}
                    <div className="w-full max-w-5xl aspect-[3/4] md:aspect-[16/10] relative rounded-3xl overflow-hidden border border-white/10 dark:border-white/5 bg-neutral-800/50 dark:bg-neutral-900/50 backdrop-blur-sm shadow-2xl">
                        {/* Interactive Scene with Zoom Enabled */}
                        <SpitfireScene
                            className="w-full h-full cursor-grab active:cursor-grabbing"
                            enableZoom={true}
                            minDistance={3}
                            maxDistance={8}
                        />

                        {/* Zoom hint inside frame */}
                        <div className="absolute bottom-4 right-4 z-10 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-medium text-white/50 border border-white/10 pointer-events-none">
                            Yakınlaşmak için scroll • Çevirmek için sürükleyin
                        </div>
                    </div>

                    {/* Overlay Info */}
                    <div className="absolute bottom-16 left-6 md:left-16 z-10 pointer-events-none">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-4"
                        >
                            SPITFIRE MK.1
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-neutral-400 text-lg md:text-xl font-light tracking-wide"
                        >
                            Digital Preservation • Interactive 3D Experience
                        </motion.p>
                    </div>

                    <div className="absolute top-28 right-6 md:right-16 z-10 bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-xl text-right">
                        <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">Status</p>
                        <p className="text-sm font-bold text-amber-500 flex items-center justify-end gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            INTERACTIVE
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Container */}
            <section className="bg-background transition-colors duration-500">
                <div className="max-w-7xl mx-auto py-24 px-6">

                    {/* Intro / Role / Tools */}
                    <div className="max-w-3xl mx-auto py-24 px-6 text-center">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-left md:text-center">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-2">Rolüm</h3>
                                <p className="text-lg font-medium dark:text-white">3D Artist & Developer</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-2">Yıl</h3>
                                <p className="text-lg font-medium dark:text-white">2024</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-2">Araçlar</h3>
                                <p className="text-lg font-medium dark:text-white">Blender, Three.js, R3F</p>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight dark:text-white">
                            Havacılık tarihinin efsanesi, tarayıcıda yeniden hayat buluyor.
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            Spitfire MK.1 sadece bir uçak değil, bir tasarım ikonudur. Bu projede, bu efsanevi
                            uçağın her detayını 3D ortamda modelledim ve web teknolojileriyle interaktif bir
                            deneyime dönüştürdüm. Stüdyo ışıklandırması ve yüksek çözünürlüklü kaplamalarla
                            gerçekçi bir atmosfer hedeflendi.
                        </p>
                    </div>

                    {/* Poster Image */}
                    <div className="mb-24 relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl">
                        <LightboxImage
                            src="/spitfire/Spitfire-POSTER_V3.png"
                            alt="Spitfire Poster Art"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                        <div className="aspect-[4/3] relative rounded-2xl overflow-hidden group">
                            <LightboxImage src="/spitfire/Spitfire1.jpg" alt="Spitfire Detail 1" fill className="object-contain transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div className="aspect-[4/3] relative rounded-2xl overflow-hidden group">
                            <LightboxImage src="/spitfire/Spitfire2.jpg" alt="Spitfire Detail 2" fill className="object-contain transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div className="aspect-[4/3] relative rounded-2xl overflow-hidden group">
                            <LightboxImage src="/spitfire/Spitfire3.jpg" alt="Spitfire Detail 3" fill className="object-contain transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div className="aspect-[4/3] relative rounded-2xl overflow-hidden group">
                            <LightboxImage src="/spitfire/Spitfire4.jpg" alt="Spitfire Detail 4" fill className="object-contain transition-transform duration-700 group-hover:scale-105" />
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
