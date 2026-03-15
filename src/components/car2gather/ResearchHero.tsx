import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export function ResearchHero() {
    const { t } = useLanguage();

    return (
        <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 px-6 overflow-hidden transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center"
                >
                    {/* Logo */}
                    <div className="mb-12 h-16 relative w-64">
                        <Image
                            src="/car2gather/c2g yatay-turuncu(bg-yeşil).png"
                            alt="car2gather"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 border border-neutral-200 dark:border-white/10 px-4 py-2 rounded-full transition-colors duration-500">
                            {t("cv.car2gather.role")}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 border border-neutral-200 dark:border-white/10 px-4 py-2 rounded-full transition-colors duration-500">
                            2022 - 2023
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 border border-neutral-200 dark:border-white/10 px-4 py-2 rounded-full transition-colors duration-500">
                            iOS & Android
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-[120px] font-bold leading-[0.9] tracking-tighter text-foreground mb-8 transition-colors duration-500">
                        car2gather
                    </h1>

                    <p className="text-2xl md:text-5xl font-medium max-w-5xl leading-tight text-neutral-500 dark:text-neutral-400 transition-colors duration-500">
                        {t("cv.car2gather.uxHeroSubtitle")}
                    </p>
                </motion.div>
            </div>

            {/* Visual Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neutral-200 dark:bg-white/5 blur-[120px] rounded-full -mr-64 -mt-32 -z-10 transition-colors duration-500 pointer-events-none" />
        </section>
    );
}
