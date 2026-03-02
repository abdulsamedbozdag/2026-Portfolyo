import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export function ArchitectureSection() {
    const { t } = useLanguage();

    return (
        <section className="max-w-7xl mx-auto px-6 py-12 md:py-24 transition-colors duration-500">
            <div className="flex flex-col gap-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl"
                >
                    <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6 transition-colors duration-500">
                        {t("cv.car2gather.archTitle")}
                    </h3>
                    <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed transition-colors duration-500">
                        {t("cv.car2gather.archDesc")}
                    </p>
                </motion.div>

                {/* Visual Placeholders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* IA Map */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="group relative rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900 overflow-hidden aspect-[16/10]"
                    >
                        <div className="absolute top-6 left-6 z-10">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 dark:text-neutral-500 bg-white/80 dark:bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-neutral-200 dark:border-white/10">
                                Information Architecture
                            </span>
                        </div>
                        <div className="w-full h-full flex items-center justify-center p-8">
                            <div className="relative w-full h-full opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                                <Image
                                    src="/car2gather/ia-map.png"
                                    alt="Information Architecture Map"
                                    fill
                                    className="object-contain grayscale"
                                />
                                {/* Fallback pattern if image is missing */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="text-neutral-300 dark:text-neutral-700 text-sm font-mono">[ia-map.png placeholder]</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* User Flow */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="group relative rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900 overflow-hidden aspect-[16/10]"
                    >
                        <div className="absolute top-6 left-6 z-10">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 dark:text-neutral-500 bg-white/80 dark:bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-neutral-200 dark:border-white/10">
                                User Flow
                            </span>
                        </div>
                        <div className="w-full h-full flex items-center justify-center p-8">
                            <div className="relative w-full h-full opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                                <Image
                                    src="/car2gather/user-flow.png"
                                    alt="User Flow Map"
                                    fill
                                    className="object-contain grayscale"
                                />
                                {/* Fallback pattern if image is missing */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="text-neutral-300 dark:text-neutral-700 text-sm font-mono">[user-flow.png placeholder]</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
