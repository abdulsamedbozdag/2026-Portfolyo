"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { StickyBackButton } from "@/components/StickyBackButton";
import { BoodyStickyScroll } from "@/components/boody/BoodyStickyScroll";
import Link from "next/link";

export default function BoodyAppPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-purple-600/30">
            <StickyBackButton />

            {/* Hero Section */}
            <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/Boody/Boody_Anasayfa_kapak_görseli.png"
                        alt="Boody App Hero"
                        fill
                        className="object-cover opacity-70 transition-all duration-1000"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex flex-col items-center"
                    >
                        {/* Boody Logo Integration - Enlarged as requested */}
                        <div className="w-56 h-56 mb-4 relative">
                            <Image
                                src="/Boody/__logo_boody_mor.svg"
                                alt="Boody Logo"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-[0.2em] border border-white/20 rounded-full backdrop-blur-md bg-white/5">
                            Mobil Uygulama
                        </span>
                        <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                            BOODY APP
                        </h1>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
            </section>

            {/* Project Overview */}
            <section className="relative z-10 bg-black">
                <div className="max-w-4xl mx-auto py-24 px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-y border-white/10 py-12">
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Rol</h3>
                            <p className="text-sm font-medium">UI/UX Designer</p>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Yıl</h3>
                            <p className="text-sm font-medium">2026</p>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Platform</h3>
                            <p className="text-sm font-medium">Flutter & iOS/Android</p>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Araçlar</h3>
                            <p className="text-sm font-medium">Figma, Framer, Flutter</p>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                            Öğrenciler için tasarlanmış, yapay zeka destekli modern bir sosyal ağ deneyimi.
                        </h2>
                        <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
                            Boody App, akademik başarıyı ve kampüs içi iletişimi tek bir platformda toplar.
                            Karmaşık problemleri saniyeler içinde çözen yapay zeka asistanı ve ilgi alanlarına
                            dayalı ağ kurma özellikleri ile öğrenci hayatını dijitalde yeniden kurgular.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Premium Sticky Scroll Sections */}
            <section className="pb-32">
                <BoodyStickyScroll />
            </section>

            {/* Footer Space */}
            <div className="py-12 bg-black" />
        </main>
    );
}
