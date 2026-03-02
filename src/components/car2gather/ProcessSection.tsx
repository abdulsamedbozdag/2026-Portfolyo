import { motion } from "framer-motion";
import Image from "next/image";

export function ProcessSection() {
    const wireframes = [
        { src: "/car2gather/c2g-lowfi-1.png", alt: "Wireframe 1" },
        { src: "/car2gather/c2g-lowfi-2.png", alt: "Wireframe 2" },
        { src: "/car2gather/c2g-lowfi-3.png", alt: "Wireframe 3" },
        { src: "/car2gather/c2g-lowfi-4.png", alt: "Wireframe 4" },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-24 transition-colors duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left/Top: Text Area */}
                <div className="lg:col-span-12 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-foreground transition-colors duration-500">
                            Process & Architecture
                        </h2>
                        <h3 className="text-xl md:text-2xl font-medium text-neutral-500 dark:text-neutral-400 mb-6 transition-colors duration-500">
                            Component Library & Low-Fi UX Flow
                        </h3>
                        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-500 max-w-4xl leading-relaxed transition-colors duration-500">
                            Before moving to high-fidelity, the core user flow was mapped out using basic wireframes to solve routing and matching problems. A foundational component library was also established early on to ensure consistency across the application.
                        </p>
                    </motion.div>
                </div>

                {/* Visual Grid */}

                {/* Component Library Card */}
                <div className="lg:col-span-7">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="group relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/5 bg-neutral-50 dark:bg-white/[0.02] backdrop-blur-sm shadow-xl dark:shadow-2xl p-4 md:p-8 transition-colors duration-500"
                    >
                        <div className="absolute top-4 left-6 z-10">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-500 bg-white/80 dark:bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-neutral-200 dark:border-white/10 transition-colors duration-500">
                                Component Library
                            </span>
                        </div>
                        <div className="relative aspect-[4/3] w-full">
                            <Image
                                src="/car2gather/c2g-components.png"
                                alt="car2gather Component Library"
                                fill
                                className="object-contain group-hover:scale-[1.02] transition-transform duration-700 ease-out dark:brightness-[0.9]"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Wireframes Grid/Row */}
                <div className="lg:col-span-5 flex flex-col gap-8 h-full">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col h-full bg-neutral-100 dark:bg-neutral-900/40 rounded-2xl border border-neutral-200 dark:border-white/5 p-6 transition-colors duration-500"
                    >
                        <div className="mb-4">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-500 px-1">
                                Wireframe Evolution
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 h-full">
                            {wireframes.map((wf, idx) => (
                                <div
                                    key={idx}
                                    className="relative aspect-[3/4] rounded-lg overflow-hidden border border-neutral-200 dark:border-white/5 bg-white dark:bg-black/20 transition-colors duration-500"
                                >
                                    <Image
                                        src={wf.src}
                                        alt={wf.alt}
                                        fill
                                        className="object-cover opacity-60 dark:opacity-80 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-between items-center text-[11px] text-neutral-400 dark:text-neutral-600 font-medium transition-colors duration-500">
                            <span>EARLY STAGE WIREFRAMES</span>
                            <span>2022</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
