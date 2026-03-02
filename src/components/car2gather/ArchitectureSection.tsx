import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function ArchitectureSection() {
    const { t } = useLanguage();

    const iaNodes = [
        { label: t("cv.car2gather.iaHome"), color: "bg-blue-500" },
        { label: t("cv.car2gather.iaSearch"), color: "bg-purple-500" },
        { label: t("cv.car2gather.iaPost"), color: "bg-emerald-500" },
        { label: t("cv.car2gather.iaInbox"), color: "bg-amber-500" },
        { label: t("cv.car2gather.iaProfile"), color: "bg-red-500" },
    ];

    const flowSteps = [
        { label: t("cv.car2gather.flowStart"), icon: "📱" },
        { label: t("cv.car2gather.flowSearch"), icon: "🔍" },
        { label: t("cv.car2gather.flowSelect"), icon: "🚗" },
        { label: t("cv.car2gather.flowReview"), icon: "👤" },
        { label: t("cv.car2gather.flowRequest"), icon: "✉️" },
        { label: t("cv.car2gather.flowConfirm"), icon: "✅" },
        { label: t("cv.car2gather.flowChat"), icon: "💬" },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-24 transition-colors duration-500">
            <div className="flex flex-col gap-24">
                {/* IA Section */}
                <div className="flex flex-col gap-12">
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

                    <div className="relative py-12 px-8 rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/40 overflow-hidden flex flex-col items-center">
                        {/* IA visualization */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative z-10 w-full max-w-4xl"
                        >
                            {/* Center Hub */}
                            <div className="flex justify-center mb-16">
                                <div className="w-20 h-20 rounded-2xl bg-foreground text-background dark:bg-white dark:text-black flex items-center justify-center font-bold text-xl shadow-2xl">
                                    APP
                                </div>
                            </div>

                            {/* Connection Lines (Desktop) */}
                            <div className="hidden md:block absolute top-[60px] left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-neutral-200 dark:bg-neutral-800 -z-10" />
                            <div className="hidden md:flex justify-between w-full relative -z-10">
                                {iaNodes.map((_, i) => (
                                    <div key={i} className="w-[2px] h-10 bg-neutral-200 dark:bg-neutral-800" />
                                ))}
                            </div>

                            {/* Nodes */}
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
                                {iaNodes.map((node, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group p-4 md:p-6 rounded-xl border border-neutral-200 dark:border-white/5 bg-white dark:bg-neutral-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3"
                                    >
                                        <div className={`w-3 h-3 rounded-full ${node.color} shadow-[0_0_10px_rgba(0,0,0,0.1)]`} />
                                        <span className="text-[11px] md:text-[13px] font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-300">
                                            {node.label}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                    </div>
                </div>

                {/* User Flow Section */}
                <div className="flex flex-col gap-12">
                    <div className="flex justify-between items-end">
                        <h4 className="text-2xl md:text-3xl font-bold text-foreground">User Flow: Booking a Ride</h4>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.3em]">End-to-End Journey</span>
                    </div>

                    <div className="relative py-16 px-8 rounded-3xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/40 overflow-x-auto scrollbar-hide">
                        <div className="flex min-w-max md:min-w-0 justify-between items-center gap-4 relative px-4">
                            {/* Connection Line */}
                            <div className="absolute top-[35px] left-0 w-full h-[1px] bg-neutral-200 dark:bg-neutral-800 -z-10" />

                            {flowSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex flex-col items-center gap-4 w-32 md:w-40 relative group"
                                >
                                    <div className="w-14 h-14 rounded-full bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 shadow-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500 z-10 transition-colors">
                                        {step.icon}
                                    </div>
                                    <p className="text-[11px] md:text-xs font-bold text-center text-neutral-500 dark:text-neutral-400 uppercase tracking-tighter leading-tight transition-colors">
                                        {step.label}
                                    </p>

                                    {i < flowSteps.length - 1 && (
                                        <div className="absolute top-[35px] left-[70%] md:left-[75%] translate-x-1/2 text-neutral-300 dark:text-neutral-700 font-bold -z-10">
                                            ›
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
