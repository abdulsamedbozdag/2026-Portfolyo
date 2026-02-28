"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";

export function About() {
    const { t } = useLanguage();
    return (
        <section className="py-24 px-6 md:px-12 bg-card/50 transition-colors duration-500">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-12 text-foreground transition-colors duration-500"
                >
                    {t("common.aboutMe")}
                </motion.h2>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-primary/10"
                        >
                            <Image
                                src="/AbdulSamedBozdag.jpg"
                                alt="Abdul Samed Bozdağ"
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-4 text-foreground transition-colors duration-500">
                                {t("common.journey")}
                            </h3>
                            <p className="text-foreground/60 leading-relaxed mb-8 transition-colors duration-500 text-justify">
                                {t("about.bio")}
                            </p>
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 text-primary font-bold group"
                            >
                                <span className="border-b-2 border-primary/20 group-hover:border-primary transition-colors pb-1">
                                    {t("common.projects") === "Projelerimi Gör" ? "Daha Fazlasını Öğren" : "Learn More About Me"}
                                </span>
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    →
                                </motion.span>
                            </Link>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-xl font-semibold mb-6 text-foreground transition-colors duration-500">
                            {t("common.skills")}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {(t("cv.skills") as any[] || []).slice(0, 6).map((skill, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                    className="px-4 py-2 rounded-xl bg-foreground/[0.03] border border-foreground/5 text-[10px] font-bold text-muted uppercase tracking-[0.2em] transition-all hover:bg-foreground/5 hover:border-primary/20"
                                >
                                    {skill.name}
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-8">
                            <p className="text-sm text-foreground/40 italic">
                                {t("common.projects") === "Projelerimi Gör" ? "Ve daha fazlası yetenek setimde mevcut." : "And more available in my skill set."}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
