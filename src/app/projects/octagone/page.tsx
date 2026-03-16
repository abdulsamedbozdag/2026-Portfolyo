"use client";

import { motion } from "framer-motion";
import { Users, Target, Zap, Clock, ExternalLink, Calendar, Map, Layers, PlayCircle, Trophy, User } from "lucide-react";
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
        <span className="text-[10px] uppercase tracking-[0.4em] text-red-600 font-bold">
            {children}
        </span>
    </motion.div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-bold tracking-tight uppercase mb-16 leading-tight"
    >
        {children}
    </motion.h2>
);

// ---------------------------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------------------------

export default function OctaGonePage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-white selection:bg-red-600/30 font-sans overflow-x-hidden">
            <StickyBackButton />

            {/* HERO SECTION */}
            <section className="relative min-h-[60vh] flex flex-col justify-end px-6 md:px-12 pb-16 overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/octagone/octagonekapak.png"
                        alt="OctaGone Hero"
                        fill
                        className="object-cover opacity-60 grayscale-[0.3] object-left"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                    <div className="absolute inset-0 bg-radial-gradient(circle_at_50%_50%,rgba(232,0,29,0.1)_0%,transparent_80%)" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <span className="px-3 py-1 bg-red-600 text-[10px] font-bold tracking-widest uppercase rounded">PROJE 4 FINAL</span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
                            <div>
                                <h3 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-bold">Ders</h3>
                                <p className="text-base font-semibold">Proje 4</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-bold">Konu</h3>
                                <p className="text-base font-semibold">Oyun Tasarımı</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-bold">Yıl</h3>
                                <p className="text-base font-semibold">2025</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-bold">Platform</h3>
                                <p className="text-base font-semibold">Etkileşimli Mekan</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* TIMELINE SECTION */}
            <section className="pt-20 pb-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 bg-neutral-950/50">
                <SectionLabel>Zaman Çizelgesi</SectionLabel>
                <SectionTitle>Gelişim Süreci</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                    {[
                        { date: "18 Aralık 2024", title: "Fikir ve İlk Eskiz" },
                        { date: "19 Aralık 2024", title: "İlk Taslak 3D Model" },
                        { date: "25 Aralık 2024", title: "R&D / Ray & Menteşe" },
                        { date: "8 Ocak 2025", title: "Platform Sistemi" },
                        { date: "20 Ocak 2025", title: "Dijital Prototip" }
                    ].map((step, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 bg-neutral-900/40 hover:bg-neutral-900 transition-colors flex flex-col justify-between group h-full text-left"
                        >
                            <span className="text-red-600 font-bold text-xs mb-4 block group-hover:scale-110 transition-transform origin-left">{step.date}</span>
                            <h3 className="text-sm font-semibold tracking-tight text-neutral-200">{step.title}</h3>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* OYUN TANIMI SECTION */}
            <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto">
                <SectionLabel>Konsept</SectionLabel>
                <SectionTitle>OctaGone Nedir?</SectionTitle>
                <div className="space-y-12">
                    <p className="text-2xl md:text-4xl font-light leading-relaxed text-neutral-200">
                        OctaGone, sekizgen bir platform üzerinde, oyuncuların <span className="font-bold text-red-600">reflekslerini ve stratejik düşünme</span> yeteneklerini sınayan bir hayatta kalma oyunudur.
                    </p>
                    <p className="text-lg text-neutral-400 leading-relaxed max-w-3xl">
                        Oyuncular, kendi renklerini <span className="text-green-500 font-bold">sabit yeşil ışıkla</span> hizalayarak platformda kalmaya çalışır. Zamanla zorlaşan dinamikler, oyuncuları hızlı karar vermeye ve doğru zamanda hareket etmeye zorlar. Oyunun amacı, son kalan oyuncu olmaktır.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                        <div className="p-8 rounded-2xl bg-neutral-900/50 border border-white/5">
                            <h4 className="text-red-600 font-bold mb-4 uppercase tracking-wider text-sm">Hedef & Zorluk</h4>
                            <p className="text-sm text-neutral-400 mb-6">Oyuncular, hareket eden ışık ile kendi renklerini hizalayarak platformda hayatta kalmaya çalışır.</p>
                            <p className="text-xs text-neutral-500 italic">"Platformların dinamik yapısı ve oyuncunun doğru zamanda hızlı tepki verme gerekliliği ana zorluktur."</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-neutral-900/50 border border-white/5">
                            <h4 className="text-red-600 font-bold mb-4 uppercase tracking-wider text-sm">Risk & Ödül</h4>
                            <p className="text-sm text-neutral-400 mb-6">Yanlış zamanlama bir basamak kaybına neden olurken, doğru hizalama oyuncuyu hayatta tutar.</p>
                            <p className="text-xs text-neutral-500 italic">"Görüntülenen yeşil ışık sabittir, ancak oyuncu ışığı giderek hızlanır."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* VIDEO SECTION */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 bg-neutral-900 shadow-2xl"
                >
                    <video 
                        src="/octagone/octagone.mp4"
                        controls
                        className="w-full h-full object-cover"
                        poster="/octagone/octagonekapak.png"
                    />
                </motion.div>
            </section>

            {/* TECHNICAL ANALYSIS (MIND MAP & FLOWCHART) */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <SectionLabel>Teknik Analiz</SectionLabel>
                <SectionTitle>Zihin Haritası ve Süreç</SectionTitle>
                
                <div className="flex flex-col gap-12">
                   {/* PREMIUM MIND MAP */}
                   <div className="p-12 rounded-3xl bg-black border border-white/5 relative overflow-hidden flex flex-col items-center">
                        <div className="absolute top-0 right-0 p-8 text-[8px] font-mono text-white/10 tracking-[1em]">SYSTEM_ARCHITECTURE_V1</div>
                        <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-12 self-start">Kavramsal Zihin Haritası (Mind Map)</h3>
                        
                        <div className="w-full aspect-[16/9] max-h-[600px] flex items-center justify-center relative">
                            {/* Central Node */}
                            <motion.div 
                                className="z-10 w-48 h-48 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_50px_rgba(232,0,29,0.3)]"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-2xl font-black text-white">OCTAGONE</span>
                            </motion.div>

                            {/* Branches with SVG Lines */}
                            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 600">
                                <path d="M500 300 L250 150" stroke="white" strokeWidth="1" strokeDasharray="5 5" />
                                <path d="M500 300 L750 150" stroke="white" strokeWidth="1" strokeDasharray="5 5" />
                                <path d="M500 300 L500 500" stroke="white" strokeWidth="1" strokeDasharray="5 5" />
                            </svg>

                            {/* Node 1: Mekan */}
                            <motion.div className="absolute top-[15%] left-[15%] text-left" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                                <div className="text-red-500 font-bold mb-2 text-xl">MEKAN</div>
                                <ul className="text-xs text-neutral-400 space-y-1 border-l border-red-900 pl-4">
                                    <li>Sekizgen Kapalı Alan</li>
                                    <li>Gergin & Karamsar Atmosfer</li>
                                    <li>Merkezi Sütun (Işık Kaynağı)</li>
                                </ul>
                            </motion.div>

                            {/* Node 2: Platform */}
                            <motion.div className="absolute top-[15%] right-[15%] text-right" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                                <div className="text-red-500 font-bold mb-2 text-xl">PLATFORM</div>
                                <ul className="text-xs text-neutral-400 space-y-1 border-r border-red-900 pr-4">
                                    <li>8 Kişi / 8 Platform</li>
                                    <li>3 Basamaklı Raylı Sistem</li>
                                    <li>Menteşeli Hareket Dinamiği</li>
                                </ul>
                            </motion.div>

                            {/* Node 3: Oynanış */}
                            <motion.div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                                <div className="text-red-500 font-bold mb-2 text-xl">OYNANIŞ</div>
                                <ul className="text-xs text-neutral-400 space-y-1 space-y-1">
                                    <li>Renkli Işık Hizalama</li>
                                    <li>Düğmeli Kumanda Etkileşimi</li>
                                    <li>Refleks & Hayatta Kalma</li>
                                </ul>
                            </motion.div>
                        </div>
                   </div>

                   {/* PREMIUM FLOWCHART */}
                   <div className="p-12 rounded-3xl bg-black border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-[8px] font-mono text-white/10 tracking-[1em]">LOGIC_FLOW_V2</div>
                        <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-12">Oynanış Akış Diyagramı (Flowchart)</h3>
                        
                        <div className="flex flex-col items-center gap-8 py-8 w-full">
                            <div className="flex flex-wrap justify-center gap-4 items-center w-full">
                                <div className="px-6 py-3 rounded-full border border-red-600/30 bg-red-600/10 text-xs font-bold text-red-500 uppercase">BAŞLA</div>
                                <Arrow className="rotate-0" />
                                <div className="p-4 rounded-xl border border-white/10 bg-neutral-900 text-[10px] text-neutral-300">OYUNCU PLATFORMA ÇIKAR</div>
                                <Arrow className="rotate-0" />
                                <div className="p-4 rounded-xl border border-white/10 bg-neutral-900 text-[10px] text-neutral-300">IŞIKLAR BELİRİR (YEŞİL-SABİT)</div>
                                <Arrow className="rotate-0" />
                                <div className="p-4 rounded-xl border border-red-600/50 bg-neutral-900 text-[10px] text-white font-bold">DÜĞMEYE BASILDI MI?</div>
                            </div>

                            <div className="flex justify-center gap-24 w-full max-w-2xl relative">
                                {/* NO BRANCH */}
                                <div className="flex flex-col items-center gap-6">
                                    <div className="text-[10px] font-bold text-red-600">HAYIR</div>
                                    <Arrow className="rotate-90" />
                                    <div className="p-4 rounded-xl border border-red-900/40 bg-red-900/10 text-[10px] text-red-200">1 BASAMAK İLERLER</div>
                                    <Arrow className="rotate-90" />
                                    <div className="p-4 rounded-xl border border-red-600 bg-red-600 text-[10px] text-white font-bold">OYUNCU ELENDİ</div>
                                </div>

                                {/* YES BRANCH */}
                                <div className="flex flex-col items-center gap-6">
                                    <div className="text-[10px] font-bold text-green-500 uppercase">EVET (HİZALANDI)</div>
                                    <Arrow className="rotate-90" />
                                    <div className="p-4 rounded-xl border border-green-900/40 bg-green-900/10 text-[10px] text-green-200 uppercase">OYUNCU SABİT KALIR</div>
                                    <Arrow className="rotate-90" />
                                    <div className="p-4 rounded-xl border border-green-600 bg-green-600 text-[10px] text-white font-bold uppercase">KAZANDI</div>
                                </div>
                            </div>
                        </div>
                   </div>
                </div>
            </section>

            {/* DETAILS SECTION */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div>
                        <SectionLabel>Teknik Detaylar</SectionLabel>
                        <SectionTitle>İç ve Dış Mekan<br />Özellikleri</SectionTitle>
                        <div className="grid grid-cols-2 gap-8">
                            {[
                                { k: "Yapı Yüksekliği", v: "15 m" },
                                { k: "Platform Yüksekliği", v: "6 m" },
                                { k: "İç Mekan Alanı", v: "695 m²" },
                                { k: "Dış Mekan Alanı", v: "1931 m²" },
                                { k: "Basamak Kolonu", v: "5 m" },
                                { k: "Ekran Uzaklığı", v: "10 m" }
                            ].map((d, i) => (
                                <div key={i} className="border-l border-red-900 pl-4 py-2">
                                    <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">{d.k}</div>
                                    <div className="text-xl font-bold">{d.v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/5">
                        <Image 
                            src="/octagone/dış_mekan_görünüm.jpg"
                            alt="OctaGone Dış Mekan"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>
            </section>

            {/* PERSONAS */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-neutral-900/30 rounded-[4rem]">
                <SectionLabel>Kullanıcı Grubu</SectionLabel>
                <SectionTitle>Kullanıcı Personaları</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
                    <PersonaCard 
                        name="BÜNYAMİN DEDE"
                        role="65 YAŞ · ÇİFTÇİ · TORUNUYLA FUARI ZİYARET EDİYOR"
                        traits={[
                            "Teknolojiyle arası kısıtlı; geleneksel yöntemlere alışkın.",
                            "Torunuyla kaliteli bağ kurmak ve ilgisini anlamak istiyor.",
                            "Refleks gerektiren hızlı hareketlerde zorlanabilir ancak meraklı."
                        ]}
                        motivation="Oyun kurallarını torunundan öğrenerek onunla bir başarı hissi yaşamak."
                        color="red"
                    />
                    <PersonaCard 
                        name="BULUT"
                        role="8 YAŞ · İLKOKUL ÖĞRENCİSİ · ENERJİK"
                        traits={[
                            "Keşfetmeyi seven, enerjik ve teknolojiye aşina.",
                            "Tablet ve konsol oyunlarını seviyor, renkli detaylara ilgili.",
                            "Strateji yerine deneme-yanılma ile hızlı hareket etmeyi seçiyor."
                        ]}
                        motivation="Rakiplerini (ve dedesini) yenerek oyunda başarı kazanmak."
                        color="red"
                    />
                </div>
            </section>

            {/* BRANDING SECTION */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <SectionLabel>Marka Kimliği</SectionLabel>
                <SectionTitle>OctaGone Kimliği</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
                    <div className="p-16 bg-black flex items-center justify-center min-h-[400px]">
                        <Image src="/octagone/octagonelogo.png" alt="Octagone Logo" width={300} height={300} className="object-contain" />
                    </div>
                    <div className="p-16 bg-neutral-900/50 flex flex-col justify-center space-y-12">
                        <div>
                            <h4 className="text-[10px] uppercase tracking-widest text-red-600 mb-4 font-bold">TASARIM İLHAMI</h4>
                            <p className="text-neutral-400 text-sm leading-relaxed italic">
                                "Logo, oyunun sekizgen platformunun üstten görünümünden ilham almıştır. Elenen oyuncunun yüksekten düşüşü, aşağıda kullanılan haç sembolü ile metaforik bir şekilde mezarlık simgesiyle ilişkilendirilir."
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-[10px] uppercase tracking-widest text-red-600 mb-4 font-bold">FONT</h4>
                                <p className="text-xl font-bold">Microgramma</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] uppercase tracking-widest text-red-600 mb-4 font-bold">ANA RENK</h4>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-[#E8001D] border border-white/10" />
                                    <span className="text-sm font-mono tracking-tighter text-neutral-400">#E8001D</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL QUOTE */}
            <section className="py-32 text-center border-t border-white/5">
                <p className="text-xs uppercase tracking-[0.5em] text-neutral-600">
                    YTÜ İLETİŞİM TASARIMI — PROJE 4 FINAL
                </p>
            </section>
        </main>
    );
}

// ---------------------------------------------------------------------------
// HELPER COMPONENTS
// ---------------------------------------------------------------------------

function Arrow({ className }: { className?: string }) {
    return (
        <div className={cn("w-12 h-[1px] bg-white/10 relative", className)}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-white/30 rotate-45" />
        </div>
    );
}

function PersonaCard({ name, role, traits, motivation, color }: any) {
    return (
        <div className="p-16 bg-neutral-900/40 hover:bg-neutral-900 transition-all duration-500">
            <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 rounded-xl bg-red-600/10 flex items-center justify-center font-bold text-red-600 text-3xl">
                    {name[0]}
                </div>
                <div>
                    <h3 className="text-2xl font-bold tracking-tight uppercase">{name}</h3>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 mt-1 font-medium">{role}</p>
                </div>
            </div>
            <div className="space-y-4 mb-8">
                {traits.map((trait: string, i: number) => (
                    <div key={i} className="flex gap-4">
                        <div className="w-1 h-1 rounded-full bg-red-600 mt-2 shrink-0" />
                        <p className="text-sm text-neutral-400 leading-relaxed">{trait}</p>
                    </div>
                ))}
            </div>
            <div className="pt-8 border-t border-white/5">
                <h4 className="text-[9px] uppercase tracking-widest text-neutral-600 mb-3 font-bold">MOTİVASYON</h4>
                <p className="text-sm text-neutral-300 italic">"{motivation}"</p>
            </div>
        </div>
    );
}
