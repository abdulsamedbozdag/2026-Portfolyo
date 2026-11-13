"use client";

import { motion } from "framer-motion";
import { Users, Target, Zap, Clock, ExternalLink, Calendar, Map, Layers, PlayCircle, Trophy, User } from "lucide-react";
import { StickyBackButton } from "@/components/StickyBackButton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

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
    const { tx } = useLanguage();
    return (
        <main className="min-h-screen bg-neutral-950 text-white selection:bg-red-600/30 font-sans overflow-x-hidden">
            <StickyBackButton />

            {/* HERO SECTION */}
            <section className="relative min-h-[85vh] flex flex-col justify-end px-6 md:px-12 pb-24 overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/octagone/octagonekapak.png"
                        alt="OctaGone Hero"
                        fill
                        className="object-contain opacity-60 grayscale-[0.3] object-left-top scale-110 origin-top-left"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                    <div className="absolute inset-0 bg-radial-gradient(circle_at_30%_30%,rgba(232,0,29,0.15)_0%,transparent_80%)" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex flex-col items-center gap-4 mb-20 text-center">
                            <span className="px-6 py-2.5 bg-red-600 text-sm font-bold tracking-[0.3em] uppercase rounded shadow-[0_15px_50px_rgba(232,0,29,0.4)] block mx-auto">
                                {tx("YTÜ İLETİŞİM VE TASARIMI — PROJE 4 FİNAL", "YTU COMMUNICATION AND DESIGN — PROJECT 4 FINAL")}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-white/10">
                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 mb-4 font-black">{tx("Ders", "Course")}</h3>
                                <p className="text-2xl font-bold text-white tracking-tighter">{tx("Proje 4", "Project 4")}</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 mb-4 font-black">{tx("Konu", "Subject")}</h3>
                                <p className="text-2xl font-bold text-white tracking-tighter">{tx("Oyun Tasarımı", "Game Design")}</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 mb-4 font-black">{tx("Yıl", "Year")}</h3>
                                <p className="text-2xl font-bold text-white tracking-tighter">2025</p>
                            </div>
                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.4em] text-neutral-500 mb-4 font-black">Platform</h3>
                                <p className="text-2xl font-bold text-white tracking-tighter uppercase">{tx("Mekan", "Space")}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* TIMELINE SECTION */}
            <section className="pt-20 pb-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 bg-neutral-950/50">
                <SectionLabel>{tx("Zaman Çizelgesi", "Timeline")}</SectionLabel>
                <SectionTitle>{tx("Gelişim Süreci", "Development Process")}</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                    {[
                        { date: tx("18 Aralık 2024", "18 December 2024"), title: tx("Fikir ve İlk Eskiz", "Idea & First Sketch") },
                        { date: tx("19 Aralık 2024", "19 December 2024"), title: tx("İlk Taslak 3D Model", "First Draft 3D Model") },
                        { date: tx("25 Aralık 2024", "25 December 2024"), title: tx("Ar-Ge / Ray & Menteşe", "R&D / Rail & Hinge") },
                        { date: tx("8 Ocak 2025", "8 January 2025"), title: tx("Platform Sistemi", "Platform System") },
                        { date: tx("20 Ocak 2025", "20 January 2025"), title: tx("Dijital Prototip", "Digital Prototype") }
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
                <SectionLabel>{tx("Konsept", "Concept")}</SectionLabel>
                <SectionTitle>{tx("OctaGone Nedir?", "What is OctaGone?")}</SectionTitle>
                <div className="space-y-12">
                    <p className="text-2xl md:text-4xl font-light leading-relaxed text-neutral-200">
                        {tx(
                            <>OctaGone, sekizgen bir platform üzerinde, oyuncuların <span className="font-bold text-red-600">reflekslerini ve stratejik düşünme</span> yeteneklerini sınayan bir hayatta kalma oyunudur.</>,
                            <>OctaGone is a survival game played on an octagonal platform that tests players&apos; <span className="font-bold text-red-600">reflexes and strategic thinking</span>.</>
                        )}
                    </p>
                    <p className="text-lg text-neutral-400 leading-relaxed max-w-3xl">
                        {tx(
                            <>Oyuncular, kendi renklerini <span className="text-green-500 font-bold">sabit yeşil ışıkla</span> hizalayarak platformda kalmaya çalışır. Zamanla zorlaşan dinamikler, oyuncuları hızlı karar vermeye ve doğru zamanda hareket etmeye zorlar. Oyunun amacı, son kalan oyuncu olmaktır.</>,
                            <>Players try to stay on the platform by aligning their own colour with the <span className="text-green-500 font-bold">fixed green light</span>. Dynamics that get harder over time force players to decide quickly and move at the right moment. The goal is to be the last player standing.</>
                        )}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                        <div className="p-8 rounded-2xl bg-neutral-900/50 border border-white/5">
                            <h4 className="text-red-600 font-bold mb-4 uppercase tracking-wider text-sm">{tx("Hedef & Zorluk", "Goal & Challenge")}</h4>
                            <p className="text-sm text-neutral-400 mb-6">{tx("Oyuncular, hareket eden ışık ile kendi renklerini hizalayarak platformda hayatta kalmaya çalışır.", "Players try to survive on the platform by aligning their colour with the moving light.")}</p>
                            <p className="text-xs text-neutral-500 italic">&ldquo;{tx("Platformların dinamik yapısı ve oyuncunun doğru zamanda hızlı tepki verme gerekliliği ana zorluktur.", "The main challenge is the dynamic platforms and the need to react quickly at exactly the right moment.")}&rdquo;</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-neutral-900/50 border border-white/5">
                            <h4 className="text-red-600 font-bold mb-4 uppercase tracking-wider text-sm">{tx("Risk & Ödül", "Risk & Reward")}</h4>
                            <p className="text-sm text-neutral-400 mb-6">{tx("Yanlış zamanlama bir basamak kaybına neden olurken, doğru hizalama oyuncuyu hayatta tutar.", "Bad timing costs a step, while correct alignment keeps the player alive.")}</p>
                            <p className="text-xs text-neutral-500 italic">&ldquo;{tx("Görüntülenen yeşil ışık sabittir, ancak oyuncu ışığı giderek hızlanır.", "The green light stays fixed, but the player's light keeps getting faster.")}&rdquo;</p>
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
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <SectionLabel>{tx("Teknik Analiz", "Technical Analysis")}</SectionLabel>
                <SectionTitle>{tx("Zihin Haritası ve Süreç", "Mind Map and Process")}</SectionTitle>
                
                <div className="space-y-24">
                   <MindMap />
                   <Flowchart />
                </div>
            </section>

            {/* DETAILS SECTION */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div>
                        <SectionLabel>{tx("Teknik Detaylar", "Technical Details")}</SectionLabel>
                        <SectionTitle>{tx(<>İç ve Dış Mekan<br />Özellikleri</>, <>Indoor and Outdoor<br />Specifications</>)}</SectionTitle>
                        <div className="grid grid-cols-2 gap-8">
                            {[
                                { k: tx("Yapı Yüksekliği", "Structure Height"), v: "15 m" },
                                { k: tx("Platform Yüksekliği", "Platform Height"), v: "6 m" },
                                { k: tx("İç Mekan Alanı", "Indoor Area"), v: "695 m²" },
                                { k: tx("Dış Mekan Alanı", "Outdoor Area"), v: "1931 m²" },
                                { k: tx("Basamak Kolonu", "Step Column"), v: "5 m" },
                                { k: tx("Ekran Uzaklığı", "Screen Distance"), v: "10 m" }
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
                            alt={tx("OctaGone Dış Mekan", "OctaGone Exterior")}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>
            </section>

            {/* PERSONAS */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-neutral-900/30 rounded-[4rem]">
                <SectionLabel>{tx("Kullanıcı Grubu", "User Group")}</SectionLabel>
                <SectionTitle>{tx("Kullanıcı Personaları", "User Personas")}</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
                    <PersonaCard 
                        name={tx("BÜNYAMİN DEDE", "GRANDPA BÜNYAMİN")}
                        role={tx("65 YAŞ · ÇİFTÇİ · TORUNUYLA FUARI ZİYARET EDİYOR", "AGE 65 · FARMER · VISITING THE FAIR WITH HIS GRANDSON")}
                        traits={tx([
                            "Teknolojiyle arası kısıtlı; geleneksel yöntemlere alışkın.",
                            "Torunuyla kaliteli bağ kurmak ve ilgisini anlamak istiyor.",
                            "Refleks gerektiren hızlı hareketlerde zorlanabilir ancak meraklı."
                        ], [
                            "Limited experience with technology; used to traditional ways.",
                            "Wants to bond with his grandson and understand his interests.",
                            "May struggle with fast, reflex-based movements but is curious."
                        ])}
                        motivation={tx("Oyun kurallarını torunundan öğrenerek onunla bir başarı hissi yaşamak.", "To learn the rules from his grandson and share a sense of achievement with him.")}
                        color="red"
                    />
                    <PersonaCard 
                        name="BULUT"
                        role={tx("8 YAŞ · İLKOKUL ÖĞRENCİSİ · ENERJİK", "AGE 8 · PRIMARY SCHOOL STUDENT · ENERGETIC")}
                        traits={tx([
                            "Keşfetmeyi seven, enerjik ve teknolojiye aşina.",
                            "Tablet ve konsol oyunlarını seviyor, renkli detaylara ilgili.",
                            "Strateji yerine deneme-yanılma ile hızlı hareket etmeyi seçiyor."
                        ], [
                            "Loves exploring, energetic and comfortable with technology.",
                            "Enjoys tablet and console games and is drawn to colourful details.",
                            "Prefers moving fast by trial and error rather than strategy."
                        ])}
                        motivation={tx("Rakiplerini (ve dedesini) yenerek oyunda başarı kazanmak.", "To win the game by beating his rivals (and his grandpa).")}
                        color="red"
                    />
                </div>
            </section>

            {/* BRANDING SECTION */}
            <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <SectionLabel>{tx("Marka Kimliği", "Brand Identity")}</SectionLabel>
                <SectionTitle>{tx("OctaGone Kimliği", "OctaGone Identity")}</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
                    <div className="p-16 bg-black flex items-center justify-center min-h-[400px]">
                        <Image src="/octagone/octagonelogo.png" alt="Octagone Logo" width={300} height={300} className="object-contain" />
                    </div>
                    <div className="p-16 bg-neutral-900/50 flex flex-col justify-center space-y-12">
                        <div>
                            <h4 className="text-[10px] uppercase tracking-widest text-red-600 mb-4 font-bold">{tx("TASARIM İLHAMI", "DESIGN INSPIRATION")}</h4>
                            <p className="text-neutral-400 text-sm leading-relaxed italic">
                                &ldquo;{tx("Logo, oyunun sekizgen platformunun üstten görünümünden ilham almıştır. Elenen oyuncunun yüksekten düşüşü, aşağıda kullanılan haç sembolü ile metaforik bir şekilde mezarlık simgesiyle ilişkilendirilir.", "The logo is inspired by the top view of the game's octagonal platform. The fall of an eliminated player is metaphorically linked to a graveyard through the cross symbol at the bottom.")}&rdquo;
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-[10px] uppercase tracking-widest text-red-600 mb-4 font-bold">FONT</h4>
                                <p className="text-xl font-bold">Microgramma</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] uppercase tracking-widest text-red-600 mb-4 font-bold">{tx("ANA RENK", "PRIMARY COLOUR")}</h4>
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
                    {tx("YTÜ İLETİŞİM TASARIMI — PROJE 4 FİNAL", "YTU COMMUNICATION DESIGN — PROJECT 4 FINAL")}
                </p>
            </section>
        </main>
    );
}

// ---------------------------------------------------------------------------
// HELPER COMPONENTS
// ---------------------------------------------------------------------------

function Flowchart() {
    const { tx } = useLanguage();
    return (
        <section className="mb-20 max-w-4xl mx-auto w-full">
            <h2 className="text-3xl font-bold mb-10 text-center border-b pb-4 border-neutral-800 uppercase tracking-tight">{tx("Oyun Akışı (Flowchart)", "Game Flow (Flowchart)")}</h2>

            <div className="flex flex-col items-center space-y-4">
                {/* Başlangıç */}
                <div className="bg-green-600 text-white font-bold py-3 px-10 rounded-full shadow-[0_0_15px_rgba(22,163,74,0.5)] text-sm uppercase tracking-widest">
                    {tx("BAŞLA", "START")}
                </div>
                <div className="w-px h-8 bg-neutral-700"></div>
                {/* Adım 1 */}
                <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl text-center w-full max-w-md text-neutral-300 text-sm">
                    {tx("Oyuncu elinde tuş olan kumandayla platforma çıkar.", "The player steps onto the platform holding a one-button controller.")}
                </div>
                <div className="w-px h-8 bg-neutral-700"></div>
                {/* Adım 2 */}
                <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl text-center w-full max-w-md text-neutral-300 text-sm">
                    {tx(
                        <>Sekizgen sütun üzerinde ışıklar belirir. <span className="text-green-500 font-bold uppercase">Yeşil ışık sabittir</span>, oyuncunun renkli ışığı aşağı-yukarı hareket eder.</>,
                        <>Lights appear on the octagonal column. <span className="text-green-500 font-bold uppercase">The green light is fixed</span>, while the player&apos;s coloured light moves up and down.</>
                    )}
                </div>
                <div className="w-px h-8 bg-neutral-700"></div>
                {/* Adım 3 */}
                <div className="bg-blue-900/20 border border-blue-800 p-5 rounded-xl text-center w-full max-w-md text-blue-200 text-sm">
                    {tx("Oyuncunun rengi yeşil ışık ile aynı konuma geldiğinde oyuncu düğmeye basar.", "When the player's colour lines up with the green light, the player presses the button.")}
                </div>
                <div className="w-px h-8 bg-neutral-700"></div>
                {/* Karar Mekanizması 1 */}
                <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl text-center w-full max-w-2xl backdrop-blur-sm">
                    <strong className="text-yellow-500 block mb-6 uppercase tracking-wider text-xs">{tx("Soru: Renkler aynı konuma geldiğinde oyuncu tuşa bastı mı?", "Question: Did the player press the button when the colours lined up?")}</strong>
                    <div className="grid grid-cols-2 gap-8 mt-4">

                        {/* HAYIR Dalı */}
                        <div className="flex flex-col items-center">
                            <div className="bg-red-600/10 text-red-500 py-1 px-4 rounded font-black mb-4 text-xs tracking-widest">{tx("HAYIR", "NO")}</div>
                            <div className="bg-neutral-800/50 p-4 rounded-lg text-xs w-full text-neutral-400">{tx("Oyuncu 1 basamak ilerler.", "The player moves 1 step.")}</div>
                            <div className="w-px h-6 bg-neutral-700 my-2"></div>
                            <div className="bg-neutral-800/50 p-4 rounded-lg text-xs w-full text-neutral-400 font-medium italic">{tx("3 basamakta da başaramadı mı?", "Failed on all 3 steps?")}</div>
                            <div className="w-px h-6 bg-neutral-700 my-2"></div>
                            <div className="bg-red-600 text-white font-bold py-3 px-4 rounded-lg w-full shadow-[0_4px_20px_rgba(220,38,38,0.3)] text-xs uppercase tracking-tighter">
                                {tx("OYUNCU ELENDİ", "PLAYER ELIMINATED")}
                            </div>
                        </div>
                        {/* EVET Dalı */}
                        <div className="flex flex-col items-center">
                            <div className="bg-green-600/10 text-green-500 py-1 px-4 rounded font-black mb-4 text-xs tracking-widest">{tx("EVET", "YES")}</div>
                            <div className="bg-neutral-800/50 p-4 rounded-lg text-xs w-full text-neutral-400 uppercase">{tx("Oyuncu sabittir.", "The player stays in place.")}</div>
                            <div className="w-px h-6 bg-neutral-700 my-2"></div>
                            <div className="bg-neutral-800/50 p-4 rounded-lg text-xs w-full text-neutral-400 font-medium italic">{tx("Renkler aynı konumdayken oyuncu tuşa basmaya devam etti mi?", "Did the player keep pressing while the colours were aligned?")}</div>
                            <div className="w-px h-6 bg-neutral-700 my-2"></div>
                            <div className="bg-green-600 text-white font-bold py-3 px-4 rounded-lg w-full shadow-[0_4px_20px_rgba(22,163,74,0.3)] text-xs uppercase tracking-tighter">
                                {tx("OYUNCU KAZANDI", "PLAYER WINS")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function MindMap() {
    const { tx } = useLanguage();
    return (
        <div className="octagone-mindmap-wrap relative overflow-hidden bg-neutral-900/20 border border-white/5 rounded-3xl p-8 md:p-14">
            <style jsx>{`
                .octagone-mindmap-wrap::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(232,0,29,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(232,0,29,0.04) 1px, transparent 1px);
                    background-size: 48px 48px;
                    pointer-events: none;
                }
                .center-node {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: clamp(100px, 15vw, 140px);
                    height: clamp(100px, 15vw, 140px);
                    border-radius: 50%;
                    background: #0f0f0f;
                    border: 1.5px solid #2a2a2a;
                    flex-shrink: 0;
                    position: relative;
                    z-index: 2;
                }
                .center-node::after {
                    content: '';
                    position: absolute;
                    inset: -12px;
                    border-radius: 50%;
                    border: 1px solid rgba(232,0,29,0.18);
                }
                .mm-card {
                    background: #111;
                    border: 1px solid #1e1e1e;
                    border-radius: 12px;
                    padding: 24px;
                    position: relative;
                    overflow: hidden;
                    text-align: left;
                    transition: border-color 0.3s ease;
                }
                .mm-card:hover {
                    border-color: rgba(232, 0, 29, 0.3);
                }
                .mm-pill {
                    background: #1a1a1a;
                    border: 1px solid #2a2a2a;
                    border-radius: 20px;
                    padding: 4px 12px;
                    font-size: 11px;
                    color: #aaa;
                    font-weight: 500;
                    white-space: nowrap;
                }
                .mm-pill.red {
                    background: rgba(232,0,29,0.08);
                    border-color: rgba(232,0,29,0.25);
                    color: #e8001d;
                }
                @media (max-width: 1024px) {
                    .mm-layout {
                        display: flex !important;
                        flex-direction: column;
                        gap: 40px;
                        align-items: center;
                    }
                    .mm-col {
                        width: 100%;
                    }
                }
            `}</style>
            
            <div className="flex flex-col mb-12">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-5 h-px bg-red-600" />
                    <span className="text-[10px] font-bold tracking-[0.4em] text-red-600 uppercase">{tx("Kavramsal Harita", "Concept Map")}</span>
                </div>
                <h3 className="text-2xl font-bold text-neutral-100 uppercase tracking-tight">{tx("Mind Map — Oyunun Temel Yapısı", "Mind Map — Core Structure of the Game")}</h3>
            </div>

            <div className="mm-layout grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 items-center relative transition-all duration-700">
                {/* LEFT */}
                <div className="mm-col flex flex-col gap-6 lg:pr-12">
                    <div className="mm-card group hover:border-red-600/30 transition-colors">
                        <div className="text-[9px] font-bold tracking-[0.3em] text-red-600 uppercase mb-2">{tx("01 — Mekan", "01 — Space")}</div>
                        <div className="text-base font-bold text-neutral-200 mb-3 uppercase tracking-tight">{tx("Sekizgen Arena", "Octagonal Arena")}</div>
                        <div className="space-y-2">
                            <p className="text-xs text-neutral-500 leading-relaxed pl-3 border-l border-neutral-800">{tx("Sekizgen bir kapalı mekanda oynanacak.", "Played in an enclosed octagonal space.")}</p>
                            <p className="text-xs text-neutral-500 leading-relaxed pl-3 border-l border-neutral-800">{tx("Ortada platformu taşıyan sütun; ışıklar bu sütunda belirecek.", "A central column carries the platform; the lights appear on this column.")}</p>
                            <p className="text-xs text-neutral-500 leading-relaxed pl-3 border-l border-neutral-800 italic">{tx("Atmosfer gerginlik hissi için kasıtlı karamsar tutulacak.", "The atmosphere is deliberately dark to build tension.")}</p>
                        </div>
                    </div>

                    <div className="mm-card group hover:border-red-600/30 transition-colors">
                        <div className="text-[9px] font-bold tracking-[0.3em] text-red-600 uppercase mb-2">02 — Platform</div>
                        <div className="text-base font-bold text-neutral-200 mb-3 uppercase tracking-tight">{tx("Ray & Menteşe Sistemi", "Rail & Hinge System")}</div>
                        <div className="space-y-2 mb-4">
                            <p className="text-xs text-neutral-500 leading-relaxed pl-3 border-l border-neutral-800">{tx("Her oyuncu için 3'er basamaktan oluşan raylı platform.", "A rail platform with 3 steps for each player.")}</p>
                            <p className="text-xs text-neutral-500 leading-relaxed pl-3 border-l border-neutral-800">{tx("8 oyuncuya kadar ölçeklenir; solo da oynanabilir.", "Scales up to 8 players; can also be played solo.")}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="mm-pill red uppercase tracking-tighter">{tx("Maks 8 kişi", "Max 8 players")}</span>
                            <span className="mm-pill tracking-tighter">{tx("Min 1 kişi", "Min 1 player")}</span>
                            <span className="mm-pill tracking-tighter font-black">{tx("3 basamak", "3 steps")}</span>
                        </div>
                    </div>
                </div>

                {/* CENTER */}
                <div className="center-node my-10 lg:my-0 shadow-[0_0_50px_rgba(232,0,29,0.15)] group transition-transform duration-500 hover:scale-105">
                    <span className="text-[13px] font-bold tracking-[0.4em] text-neutral-600 leading-none mb-1.5 transition-colors group-hover:text-neutral-400">OCTA</span>
                    <svg className="w-9 h-9 my-1.5" viewBox="0 0 36 36" fill="none">
                        <line x1="18" y1="2"  x2="18" y2="34" stroke="#e8001d" strokeWidth="4.5" strokeLinecap="round"/>
                        <line x1="2"  y1="18" x2="34" y2="18" stroke="#e8001d" strokeWidth="4.5" strokeLinecap="round"/>
                        <line x1="5"  y1="5"  x2="31" y2="31" stroke="#e8001d" strokeWidth="4.5" strokeLinecap="round"/>
                        <line x1="31" y1="5"  x2="5"  y2="31" stroke="#e8001d" strokeWidth="4.5" strokeLinecap="round"/>
                        <line x1="18" y1="28" x2="18" y2="36" stroke="#e8001d" strokeWidth="4.5" strokeLinecap="round"/>
                        <line x1="12" y1="32" x2="24" y2="32" stroke="#e8001d" strokeWidth="4.5" strokeLinecap="round"/>
                    </svg>
                    <span className="text-[13px] font-bold tracking-[0.4em] text-neutral-600 leading-none mt-1.5 transition-colors group-hover:text-neutral-400">GONE</span>
                </div>

                {/* RIGHT */}
                <div className="mm-col flex flex-col gap-6 lg:pl-12">
                    <div className="mm-card group hover:border-red-600/30 transition-colors">
                        <div className="text-[9px] font-bold tracking-[0.3em] text-red-600 uppercase mb-2">{tx("03 — Oynanış", "03 — Gameplay")}</div>
                        <div className="text-base font-bold text-neutral-200 mb-3 uppercase tracking-tight">{tx("Refleks Mekaniği", "Reflex Mechanic")}</div>
                        <div className="space-y-2">
                            <p className="text-xs text-neutral-500 leading-relaxed pl-3 border-l border-neutral-800">{tx("Oyuncular renk atanmış tek tuşlu kumandayla platforma çıkar.", "Players step onto the platform with a colour-coded one-button controller.")}</p>
                            <p className="text-xs text-neutral-500 leading-relaxed pl-3 border-l border-neutral-800">{tx("Renkli ışık sütunda aşağı-yukarı hareket eder.", "The coloured light moves up and down the column.")}</p>
                            <p className="text-xs text-neutral-500 leading-relaxed pl-3 border-l border-neutral-800"><span className="text-neutral-300 font-bold uppercase">{tx("Hedef:", "Goal:")}</span> {tx("kendi rengini sabit yeşil ışıkla hizalamak.", "align your own colour with the fixed green light.")}</p>
                            <p className="text-xs text-neutral-500 leading-relaxed pl-3 border-l border-neutral-800 font-medium">{tx("Doğru zamanda bas → sabit kal. Hata → bir basamak kaybet.", "Press at the right time → stay put. Miss → lose a step.")}</p>
                        </div>
                    </div>

                    <div className="mm-card group hover:border-red-600/30 transition-colors">
                        <div className="text-[9px] font-bold tracking-[0.3em] text-red-600 uppercase mb-2">{tx("04 — Amaç", "04 — Objective")}</div>
                        <div className="text-base font-bold text-neutral-200 mb-3 uppercase tracking-tight">{tx("Hayatta Kalma", "Survival")}</div>
                        <div className="space-y-2 mb-4">
                            <p className="text-xs text-neutral-500 leading-relaxed pl-3 border-l border-neutral-800 font-black">{tx("3 basamak kaybeden oyuncu platformdan düşerek elenir.", "A player who loses 3 steps falls off the platform and is eliminated.")}</p>
                            <p className="text-xs text-neutral-500 leading-relaxed pl-3 border-l border-neutral-800 uppercase italic">{tx("Son ayakta kalan oyuncu kazanır.", "The last player standing wins.")}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="mm-pill red uppercase font-bold text-[10px]">Adrenalin</span>
                            <span className="mm-pill red uppercase font-bold text-[10px]">{tx("Gerilim", "Tension")}</span>
                            <span className="mm-pill uppercase text-[10px]">{tx("Refleks", "Reflex")}</span>
                            <span className="mm-pill uppercase text-[10px]">{tx("Strateji", "Strategy")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Arrow({ className }: { className?: string }) {
    return (
        <div className={cn("w-12 h-[1px] bg-white/10 relative", className)}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-white/30 rotate-45" />
        </div>
    );
}

function PersonaCard({ name, role, traits, motivation, color }: any) {
    const { tx } = useLanguage();
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
                <h4 className="text-[9px] uppercase tracking-widest text-neutral-600 mb-3 font-bold">{tx("MOTİVASYON", "MOTIVATION")}</h4>
                <p className="text-sm text-neutral-300 italic">&ldquo;{motivation}&rdquo;</p>
            </div>
        </div>
    );
}
