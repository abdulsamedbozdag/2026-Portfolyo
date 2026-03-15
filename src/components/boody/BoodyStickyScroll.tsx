"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { BoodyPhoneMockup } from "./BoodyPhoneMockup";
import { cn } from "@/lib/utils";

interface Feature {
    title: string;
    description: string;
    image: string;
}

export function BoodyStickyScroll() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const features: Feature[] = [
        {
            title: "Boody App Hoşgeldiniz",
            description: "Modern ve kullanıcı dostu arayüzü ile kampüs hayatına ilk adım. Öğrenciler için tasarlanmış özel karşılama ekranı.",
            image: "/Boody/boodyai.jpeg"
        },
        {
            title: "AI Çalışma Asistanı",
            description: "Zor soruları saniyeler içinde çözen, adım adım rehberlik sunan gelişmiş yapay zeka desteği.",
            image: "/Boody/boodyapp_ai_cozum.jpeg"
        },
        {
            title: "Akıllı Kampüs Ağı",
            description: "İlgi alanlarınıza ve bölümlerinize göre diğer öğrencilerle eşleşin, topluluklara katılın.",
            image: "/Boody/boodyapp_boodyekle.jpeg"
        },
        {
            title: "Gerçek Zamanlı Sohbet",
            description: "Güvenli ve hızlı uygulama içi mesajlaşma ile iş birliği ve iletişim her an elinizin altında.",
            image: "/Boody/boodyapp_chat.jpeg"
        },
        {
            title: "İlan Keşfet",
            description: "Ders çalışma, sosyalleşme, spor, sanat, kariyer Boody'si bulmanı sağlayan ilan verme sistemi",
            image: "/Boody/boody_ilan_ara.jpeg"
        },
        {
            title: "İlan Detayları",
            description: "İlanlar hakkında detaylı bilgi, konum ve kullanıcı profili ile güvenli deneyim.",
            image: "/Boody/boodyapp_ilandetay.jpeg"
        },
        {
            title: "Hızlı İlan Verme",
            description: "Birkaç adımda ilanınızı oluşturun ve binlerce öğrenciye anında ulaşın.",
            image: "/Boody/boodyapp_ilanverme.jpeg"
        },
        {
            title: "Kaydedilenler",
            description: "Ders notlarınızı, önemli ilanları ve AI çözümlerini tek bir yerde düzenli şekilde saklayın.",
            image: "/Boody/boodyai_kaydedilenler.jpeg"
        },
        {
            title: "Kişisel Kitaplık",
            description: "Akademik kaynaklarınıza ve favori içeriklerinize her an, her yerden erişin.",
            image: "/Boody/boodyai_kaydedilenler_2.jpeg"
        },
        {
            title: "Öğrenci Profili",
            description: "Kendinizi tanıtın, ilgi alanlarınızı paylaşın ve kampüsteki dijital kimliğinizi oluşturun.",
            image: "/Boody/boodyapp_profil.jpeg"
        },
        {
            title: "Boodydoro (Pomodoro)",
            description: "Odaklanma sürelerinizi yönetin, çalışma verimliliğinizi artırın ve başarıya ulaşın.",
            image: "/Boody/boodydoro.jpeg"
        }
    ];

    return (
        <section className="relative bg-black py-24 md:py-0" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-12 md:gap-24">
                    {/* Left Column: Text Blocks */}
                    <div className="w-full md:w-1/2 space-y-[50vh] md:space-y-0 relative">
                        {features.map((feature, index) => (
                            <FeatureLink
                                key={index}
                                title={feature.title}
                                description={feature.description}
                                index={index}
                                setActiveIndex={setActiveIndex}
                            />
                        ))}
                    </div>

                    {/* Right Column: Sticky Phone */}
                    <div className="hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center">
                        <div className="relative w-full flex justify-center items-center">
                            <BoodyPhoneMockup className="transition-transform duration-500">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -40 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="absolute inset-0 w-full h-full"
                                    >
                                        <Image
                                            src={features[activeIndex].image}
                                            alt={features[activeIndex].title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 400px"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </BoodyPhoneMockup>
                        </div>
                    </div>

                    {/* Mobile: Dynamic View (Non-sticky) */}
                    <div className="md:hidden space-y-24">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="space-y-8"
                            >
                                <div className="relative aspect-[9/19.5] max-w-[260px] mx-auto">
                                    <BoodyPhoneMockup>
                                        <Image
                                            src={feature.image}
                                            alt={feature.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </BoodyPhoneMockup>
                                </div>
                                <div className="text-center px-4">
                                    <span className="text-purple-500 font-mono text-xs mb-2 block tracking-widest uppercase">
                                        Step {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                    </span>
                                    <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">{feature.title}</h3>
                                    <p className="text-neutral-400 leading-relaxed text-sm">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />
            </div>
        </section>
    );
}

function FeatureLink({ title, description, index, setActiveIndex }: { title: string, description: string, index: number, setActiveIndex: (i: number) => void }) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        margin: "-45% 0px -45% 0px",
        once: false
    });

    useEffect(() => {
        if (isInView) {
            setActiveIndex(index);
        }
    }, [isInView, index, setActiveIndex]);

    return (
        <div
            ref={ref}
            className={cn(
                "md:h-screen flex flex-col justify-center transition-all duration-700 ease-in-out hidden md:flex",
                isInView ? "opacity-100 translate-y-0" : "opacity-20 translate-y-4"
            )}
        >
            <span className="text-purple-500 font-mono text-sm mb-4 tracking-widest uppercase">
                Step 0{index + 1}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight leading-[1.1] bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                {title}
            </h2>
            <p className="text-xl text-neutral-400 leading-relaxed max-w-md">
                {description}
            </p>
        </div>
    );
}
