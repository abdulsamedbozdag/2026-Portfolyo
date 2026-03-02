import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function EmpathySection() {
    const { t } = useLanguage();

    const quadrants = [
        { label: t("cv.car2gather.says"), content: "I need a cheaper way to get to work without using the bus.", color: "text-blue-500" },
        { label: t("cv.car2gather.thinks"), content: "Is it safe to share a ride with a stranger?", color: "text-purple-500" },
        { label: t("cv.car2gather.does"), content: "Checks apps daily, compares prices, looks for reviews.", color: "text-emerald-500" },
        { label: t("cv.car2gather.feels"), content: "Stressed by traffic, anxious about privacy.", color: "text-red-500" },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-12 transition-colors duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                {/* User Persona Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-5 rounded-3xl overflow-hidden border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900 shadow-2xl transition-colors duration-500 flex flex-col"
                >
                    <div className="h-48 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-950 flex items-center justify-center relative transition-colors duration-500">
                        <div className="w-24 h-24 rounded-full bg-neutral-100 dark:bg-neutral-800 border-4 border-white dark:border-neutral-900 shadow-xl transition-colors duration-500 flex items-center justify-center">
                            <span className="text-4xl">👨‍💻</span>
                        </div>
                        <div className="absolute bottom-4 left-6">
                            <h4 className="text-2xl font-bold text-foreground dark:text-white transition-colors duration-500">Deniz, 26</h4>
                            <p className="text-neutral-500 text-sm">Frontend Developer</p>
                        </div>
                    </div>
                    <div className="p-8 flex-1">
                        <h5 className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 mb-4">{t("cv.car2gather.personaTitle")}</h5>
                        <div className="space-y-6">
                            <div>
                                <span className="text-xs font-bold text-neutral-500 block mb-1">Frustrations</span>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed transition-colors duration-500">
                                    Late arrivals due to unpredictable transit, high cost of fuel, lacking social connection in daily commutes.
                                </p>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-neutral-500 block mb-1">Motivations</span>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed transition-colors duration-500">
                                    Saving money for travel, improving urban sustainability, meeting new people on the way.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Empathy Map Grid */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                    <div className="mb-8">
                        <h3 className="text-3xl font-bold text-foreground transition-colors duration-500">{t("cv.car2gather.empathyTitle")}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                        {quadrants.map((q, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="p-8 rounded-2xl border border-neutral-200 dark:border-white/5 bg-neutral-50/50 dark:bg-white/[0.02] transition-colors duration-500"
                            >
                                <span className={`text-[10px] uppercase font-bold tracking-widest ${q.color} mb-3 block`}>
                                    {q.label}
                                </span>
                                <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 transition-colors duration-500 leading-relaxed italic">
                                    "{q.content}"
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
