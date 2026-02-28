"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LightboxImage } from "@/components/ImageLightbox";
import { StickyBackButton } from "@/components/StickyBackButton";

export default function Car2GatherPage() {
    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-500 selection:bg-orange-500/20">
            <StickyBackButton />
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference text-white">
                <Link
                    href="/"
                    className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium">Ana Sayfaya Dön</span>
                </Link>
            </nav>

            {/* Hero Section */}
            <section className="relative h-[80vh] w-full bg-neutral-100">
                <Image
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
                    alt="car2gather Web Platform"
                    fill
                    className="object-cover opacity-90"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        <span className="inline-block px-3 py-1 mb-4 text-sm font-medium border border-white/30 rounded-full backdrop-blur-sm">
                            Web Platformu
                        </span>
                        <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight">
                            car2gather
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Project Details */}
            <section className="max-w-4xl mx-auto py-24 px-6 transition-colors duration-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-bold mb-4 text-foreground">Proje Özeti</h3>
                        <p className="text-foreground/60 leading-relaxed text-lg transition-colors duration-500">
                            car2gather, araç paylaşımı ve yolculuk planlamayı kolaylaştıran modern bir web platformudur.
                            Kullanıcı dostu arayüzü ve akıcı deneyimi ile karmaşık seyahat planlamalarını basitleştirmeyi hedefler.
                        </p>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-bold mb-2 text-foreground transition-colors duration-500">Rolüm</h3>
                            <p className="text-foreground/60 transition-colors duration-500">Web Designer</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-2 text-foreground transition-colors duration-500">Araçlar</h3>
                            <p className="text-foreground/60 transition-colors duration-500">Figma, React, Tailwind CSS</p>
                        </div>
                    </div>
                </div>

                {/* Content Flow */}
                <div className="space-y-12">
                    {/* Example Image 1 */}
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
                        <LightboxImage
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2670"
                            alt="car2gather Dashboard Analytics"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Example Image 2 */}
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
                        <LightboxImage
                            src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=2655"
                            alt="car2gather User Journey"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* YouTube Video Section */}
                    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/f8DeApN6xvc"
                            title="car2gather Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="absolute inset-0"
                        ></iframe>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-12 text-center text-foreground/40 transition-colors duration-500">
                        <p>Dashboard ve arayüz detayları buraya eklenecek.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
