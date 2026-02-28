"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

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
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="text-xl font-semibold mb-4 text-foreground transition-colors duration-500">
                            {t("common.journey")}
                        </h3>
                        <p className="text-foreground/60 leading-relaxed mb-6 transition-colors duration-500">
                            Eylül 2020 - Ocak 2026 Yıldız Teknik Üniversitesi İletişim ve Tasarımı.
                            Karmaşık problemleri basit, estetik ve işlevsel çözümlere dönüştürmek üzerine kurulu.
                        </p>

                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-xl font-semibold mb-4 text-foreground transition-colors duration-500">
                            {t("common.skills")}
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { category: "Tasarım", items: "Figma, Photoshop, Illustrator" },
                                { category: "3D & Animasyon", items: "Blender, After Effects, Premiere Pro" },
                            ].map((skill, index) => (
                                <li key={index} className="flex flex-col">
                                    <span className="text-sm font-medium text-muted uppercase tracking-wider mb-1 transition-colors duration-500">{skill.category}</span>
                                    <span className="text-foreground transition-colors duration-500">{skill.items}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
