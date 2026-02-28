"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export function Footer() {
    const { t } = useLanguage();
    return (
        <footer className="py-16 px-6 md:px-12 border-t border-border mt-24 bg-background transition-colors duration-500">
            <div className="max-w-[1400px] mx-auto">
                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h3 className="text-3xl md:text-5xl font-bold mb-4 text-foreground transition-colors duration-500">
                        {t("common.workTogether")}
                    </h3>
                    <p className="text-foreground/50 mb-8 max-w-md mx-auto transition-colors duration-500">
                        Yeni projeler, iş birlikleri veya sadece merhaba demek için bana ulaşın.
                    </p>
                    <a
                        href="mailto:abdulsamedbozdag@gmail.com"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-foreground text-background font-medium text-sm hover:opacity-80 transition-all duration-300"
                    >
                        <Mail className="w-4 h-4" />
                        {t("common.contact")}
                    </a>
                </motion.div>

                {/* Links & Info */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-border transition-colors duration-500">
                    <p className="text-foreground/50 text-sm transition-colors duration-500">
                        © {new Date().getFullYear()} Abdulsamed Bozdağ. {t("common.rights")}
                    </p>
                    <div className="flex items-center gap-6">
                        <a
                            href="https://www.linkedin.com/in/abdul-samed-bozda%C4%9F/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-foreground/60 hover:text-foreground transition-colors duration-500 text-sm"
                        >
                            <Linkedin className="w-4 h-4" />
                            LinkedIn
                            <ArrowUpRight className="w-3 h-3" />
                        </a>
                        <a
                            href="https://www.behance.net/abdulsamedbozdags"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-foreground/60 hover:text-foreground transition-colors duration-500 text-sm"
                        >
                            Behance
                            <ArrowUpRight className="w-3 h-3" />
                        </a>
                        <Link
                            href="/about"
                            className="text-foreground/60 hover:text-foreground transition-colors duration-500 text-sm font-medium"
                        >
                            {t("about.title")}
                        </Link>
                        <a
                            href="mailto:abdulsamedbozdag@gmail.com"
                            className="text-foreground/60 hover:text-foreground transition-colors duration-500 text-sm"
                        >
                            abdulsamedbozdag@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
