"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function About() {
    const { t } = useLanguage();
    return (
        <section className="py-24 px-6 md:px-12 bg-neutral-50 dark:bg-neutral-900/50">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-12 text-neutral-900 dark:text-neutral-50"
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
                        <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
                            {t("common.journey")}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
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
                        <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
                            {t("common.skills")}
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { category: "Tasarım", items: "Figma, Photoshop, Illustrator" },
                                { category: "3D & Animasyon", items: "Blender, After Effects, Premiere Pro" },
                            ].map((skill, index) => (
                                <li key={index} className="flex flex-col">
                                    <span className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-1">{skill.category}</span>
                                    <span className="text-neutral-800 dark:text-neutral-300">{skill.items}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
