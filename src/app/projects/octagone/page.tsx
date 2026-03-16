"use client";

import { motion } from "framer-motion";
import { Users, Target, Zap, Clock } from "lucide-react";
import { StickyBackButton } from "@/components/StickyBackButton";
import { cn } from "@/lib/utils";
import Image from "next/image";

// ---------------------------------------------------------------------------
// COMPONENTS
// ---------------------------------------------------------------------------

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-6"
    >
        <div className="w-8 h-[1px] bg-red-600" />
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-red-600 font-bold">
            {children}
        </span>
    </motion.div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-bebas tracking-tight uppercase mb-16 leading-[0.9]"
    >
        {children}
    </motion.h2>
);

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------

export default function OctaGonePage() {
    return (
        <main className="min-h-screen bg-[#080808] text-white selection:bg-red-600/30 font-sans overflow-x-hidden">
            <StickyBackButton />

            {/* HERO SECTION */}
            <section className="relative h-screen flex flex-col justify-end px-6 md:px-12 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/octagone/octagonekapak.png"
                        alt="OctaGone Hero"
                        fill
                        className="object-cover opacity-40 grayscale-[0.5]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(232,0,29,0.15)_0%,transparent_70%)]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-[1px] bg-green-500" />
                            <span className="text-xs font-mono tracking-[0.4em] uppercase text-green-500 font-bold">
                                Proje 04 — Final Tasarım
                            </span>
                        </div>

                        <h1 className="text-[clamp(5rem,15vw,12rem)] font-bebas leading-[0.8] tracking-tighter mb-12">
                            <span className="block">OCTA</span>
                            <span className="text-red-600">GONE</span>
                        </h1>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 pt-8 border-t border-white/10">
                            <div>
                                <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2">Alan</h3>
                                <p className="text-sm font-medium">UI/UX & Oyun Tasarımı</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2">Yıl</h3>
                                <p className="text-sm font-medium">2025</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2">Ders</h3>
                                <p className="text-sm font-medium">Proje 4</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2">Oyuncu</h3>
                                <p className="text-sm font-medium">1–8 Kişi</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 right-12 hidden md:flex flex-col items-center gap-4"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] rotate-90 origin-right translate-x-4">KAYDIR</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
                </motion.div>
            </section>

            {/* VIDEO SECTION */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 bg-neutral-900 overflow-hidden shadow-2xl shadow-red-900/10"
                >
                    <video 
                        src="/octagone/octagone.mp4"
                        controls
                        className="w-full h-full object-cover"
                        poster="/octagone/octagonekapak.png"
                    />
                </motion.div>
            </section>

            {/* CONCEPT SECTION */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <SectionLabel>Konsept</SectionLabel>
                <SectionTitle>Etkileşimli Mekan<br />Deneyimi</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden mb-20">
                    <div className="p-12 md:col-span-2 bg-[#0a0a0a]">
                        <h3 className="text-xs font-mono uppercase tracking-widest text-red-600 mb-6 font-bold">Oyun Tanımı</h3>
                        <p className="text-2xl md:text-3xl font-light leading-relaxed text-neutral-300">
                            OctaGone, sekizgen bir platform üzerinde oyuncuların reflekslerini ve stratejik düşünme 
                            yeteneklerini sınayan bir hayatta kalma oyunudur. Oyuncular kendi renklerini sabit yeşil ışıkla 
                            hizalayarak platformda kalmaya çalışır. 
                        </p>
                    </div>
                    <div className="p-12 bg-[#0c0c0c]">
                        <h3 className="text-xs font-mono uppercase tracking-widest text-red-600 mb-6 font-bold">Hedef</h3>
                        <p className="text-neutral-400 leading-relaxed text-sm">Oyuncular, hareket eden ışık ile kendi renklerini hizalayarak platformda hayatta kalmayı amaçlar. Son kalan oyuncu kazanır.</p>
                    </div>
                    <div className="p-12 bg-[#0c0c0c]">
                        <h3 className="text-xs font-mono uppercase tracking-widest text-red-600 mb-6 font-bold">Atmosfer</h3>
                        <p className="text-neutral-400 leading-relaxed text-sm">Minimalist, fütüristik ve yüksek gerilimli bir atmosfer. Işık ve sesin senkronizasyonu ile artan adrenalin.</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
                    {[
                        { label: "Maks. Oyuncu", value: "8", icon: <Users size={20} /> },
                        { label: "Basamak Hakkı", value: "3", icon: <Target size={20} /> },
                        { label: "Yapı Yüksekliği", value: "15m", icon: <Zap size={20} /> },
                        { label: "İç Alan", value: "695m²", icon: <Clock size={20} /> }
                    ].map((stat, i) => (
                        <div key={i} className="p-10 bg-[#0c0c0c] flex flex-col items-center text-center">
                            <div className="text-red-500 mb-4">{stat.icon}</div>
                            <div className="text-5xl font-bebas text-green-500 mb-2">{stat.value}</div>
                            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* MECHANICS */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-[#0a0a0a]/50 rounded-[4rem]">
                <SectionLabel>Mekanikler</SectionLabel>
                <SectionTitle>Oynanış<br />Dinamikleri</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { id: "01", title: "Temel Oynanış", text: "Oyuncular kumandalarıyla platforma çıkar. Ortadaki sütunda kendi renkli ışıkları yukarı-aşağı hareket eder.", icon: <Zap /> },
                        { id: "02", title: "Platform Yapısı", text: "Sekizgen yapıda her oyuncu için 3 basamak bulunur. Basamaklar menteşeli ve raylıdır.", icon: <Target /> },
                        { id: "03", title: "Elene & Kazanma", text: "3 basamak kaybeden oyuncu elenir, platformdan düşer. Oyun son oyuncu kalana kadar devam eder.", icon: <Clock /> }
                    ].map((mech, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-12 rounded-3xl bg-[#111] border border-white/5 relative overflow-hidden group"
                        >
                            <span className="absolute top-8 right-8 text-8xl font-bebas text-white/5 group-hover:text-red-600/10 transition-colors">{mech.id}</span>
                            <div className="w-12 h-12 rounded-xl bg-red-600/10 flex items-center justify-center text-red-600 mb-8">
                                {mech.icon}
                            </div>
                            <h3 className="text-2xl font-bebas tracking-wide mb-4 uppercase">{mech.title}</h3>
                            <p className="text-neutral-500 text-sm leading-relaxed">{mech.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* TECHNICAL ANALYSIS (MIND MAP & FLOWCHART) */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <SectionLabel>Analiz</SectionLabel>
                <SectionTitle>Diyagram ve Akış</SectionTitle>
                
                <div className="flex flex-col gap-12">
                   <div className="p-12 rounded-3xl bg-[#0d0d0d] border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-[8px] font-mono text-white/10 tracking-[1em]">CONCEPT_MAP_V1.0</div>
                        <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-12">Kavramsal Harita (Mind Map)</h3>
                        <div className="w-full aspect-[16/8] flex items-center justify-center">
                            <svg className="w-full h-full max-h-[500px]" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="500" cy="300" r="100" stroke="#E8001D" strokeWidth="0.5" strokeDasharray="5 5" />
                                <rect x="440" y="275" width="120" height="50" rx="4" fill="#E8001D" />
                                <text x="500" y="305" textAnchor="middle" className="font-bebas text-xl fill-white">OCTAGONE</text>
                                
                                <path d="M440 280 L300 150" stroke="#333" strokeDasharray="4 4" />
                                <rect x="200" y="100" width="150" height="40" rx="4" fill="#1a1a1a" stroke="#333" />
                                <text x="275" y="125" textAnchor="middle" className="text-[10px] fill-white uppercase tracking-tighter">MEKAN</text>

                                <path d="M560 280 L700 150" stroke="#333" strokeDasharray="4 4" />
                                <rect x="650" y="100" width="150" height="40" rx="4" fill="#1a1a1a" stroke="#333" />
                                <text x="725" y="125" textAnchor="middle" className="text-[10px] fill-white uppercase tracking-tighter">PLATFORM</text>

                                <path d="M440 320 L300 450" stroke="#333" strokeDasharray="4 4" />
                                <rect x="200" y="440" width="150" height="40" rx="4" fill="#1a1a1a" stroke="#E8001D" strokeWidth="1" />
                                <text x="275" y="465" textAnchor="middle" className="text-[10px] fill-red-600 uppercase tracking-tighter">OYUNIŞİ</text>

                                <path d="M560 320 L700 450" stroke="#333" strokeDasharray="4 4" />
                                <rect x="650" y="440" width="150" height="40" rx="4" fill="#1a1a1a" stroke="#333" />
                                <text x="725" y="465" textAnchor="middle" className="text-[10px] fill-white uppercase tracking-tighter">ADRENALİN</text>
                            </svg>
                        </div>
                   </div>

                   <div className="p-12 rounded-3xl bg-[#0d0d0d] border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-[8px] font-mono text-white/10 tracking-[1em]">SYSTEM_FLOW_V2.4</div>
                        <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-12">Oyun Akış Diyagramı (Flowchart)</h3>
                        <div className="w-full aspect-[16/10] md:aspect-[16/6] flex items-center justify-center">
                            <svg className="w-full h-full max-h-[500px]" viewBox="0 0 960 560" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="20" y="240" width="100" height="40" rx="20" stroke="#00FF6A" strokeWidth="1" />
                                <text x="70" y="265" textAnchor="middle" fill="#00FF6A" className="text-[10px] font-bold uppercase tracking-widest">BAŞLA</text>
                                <path d="M120 260 L180 260" stroke="#333" strokeWidth="1" />
                                
                                <rect x="180" y="235" width="160" height="50" rx="4" fill="#111" stroke="#333" />
                                <text x="260" y="265" textAnchor="middle" fill="#ccc" className="text-[9px] uppercase tracking-tighter">IŞIK HAREKETİ</text>
                                <path d="M340 260 L400 260" stroke="#333" strokeWidth="1" />

                                <rect x="400" y="235" width="160" height="50" rx="4" fill="#111" stroke="#E8001D" strokeWidth="1" />
                                <text x="480" y="265" textAnchor="middle" fill="#eee" className="text-[9px] uppercase tracking-tighter">DÜĞME BASIMI</text>
                                <path d="M560 260 L620 260" stroke="#333" strokeWidth="1" />

                                <path d="M680 220 L720 260 L680 300 L640 260 Z" fill="#1a1a1a" stroke="#E8001D" />
                                <text x="680" y="263" textAnchor="middle" fill="#E8001D" className="text-[8px] font-bold">BAŞARI?</text>

                                <path d="M720 260 L800 260" stroke="#00FF6A" strokeWidth="1" strokeDasharray="4 4" />
                                <text x="860" y="265" textAnchor="middle" fill="#00FF6A" className="text-[10px] font-bold">KAZANDI</text>

                                <path d="M680 300 L680 360 L500 360" stroke="#E8001D" strokeWidth="1" strokeDasharray="4 4" />
                                <text x="450" y="365" textAnchor="middle" fill="#E8001D" className="text-[10px] font-bold uppercase tracking-tight">ELENDİ</text>
                            </svg>
                        </div>
                   </div>
                </div>
            </section>

            {/* PERSONAS */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <SectionLabel>Kullanıcılar</SectionLabel>
                <SectionTitle>Personalar</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
                    {[
                        { 
                            name: "BÜNYAMİN DEDE", 
                            role: "65 YAŞ · ÇİFTÇİ · TORUNUYLA FUARDA", 
                            traits: ["Teknolojiyle arası kısıtlı", "Torunuyla bağ kurmak istiyor", "Fiziksel oyunlara yatkın"],
                            color: "text-red-500",
                            icon: "B"
                        },
                        { 
                            name: "BULUT", 
                            role: "8 YAŞ · ÖĞRENCİ · ENERJİK", 
                            traits: ["Enerjik ve meraklı", "Tablet/Konsol oyunlarını seviyor", "Keşif odaklı"],
                            color: "text-green-500",
                            icon: "B"
                        }
                    ].map((persona, i) => (
                        <div key={persona.name} className="p-16 bg-[#0c0c0c]">
                            <div className="flex items-center gap-6 mb-12">
                                <div className={cn("w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center font-bebas text-4xl", persona.color)}>
                                    {persona.name[0]}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bebas tracking-wide uppercase">{persona.name}</h3>
                                    <p className="text-[10px] font-mono tracking-widest text-neutral-600 mt-1 uppercase">{persona.role}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {persona.traits.map((trait) => (
                                    <div key={trait} className="flex items-start gap-3">
                                        <div className={cn("w-1 h-1 rounded-full mt-2", persona.color.replace('text-', 'bg-'))} />
                                        <p className="text-sm text-neutral-400">{trait}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* BRANDING */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <SectionLabel>Kimlik</SectionLabel>
                <SectionTitle>Marka Tasarımı</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
                    <div className="p-20 flex items-center justify-center bg-black min-h-[400px]">
                        <div className="text-center group">
                            <h4 className="text-8xl font-bebas tracking-tighter mb-4 group-hover:scale-105 transition-transform duration-500">OCTA</h4>
                            <div className="h-1 bg-red-600 mx-auto w-24 mb-4" />
                            <h4 className="text-8xl font-bebas tracking-tighter text-red-600 group-hover:scale-110 transition-transform duration-500">GONE</h4>
                        </div>
                    </div>
                    <div className="p-16 bg-[#0c0c0c] flex flex-col justify-center">
                        <div className="space-y-12">
                            <div>
                                <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-4">İlham</h4>
                                <p className="text-neutral-400 leading-relaxed italic text-sm">"Sekizgen platformun üstten görünümü, platformu ve elenen oyuncuyu temsil eden fütüristik bir mezarlık metaforu."</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-4">Renk Paleti</h4>
                                <div className="flex gap-4">
                                    {["#000000", "#E8001D", "#FFFFFF", "#00FF6A"].map((c) => (
                                        <div key={c} className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 rounded-lg border border-white/10" style={{ background: c }} />
                                            <span className="text-[8px] font-mono text-neutral-600">{c}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER PADDING */}
            <section className="py-20 text-center border-t border-white/5 opacity-30">
                <p className="text-[10px] font-mono tracking-[0.5em] uppercase">
                    YTÜ İletişim Tasarımı — Proje 4 Final
                </p>
            </section>
        </main>
    );
}
