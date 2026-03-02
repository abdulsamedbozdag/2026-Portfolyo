import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function DiscoverySection() {
    const { t } = useLanguage();

    return (
        <section className="max-w-7xl mx-auto px-6 py-12 transition-colors duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                {/* Large Card: Target Audience */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="lg:col-span-8 group relative rounded-3xl p-8 md:p-12 border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900 shadow-xl dark:shadow-2xl overflow-hidden transition-colors duration-500"
                >
                    <div className="absolute top-4 right-8 z-10">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 dark:text-neutral-500 px-3 py-1 border border-neutral-200 dark:border-white/10 rounded-full">
                            {t("cv.car2gather.audienceTitle")}
                        </span>
                    </div>
                    <p className="text-2xl md:text-4xl font-bold leading-tight mt-12 text-foreground transition-colors duration-500">
                        {t("cv.car2gather.audienceDesc")}
                    </p>
                    <div className="mt-12 flex flex-wrap gap-3">
                        {["Professionals", "Students", "Eco-conscious", "Commuters"].map((tag) => (
                            <span key={tag} className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-200/50 dark:bg-white/5 px-4 py-2 rounded-lg transition-colors duration-500">
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Smaller Cards: Benchmark */}
                <div className="lg:col-span-4 flex flex-col gap-6 md:gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="flex-1 rounded-3xl p-8 border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900 shadow-lg transition-colors duration-500"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <h4 className="text-lg font-bold text-foreground transition-colors duration-500">{t("cv.car2gather.competitor1")}</h4>
                            <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded lowercase">Friction</span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 transition-colors duration-500">
                            {t("cv.car2gather.friction1")}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="flex-1 rounded-3xl p-8 border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900 shadow-lg transition-colors duration-500"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <h4 className="text-lg font-bold text-foreground transition-colors duration-500">{t("cv.car2gather.competitor2")}</h4>
                            <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded lowercase">Friction</span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-400 transition-colors duration-500">
                            {t("cv.car2gather.friction2")}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
