import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function CoreSection() {
    const { t } = useLanguage();

    return (
        <section className="max-w-7xl mx-auto px-6 py-12 md:py-24 transition-colors duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Card 1: The Problem */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="group relative rounded-3xl p-8 md:p-12 border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900 overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-8xl font-bold italic select-none">!</span>
                    </div>
                    <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-neutral-400 dark:text-neutral-500 mb-6 transition-colors duration-500">
                        01 / {t("cv.car2gather.problemTitle")}
                    </h3>
                    <p className="text-xl md:text-3xl font-medium leading-tight text-foreground transition-colors duration-500">
                        {t("cv.car2gather.problemDesc")}
                    </p>
                </motion.div>

                {/* Card 2: The Goal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="group relative rounded-3xl p-8 md:p-12 border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900 overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-8xl font-bold italic select-none">✓</span>
                    </div>
                    <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-neutral-400 dark:text-neutral-500 mb-6 transition-colors duration-500">
                        02 / {t("cv.car2gather.goalTitle")}
                    </h3>
                    <p className="text-xl md:text-3xl font-medium leading-tight text-foreground transition-colors duration-500">
                        {t("cv.car2gather.goalDesc")}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
