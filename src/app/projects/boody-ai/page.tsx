"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LightboxImage } from "@/components/ImageLightbox";
import { StickyBackButton } from "@/components/StickyBackButton";

export default function BoodyAiPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-neutral-950 selection:bg-blue-600 selection:text-white">
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
            <section className="relative h-[80vh] w-full bg-[#0A0A0A]">
                {/* Placeholder for Boody AI Hero - using abstract 3d placeholder for now */}
                <Image
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2564"
                    alt="Boody AI Visual Identity"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl"
                    >
                        <span className="inline-block px-3 py-1 mb-4 text-sm font-medium border border-white/30 rounded-full backdrop-blur-sm">
                            Mobil Uygulama & AI
                        </span>
                        <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight">
                            Boody AI
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Project Details */}
            <section className="max-w-4xl mx-auto py-24 px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-bold mb-4">Proje Özeti</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
                            Boody AI, yapay zeka destekli kişiselleştirilmiş bir mobil deneyim sunar.
                            Kullanıcı alışkanlıklarını analiz ederek akıllı önerilerde bulunan bu uygulama için,
                            sezgisel ve modern bir arayüz tasarlandı.
                        </p>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-bold mb-2">Rolüm</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">UI/UX Designer</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-2">Araçlar</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">Figma, AI Tools, Protopie</p>
                        </div>
                    </div>
                </div>

                {/* Content Flow */}
                <div className="space-y-12">
                    {/* Example Image 1 */}
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
                        <LightboxImage
                            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1470"
                            alt="Boody AI App Screens"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Example Image 2 */}
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
                        <LightboxImage
                            src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=2670"
                            alt="Boody AI Design System"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Wireframe & Lo-Fi Section */}
                    <div className="py-20 border-y border-neutral-100 dark:border-white/5 my-12">
                        <div className="max-w-2xl mx-auto text-center mb-16">
                            <h2 className="text-3xl font-bold mb-6">Wireframe & Lo-Fi</h2>
                            <p className="text-neutral-500 dark:text-neutral-400">
                                Kullanıcı yolculuğunu ve temel etkileşimleri doğrulamak için hazırlanan düşük sadakatli taslaklar.
                                Karmaşık AI akışlarını en basit haliyle kurgulayarak kullanıcı deneyimini optimize ettik.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="aspect-[3/4] relative bg-neutral-100 dark:bg-neutral-900 rounded-3xl overflow-hidden p-8 flex items-center justify-center border border-white/5">
                                <div className="w-full h-full relative border-2 border-dashed border-white/10 rounded-xl flex flex-col gap-4 p-6">
                                    <div className="w-1/2 h-4 bg-white/5 rounded" />
                                    <div className="w-full h-32 bg-white/5 rounded-lg" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-20 bg-white/5 rounded-lg" />
                                        <div className="h-20 bg-white/5 rounded-lg" />
                                    </div>
                                    <div className="w-full h-10 bg-blue-500/20 rounded-full mt-auto" />
                                </div>
                                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-neutral-500">Lo-Fi Sketch 01</span>
                            </div>
                            <div className="aspect-[3/4] relative bg-neutral-100 dark:bg-neutral-900 rounded-3xl overflow-hidden p-8 flex items-center justify-center border border-white/5">
                                <div className="w-full h-full relative border-2 border-dashed border-white/10 rounded-xl flex flex-col gap-4 p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-white/5" />
                                        <div className="flex-1 space-y-2">
                                            <div className="w-1/2 h-2 bg-white/5 rounded" />
                                            <div className="w-1/3 h-2 bg-white/5 rounded" />
                                        </div>
                                    </div>
                                    <div className="w-full h-2 bg-white/5 rounded" />
                                    <div className="w-3/4 h-2 bg-white/5 rounded" />
                                    <div className="w-full h-48 bg-white/5 rounded-lg mt-4" />
                                </div>
                                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-neutral-500">Wireframe 02</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-2xl p-12 text-center text-neutral-500">
                        <p>Diğer proje detay görselleri buraya eklenecek.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
