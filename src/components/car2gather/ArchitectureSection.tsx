import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
    Smartphone,
    Home,
    Search,
    PlusCircle,
    Inbox,
    User,
    MapPin,
    Car,
    Send,
    CheckCircle,
    MessageCircle
} from "lucide-react";

export function ArchitectureSection() {
    const { t } = useLanguage();

    const iaNodes = [
        { label: t("cv.car2gather.iaHome"), icon: Home, color: "text-blue-500", dotColor: "bg-blue-500" },
        { label: t("cv.car2gather.iaSearch"), icon: Search, color: "text-purple-500", dotColor: "bg-purple-500" },
        { label: t("cv.car2gather.iaPost"), icon: PlusCircle, color: "text-emerald-500", dotColor: "bg-emerald-500" },
        { label: t("cv.car2gather.iaInbox"), icon: Inbox, color: "text-amber-500", dotColor: "bg-amber-500" },
        { label: t("cv.car2gather.iaProfile"), icon: User, color: "text-red-500", dotColor: "bg-red-500" },
    ];

    const flowSteps = [
        { label: t("cv.car2gather.flowStart"), icon: Smartphone },
        { label: t("cv.car2gather.flowSearch"), icon: Search },
        { label: t("cv.car2gather.flowSelect"), icon: Car },
        { label: t("cv.car2gather.flowReview"), icon: User },
        { label: t("cv.car2gather.flowRequest"), icon: Send },
        { label: t("cv.car2gather.flowConfirm"), icon: CheckCircle },
        { label: t("cv.car2gather.flowChat"), icon: MessageCircle },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <section className="relative w-full py-24 px-6 overflow-hidden bg-black selection:bg-white/20">
            {/* Background Aesthetic */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-32">

                {/* IA Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="space-y-16"
                >
                    <div className="max-w-3xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.2em] text-white/50 mb-4"
                        >
                            Architecture
                        </motion.span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                            {t("cv.car2gather.archTitle")}
                        </h2>
                        <p className="text-lg md:text-xl text-neutral-400 leading-relaxed font-light">
                            {t("cv.car2gather.archDesc")}
                        </p>
                    </div>

                    {/* IA Tree Visualization */}
                    <div className="relative">
                        {/* Desktop Tree Layout */}
                        <div className="hidden lg:flex flex-col items-center">
                            {/* Root node */}
                            <motion.div
                                variants={itemVariants}
                                className="relative z-10 px-10 py-5 rounded-2xl bg-white/5 border border-white/20 backdrop-blur-xl shadow-2xl flex items-center gap-3 group hover:border-white/40 transition-colors"
                            >
                                <Smartphone className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                                <span className="text-xl font-medium tracking-wide text-white">APP</span>
                                <div className="absolute -inset-1 bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                            </motion.div>

                            {/* Connection: Root to Hub */}
                            <div className="w-px h-16 bg-gradient-to-b from-white/40 to-white/10" />

                            {/* Horizontal Line Connector */}
                            <div className="relative w-[80%] h-px bg-white/10">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                            </div>

                            {/* Bottom row connect lines */}
                            <div className="flex justify-between w-[80%]">
                                {iaNodes.map((_, i) => (
                                    <div key={i} className="w-px h-12 bg-white/10" />
                                ))}
                            </div>

                            {/* Child Nodes */}
                            <div className="flex justify-between w-full gap-4">
                                {iaNodes.map((node, i) => (
                                    <motion.div
                                        key={i}
                                        variants={itemVariants}
                                        className="group relative flex-1 p-6 rounded-2xl bg-neutral-900/50 border border-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-neutral-800/80 hover:border-white/20 hover:-translate-y-2 overflow-hidden"
                                    >
                                        <div className="absolute top-3 right-4 flex items-center gap-2">
                                            <span className={`w-1.5 h-1.5 rounded-full ${node.dotColor} shadow-md`} />
                                        </div>
                                        <div className="flex flex-col items-center text-center gap-4">
                                            <div className={`p-3 rounded-xl bg-white/5 ${node.color} group-hover:scale-110 transition-transform backdrop-blur-md`}>
                                                <node.icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors duration-300">
                                                {node.label}
                                            </span>
                                        </div>
                                        <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-shimmer" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile List/Grid Layout */}
                        <div className="lg:hidden grid grid-cols-1 gap-4">
                            <div className="flex justify-center mb-8">
                                <div className="px-8 py-4 rounded-2xl bg-white/5 border border-white/20 flex items-center gap-3">
                                    <Smartphone className="w-5 h-5 text-white" />
                                    <span className="text-lg font-medium text-white">APP</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {iaNodes.map((node, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="p-5 rounded-xl bg-neutral-900/40 border border-white/5 flex flex-col items-center gap-3"
                                    >
                                        <div className={`p-2.5 rounded-lg bg-white/5 ${node.color}`}>
                                            <node.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-medium text-neutral-400 text-center uppercase tracking-tight">
                                            {node.label}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* User Flow Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="space-y-16"
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.2em] text-white/50 mb-4"
                            >
                                Experience Flow
                            </motion.span>
                            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                Booking a Ride
                            </h3>
                        </div>
                        <div className="hidden md:block h-px flex-1 bg-white/10 mx-12 mb-4" />
                        <span className="text-xs uppercase font-bold text-neutral-500 tracking-[0.3em] whitespace-nowrap">
                            End-to-End Journey
                        </span>
                    </div>

                    <div className="relative">
                        {/* Desktop Horizontal Flow */}
                        <div className="hidden md:flex justify-between items-start relative px-6">
                            {/* Process line background */}
                            <div className="absolute top-[32px] left-[10%] right-[10%] h-px bg-white/10" />

                            {flowSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    className="relative flex flex-col items-center gap-6 group z-10"
                                >
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-full bg-neutral-950 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/40 transition-all duration-500 backdrop-blur-xl group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                            <step.icon className="w-6 h-6" />
                                        </div>
                                        {i < flowSteps.length - 1 && (
                                            <div className="absolute top-1/2 -right-[150%] translate-y-[-50%] hidden lg:block opacity-20">
                                                <div className="w-4 h-[2px] bg-white/50 rounded-full" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-center gap-1 max-w-[100px]">
                                        <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">{`Step 0${i + 1}`}</span>
                                        <p className="text-xs font-medium text-center text-neutral-400 group-hover:text-neutral-200 transition-colors">
                                            {step.label}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile Vertical Timeline */}
                        <div className="md:hidden relative space-y-12 pl-12 pr-4">
                            {/* Vertical Line */}
                            <div className="absolute left-[24px] top-10 bottom-10 w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent" />

                            {flowSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="relative flex items-center gap-6 group"
                                >
                                    {/* Timeline Marker */}
                                    <div className="absolute -left-[12px] w-6 h-6 rounded-full bg-black border border-white/20 flex items-center justify-center z-10">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform" />
                                    </div>

                                    <div className="flex-1 p-5 rounded-2xl bg-neutral-900/60 border border-white/5 flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/50 border border-white/5">
                                            <step.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest block mb-1">{`Step 0${i + 1}`}</span>
                                            <p className="text-sm font-medium text-neutral-200 uppercase tracking-tight">
                                                {step.label}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
